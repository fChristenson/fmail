const {
  RESET_FORM,
  SET_FORM,
  SET_FORM_FIELD,
  SHOW
} = require("./composeEmailEvents");

function SetFormField(key, value) {
  return {
    type: SET_FORM_FIELD,
    value: {
      key,
      value
    }
  };
}

module.exports.SetFormField = SetFormField;

function SetForm(form) {
  return {
    type: SET_FORM,
    value: form
  };
}

module.exports.SetForm = SetForm;

function ResetForm() {
  return {
    type: RESET_FORM
  };
}

module.exports.ResetForm = ResetForm;

function ShowComposeEmail(show) {
  return {
    type: SHOW,
    value: show
  };
}

module.exports.ShowComposeEmail = ShowComposeEmail;
