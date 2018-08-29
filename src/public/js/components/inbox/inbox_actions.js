const { SET_EMAILS } = require("./inbox_events");

function SetEmails(emails) {
  return {
    type: SET_EMAILS,
    value: emails
  };
}

module.exports.SetEmails = SetEmails;
