const React = require("react");
const Button = require("@material-ui/core/Button").default;
const NavigationList = require("./components/navigationList/NavigationListContainer");
const ComposeEmail = require("./components/composeEmail/ComposeEmailContainer");

const NavigationBar = ({ onCompose }) => {
  return (
    <aside className="navigation-bar">
      <Button
        data-test="navigation-bar__compose"
        className="navigation-bar__compose-button"
        variant="contained"
        color="secondary"
        onClick={onCompose}
      >
        Compose
      </Button>
      <NavigationList />
      <ComposeEmail />
    </aside>
  );
};

module.exports = NavigationBar;
