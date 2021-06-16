import * as actionTypes from "../actions/sectionActionTypes";

const initialState = {
  byId: {},
  ids: []
};

export default function sectionReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LIST_SECTIONS_SUCCESS: {
      const ids = [];
      const byId = {};

      action.payload.forEach(x => {
        ids.push(x.id);
        byId[x.id] = x;
      });

      return {
        byId,
        ids
      };
    }
    default:
      return state;
  }
}
