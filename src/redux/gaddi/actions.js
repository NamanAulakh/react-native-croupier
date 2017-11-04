import { SET_DECK, SET_CARDS } from './types';

export const setDeck = payload => (dispatch, getState) => {
	console.log('getState','payload', getState(), payload);
	return dispatch({ type: SET_DECK, payload })
};

export const setCards = payload => ({ type: SET_CARDS, payload });
