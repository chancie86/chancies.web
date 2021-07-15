import * as api from "../api";
import * as actionTypes from "./documentActionTypes";

export const getDocument = id => {
  return async (dispatch, getState) => {
    dispatch({ type: actionTypes.FETCH_DOCUMENT_REQUEST, payload: response });
    const response = await api.getDocument(id);
    dispatch({ type: actionTypes.FETCH_DOCUMENT_SUCCESS, payload: response });
    return Promise.resolve()
  };
};

export const saveDocument = (id, name, elements, sectionId) => {
  return async (dispatch, getState) => {
    await api.saveDocument(id, name, elements, sectionId);
    dispatch({ type: actionTypes.SAVE_DOCUMENT_SUCCESS });
    return Promise.resolve()
  };
};
