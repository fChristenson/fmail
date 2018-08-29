const React = require("react");
const Header = require("../header/Header");
const NavigationBar = require("../navigation_bar/NavigationBarContainer");
const Router = require("react-router-dom/BrowserRouter").default;
const Route = require("react-router-dom/Route").default;
const Inbox = require("../inbox/InboxContainer");
const Alert = require("../alert/AlertContainer");
const Email = require("../email/Email");
const Paths = require("../../config/paths");

const App = ({ alertTitle, showAlert, alertText }) => {
  return (
    <Router>
      <div>
        <Header />
        <div className="content">
          <NavigationBar />
          <Route
            exact
            path={Paths.root}
            render={() => <Inbox path={Paths.api.inboxEmails} />}
          />
          <Route path={Paths.emailTemplate} component={Email} />
          <Route
            path={Paths.inbox}
            render={() => <Inbox path={Paths.api.inboxEmails} />}
          />
          <Route
            path={Paths.important}
            render={() => <Inbox path={Paths.api.importantEmails} />}
          />
          <Route
            path={Paths.sentMail}
            render={() => <Inbox path={Paths.api.sentMailEmails} />}
          />
          <Route
            path={Paths.drafts}
            render={() => <Inbox path={Paths.api.draftsEmails} />}
          />
          <Route
            path={Paths.spam}
            render={() => <Inbox path={Paths.api.spamEmails} />}
          />
        </div>
        <Alert title={alertTitle} open={showAlert} text={alertText} />
      </div>
    </Router>
  );
};

module.exports = App;
