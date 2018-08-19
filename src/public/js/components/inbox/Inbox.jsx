const React = require("react");
const Table = require("@material-ui/core/Table").default;
const TableBody = require("@material-ui/core/TableBody").default;
const InboxRow = require("./InboxRow");
const InboxEmail = require("./InboxEmail");
const timestampSort = require("./timestampSort");

class Inbox extends React.Component {
  constructor() {
    super();
    this.state = { emails: [] };
  }

  async componentWillMount() {
    const response = await fetch("/emails");
    const json = await response.json();
    const sortedEmails = json.sort(timestampSort);
    const emails = sortedEmails.map(incomingEmail => InboxEmail(incomingEmail));
    this.setState({ emails });
  }

  render() {
    return (
      <Table>
        <TableBody>
          {this.state.emails.map(email => (
            <InboxRow key={email.id} email={email} />
          ))}
        </TableBody>
      </Table>
    );
  }
}

module.exports = Inbox;
