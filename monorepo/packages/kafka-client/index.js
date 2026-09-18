const fs = require("fs");
const { Kafka } = require("kafkajs");

/**
 * createKafkaClient({ clientId, brokers, username, password, caCertPath }, logger)
 * -> { producer, consumer, connectProducer, connectConsumer }
 *
 * If username/password are provided, connects over SASL+SSL (required by
 * managed brokers like Aiven/Confluent Cloud). caCertPath, when given, is read
 * and passed as the trusted CA so Node verifies the broker's certificate chain
 * instead of just assuming ssl: true with the system's default trust store.
 * Omit both for a local/plaintext broker.
 */
function createKafkaClient(
  { clientId, brokers = [], username, password, caCertPath },
  logger = console,
) {
  if (!brokers.length) {
    throw new Error("KAFKA_BROKERS is required to connect to Kafka");
  }

  const useSasl = Boolean(username && password);

  let sslConfig = useSasl ? true : undefined;
  if (useSasl && caCertPath) {
    try {
      sslConfig = { ca: [fs.readFileSync(caCertPath, "utf-8")] };
    } catch (err) {
      logger.error(`Could not read Kafka CA cert at ${caCertPath}: ${err.message}`);
      throw err;
    }
  }

  const kafka = new Kafka({
    clientId,
    brokers,
    retry: { retries: 5 },
    ...(useSasl && {
      ssl: sslConfig,
      sasl: { mechanism: "plain", username, password },
    }),
  });
  const producer = kafka.producer();

  async function connectProducer() {
    await producer.connect();
    logger.info("Kafka producer connected");
    return producer;
  }

  async function publish(topic, message) {
    await producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
  }

  function createConsumer(groupId) {
    const consumer = kafka.consumer({ groupId });

    async function connectAndRun(topic, onMessage) {
      await consumer.connect();
      logger.info(`Kafka consumer connected (group: ${groupId})`);
      await consumer.subscribe({ topic, fromBeginning: false });
      await consumer.run({
        eachMessage: async ({ message }) => {
          const value = message.value ? JSON.parse(message.value.toString()) : null;
          await onMessage(value);
        },
      });
    }

    return { consumer, connectAndRun };
  }

  return { producer, connectProducer, publish, createConsumer };
}

module.exports = createKafkaClient;
