import * as actionTypes from "./statusActionTypes";

export const showInfoStatus = (message) => {
  return showStatus(message, "info");
};

export const showErrorStatus = (message) => {
  return showStatus(message, "error");
};

export const showSuccessStatus = (message) => {
  return showStatus(message, "success");
};

export const showWarningStatus = (message) => {
  return showStatus(message, "warning");
};

const showStatus = (message, severity) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SNACKBAR_OPEN,
      payload: {
        message,
        severity
      }
    });
  };
};

export const hideStatus = (dispatch, getState) => {
    dispatch({ type: actionTypes.SNACKBAR_CLOSE });
};
