const { connect } = require("react-redux");
const { ShowAlert } = require("../../../alert/alertActions");
const InboxRowIcons = require("./InboxRowIcons");

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    onError: error => {
      const title = "Error";
      const text = error.message;
      return dispatch(ShowAlert(title, text));
    }
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(InboxRowIcons);
