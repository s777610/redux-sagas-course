import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import reducers from "./reducers/index";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/index";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const sagaMiddleware = createSagaMiddleware();

// Being a Redux Middleware, Saga can intercept Actions,
// and inject its own functionality.
const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
