const transporter = require("../config/emailConfig");
const TicketRepository = require("../repository/ticket-repository");

const repo = new TicketRepository();

const sendBasicEmail = (
  mailFrom,
  mailTo,
  mailSubject,
  mailBody,
  //   callback to set the state in DB after the operation is complete/failed
  callback = async (err, data) => null,
) => {
  transporter.sendMail(
    {
      from: mailFrom,
      to: mailTo,
      subject: mailSubject,
      text: mailBody,
    },
    callback,
  );
};

const fetchPendingEmails = async (timestamp) => {
  try {
    const response = await repo.get({ status: "PENDING" });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const createNotification = async (data) => {
  try {
    const response = await repo.create(data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const updateTicket = async (data) => {
  try {
    const response = await repo.update(data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sendBasicEmail,
  fetchPendingEmails,
  createNotification,
  updateTicket,
};
