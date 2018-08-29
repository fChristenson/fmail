const Paths = require("../../../config/paths");

module.exports = fetch => pathname => {
  switch (pathname) {
    case Paths.inbox:
      return fetch(Paths.api.inboxEmails);

    case Paths.important:
      return fetch(Paths.api.importantEmails);

    case Paths.sentMail:
      return fetch(Paths.api.sentMailEmails);

    case Paths.drafts:
      return fetch(Paths.api.draftsEmails);

    case Paths.spam:
      return fetch(Paths.api.spamEmails);

    default:
      throw new Error(`${pathname} is not a valid path`);
  }
};
