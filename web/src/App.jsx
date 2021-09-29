import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import { hideStatus } from './actions/statusActions';
import CookieConsent from './Components/CookieConsent';

const getStatus = (state) => {
  return state.status;
};

export default function App({ children, history }) {
  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(hideStatus);
  };

  const status = useSelector((state) => getStatus(state));

  return (
    <div>
      {children}
      <CookieConsent history={history} />
      <Snackbar open={status.isOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={status.severity} variant="filled">
          {status.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
