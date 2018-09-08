const recipientsStringToRecipientsArray = require("./recipientsStringToRecipientsArray");

function SendEmailRequest(recipientsString, subject, message) {
  const recipients = recipientsStringToRecipientsArray(recipientsString);
  const data = {
    recipients,
    subject,
    message
  };

  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };

  return request;
}

module.exports = SendEmailRequest;
