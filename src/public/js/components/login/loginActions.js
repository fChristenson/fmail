const { SET_USER } = require("./loginEvents");

function SetUser(user) {
  return {
    type: SET_USER,
    value: user
  };
}

module.exports.SetUser = SetUser;
