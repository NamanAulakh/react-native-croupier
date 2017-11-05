import initialState from 'app/redux/store/initialState';
import { TOGGLE_ALLOW_ALL } from './types';

export default function reducer(state = initialState.cardsToDistribute, action) {
  switch (action.type) {
    case TOGGLE_ALLOW_ALL:
      return Object.assign({}, state, {
        allowAll: action.payload,
      });

    default:
      return state;
  }
}
