function ComposeForm(email) {
  return {
    emailId: email.id || "",
    emailType: email.type || "",
    recipients: email.recipients || "",
    subject: !email.subject || email.subject === "<no subject>"
      ? ""
      : email.subject,
    message: email.body || ""
  };
}

module.exports = ComposeForm;
