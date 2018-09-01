module.exports = incomingOverview => {
  return {
    unreadInboxEmails: incomingOverview.unreadInboxEmails || 0,
    draftEmails: incomingOverview.draftEmails || 0,
    unreadSpamEmails: incomingOverview.unreadSpamEmails || 0
  };
};
