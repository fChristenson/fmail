const SendEmailRequest = (recipients, subject, message) => {
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
};

module.exports = SendEmailRequest;
