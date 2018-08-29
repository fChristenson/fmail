const React = require("react");
const ReactDom = require("react-dom");
const { createStore } = require("redux");
const { Provider } = require("react-redux");
const reducers = require("./reducers");
const App = require("./components/app/AppContainer");

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
