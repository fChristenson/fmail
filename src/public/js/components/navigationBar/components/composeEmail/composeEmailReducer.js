const {
  RESET_FORM,
  SET_FORM,
  SHOW,
  SET_FORM_FIELD
} = require("./composeEmailEvents");

const initState = {
  originalForm: {
    recipients: "",
    subject: "",
    message: ""
  },
  form: {
    recipients: "",
    subject: "",
    message: ""
  },
  show: false
};

const composeEmailReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_FORM_FIELD:
      const newField = { [action.value.key]: action.value.value };
      const newForm = Object.assign({}, state.form, newField);
      return Object.assign({}, state, { form: newForm });

    case SHOW:
      return Object.assign({}, state, { show: action.value });

    case SET_FORM:
      return Object.assign({}, state, {
        form: action.value,
        originalForm: action.value
      });

    case RESET_FORM:
      return Object.assign({}, state, {
        form: initState.form,
        originalForm: initState.originalForm
      });

    default:
      return state;
  }
};

module.exports = composeEmailReducer;
