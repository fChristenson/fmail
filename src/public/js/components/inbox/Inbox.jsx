const React = require("react");
const Table = require("@material-ui/core/Table").default;
const TableBody = require("@material-ui/core/TableBody").default;
const InboxRow = require("./components/inboxRow/InboxRowContainer");

class Inbox extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextprops) {
    if (!nextprops.queryWasMade) return;

    this.props.onSearch();
    const lastPathname = this.props.pathname;
    const currentPathname = window.location.pathname;
    this.props.fetchEmails(
      lastPathname,
      currentPathname,
      this.props.emailOffset,
      nextprops.q
    );
  }

  componentDidMount() {
    const lastPathname = this.props.pathname;
    const currentPathname = window.location.pathname;
    this.props.fetchEmails(
      lastPathname,
      currentPathname,
      this.props.emailOffset,
      this.props.q
    );
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
