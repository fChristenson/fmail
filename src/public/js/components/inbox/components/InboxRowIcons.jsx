const React = require("react");
const IconButton = require("@material-ui/core/IconButton").default;
const StarIcon = require("@material-ui/icons/Star").default;
const StarBorderIcon = require("@material-ui/icons/StarBorder").default;

class InboxRowIcons extends React.Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    //TODO: set email on server to important
    alert(`Set ${this.props.emailId} to important`);
  }

  render() {
    return (
      <div>
        <IconButton onClick={this.onClick}>
          {this.props.isImportant
            ? <StarIcon className="inbox__star" />
            : <StarBorderIcon />}
        </IconButton>
      </div>
    );
  }
}

module.exports = InboxRowIcons;
