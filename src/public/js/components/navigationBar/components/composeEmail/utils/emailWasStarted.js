function emailWasStarted(request) {
  const hasRecipients = !!request.recipients && request.recipients.length > 0;
  const hasSubject = !!request.subject && request.subject.length > 0;
  const hasMessage = !!request.message && request.message.length > 0;

  return hasRecipients || hasSubject || hasMessage;
}

module.exports = emailWasStarted;
