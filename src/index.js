const express = require("express");
const { PORT } = require("./config/serverConfig");
const { sendBasicEmail } = require("./services/email-service");
const { setupJobs } = require("./utils/job");
const apiRouter = require("./routes/index");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRouter);

app.listen(PORT, async () => {
  console.log("Server started at ", PORT);
  setupJobs();
});
