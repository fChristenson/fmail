const { connect } = require("react-redux");
const { ShowAlert } = require("../alert/alert_actions");
const { SetEmails } = require("../inbox/inbox_actions");
const fetchEmails = require("../inbox/utils/fetchEmails")(window.fetch);
const timestampSort = require("../inbox/utils/timestampSort");
const InboxEmail = require("../inbox/utils/InboxEmail");
const Paths = require("../../config/paths");
const NavigationBar = require("./NavigationBar");

const mapStateToProps = state => {
  return {
    pathname: state.navigationList.pathname
  };
};

const mapDispatchToProps = (dispatch, state) => {
  return {
    onEmailSent: async pathname => {
      const title = "Email sent";
      const text = "Email was sent successfully";
      dispatch(ShowAlert(title, text));

      if (Paths.sentMail === pathname) {
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
    },
    onError: errorMessage => {
      const title = "Email failed";
      return dispatch(ShowAlert(title, errorMessage));
    }
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
