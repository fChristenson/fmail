const Paths = require("../../../config/paths");

module.exports = pathname => {
  switch (pathname) {
    case Paths.root:
    case Paths.inbox:
      return "inbox";

    case Paths.searchTemplate:
      return "search";

    case Paths.important:
      return "important";

    case Paths.sentMail:
      return "sent";

    case Paths.drafts:
      return "drafts";

    case Paths.spam:
      return "spam";

    default:
      throw new Error(`${pathname} is not a valid emailType`);
  }
};
