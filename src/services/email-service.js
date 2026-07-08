const transporter = require("../config/emailConfig");

const sendBasicEmail = (mailFrom, mailTo, mailSubject, mailBody) => {
  transporter.sendMail({
    from: mailFrom,
    to: mailTo,
    subject: mailSubject,
    text: mailBody,
  });
};

module.exports = { sendBasicEmail };
