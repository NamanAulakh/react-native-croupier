import initialState from 'app/redux/store/initialState';
import { SET_CARDS_TO_DISTRIBUTE, ADD_CARDS_TO_DISTRIBUTE, TOGGLE_ALLOW_ALL } from './types';

export default function reducer(state = initialState.cardsToDistribute, action) {
  switch (action.type) {
    case SET_CARDS_TO_DISTRIBUTE: {
      console.log(action.payload, '.............reducer: SET.............');
      return Object.assign({}, state, {
        data: action.payload,
      });
    }

    case ADD_CARDS_TO_DISTRIBUTE: {
      console.log(action.payload, '.............reducer: ADD.............');
      return Object.assign({}, state, {
        data: state.data.concat(action.payload),
      });
    }

    case TOGGLE_ALLOW_ALL:
      return Object.assign({}, state, {
        allowAll: action.payload,
      });

    default:
      return state;
  }
}
