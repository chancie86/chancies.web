import * as api from "../api";
import * as actionTypes from "./headerActionTypes";

export const listSections = () => {
  return async (dispatch, getState) => {
    const response = await api.listSections();
    dispatch({ type: actionTypes.LIST_SECTIONS_SUCCESS, payload: response });
  };
};

export const listDocuments = () => {
  return async (dispatch, getState) => {
    const response = await api.listDocuments();
    dispatch({ type: actionTypes.LIST_DOCUMENTS_SUCCESS, payload: response });
  };
};
