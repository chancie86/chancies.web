import * as api from "../api";
import * as actionTypes from "./sectionActionTypes";

export const saveSection = (id, name) => {
  return async (dispatch, getState) => {
    dispatch({ type: actionTypes.EDIT_SECTION_REQUEST });
    await api.saveSection(id, name);
    dispatch({ type: actionTypes.EDIT_SECTION_SUCCESS });
    return Promise.resolve()
  };
};
