const formatTimestamp = require("../../utils/formatTimestamp");

const EmailView = incomingEmail => {
  const subject = incomingEmail.subject || "";
  const from = incomingEmail.from || "";
  const body = incomingEmail.message || "";
  let maybeTimestamp = incomingEmail.timestamp || "";
  let recipients;

  try {
    maybeTimestamp = formatTimestamp(maybeTimestamp);
  } catch (error) {
    console.warn(error.message);
    maybeTimestamp = "";
  }

  try {
    recipients = incomingEmail.recipients.join(", ");
  } catch (error) {
    console.warn(error.message);
    recipients = "";
  }

  return {
    subject,
    from,
    recipients,
    body: body.replace(/\n/g, "<br/>"),
    timestamp: maybeTimestamp
  };
};

module.exports = EmailView;
