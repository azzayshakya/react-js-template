const express = require("express");
const createLogger = require("@monorepo/logger");
const { connectDB } = require("@monorepo/mongo-client");
const createRedisClient = require("@monorepo/redis-client");
const createKafkaClient = require("@monorepo/kafka-client");
const createJwtUtils = require("@monorepo/jwt-utils");
const createMailer = require("@monorepo/mailer");
const createCloudinaryClient = require("@monorepo/cloudinary-client");
const createGeminiClient = require("@monorepo/gemini-client");

const env = require("./config/env");
const healthRouter = require("./routes/health.route");
const taskRouter = require("./routes/task.route");
const uploadRouter = require("./routes/upload.route");
const aiRouter = require("./routes/ai.route");
const mailRouter = require("./routes/mail.route");

const SERVICE_NAME = "task-service";
const logger = createLogger(SERVICE_NAME);

async function start() {
  // --- Redis: connect first, it's needed even if Mongo/Kafka are slow to come up
  const redisClient = createRedisClient(env.REDIS_URL, logger);

  // --- MongoDB
  if (env.MONGO_URI) {
    try {
      await connectDB(env.MONGO_URI, logger);
    } catch {
      logger.warn(
        "Starting without MongoDB - task routes will fail until it's reachable",
      );
    }
  } else {
    logger.warn("MONGO_URI not set - skipping MongoDB connection");
  }

  // --- Kafka (optional - only connect if explicitly enabled)
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
      await kafka.connectProducer();
    } catch (err) {
      logger.warn(`Kafka not reachable, continuing without it: ${err.message}`);
    }
  } else {
    logger.info("Kafka disabled (set KAFKA_ENABLED=true to enable)");
  }

  // --- JWT: no external connection needed, just requires secrets to be set
  const jwtUtils = createJwtUtils(env.JWT);
  if (!env.JWT.accessToken.secret) {
    logger.warn("JWT_ACCESS_SECRET not set - token signing will fail if used");
  }

  // --- Mail (optional)
  let mailer = null;
  if (env.MAIL_ENABLED) {
    try {
      mailer = createMailer(env.MAIL, logger);
    } catch (err) {
      logger.warn(`Mailer not available: ${err.message}`);
    }
  } else {
    logger.info("Mail disabled (set MAIL_ENABLED=true to enable)");
  }

  // --- Cloudinary (optional)
  let cloudinaryClient = null;
  if (env.CLOUDINARY_ENABLED) {
    try {
      cloudinaryClient = createCloudinaryClient(env.CLOUDINARY, logger);
    } catch (err) {
      logger.warn(`Cloudinary not available: ${err.message}`);
    }
  } else {
    logger.info("Cloudinary disabled (set CLOUDINARY_ENABLED=true to enable)");
  }

  // --- Gemini (optional)
  let geminiClient = null;
  if (env.GEMINI_ENABLED) {
    try {
      geminiClient = createGeminiClient(env.GEMINI, logger);
    } catch (err) {
      logger.warn(`Gemini not available: ${err.message}`);
    }
  } else {
    logger.info("Gemini disabled (set GEMINI_ENABLED=true to enable)");
  }

  // --- Express app
  const app = express();
  app.use(express.json());

  app.use(healthRouter(redisClient));
  app.use("/api", taskRouter);

  // only mount routes whose dependency actually connected - keeps the API
  // surface honest about what's really available in this environment
  if (cloudinaryClient) app.use("/api", uploadRouter(cloudinaryClient));
  if (geminiClient) app.use("/api", aiRouter(geminiClient));
  if (mailer) app.use("/api", mailRouter(mailer));

  // central error handler - every ApiError thrown in routes lands here
  app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    if (!err.isOperational) logger.error(err.stack);

    res.status(statusCode).json({
      statusCode,
      success: false,
      message: err.message || "Internal server error",
      errors: err.errors || [],
    });
  });

  app.listen(env.PORT, () => {
    logger.info(`${SERVICE_NAME} listening on port ${env.PORT}`);
  });

  process.on("SIGTERM", async () => {
    logger.info("SIGTERM received, shutting down");
    await redisClient.quit();
    process.exit(0);
  });
}

start();
