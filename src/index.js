const express = require("express");
const { PORT } = require("./config/serverConfig");
const { sendBasicEmail } = require("./services/email-service");
const cron = require("node-cron");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log("Server started at ", PORT);
  //   sendBasicEmail(
  //     "support@admin.com",
  //     "skanonymous001@gmail.com",
  //     "This is a test email",
  //     "Hi There",
  //   );

  cron.schedule("* * * * *", () => {
    console.log("running a task every minute");
  });
});
