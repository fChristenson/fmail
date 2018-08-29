const paths = {
  root: "/",
  inbox: "/inbox",
  important: "/important",
  sentMail: "/sent-mail",
  drafts: "/drafts",
  spam: "/spam",
  emailTemplate: "/emails/:id",
  email: emailId => `/emails/${emailId}`,
  api: {
    inboxEmails: "/api/v1/inbox-emails",
    importantEmails: "/api/v1/important-emails",
    sentMailEmails: "/api/v1/sent-emails",
    draftsEmails: "/api/v1/draft-emails",
    spamEmails: "/api/v1/spam-emails",
    sendEmail: "/api/v1/emails"
  }
};

module.exports = paths;
