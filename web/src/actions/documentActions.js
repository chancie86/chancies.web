import * as api from "../api";
import * as actionTypes from "./documentActionTypes";

export const getDocument = id => {
  return async (dispatch, getState) => {
    dispatch({ type: actionTypes.FETCH_DOCUMENT_REQUEST });
    const responses = await Promise.all([
      api.getDocument(id),
      api.listImages(id)
    ]);
    
    const documentResponse = responses[0];
    const imageResponses = responses[1];

    dispatch({ type: actionTypes.FETCH_DOCUMENT_SUCCESS, payload: documentResponse });
    dispatch({ type: actionTypes.FETCH_IMAGEREFERENCES_SUCCESS, payload: imageResponses });
    return Promise.resolve();
  };
};

export const saveDocument = (id, name, elements, sectionId) => {
  return async (dispatch, getState) => {
    await api.saveDocument(id, name, elements, sectionId);
    dispatch({ type: actionTypes.SAVE_DOCUMENT_SUCCESS });
    return Promise.resolve()
  };
};
