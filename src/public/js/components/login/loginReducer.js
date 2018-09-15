const { SET_USER } = require("./loginEvents");

const initState = {
  user: {}
};

const loginReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_USER:
      return Object.assign({}, state, { user: action.value });

    default:
      return state;
  }
};

module.exports = loginReducer;
