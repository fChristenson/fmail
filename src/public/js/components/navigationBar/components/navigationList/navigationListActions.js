const { SET_LOCATION } = require("./navigationListEvents");

function SetLocation(pathname) {
  return {
    type: SET_LOCATION,
    value: pathname
  };
}

module.exports.SetLocation = SetLocation;
