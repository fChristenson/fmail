const Paths = require("../../../config/paths");

module.exports = fetch => (pathname, offset, limit) => {
  switch (pathname) {
    case Paths.root:
    case Paths.inbox:
      return fetch(Paths.api.inboxEmails(offset, limit));

    case Paths.searchTemplate:
      const q = new URLSearchParams(window.location.search).get("q");
      return fetch(Paths.api.search(q, offset, limit));

    case Paths.important:
      return fetch(Paths.api.importantEmails(offset, limit));

    case Paths.sentMail:
      return fetch(Paths.api.sentMailEmails(offset, limit));

    case Paths.drafts:
      return fetch(Paths.api.draftsEmails(offset, limit));

    case Paths.spam:
      return fetch(Paths.api.spamEmails(offset, limit));

    default:
      throw new Error(`${pathname} is not a valid path`);
  }
};
