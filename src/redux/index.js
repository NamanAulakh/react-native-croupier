import { combineReducers } from 'redux';
import market from './market';
import gaddi from './gaddi';
import player from './player';
import cardsToDistribute from './cardsToDistribute';

const reducers = combineReducers({ market, gaddi, player, cardsToDistribute });

const rootReducer = (state, action) => reducers(state, action);

export default rootReducer;
