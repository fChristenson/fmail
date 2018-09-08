const { connect } = require("react-redux");
const ComposeForm = require("../../../navigationBar/components/composeEmail/ComposeForm");
const {
  SetForm,
  ShowComposeEmail
} = require("../../../navigationBar/components/composeEmail/composeEmailActions");
const InboxRow = require("./InboxRow");

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    onDraftClick: email => {
      const form = ComposeForm(email);
      dispatch(SetForm(form));

      const show = true;
      dispatch(ShowComposeEmail(show));
    }
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(InboxRow);
