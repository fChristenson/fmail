const { connect } = require("react-redux");
const { CloseAlert } = require("./alertActions");
const Alert = require("./Alert");

const mapStateToProps = state => {
  return {
    open: state.alert.open,
    title: state.alert.title,
    text: state.alert.text
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onClose: () => {
      return dispatch(CloseAlert());
    }
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Alert);
