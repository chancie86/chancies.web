import * as api from "../api";
import * as actionTypes from "./headerActionTypes";

export const listSections = () => {
  return async (dispatch, getState) => {
    const response = await api.listSections();
    dispatch({ type: actionTypes.LIST_SECTIONS_SUCCESS, payload: response });
    return Promise.resolve();
  };
};

export const listDocuments = () => {
  return async (dispatch, getState) => {
    const response = await api.listDocuments();
    dispatch({ type: actionTypes.LIST_DOCUMENTS_SUCCESS, payload: response });
    return Promise.resolve();
  };
};

export const saveSection = (id, name) => {
  return async (dispatch, getState) => {
    dispatch({ type: actionTypes.EDIT_SECTION_REQUEST });
    await api.saveSection(id, name);
    dispatch({
      type: actionTypes.EDIT_SECTION_SUCCESS,
      payload: {
        id,
        name
      }
    });
    return Promise.resolve();
  };
};

export const createDocument = (title, sectionId) => {
  return async (dispatch, getState) => {
    dispatch({ type: actionTypes.CREATE_DOCUMENT_REQUEST });
    await api.createDocument(title, sectionId);
    dispatch({ type: actionTypes.CREATE_DOCUMENT_SUCCESS });
  };
};