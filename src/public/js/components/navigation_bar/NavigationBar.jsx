const React = require("react");
const Button = require("@material-ui/core/Button").default;
const NavigationList = require("./NavigationList");
const ComposeEmail = require("./compose_email/ComposeEmail");
const SendEmailRequest = require("./compose_email/SendEmailRequest");
const ComposeEmailOutcomeAlert = require("./ComposeEmailOutcomeAlert");

class NavigationBar extends React.Component {
  constructor() {
    super();
    this.state = {
      composeEmailOpen: false,
      errorAlertOpen: false,
      successAlertOpen: false,
      errorMessage: "Something went wrong!"
    };
    this.onCompose = this.onCompose.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onSend = this.onSend.bind(this);
    this.onErrorAlertClose = this.onErrorAlertClose.bind(this);
    this.onSuccessAlertClose = this.onSuccessAlertClose.bind(this);
  }

  onSuccessAlertClose() {
    this.setState({ successAlertOpen: false });
  }

  onErrorAlertClose() {
    this.setState({ errorAlertOpen: false });
  }

  onErrorAlertClose() {
    this.setState({ errorAlertOpen: false });
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
      const response = await fetch("/emails", request);
      if (!response.ok) {
        const json = await response.json();
        throw new Error(json.error);
      }
      this.setState({ composeEmailOpen: false, successAlertOpen: true });
    } catch (error) {
      this.setState({
        composeEmailOpen: false,
        errorAlertOpen: true,
        errorMessage: error.message
      });
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
        <ComposeEmailOutcomeAlert
          errorAlertOpen={this.state.errorAlertOpen}
          errorMessage={this.state.errorMessage}
          onErrorAlertClose={this.onErrorAlertClose}
          successAlertOpen={this.state.successAlertOpen}
          onSuccessAlertClose={this.onSuccessAlertClose}
        />
      </aside>
    );
  }
}

module.exports = NavigationBar;
