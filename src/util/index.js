/* eslint-disable */
import { find, isUndefined, differenceBy } from 'lodash';
import store  from 'app/redux/store';
export const generateCardsInitially = payload => {
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

function generateName(value) {
  if (value === 1) return 'ace';

  if (value === 11) return 'jack';

  if (value === 12) return 'queen';

  if (value === 13) return 'king';

  return `${value}`;
}

function calculatePoints(suit, value) {
  if (suit !== 'spades' && value === 1) return 1;

  if (suit === 'diamonds' && value === 10) return 2;

  if (suit === 'spades') return value;

  return 0;
}

export function fuckOff(payload) {
  return new Promise(function(resolve, reject) {
    const {
      key,
      numberOfCardsToDistribute,
      cards,
      cardsToDistribute,
      setCardsToDistribute,
      addCardsToDistribute,
      allowAll,
    } = payload;

    if (numberOfCardsToDistribute > cards.length - 1) {
      return alert(`Fuck Off..${cards.length - 1} cards left to distribute`);
    }

    Promise.all([
      pickCardsToDistribute({
        numberOfCardsToDistribute,
        cards,
        cardsToDistribute,
        setCardsToDistribute,
        addCardsToDistribute,
        allowAll,
      }),
    ])
      .then(cardsToDistribute => resolve(cardsToDistribute))
      .catch(err => console.log(err, `${key}`));
  });
}

function pickCardsToDistribute(payload) {
  const {
    numberOfCardsToDistribute,
    cards,
    cardsToDistribute: ctd,
    setCardsToDistribute,
    addCardsToDistribute,
    allowAll,
  } = payload;

  return new Promise((resolve, reject) => {
    Promise.all([
      generateRandomCards(parseInt(numberOfCardsToDistribute), cards, ctd, addCardsToDistribute),
    ])
      .then(async cardsToDistribute => {
				//Need updated valiue of cardsToDistribute array, run find on that
				res1 = store.getState().cardsToDistribute.data;
        if (!isUndefined(find(res1, item => item.value >= 9))) {
					console.log('AAYA IDHER!!!!!', res1);
					//Priomise.all returns an array with single instance so resolving with zeroth index
					return resolve(cardsToDistribute[0]);
        }

				//To differentiate between first deal of player cards and later deals
        if (!allowAll) {
					console.log('BAAD KA CASE!!!!!')
          setCardsToDistribute([]);
					const res = store.getState().cardsToDistribute.data;
          console.log(res, 'setCardsToDistribute');

          // const { payload } = res;

          return resolve(
            pickCardsToDistribute({
              numberOfCardsToDistribute,
              cards,
              res,
              setCardsToDistribute,
              addCardsToDistribute,
              allowAll,
            })
          );
        }
				console.log('IDHER BHI AAYAA', cardsToDistribute[0]);
        return resolve(cardsToDistribute[0]);
      })
      .catch(er => console.log(er, 'err........'));
  });
}

function generateRandomCards(
  numberOfCardsToDistribute,
  gaddi,
  cardsToDistribute,
  addCardsToDistribute
) {
  return new Promise(async (resolve, reject) => {
    if (numberOfCardsToDistribute === 0) return resolve(cardsToDistribute);

    const index = Math.ceil(Math.random() * (gaddi.length - 1));

    addCardsToDistribute([gaddi[index]]);
		res = store.getState().cardsToDistribute.data;

    console.log(res, 'addCardsToDistribute');

    return resolve(
      generateRandomCards(
        numberOfCardsToDistribute - 1,
        gaddi.filter((item, i) => i !== index),
        res,
        addCardsToDistribute
      )
    );
  });
}

// todo: refactor later
export function createMarket(payload) {
  let { values, market } = payload;

	console.log(values, '^^^^^^^^^^')

  for (let i = 0; i < values.length; i++) {
    const key = [values[i].value];
    const id = values[i].id;

    if (!isUndefined(market[key])) {
      market = Object.assign({}, market, {
        [key]: Object.assign({}, market[key], {
          cards: market[key].cards.concat([id]),
        }),
      });
    } else {
      market = Object.assign({}, market, {
        [values[i].value]: {
          cards: [id],
          isGhar: false,
          isPakka: false,
          isSelected: false,
        },
      });
    }
  }
	console.log('BAZINGA!!!!', market)

  return market;
}
