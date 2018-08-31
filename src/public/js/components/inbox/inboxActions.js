const { SET_EMAILS } = require("./inboxEvents");

function SetEmails(emails) {
  return {
    type: SET_EMAILS,
    value: emails
  };
}

module.exports.SetEmails = SetEmails;
