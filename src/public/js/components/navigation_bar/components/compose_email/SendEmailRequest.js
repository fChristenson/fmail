const SendEmailRequest = (recipientsString, subject, message) => {
  const regex = /(\s|,|;|\t)/;
  const recipients = recipientsString
    .split(regex)
    .filter(str => str.trim())
    .filter(str => regex.test(str) === false);

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
