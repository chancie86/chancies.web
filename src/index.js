import React from "react";
import ReactDOM from "react-dom";
import ReactGA from 'react-ga';
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.8.0";

// pages for this product
import LandingPage from "./Views/LandingPage";
import Printing from "./Views/3dPrinting";

var hist = createBrowserHistory();

// Google analytics
const trackingId = "UA-165958574-1";
ReactGA.initialize(trackingId);             // Initialize google analytics page view tracking
hist.listen(location => {
  ReactGA.set({ page: location.pathname }); // Update the user's current page
  ReactGA.pageview(location.pathname);      // Record a pageview for the given page
});

ReactDOM.render(
  <div>
    <Router history={hist}>
      <Switch>
        <Route path="/" component={LandingPage} exact />
        <Route path="/3dPrinting" component={Printing} />
      </Switch>
    </Router>
  </div>,
  document.getElementById("root")
);
