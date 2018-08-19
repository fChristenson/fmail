const React = require("react");
const Header = require("../header/Header");
const NavigationBar = require("../navigation_bar/NavigationBar");
const Router = require("react-router-dom/BrowserRouter").default;
const Route = require("react-router-dom/Route").default;
const Inbox = require("../inbox/Inbox");
const Email = require("../email/Email");
const Paths = require("../../config/paths");

module.exports = () => {
  return (
    <Router>
      <div>
        <Header />
        <div className="content">
          <NavigationBar />
          <Route exact path={Paths.root} component={Inbox} />
          <Route path={Paths.emailTemplate} component={Email} />
          <Route path={Paths.inbox} component={Inbox} />
          <Route path={Paths.important} component={Inbox} />
          <Route path={Paths.sentMail} component={Inbox} />
          <Route path={Paths.drafts} component={Inbox} />
          <Route path={Paths.spam} component={Inbox} />
        </div>
      </div>
    </Router>
  );
};
