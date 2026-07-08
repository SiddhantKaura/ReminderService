const dotEnv = require("dotenv");
dotEnv.config();

module.exports = {
  PORT: process.env.PORT,
  EMAIL_ID: process.env.EMAIL_ID,
  EMAIL_PASS: process.env.EMAIL_PASS,
};
