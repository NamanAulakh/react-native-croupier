import { SET_DECK, SET_CARDS, INCREMENT_TURN_COUNT } from './types';

export const setDeck = payload => dispatch => dispatch({ type: SET_DECK, payload });

export const setCards = payload => ({ type: SET_CARDS, payload });

export const incrementTurnCount = () => ({ type: INCREMENT_TURN_COUNT });
