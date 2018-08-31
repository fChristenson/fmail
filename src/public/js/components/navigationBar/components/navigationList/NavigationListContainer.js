const { connect } = require("react-redux");
const NavigationList = require("./NavigationList");

const mapStateToProps = state => {
  return {
    pathname: state.navigationList.pathname
  };
};

const mapDispatchToProps = () => {
  return {};
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(NavigationList);
