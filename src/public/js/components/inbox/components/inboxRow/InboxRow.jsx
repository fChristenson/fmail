const React = require("react");
const TableRow = require("@material-ui/core/TableRow").default;
const TableCell = require("@material-ui/core/TableCell").default;
const InboxRowIcons = require("../inboxRowIcons/InboxRowIconsContainer");
const InboxRowLink = require("./InboxRowLink");

class InboxRow extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    if (this.props.email.type === "draft") {
      event.preventDefault();
      this.props.onDraftClick(this.props.email);
    }
  }

  render() {
    const className = this.props.email.viewedAt
      ? "inbox__table-row--viewed"
      : "inbox__table-row";

    return (
      <TableRow className={className}>
        <TableCell className="inbox__table-cell">
          <InboxRowIcons
            isImportant={this.props.email.isImportant}
            emailId={this.props.email.id}
          />
        </TableCell>
        <TableCell className="inbox__table-cell--bold">
          <InboxRowLink
            content={this.props.email.subject}
            emailId={this.props.email.id}
            onClick={this.onClick}
          />
        </TableCell>
        <TableCell className="inbox__table-cell">
          <InboxRowLink
            content={this.props.email.body}
            emailId={this.props.email.id}
            onClick={this.onClick}
          />
        </TableCell>
        <TableCell className="inbox__table-cell--bold">
          <InboxRowLink
            content={this.props.email.timestamp}
            emailId={this.props.email.id}
            onClick={this.onClick}
          />
        </TableCell>
      </TableRow>
    );
  }
}

module.exports = InboxRow;
