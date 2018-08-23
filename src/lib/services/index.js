const EmailModel = require("./emailService/EmailModel");
const EmailService = require("./emailService/EmailService");

const emailService = new EmailService(EmailModel);

module.exports = {
  emailService
};
