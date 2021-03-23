import React from "react";
import ReactDOM from "react-dom";
import App from "./app/layout/App";
import "semantic-ui-css/semantic.min.css";
import { createBrowserHistory } from "history";
import "react-widgets/dist/css/react-widgets.css";
import dateFnsLocalizer from "react-widgets-date-fns";
import { Router } from "react-router-dom";
import "mobx-react-lite/batchingForReactDom";
import "react-toastify/dist/ReactToastify.css";

dateFnsLocalizer();

export const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById("root")
);
