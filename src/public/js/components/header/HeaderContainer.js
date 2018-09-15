const { connect } = require("react-redux");
const Header = require("./Header");
const { QueryWasMade } = require("../inbox/inboxActions");
const { ShowAlert } = require("../alert/alertActions");
const Paths = require("../../config/paths");

const mapStateToProps = state => {
  return {
    email: state.login.user.email
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: async history => {
      try {
        const response = await fetch(Paths.api.logout, {
          headers: {
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          const json = await response.json();
          throw new Error(json.error);
        } else {
          history.push(Paths.login);
        }
      } catch (error) {
        const title = "Logout failed";
        const message = error.message;
        dispatch(ShowAlert(title, message));
      }
    },
    onSubmit: () => {
      dispatch(QueryWasMade(true));
    }
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Header);
