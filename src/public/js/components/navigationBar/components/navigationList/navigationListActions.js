const { SET_LOCATION, SET_EMAIL_OVERVIEW } = require("./navigationListEvents");

function SetLocation(pathname) {
  return {
    type: SET_LOCATION,
    value: pathname
  };
}

module.exports.SetLocation = SetLocation;

function SetEmailOverview(overview) {
  return {
    type: SET_EMAIL_OVERVIEW,
    value: overview
  };
}

module.exports.SetEmailOverview = SetEmailOverview;
