const Redis = require("ioredis");

const DEFAULT_OPTIONS = {
  maxRetriesPerRequest: 3,
  connectTimeout: 10000,
  retryStrategy: (times) => (times > 10 ? null : Math.min(times * 200, 2000)),
};

/**
 * createRedisClient(url, logger) -> ioredis client
 * One client per service is the convention here - don't share a single
 * client instance across unrelated services, since retry/backoff state
 * and pub/sub subscriptions are per-connection.
 */
function createRedisClient(url, logger = console, options = {}) {
  if (!url) {
    throw new Error("REDIS_URL is required to connect to Redis");
  }

  const client = new Redis(url, { ...DEFAULT_OPTIONS, ...options });

  client.on("connect", () => logger.info("Redis connected"));
  client.on("ready", () => logger.info("Redis ready to accept commands"));
  client.on("error", (err) => logger.error(`Redis error: ${err.message}`));
  client.on("close", () => logger.warn("Redis connection closed"));

  return client;
}

module.exports = createRedisClient;
