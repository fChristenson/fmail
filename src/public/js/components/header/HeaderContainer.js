const { connect } = require("react-redux");
const Header = require("./Header");
const { QueryWasMade } = require("../inbox/inboxActions");

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: () => {
      dispatch(QueryWasMade(true));
    }
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Header);
