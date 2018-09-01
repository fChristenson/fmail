const { connect } = require("react-redux");
const { ShowAlert } = require("../alert/alertActions");
const Email = require("./Email");

const mapStateToProps = (state, { match }) => {
  return {
    emailId: match.params.emailId
  };
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

module.exports = connect(mapStateToProps, mapDispatchToProps)(Email);
