import { combineReducers } from 'redux';

import kings from './kings';
import cards from './cards';
import market from './market';

const appReducer = combineReducers({
  kings,
  cards,
  market,
});

const rootReducer = (state, action) => appReducer(state, action);

export default rootReducer;
