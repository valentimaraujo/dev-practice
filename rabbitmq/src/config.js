const rabbitConfig = {
  uri: process.env.rabbitUri || "amqp://localhost:5672",
  workQueueDefault: process.env.workQueueDefault || "workQueueDefault"
}

module.exports = rabbitConfig;
