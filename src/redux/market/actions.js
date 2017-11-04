import { SET_DROP_ZONE, SET_MARKET } from './types';

export const setDropZoneValues = dropZoneValues => ({ type: SET_DROP_ZONE, dropZoneValues });

export const setMarket = payload => ({ type: SET_MARKET, payload });
