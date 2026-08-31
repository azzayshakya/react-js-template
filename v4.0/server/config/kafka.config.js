require("dotenv").config();

const fs = require("fs");
const path = require("path");

const caPath = path.join(__dirname, "../certificate/ca.pem");

module.exports = {
  clientId: process.env.KAFKA_CLIENT_ID || "my-node-app",

  brokers: [process.env.KAFKA_BROKER],

  ssl: {
    ca: [fs.readFileSync(caPath, "utf8")],
    rejectUnauthorized: true,
  },

  sasl: {
    mechanism: "scram-sha-256",
    username: process.env.KAFKA_USERNAME,
    password: process.env.KAFKA_PASSWORD,
  },

  connectionTimeout: 10000,
  authenticationTimeout: 10000,
  requestTimeout: 30000,

  retry: {
    initialRetryTime: 300,
    retries: 5,
  },
};
