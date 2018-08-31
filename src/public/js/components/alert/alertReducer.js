const { SHOW_ALERT, CLOSE_ALERT } = require("./alertEvents");

const initState = {
  open: false,
  title: "",
  text: ""
};

const alertReducer = (state = initState, action) => {
  switch (action.type) {
    case CLOSE_ALERT:
      return Object.assign({}, state, { open: false });

    case SHOW_ALERT:
      return Object.assign({}, state, action.value);

    default:
      return state;
  }
};

module.exports = alertReducer;
