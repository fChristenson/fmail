const {
  SET_EMAILS,
  SET_LAST_EMAIL_OFFSET,
  SET_TOTAL_NUMBER_OF_EMAILS
} = require("./inboxEvents");

function SetEmails(emails) {
  return {
    type: SET_EMAILS,
    value: emails
  };
}

function SetTotalNumberOfEmails(count) {
  return {
    type: SET_TOTAL_NUMBER_OF_EMAILS,
    value: count
  };
}

function SetLastEmailOffset(number) {
  return {
    type: SET_LAST_EMAIL_OFFSET,
    value: number
  };
}

module.exports = {
  SetEmails,
  SetLastEmailOffset,
  SetTotalNumberOfEmails
};
