const cron = require("node-cron");
const emailService = require("../services/email-service");

/**
 * 10:00 am in morning
 * Every 5 minutes
 * Are there any pending emails which was expected to be sent
 * by now and is pending
 */

const setupJobs = () => {
  cron.schedule("*/1 * * * *", async () => {
    const response = await emailService.fetchPendingEmails();
    response.forEach((email) => {
      emailService.sendBasicEmail(
        "support@airlines.com",
        email.recipientEmail,
        email.subject,
        email.content,
        async (err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log(data);
            emailService.updateTicket({
              ...email.dataValues,
              status: "SUCCESS",
            });
          }
        },
      );
    });
  });
};

module.exports = {
  setupJobs,
};
