module.exports = pathname => {
  switch (pathname) {
    case "/inbox":
      return "inbox";

    case "/important":
      return "important";

    case "/sent-mail":
      return "sent";

    case "/drafts":
      return "drafts";

    case "/spam":
      return "spam";

    default:
      throw new Error(`${pathname} is not a valid emailType`);
  }
};
