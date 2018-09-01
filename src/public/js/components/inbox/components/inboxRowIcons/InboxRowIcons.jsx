const React = require("react");
const Paths = require("../../../../config/paths");
const SetEmailToImportantRequest = require("./SetEmailToImportantRequest");
const IconButton = require("@material-ui/core/IconButton").default;
const StarIcon = require("@material-ui/icons/Star").default;
const StarBorderIcon = require("@material-ui/icons/StarBorder").default;

class InboxRowIcons extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = { isImportant: props.isImportant };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isImportant: nextProps.isImportant });
  }

  async onClick() {
    const isImportant = !this.state.isImportant;
    this.setState({ isImportant });
    const request = SetEmailToImportantRequest(isImportant);
    const path = Paths.api.setEmailToImportant(this.props.emailId);
    try {
      await fetch(path, request);
    } catch (error) {
      this.props.onError(error);
    }
  }

  render() {
    return (
      <div>
        <IconButton onClick={this.onClick}>
          {this.state.isImportant
            ? <StarIcon className="inbox__star" />
            : <StarBorderIcon />}
        </IconButton>
      </div>
    );
  }
}

module.exports = InboxRowIcons;
