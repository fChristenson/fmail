const recipientsStringToRecipientsArray = require("./recipientsStringToRecipientsArray");

function UpdateEmailRequest(recipientsString, subject, message) {
  const recipients = recipientsStringToRecipientsArray(recipientsString);
  const data = {
    recipients,
    subject,
    message
  };

  const request = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };

  return request;
}

module.exports = UpdateEmailRequest;
