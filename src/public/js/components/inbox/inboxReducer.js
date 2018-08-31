const { SET_EMAILS } = require("./inboxEvents");

const initState = {
  emails: []
};

const inboxReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_EMAILS:
      return Object.assign({}, state, { emails: action.value });

    default:
      return state;
  }
};

module.exports = inboxReducer;
