const { connect } = require("react-redux");
const {
  ShowComposeEmail
} = require("../navigationBar/components/composeEmail/composeEmailActions");
const NavigationBar = require("./NavigationBar");

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    onCompose() {
      dispatch(ShowComposeEmail(true));
    }
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
