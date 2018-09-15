const React = require("react");
const Router = require("react-router-dom/BrowserRouter").default;
const Switch = require("react-router-dom/Switch").default;
const Register = require("../register/RegisterContainer");
const Login = require("../login/LoginContainer");
const Paths = require("../../config/paths");
const Route = require("react-router-dom/Route").default;
const Alert = require("../alert/AlertContainer");
const AppComponent = require("./AppComponentContainer");

const App = ({ alertTitle, showAlert, alertText }) => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path={Paths.login} component={Login} />
          <Route path={Paths.register} component={Register} />
          <Route component={AppComponent} />
        </Switch>
        <Alert title={alertTitle} open={showAlert} text={alertText} />
      </div>
    </Router>
  );
};

module.exports = App;
