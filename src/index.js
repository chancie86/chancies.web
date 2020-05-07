import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.8.0";

// pages for this product
import LandingPage from "./Views/LandingPage";
import Printing from "./Views/3dPrinting";

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/" component={LandingPage} exact />
      <Route path="/3dPrinting" component={Printing} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
