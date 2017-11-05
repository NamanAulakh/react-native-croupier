import { isUndefined } from 'lodash';

function calculatePoints(suit, value) {
  if (suit !== 'spades' && value === 1) return 1;

  if (suit === 'diamonds' && value === 10) return 2;

  if (suit === 'spades') return value;

  return 0;
}

function generateName(value) {
  if (value === 1) return 'ace';

  if (value === 11) return 'jack';

  if (value === 12) return 'queen';

  if (value === 13) return 'king';

  return `${value}`;
}

export const generateCardsInitially = (payload) => {
  const { suits, cards } = payload;

  for (let i = 1; i <= 4; i++) {
    for (let j = 1; j <= 13; j++) {
      cards.push({
        id: 13 * (i - 1) + j,
        suit: suits[i],
        value: j,
        name: `${generateName(j)}_of_${suits[i]}`,
        location: null, // deck, P1, P2, TP1, TP2, market
        isClosed: false,
        points: calculatePoints(suits[i], j),
        isSelected: false,
        isDealt: false,
      });
    }
  }

  return cards;
};

// todo: refactor later
export function createMarket(payload) {
  let { market } = payload;
  const { values } = payload;

  values.map((item) => {
    const key = [item.value];
    const id = item.id;

    if (!isUndefined(market[key])) {
      market = Object.assign({}, market, {
        [key]: Object.assign({}, market[key], {
          cards: market[key].cards.concat([id]),
        }),
      });
    } else {
      market = Object.assign({}, market, {
        [item.value]: {
          cards: [id],
          isGhar: false,
          isPakka: false,
          isSelected: false,
        },
      });
    }

    return [];
  });

  return market;
}
