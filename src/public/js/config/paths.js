const paths = {
  root: "/",
  inbox: "/inbox",
  important: "/important",
  sentMail: "/sent-mail",
  drafts: "/drafts",
  spam: "/spam",
  emailTemplate: "/emails/:id",
  email: emailId => `/emails/${emailId}`
};

module.exports = paths;
