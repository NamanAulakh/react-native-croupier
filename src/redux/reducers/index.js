import { combineReducers } from 'redux';
import defaultReducer from './defaultReducer';
import market from './market';

const appReducer = combineReducers({ defaultReducer, market });

const rootReducer = (state, action) => appReducer(state, action);

export default rootReducer;
