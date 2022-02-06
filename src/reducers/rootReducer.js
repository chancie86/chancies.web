import { combineReducers } from 'redux';

import headerReducer from './headerReducer';
import documentReducer from './documentReducer';
import statusReducer from './statusReducer';

const rootReducer = combineReducers({
  header: headerReducer,
  document: documentReducer,
  status: statusReducer,
});

export default rootReducer;
