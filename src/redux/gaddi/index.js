import initialState from 'app/redux/store/initialState';
import { SET_DECK, SET_CARDS, INCREMENT_TURN_COUNT } from './types';

export default function reducer(state = initialState.gaddi, action) {
  switch (action.type) {
    case SET_DECK: {
      return Object.assign({}, state, {
        deck: state.deck.concat(action.payload),
        cards: action.payload,
      });
    }

    case INCREMENT_TURN_COUNT:
      return Object.assign({}, state, { turnCount: state.turnCount + 1 });

    case SET_CARDS:
      return Object.assign({}, state, { cards: action.payload });

    default:
      return state;
  }
}
