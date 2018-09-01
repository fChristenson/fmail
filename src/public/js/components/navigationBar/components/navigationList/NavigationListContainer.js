const { connect } = require("react-redux");
const NavigationList = require("./NavigationList");

const mapStateToProps = state => {
  return {
    pathname: state.navigationList.pathname,
    emailOverview: state.navigationList.emailOverview
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(NavigationList);
