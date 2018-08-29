const { connect } = require("react-redux");
const App = require("./App");

const mapStateToProps = state => {
  return {
    showAlert: state.alert.open,
    alertTitle: state.alert.title,
    alertText: state.alert.text
  };
};

const mapDispatchToProps = () => {
  return {};
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(App);
