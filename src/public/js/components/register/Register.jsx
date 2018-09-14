const React = require("react");
const withRouter = require("react-router-dom/withRouter").default;
const TextField = require("@material-ui/core/TextField").default;
const Button = require("@material-ui/core/Button").default;

const Register = ({ onSubmit, history }) => {
  return (
    <div className="register">
      <h1 className="register__h1">Register for fmail</h1>
      <form
        className="register__form"
        onSubmit={event => onSubmit(event, history)}
      >
        <TextField type="email" required name="email" label="Email" />
        <TextField type="password" required name="password" label="Password" />
        <TextField
          type="password"
          required
          name="confirmation"
          label="Confirm password"
        />
        <Button variant="contained" color="primary" type="submit">
          Register
        </Button>
      </form>
    </div>
  );
};

module.exports = withRouter(Register);
