import initialState from './initialState';
import {
  SET_DROP_ZONE,
} from '../../constants';

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_DROP_ZONE:
      return { ...state, dropZoneValues: action.dropZoneValues };
    default:
      return state;
  }
}
