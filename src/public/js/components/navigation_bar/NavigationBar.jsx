const React = require("react");
const Button = require("@material-ui/core/Button").default;
const NavigationList = require("./navigation_list/NavigationListContainer");
const Paths = require("../../config/paths");
const ComposeEmail = require("./compose_email/ComposeEmail");
const SendEmailRequest = require("./compose_email/SendEmailRequest");

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { composeEmailOpen: false };
    this.onCompose = this.onCompose.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onSend = this.onSend.bind(this);
  }

  onCancel() {
    this.setState({ composeEmailOpen: false });
  }

  async onSend(event) {
    event.preventDefault();
    const recipients = event.target.recipients.value;
    const subject = event.target.subject.value;
    const message = event.target.message.value;
    const request = SendEmailRequest(recipients, subject, message);
    try {
      const response = await fetch(Paths.api.sendEmail, request);
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.error);
      } else {
        this.setState({ composeEmailOpen: false });
        this.props.onEmailSent(this.props.pathname);
      }
    } catch (error) {
      this.setState({ composeEmailOpen: false });
      this.props.onError(error.message);
    }
  }

  onCompose() {
    this.setState({ composeEmailOpen: true });
  }

  render() {
    return (
      <aside className="navigation-bar">
        <Button
          className="navigation-bar__compose-button"
          variant="contained"
          color="secondary"
          onClick={this.onCompose}
        >
          Compose
        </Button>
        <NavigationList />
        <ComposeEmail
          open={this.state.composeEmailOpen}
          onCancel={this.onCancel}
          onSend={this.onSend}
        />
      </aside>
    );
  }
}

module.exports = NavigationBar;
