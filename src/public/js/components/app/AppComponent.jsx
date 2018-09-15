const React = require("react");
const Paths = require("../../config/paths");
const Header = require("../header/HeaderContainer");
const NavigationBar = require("../navigationBar/NavigationBarContainer");
const Route = require("react-router-dom/Route").default;
const Inbox = require("../inbox/InboxContainer");
const Email = require("../email/EmailContainer");
const UtilityBar = require("../utilityBar/UtilityBarContainer");

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  async componentDidMount() {
    const options = {
      headers: { "Content-Type": "application/json" }
    };
    const response = await fetch(Paths.api.isLoggedIn, options);

    if (!response.ok && response.status === 401) {
      this.props.history.push(Paths.login);
    } else {
      const json = await response.json();
      this.props.onShow(json);
      this.setState({ show: true });
    }
  }

  render() {
    if (this.state.show) {
      return (
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
        </div>
      );
    } else {
      return null; //TODO: add a loading screen?
    }
  }
}

module.exports = AppComponent;
