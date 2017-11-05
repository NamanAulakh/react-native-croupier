import { find, isUndefined } from 'lodash';

let cardsToDistribute = [];

function generateRandomCards(numberOfCardsToDistribute, gaddi, local_cardsToDistribute) {
  if (numberOfCardsToDistribute === 0) return local_cardsToDistribute;

  const index = Math.ceil(Math.random() * (gaddi.length - 1));

  cardsToDistribute = cardsToDistribute.concat([gaddi[index]]);

  return generateRandomCards(
    numberOfCardsToDistribute - 1,
    gaddi.filter((item, i) => i !== index),
    cardsToDistribute
  );
}

function pickCardsToDistribute(payload) {
  const {
    numberOfCardsToDistribute,
    cards,
    cardsToDistribute: local_cardsToDistribute,
    turnCount,
    key,
  } = payload;

  const randomCards = generateRandomCards(
    parseInt(numberOfCardsToDistribute, 10),
    cards,
    local_cardsToDistribute
  );

  if (
    key === 'playerCards' &&
    turnCount === 0 &&
    isUndefined(find(cardsToDistribute, item => item.value >= 9))
  ) {
    cardsToDistribute = [];

    return pickCardsToDistribute({
      numberOfCardsToDistribute,
      cards,
      cardsToDistribute,
      turnCount,
    });
  }

  return randomCards;
}

export function dealCards(payload) {
  cardsToDistribute = [];

  const { numberOfCardsToDistribute, cards, turnCount, key } = payload;

  if (numberOfCardsToDistribute > cards.length - 1) {
    alert(`Fuck Off..${cards.length - 1} cards left to distribute`); // eslint-disable-line
    return [];
  }

  return pickCardsToDistribute({
    key,
    numberOfCardsToDistribute,
    cards,
    cardsToDistribute,
    turnCount,
  });
}
