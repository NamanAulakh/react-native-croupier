import initialState from 'app/redux/store/initialState';
import { SET_PLAYER_CARDS } from './types';

export default function reducer(state = initialState.player, action) {
  switch (action.type) {
    case SET_PLAYER_CARDS:
      return Object.assign({}, state, {
        data: state.data.concat(action.payload),
      });

    default:
      return state;
  }
}
