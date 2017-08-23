import { createStore, compose } from 'redux';
import rootReducer from './reducers';
import devToolsEnhancer from 'remote-redux-devtools';

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}
