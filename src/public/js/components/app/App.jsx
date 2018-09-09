const React = require("react");
const Header = require("../header/HeaderContainer");
const NavigationBar = require("../navigationBar/NavigationBarContainer");
const Router = require("react-router-dom/BrowserRouter").default;
const Route = require("react-router-dom/Route").default;
const Inbox = require("../inbox/InboxContainer");
const Alert = require("../alert/AlertContainer");
const Email = require("../email/EmailContainer");
const UtilityBar = require("../utilityBar/UtilityBarContainer");
const Paths = require("../../config/paths");

const App = ({ alertTitle, showAlert, alertText }) => {
  return (
    <Router>
      <div>
        <Header />
        <UtilityBar />
        <div className="content">
          <NavigationBar />
          <Route exact path={Paths.root} component={Inbox} />
          <Route path={Paths.emailTemplate} component={Email} />
          <Route path={Paths.inbox} component={Inbox} />
          <Route path={Paths.important} component={Inbox} />
          <Route path={Paths.searchTemplate} component={Inbox} />
          <Route path={Paths.sentMail} component={Inbox} />
          <Route path={Paths.drafts} component={Inbox} />
          <Route path={Paths.spam} component={Inbox} />
        </div>
        <Alert title={alertTitle} open={showAlert} text={alertText} />
      </div>
    </Router>
  );
};

module.exports = App;
