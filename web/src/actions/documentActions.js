import * as api from "../api";
import * as actionTypes from "./documentActionTypes";

export const getDocument = id => {
  return async (dispatch, getState) => {
    const response = await api.getDocument(id);
    dispatch({ type: actionTypes.FETCH_DOCUMENT_SUCCESS, payload: response });
  };
};

export const listDocuments = () => {
  return async (dispatch, getState) => {
    const response = await api.listDocuments();
    dispatch({ type: actionTypes.LIST_DOCUMENTS_SUCCESS, payload: response });
  };
};
