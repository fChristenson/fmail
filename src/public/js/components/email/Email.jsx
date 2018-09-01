const React = require("react");
const Paths = require("../../config/paths");
const EmailView = require("./EmailView");

class Email extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: {} };
  }

  async componentDidMount() {
    try {
      const emailId = this.props.emailId;
      const response = await fetch(Paths.api.email(emailId));
      const email = await response.json();
      const view = EmailView(email);
      this.setState({ email: view });
    } catch (error) {
      this.props.onError(error);
    }
  }

  render() {
    return (
      <div className="email">
        <h1 className="email__subject">{this.state.email.subject}</h1>
        <header className="email__header">
          <div>
            <h2 className="email__from">
              <span className="email__from-label">From:</span>
              {this.state.email.from}
            </h2>
            <h2 className="email__to">
              <span className="email__from-label">To:</span>
              {this.state.email.recipients}
            </h2>
          </div>
          <h2 className="email__timestamp">{this.state.email.timestamp}</h2>
        </header>
        <main
          dangerouslySetInnerHTML={{ __html: this.state.email.body }}
          className="email__content"
        />
      </div>
    );
  }
}

module.exports = Email;
