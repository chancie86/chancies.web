import React from 'react';
import PropTypes from "prop-types";

import CookieConsent from "./Components/CookieConsent";

export default function App({
  children,
  history
}) {
  return <div>
    {children}
    <CookieConsent history={history} />
  </div>;
}

App.propTypes = {
  history: PropTypes.object.isRequired,
}
