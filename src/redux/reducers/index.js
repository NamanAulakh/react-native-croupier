import { combineReducers } from 'redux';

import kings from './kings';

const appReducer = combineReducers({
  kings
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
