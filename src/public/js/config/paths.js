const paths = {
  root: "/",
  any: "*",
  register: "/register",
  login: "/login",
  inbox: "/inbox",
  search: q => `/search?q=${q}`,
  searchTemplate: "/search",
  important: "/important",
  sentMail: "/sent-mail",
  drafts: "/drafts",
  spam: "/spam",
  emailTemplate: "/emails/:emailId",
  email: emailId => `/emails/${emailId}`,
  api: {
    register: "/api/v1/users",
    login: "/api/v1/login",
    logout: "/api/v1/logout",
    isLoggedIn: "/api/v1/users/logged-in",
    search: (q, offset, limit) =>
      `/api/v1/search?q=${q}&offset=${offset}&limit=${limit}`,
    inboxEmails: (offset, limit) =>
      `/api/v1/inbox-emails?offset=${offset}&limit=${limit}`,
    importantEmails: (offset, limit) =>
      `/api/v1/important-emails?offset=${offset}&limit=${limit}`,
    sentMailEmails: (offset, limit) =>
      `/api/v1/sent-emails?offset=${offset}&limit=${limit}`,
    draftsEmails: (offset, limit) =>
      `/api/v1/draft-emails?offset=${offset}&limit=${limit}`,
    spamEmails: (offset, limit) =>
      `/api/v1/spam-emails?offset=${offset}&limit=${limit}`,
    sendEmail: "/api/v1/emails",
    overview: "/api/v1/email-overview",
    emailCount: (type, q) => `/api/v1/emails/count?emailType=${type}&q=${q}`,
    email: emailId => `/api/v1/emails/${emailId}`,
    draftEmail: emailId => `/api/v1/draft-emails/${emailId}`,
    setEmailToImportant: emailId => `/api/v1/emails/${emailId}/important`
  }
};

module.exports = paths;
