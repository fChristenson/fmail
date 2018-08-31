const { SET_LOCATION } = require("./navigationListEvents");

const initState = {
  pathname: window.location.pathname
};

const navigationListReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_LOCATION:
      return Object.assign({}, state, { pathname: action.value });

    default:
      return state;
  }
};

module.exports = navigationListReducer;
