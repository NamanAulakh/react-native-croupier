import initialState from 'app/redux/store/initialState';
import { SET_DROP_ZONE, SET_MARKET } from './types';

export default function reducer(state = initialState.market, action) {
  switch (action.type) {
    case SET_DROP_ZONE:
      return { ...state, dropZoneValues: action.dropZoneValues };

    case SET_MARKET:
      return Object.assign({}, state, { data: action.payload });

    default:
      return state;
  }
}
