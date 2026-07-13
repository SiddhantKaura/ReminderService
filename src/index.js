const express = require("express");
const { PORT, ROUTING_KEY } = require("./config/serverConfig");
const {
  sendBasicEmail,
  consumeMessageQueueEvent,
} = require("./services/email-service");
const { setupJobs } = require("./utils/job");
const apiRouter = require("./routes/index");
const messageQueue = require("./utils/messageQueue");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRouter);

app.listen(PORT, async () => {
  console.log("Server started at ", PORT);
  setupJobs();
  await messageQueue.createChannel();
  messageQueue.subscribeMessage(ROUTING_KEY, consumeMessageQueueEvent);
});
