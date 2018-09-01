const { connect } = require("react-redux");
const fetchEmails = require("./utils/fetchEmails")(window.fetch);
const Paths = require("../../config/paths");
const { ShowAlert } = require("../alert/alertActions");
const EmailOverview = require("../navigationBar/components/navigationList/EmailOverview");
const {
  SetEmailOverview
} = require("../navigationBar/components/navigationList/navigationListActions");
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
        const responsePromise = fetchEmails(pathname);
        const response2Promise = fetch(Paths.api.overview);
        const [response, response2] = await Promise.all([
          responsePromise,
          response2Promise
        ]);
        const json = await response.json();
        const json2 = await response2.json();
        const overview = EmailOverview(json2);
        dispatch(SetEmailOverview(overview));
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
