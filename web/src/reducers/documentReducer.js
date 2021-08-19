import * as actionTypes from "../actions/documentActionTypes";

const initialState = {
  imageReferences: [],
  isLoading: false
};

const getImageReferencesByPath = (payload) => {
  const result = {};

  payload.forEach(x => {
    result[x.path] = x.url
  });

  return result;
};

export default function documentReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_IMAGEREFERENCES_REQUEST:
    case actionTypes.FETCH_DOCUMENT_REQUEST:
      return {
        ...initialState,
        isLoading: true
      };
    case actionTypes.FETCH_DOCUMENT_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        isLoading: false
      };
    }
    case actionTypes.SAVE_DOCUMENT_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        isLoading: false
      };
    }
    case actionTypes.FETCH_IMAGEREFERENCES_SUCCESS: {
      return {
        ...state,
        imageReferences: getImageReferencesByPath(action.payload)
      }
    }
    default:
      return state;
  }
}
