import * as api from "../api";
import * as actionTypes from "./sectionActionTypes";

export const listSections = () => {
  return async (dispatch, getState) => {
    const response = await api.listSections();
    dispatch({ type: actionTypes.LIST_SECTIONS_SUCCESS, payload: response });
  };
};
