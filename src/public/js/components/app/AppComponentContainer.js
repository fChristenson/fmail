const { connect } = require("react-redux");
const AppComponent = require("./AppComponent.jsx");
const { SetUser } = require("../login/loginActions");
const User = require("../login/User");

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    onShow: json => {
      dispatch(SetUser(User(json)));
    }
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(AppComponent);
