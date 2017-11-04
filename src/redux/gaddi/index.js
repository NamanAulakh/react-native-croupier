import initialState from 'app/redux/store/initialState';
import { SET_DECK, SET_CARDS } from './types';

export default function reducer(state = initialState.gaddi, action) {
  switch (action.type) {
    case SET_DECK:
      {
        console.log('state.deck.concat(action.payload)', state.deck.concat(action.payload))
        return Object.assign({}, state, {
        deck: state.deck.concat(action.payload),
        cards: action.payload,
      });
    }

    case SET_CARDS:
      return Object.assign({}, state, { cards: action.payload });

    default:
      return state;
  }
}
