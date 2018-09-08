const React = require("react");
const Table = require("@material-ui/core/Table").default;
const TableBody = require("@material-ui/core/TableBody").default;
const InboxRow = require("./components/inboxRow/InboxRowContainer");

class Inbox extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchEmails(window.location.pathname);
  }

  render() {
    return (
      <Table>
        <TableBody>
          {this.props.emails.map(email => (
            <InboxRow key={email.id} email={email} />
          ))}
        </TableBody>
      </Table>
    );
  }
}

module.exports = Inbox;
