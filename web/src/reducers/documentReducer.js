import * as actionTypes from "../actions/documentActionTypes";

const initialState = {
  isLoading: false
};

export default function sectionReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_DOCUMENT_REQUEST:
      return {
        isLoading: true
      };
    case actionTypes.FETCH_DOCUMENT_SUCCESS: {
      return {
        ...action.payload,
        isLoading: false
      };
    }
    case actionTypes.SAVE_DOCUMENT_SUCCESS: {
      return {
        ...action.payload,
        isLoading: false
      };
    }
    default:
      return state;
  }
}
