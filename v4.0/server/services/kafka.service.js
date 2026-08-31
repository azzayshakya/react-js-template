const { Kafka } = require("kafkajs");

const kafkaConfig = require("../config/kafka.config");
const logger = require("../utils/logger");

const kafka = new Kafka(kafkaConfig);

const kafkaAdmin = kafka.admin();

const connectKafka = async () => {
  try {
    await kafkaAdmin.connect();

    logger.info("Kafka connected");
  } catch (error) {
    logger.error(`Kafka connection failed: ${error.message}`);

    throw error;
  }
};

module.exports = {
  kafka,
  kafkaAdmin,
  connectKafka,
};
