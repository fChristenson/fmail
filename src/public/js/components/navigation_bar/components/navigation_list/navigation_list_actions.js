const { SET_LOCATION } = require("./navigation_list_events");

function SetLocation(pathname) {
  return {
    type: SET_LOCATION,
    value: pathname
  };
}

module.exports.SetLocation = SetLocation;
