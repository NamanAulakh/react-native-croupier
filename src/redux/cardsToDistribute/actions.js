import { SET_CARDS_TO_DISTRIBUTE, ADD_CARDS_TO_DISTRIBUTE, TOGGLE_ALLOW_ALL } from './types';

export const setCardsToDistribute = payload => dispatch =>
  dispatch({
    type: SET_CARDS_TO_DISTRIBUTE,
    payload,
  });

// export const addCardsToDistribute = payload => ({ type: ADD_CARDS_TO_DISTRIBUTE, payload });

export const addCardsToDistribute = payload => dispatch =>
  dispatch({ type: ADD_CARDS_TO_DISTRIBUTE, payload });

export const toggleAllowAll = payload => ({ type: TOGGLE_ALLOW_ALL, payload });
