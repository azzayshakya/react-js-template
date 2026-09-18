const winston = require("winston");

const { combine, timestamp, printf, colorize, errors, json } = winston.format;

const LEVEL_COLORS = {
  error: "red",
  warn: "yellow",
  info: "cyan",
  http: "magenta",
  debug: "gray",
};

winston.addColors(LEVEL_COLORS);

/**
 * Dev format: human readable, colorized, tagged with the service name.
 * Example: 10:32:11  INFO  [task-service]  MongoDB connected
 */
const devFormat = (serviceName) =>
  combine(
    colorize({ all: true }),
    timestamp({ format: "HH:mm:ss" }),
    errors({ stack: true }),
    printf(({ level, message, timestamp, stack }) => {
      const tag = `[${serviceName}]`;
      return stack
        ? `${timestamp}  ${level}  ${tag}  ${message}\n${stack}`
        : `${timestamp}  ${level}  ${tag}  ${message}`;
    }),
  );

/**
 * Prod format: structured JSON, easy to ship to a log aggregator (ELK, Datadog, etc.)
 */
const prodFormat = (serviceName) =>
  combine(
    timestamp(),
    errors({ stack: true }),
    json(),
    winston.format((info) => {
      info.service = serviceName;
      return info;
    })(),
  );

/**
 * createLogger('task-service') -> a winston logger tagged with that service's name.
 * Every service/package in the mono-repo should create its own tagged instance
 * instead of sharing one anonymous logger, so logs are traceable across services.
 */
function createLogger(serviceName = "app") {
  const isProd = process.env.NODE_ENV === "production";

  return winston.createLogger({
    level: process.env.LOG_LEVEL || "info",
    format: isProd ? prodFormat(serviceName) : devFormat(serviceName),
    transports: [new winston.transports.Console()],
    exitOnError: false,
  });
}

module.exports = createLogger;
