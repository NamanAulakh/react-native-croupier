import { combineReducers } from 'redux';

import kings from './kings';
import cards from './cards';

const appReducer = combineReducers({
  kings,
  cards
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
