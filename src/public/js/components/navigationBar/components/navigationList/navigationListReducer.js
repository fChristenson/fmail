const { SET_LOCATION, SET_EMAIL_OVERVIEW } = require("./navigationListEvents");

const initState = {
  pathname: window.location.pathname,
  emailOverview: {}
};

const navigationListReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_EMAIL_OVERVIEW:
      return Object.assign({}, state, { emailOverview: action.value });

    case SET_LOCATION:
      return Object.assign({}, state, { pathname: action.value });

    default:
      return state;
  }
};

module.exports = navigationListReducer;
