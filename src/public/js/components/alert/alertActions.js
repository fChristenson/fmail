const { SHOW_ALERT, CLOSE_ALERT } = require("./alertEvents");

function ShowAlert(title, text) {
  return {
    type: SHOW_ALERT,
    value: {
      open: true,
      title,
      text
    }
  };
}

module.exports.ShowAlert = ShowAlert;

function CloseAlert() {
  return {
    type: CLOSE_ALERT
  };
}

module.exports.CloseAlert = CloseAlert;
