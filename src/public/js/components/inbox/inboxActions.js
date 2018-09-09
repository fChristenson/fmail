const {
  SET_EMAILS,
  SET_LAST_EMAIL_OFFSET,
  QUERY_WAS_MADE,
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

function QueryWasMade(queryWasMade) {
  return {
    type: QUERY_WAS_MADE,
    value: queryWasMade
  };
}

module.exports = {
  QueryWasMade,
  SetEmails,
  SetLastEmailOffset,
  SetTotalNumberOfEmails
};
