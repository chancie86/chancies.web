import * as actionTypes from "../actions/documentActionTypes";

const initialState = {};

export default function sectionReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_DOCUMENT_SUCCESS: {
      return action.payload;
    }
    default:
      return state;
  }
}
