import {
  SET_DROP_ZONE,
} from '../../constants';

export const setDropZoneValues = dropZoneValues => ({
  type: SET_DROP_ZONE,
  dropZoneValues,
});
