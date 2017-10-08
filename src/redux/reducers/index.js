import { combineReducers } from 'redux';
import defaultReducer from './defaultReducer';

const appReducer = combineReducers({ defaultReducer });

const rootReducer = (state, action) => appReducer(state, action);

export default rootReducer;
