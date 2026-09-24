import http from "node:http";
import process from "node:process";
import app from "./app.js";
import { ENV } from "./config/env.config.js";
import { initDB, disconnectDB } from "./config/db.config.js";
import { closeRedisClient } from "./config/redis.config.js";
import { initSocketServer } from "./sockets/socket.js";
import { initNotificationWorker } from "./queues/notification.worker.js";
import logger from "@monorepo/logger";

const server = http.createServer(app);

// Sockets & Worker
initSocketServer(server);
const worker = initNotificationWorker();

async function startServer() {
  try {
    await initDB();
    server.listen(ENV.PORT, () => {
      logger.info(`Notification microservice listening on port ${ENV.PORT}`);
    });
  } catch (error) {
    logger.error(`Fatal startup error: ${error.message}`);
    process.exit(1);
  }
}

async function gracefulShutdown(signal) {
  logger.warn(`Received ${signal}. Shutting down gracefully...`);

  server.close(async () => {
    logger.info("HTTP/WebSocket server closed.");
    try {
      await worker.close();
      await closeRedisClient(logger);
      await disconnectDB();
      logger.info("Worker, Redis, and MongoDB connections closed.");
      process.exit(0);
    } catch (err) {
      logger.error("Error during graceful shutdown", { error: err.message });
      process.exit(1);
    }
  });

  setTimeout(() => {
    logger.error("Forceful shutdown triggered after timeout");
    process.exit(1);
  }, 10000);
}

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

startServer();
