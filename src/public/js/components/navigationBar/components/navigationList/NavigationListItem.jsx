const React = require("react");
const Link = require("react-router-dom/Link").default;

const NavigationListItem = ({ label, path, isSelected, number }) => {
  const defaultClassName = "navigation-bar__li";
  const className1 = isSelected
    ? "navigation-bar__li--selected"
    : defaultClassName;

  const className2 = className1 === defaultClassName && number
    ? "navigation-bar__li--number"
    : "";

  return (
    <li className={`${className1} ${className2}`}>
      <Link className="link" to={path}>
        {number ? `${label} (${number})` : label}
      </Link>
    </li>
  );
};

module.exports = NavigationListItem;
