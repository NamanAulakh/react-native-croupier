import {
  SET_DROP_ZONE,
} from '../../constants';

const initialState = {
  dropZoneValues: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_DROP_ZONE:
      return { ...state, dropZoneValues: action.dropZoneValues };
    default:
      return state;
  }
}
