import { combineReducers } from 'redux';

import market from './market';

const appReducer = combineReducers({
  market,
});

const rootReducer = (state, action) => appReducer(state, action);

export default rootReducer;
