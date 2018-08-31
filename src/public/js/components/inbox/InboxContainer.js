const { connect } = require("react-redux");
const fetchEmails = require("./utils/fetchEmails")(window.fetch);
const { ShowAlert } = require("../alert/alertActions");
const { SetEmails } = require("./inboxActions");
const timestampSort = require("./utils/timestampSort");
const InboxEmail = require("./utils/InboxEmail");
const {
  SetLocation
} = require("../navigationBar/components/navigationList/navigationListActions");
const Inbox = require("./Inbox");

const mapStateToProps = state => {
  return {
    emails: state.inbox.emails
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchEmails: async pathname => {
      dispatch(SetLocation(pathname));
      try {
        const response = await fetchEmails(pathname);
        const json = await response.json();
        const sort = json.sort(timestampSort);
        const emails = sort.map(InboxEmail);
        return dispatch(SetEmails(emails));
      } catch (error) {
        const title = "Error";
        const text = error.message;
        return dispatch(ShowAlert(title, text));
      }
    }
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Inbox);
