import { Worker } from "bullmq";
import { redisConnection } from "../config/redis.config.js";
import { NOTIFICATION_QUEUE_NAME } from "./notification.queue.js";
import { notificationService } from "../services/notification.service.js";
import logger from "@monorepo/logger";

export function initNotificationWorker() {
  const worker = new Worker(
    NOTIFICATION_QUEUE_NAME,
    async (job) => {
      logger.info(`Processing notification job: ${job.id}`);
      const { userId, appId, templateKey, params, metadata } = job.data;

      await notificationService.processInAppNotification({
        userId,
        appId,
        templateKey,
        params,
        metadata,
      });
    },
    { connection: redisConnection },
  );

  worker.on("completed", (job) => {
    logger.info(`Notification job ${job.id} completed successfully`);
  });

  worker.on("failed", (job, err) => {
    logger.error(`Notification job ${job?.id} failed: ${err.message}`, {
      attemptsMade: job?.attemptsMade,
    });
  });

  return worker;
}
