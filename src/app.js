import React from "react";
import ReactDOM from "react-dom";

import Wallclock from "./components/wallclock";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    React.createElement(
      Wallclock
    ),
    document.getElementById("container")
  );
});

/*
import {combineReducers, compose, createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
*/

// import App from "./components/app";
// import Index from "./components/index";
// import {Weatherboard} from "./components/weatherboard";

/*
const store = compose(
  applyMiddleware(thunk),
  reduxReactRouter({createHistory})
)(createStore)(combineReducers({
  weather: weatherReducer,
  router: routerStateReducer
}));

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    React.createElement(
      Provider,
      {store: store},
      React.createElement(ReduxRouter, {}, routes)
    ),
    document.getElementById("container")
  );
});
*/
