import { combineReducers } from "redux";

import sectionReducer from "./sectionReducer";
import documentReducer from "./documentReducer";

const rootReducer = combineReducers({
  sections: sectionReducer,
  documents: documentReducer
});

export default rootReducer;
