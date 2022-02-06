import * as actionTypes from '../actions/statusActionTypes';

const initialState = {
  isOpen: false,
  message: null,
  severity: 'info',
};

export default function statusReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SNACKBAR_OPEN: {
      return {
        isOpen: true,
        message: action.payload.message,
        severity: action.payload.severity,
      };
    }
    case actionTypes.SNACKBAR_CLOSE: {
      return initialState;
    }
    default:
      return state;
  }
}
