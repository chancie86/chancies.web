import * as api from "../api";
import * as actionTypes from "./documentActionTypes";

export const getDocument = id => {
  return async (dispatch, getState) => {
    const response = await api.getDocument(id);
    dispatch({ type: actionTypes.FETCH_DOCUMENT_SUCCESS, payload: response });
  };
};

export const saveDocument = (id, name, content, sectionId) => {
  return async (dispatch, getState) => {
    const response = await api.saveDocument(id, name, content, sectionId);
    dispatch({ type: actionTypes.SAVE_DOCUMENT_SUCCESS, payload: response });
  };
};
