import React from "react";
import ReactDOM from "react-dom";

import history from "./history";
import { Router, Route, Switch } from "react-router-dom";

import App from './App';
import "assets/scss/material-kit-react.scss?v=1.8.0";

// pages for this product
import LandingPage from "./Views/LandingPage";
import Printing from "./Views/3dPrinting";
import Sandbox from "./Views/Sandbox";

import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="chancies.eu.auth0.com"
    clientId="7oXkopPIjEbo8LzAfMnI6nHLcuL4mWxX"
    redirectUri={window.location.origin}
  >
    <App history={history}>
      <Router history={history}>
        <Switch>
          <Route path="/" component={LandingPage} exact />
          <Route path="/3dPrinting" component={Printing} />
          <Route path="/Sandbox" component={Sandbox} />
        </Switch>
      </Router>
    </App>
  </Auth0Provider>,
  document.getElementById("root")
);
