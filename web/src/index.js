import React from "react";
import ReactDOM from "react-dom";

import history from "./history";
import { Router, Route, Switch } from "react-router-dom";

import App from './App';
import "assets/scss/material-kit-react.scss?v=1.8.0";

// pages for this product
import LandingPage from "./Views/LandingPage";
import Printing from "./Views/3dPrinting";

ReactDOM.render(
  <App history={history}>
    <Router history={history}>
      <Switch>
        <Route path="/" component={LandingPage} exact />
        <Route path="/3dPrinting" component={Printing} />
      </Switch>
    </Router>
  </App>,
  document.getElementById("root")
);
