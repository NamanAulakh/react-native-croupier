import {
  GENERATE_ALL_CARDS,
} from '../../constants';

export const generateAllCards = cards => ({
  type: GENERATE_ALL_CARDS,
  cards,
});
