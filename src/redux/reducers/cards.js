import initialState from './initialState';

import {
  GENERATE_ALL_CARDS
} from '../../constants';

export default function reducer(state = initialState.cards, action) {
  switch(action.type) {

  case GENERATE_ALL_CARDS:
    return Object.assign({}, state, { data: action.cards });

  default:
    return state;
  }
}
