import { combineReducers } from "redux";

import headerReducer from "./headerReducer";
import documentReducer from "./documentReducer";

const rootReducer = combineReducers({
  header: headerReducer,
  document: documentReducer
});

export default rootReducer;
