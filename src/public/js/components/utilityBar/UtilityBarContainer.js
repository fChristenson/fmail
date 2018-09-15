const UtilityBar = require("./UtilityBar");
const { EMAIL_LIMIT } = require("../inbox/config");
const InboxEmail = require("../inbox/utils/InboxEmail");
const { connect } = require("react-redux");
const fetchEmails = require("../inbox/utils/fetchEmails")(window.fetch);
const { ShowAlert } = require("../alert/alertActions");
const {
  SetEmailOverview
} = require("../navigationBar/components/navigationList/navigationListActions");
const { SetEmails, SetLastEmailOffset } = require("../inbox/inboxActions");
const timestampSort = require("../inbox/utils/timestampSort");

const mapStateToProps = state => {
  const rangeStart = state.inbox.emailOffset;
  return {
    pathname: state.navigationList.pathname,
    rangeStart,
    rangeEnd: Math.min(
      rangeStart + EMAIL_LIMIT,
      state.inbox.totalNumberOfEmails
    ),
    totalEmails: state.inbox.totalNumberOfEmails
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPrevious: function(lastEmailOffset, pathname) {
      const nextOffset = Math.max(lastEmailOffset - EMAIL_LIMIT, 0);
      const nextEmailOffset = Math.max(nextOffset, 0);
      dispatch(SetLastEmailOffset(nextEmailOffset));
      this.fetchEmails(nextEmailOffset, pathname);
    },
    onNext: function(lastEmailOffset, totalEmails, pathname) {
      const nextEmailOffset = Math.min(
        Math.max(totalEmails - EMAIL_LIMIT, 0),
        lastEmailOffset + EMAIL_LIMIT
      );
      dispatch(SetLastEmailOffset(nextEmailOffset));
      this.fetchEmails(nextEmailOffset, pathname);
    },
    fetchEmails: async function(offset, pathname) {
      try {
        const response = await fetchEmails(pathname, offset, EMAIL_LIMIT);
        const json = await response.json();

        if (!response.ok) throw new Error(json.error);

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

module.exports = connect(mapStateToProps, mapDispatchToProps)(UtilityBar);
