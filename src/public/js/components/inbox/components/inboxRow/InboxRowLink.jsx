const React = require("react");
const Link = require("react-router-dom/Link").default;
const Paths = require("../../../../config/paths");

const InboxRowLink = ({ content, emailId, onClick }) => {
  return (
    <Link
      className="link inbox__link"
      onClick={onClick}
      to={Paths.email(emailId)}
    >
      {content}
    </Link>
  );
};

module.exports = InboxRowLink;
