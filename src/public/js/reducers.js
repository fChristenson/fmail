const alertReducer = require("./components/alert/alert_reducer");
const inboxReducer = require("./components/inbox/inbox_reducer");
const navigationListReducer = require("./components/navigation_bar/navigation_list/navigation_list_reducer");
const { combineReducers } = require("redux");

module.exports = combineReducers({
  alert: alertReducer,
  inbox: inboxReducer,
  navigationList: navigationListReducer
});
