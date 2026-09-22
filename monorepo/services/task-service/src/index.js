import express from "express";
import process from "node:process";
import createLogger from "@monorepo/logger";
import { createRedisClient, closeRedisClient } from "@monorepo/redis-client";
import { createMailer } from "@monorepo/mailer";
import { createKafkaClient } from "@monorepo/kafka-client";
import env from "./config/env.js";

const SERVICE_NAME = "task-service";
const logger = createLogger(SERVICE_NAME);

async function start() {
  // --- 1. Redis ---
  let redisClient = null;
  try {
    redisClient = createRedisClient({ url: env.REDIS_URL, logger });
    if (redisClient.status === "wait") await redisClient.connect();
    await redisClient.ping();
    logger.info("Redis ready");
  } catch (err) {
    logger.error(`Redis connection failed: ${err.message || err}`);
    process.exit(1);
  }

  // --- 2. Kafka Producer ---
  let kafkaProducer = null;
  if (env.KAFKA_ENABLED) {
    try {
      const kafka = createKafkaClient(
        {
          clientId: SERVICE_NAME,
          brokers: env.KAFKA_BROKERS,
          username: env.KAFKA_USERNAME,
          password: env.KAFKA_PASSWORD,
          caCertPath: env.KAFKA_CA_CERT_PATH,
        },
        logger,
      );

      kafkaProducer = kafka.createProducer();
      await kafkaProducer.connect();
    } catch (err) {
      logger.warn(
        `Kafka failed to connect, continuing without it: ${err.message}`,
      );
      kafkaProducer = null;
    }
  } else {
    logger.info("Kafka disabled (set KAFKA_ENABLED=true to enable)");
  }

  // --- 3. Mailer ---
  let mailer = null;
  if (env.MAIL_ENABLED) {
    try {
      mailer = createMailer({
        smtp: env.MAIL.smtp,
        from: env.MAIL.from,
        logger,
      });
      await mailer.verify();
    } catch (err) {
      logger.warn(`Mailer failed: ${err.message}`);
      mailer = null;
    }
  }

  // --- 4. Express Server & Routes ---
  const app = express();
  app.use(express.json());

  app.locals.redis = redisClient;
  if (kafkaProducer) app.locals.kafkaProducer = kafkaProducer;
  if (mailer) app.locals.mailer = mailer;

  // Unified Health Check
  app.get("/health", async (req, res) => {
    res.status(200).json({
      status: "ok",
      service: SERVICE_NAME,
      redis: "healthy",
      kafka: kafkaProducer?.isConnected ? "connected" : "disabled/offline",
      mailer: mailer?.isVerified ? "ready" : "disabled/offline",
      timestamp: new Date().toISOString(),
    });
  });

  // Test Kafka event publishing
  app.post("/api/events/publish", async (req, res, next) => {
    if (!kafkaProducer) {
      return res
        .status(503)
        .json({ success: false, message: "Kafka producer is offline" });
    }

    try {
      const {
        topic = "task-events",
        eventName = "TASK_CREATED",
        data = {},
      } = req.body;

      await kafkaProducer.sendEvent({
        topic,
        key: data.id || Date.now().toString(),
        value: {
          event: eventName,
          payload: data,
          timestamp: new Date().toISOString(),
        },
      });

      res
        .status(200)
        .json({ success: true, message: `Event published to ${topic}` });
    } catch (err) {
      next(err);
    }
  });

  const server = app.listen(env.PORT, () => {
    logger.info(`${SERVICE_NAME} listening on port ${env.PORT}`);
  });

  // Graceful termination handling
  const handleShutdown = async (signal) => {
    logger.info(`${signal} received: closing connections...`);
    server.close(async () => {
      if (kafkaProducer) await kafkaProducer.disconnect();
      if (mailer) await mailer.close();
      if (redisClient) await closeRedisClient(logger);
      logger.info("Shutdown complete.");
      process.exit(0);
    });
  };

  process.on("SIGTERM", () => handleShutdown("SIGTERM"));
  process.on("SIGINT", () => handleShutdown("SIGINT"));
}

start();
