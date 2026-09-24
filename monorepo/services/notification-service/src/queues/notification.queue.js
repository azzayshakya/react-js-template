import { Queue } from "bullmq";
import { redisConnection } from "../config/redis.config.js";
import logger from "@monorepo/logger";

export const NOTIFICATION_QUEUE_NAME = "notifications-dispatch";

export const notificationQueue = new Queue(NOTIFICATION_QUEUE_NAME, {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 2000,
    },
    removeOnComplete: 500,
    removeOnFail: 1000,
  },
});

export async function addNotificationJob(payload) {
  const job = await notificationQueue.add("send-notification", payload);
  logger.info(
    `Job ${job.id} enqueued for user ${payload.userId} [${payload.templateKey}]`,
  );
  return job;
}
