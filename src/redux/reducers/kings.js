import initialState from './initialState';

import {
  DISTRIBUTE_KING
} from '../../constants';

export default function reducer(state = initialState, action) {
  switch(action.type) {
  case DISTRIBUTE_KING:
    return Object.assign({}, state, { total: 3 });

  default:
    return state;
  }
}
