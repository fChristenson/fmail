const React = require("react");
const Button = require("@material-ui/core/Button").default;
const NavigationList = require("./components/navigationList/NavigationListContainer");
const Paths = require("../../config/paths");
const ComposeEmail = require("./components/composeEmail/ComposeEmail");
const SendEmailRequest = require("./components/composeEmail/SendEmailRequest");
const emailWasStarted = require("./utils/emailWasStarted");

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { composeEmailOpen: false };
    this.onCompose = this.onCompose.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onSend = this.onSend.bind(this);
  }

  async onCancel(form) {
    const recipients = form.recipients.value;
    const subject = form.subject.value;
    const message = form.message.value;
    const request = SendEmailRequest(recipients, subject, message);
    this.setState({ composeEmailOpen: false });

    if (emailWasStarted({ recipients, subject, message })) {
      try {
        const response = await fetch(Paths.api.draftsEmails, request);
        const json = await response.json();
        if (!response.ok) {
          throw new Error(json.error);
        }
        this.props.onDraftSent(this.props.pathname);
      } catch (error) {
        const title = "Draft save failed";
        this.props.onError(title, error.message);
      }
    }
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
      const title = "Email failed";
      this.props.onError(title, error.message);
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
