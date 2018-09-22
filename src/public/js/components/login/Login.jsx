const React = require("react");
const withRouter = require("react-router-dom/withRouter").default;
const TextField = require("@material-ui/core/TextField").default;
const Button = require("@material-ui/core/Button").default;
const Paths = require("../../config/paths");

const Login = ({ onSubmit, history, onRegister }) => {
  return (
    <div className="login" data-test="login">
      <h1 className="login__h1">Login for fmail</h1>
      <form
        className="login__form"
        onSubmit={event => onSubmit(event, history)}
      >
        <TextField type="text" required name="email" label="Email" />
        <TextField type="password" required name="password" label="Password" />
        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
        <Button
          data-test="login__register"
          variant="contained"
          href={Paths.register}
          color="secondary"
          onClick={event => onRegister(event, history)}
        >
          Register
        </Button>
      </form>
    </div>
  );
};

module.exports = withRouter(Login);
