const { connect } = require("react-redux");
const Login = require("./Login");
const Paths = require("../../config/paths");
const LoginRequest = require("./LoginRequest");
const { SetUser } = require("./loginActions");
const User = require("./User");
const { ShowAlert } = require("../alert/alertActions");

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    onRegister: (event, history) => {
      event.preventDefault();
      history.push(Paths.register);
    },
    onSubmit: async (event, history) => {
      event.preventDefault();
      const email = event.target.email.value;
      const password = event.target.password.value;

      const loginRequest = LoginRequest(email, password);

      try {
        const response = await fetch(Paths.api.login, loginRequest);
        const json = await response.json();
        if (!response.ok) {
          throw new Error(json.error);
        } else {
          dispatch(SetUser(User(json)));
          history.push(Paths.inbox);
        }
      } catch (error) {
        const title = "Error";
        return dispatch(ShowAlert(title, error.message));
      }
    }
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Login);
