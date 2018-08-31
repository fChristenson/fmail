const Paths = require("../../../../config/paths");

function isSelected(pathname, path) {
  const isRootPath = path === Paths.inbox && pathname === Paths.root;
  return path === pathname || isRootPath;
}

module.exports = isSelected;
