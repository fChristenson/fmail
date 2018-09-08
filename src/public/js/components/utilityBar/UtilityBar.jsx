const React = require("react");
const IconButton = require("@material-ui/core/IconButton").default;
const ChevronRight = require("@material-ui/icons/ChevronRight").default;
const ChevronLeft = require("@material-ui/icons/ChevronLeft").default;

class UtilityBar extends React.Component {
  constructor(props) {
    super(props);

    this.onPrevious = this.onPrevious.bind(this);
    this.onNext = this.onNext.bind(this);
  }

  onPrevious() {
    this.props.onPrevious(this.props.rangeStart, this.props.pathname);
  }

  onNext() {
    this.props.onNext(
      this.props.rangeStart,
      this.props.totalEmails,
      this.props.pathname
    );
  }

  render() {
    return (
      <div className="utility-bar">
        <div className="utility-bar__pagination">
          <div className="utility-bar__pagination-numbers">
            <strong>{this.props.rangeStart} - {this.props.rangeEnd}</strong>
            <span> of </span>
            <strong>{this.props.totalEmails}</strong>
          </div>
          <IconButton onClick={this.onPrevious}>
            <ChevronLeft />
          </IconButton>
          <IconButton onClick={this.onNext}>
            <ChevronRight />
          </IconButton>
        </div>
      </div>
    );
  }
}

module.exports = UtilityBar;
