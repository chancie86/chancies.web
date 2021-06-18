import * as actionTypes from "../actions/headerActionTypes";

const initialState = {
  sections: {
    byId: {},
    ids: []
  },
  documents: {
    byId: {},
    bySectionId: {},
    ids: []
  }
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
        ...state,
        sections: {
          byId,
          ids
        }
      };
    }
    case actionTypes.LIST_DOCUMENTS_SUCCESS: {
      const ids = [];
      const byId = {};
      const bySectionId = {};

      action.payload.forEach(x => {
        ids.push(x.id);
        byId[x.id] = x;

        if (bySectionId[x.sectionId]?.length) {
          bySectionId[x.sectionId].push(x);
        } else {
          bySectionId[x.sectionId] = [x];
        }
      });

      return {
        ...state,
        documents: {
          byId,
          ids,
          bySectionId
        }
      };
    }
    default:
      return state;
  }
}
