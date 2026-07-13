const amqplib = require("amqplib");
const {
  MESSAGE_QUEUE_URL,
  EXCHANGE_NAME,
  QUEUE_NAME,
} = require("../config/serverConfig");

class MessageQueue {
  constructor() {
    this.channel = null;
  }

  async createChannel() {
    try {
      const connection = await amqplib.connect(MESSAGE_QUEUE_URL);
      const channel = await connection.createChannel();
      // creates routing configuration for broker as in how to route the messages to queue.
      await channel.assertExchange(EXCHANGE_NAME, "direct", { durable: false });
      // Asserting if the queue exists, if it doesn't it creates one.
      await channel.assertQueue(QUEUE_NAME, { durable: true });
      this.channel = channel;
    } catch (error) {
      throw error;
    }
  }

  async subscribeMessage(routingKey, eventHandler) {
    if (!this.channel) {
      await this.createChannel();
    }
    await this.channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, routingKey);
    this.channel.consume(QUEUE_NAME, async (msg) => {
      const payload = msg.content.toString();
      await eventHandler?.(JSON.parse(payload));
      this.channel.ack(msg);
    });
  }

  async publishMessage(routingKey, message) {
    if (!this.channel) {
      await this.createChannel();
    }
    // Ideally the exchange, queue and binding creation is handled through helm chart / terraform.
    await this.channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, routingKey);
    console.log("Publishing message");
    const response = await this.channel.publish(
      EXCHANGE_NAME,
      routingKey,
      Buffer.from(message),
    );
    console.log("Message Published ", response);
  }
}

module.exports = new MessageQueue();
