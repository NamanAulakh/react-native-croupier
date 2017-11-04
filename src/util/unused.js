// /* eslint-disable */
// /**
//  * [matchCondition funtion to check conditions and match it with particular action]
//  * @param  {Number} playerCardID         [id of the player's card-> set to 12 for testing leave action, set to 7 for tesing build action]
//  * @param  {Number} bidValue             [value bided at start of the game]
//  * @param  {Object} market               [market object (as assosciative object) contains obj of houses/cards present in the market]
//  * @param  {Array}  selectedMarketValues [array of houses/cards selected by the player]
//  * @param  {Array}  player               [araay of cards available to the player]
//  * @return {[type]}                      [description]
//  */
// matchCondition(
// 	playerCardID = 7,
// 	bidValue = 12,
// 	market = {
// 		5: { cards: [5], isPakka: false, isSelected: false },
// 		6: { cards: [6], isPakka: false, isSelected: false },
// 		12: { cards: [12], isPakka: false, isSelected: false },
// 		9: { cards: [9], isPakka: true, isSelected: false },
// 	},
// 	selectedMarketValues = [5],
// 	player = [7, 3, 5, 12]
// ) {
// 	console.log('aergaererg', this.state.turnCount, bidValue);
// 	const matchedConditions = [];
// 	let sumOfSMV = 0; // Y
// 	let cardsOfSMV = [];
// 	let buildValue;
// 	const playerCard = this.fetchPlayerCard(playerCardID);
// 	const playerCardValue = playerCard.value; // X
// 	if (selectedMarketValues.length) {
// 		sumOfSMV = this.caluculateSumOfSMV(selectedMarketValues);
// 		cardsOfSMV = this.fetchCardsOfSMV(selectedMarketValues, market); // market will be fetched from state later
// 	}
// 	buildValue = playerCardValue + sumOfSMV; // Z
//
// 	console.log('buildValue -->', buildValue);
// 	console.log('playerCard -->', playerCard);
// 	console.log('selectedMarketValues -->', selectedMarketValues);
// 	console.log('sumOfSMV -->', sumOfSMV);
// 	console.log('cardsOfSMV -->', cardsOfSMV);
//
// 	/*
// 		Condition for leave, first turn
// 	*/
// 	if (
// 		this.state.turnCount === 0 &&
// 		bidValue === playerCardValue &&
// 		(market && !market.playerCardValue)
// 	) {
// 		console.log('leave condition matched', this.state.turnCount, bidValue, playerCardValue);
// 		matchedConditions.push('leave');
// 	}
//
// 	/*
// 		Condition for leave, other than first turn
// 	*/
// 	if (this.state.turnCount !== 0 && (market && !market.playerCardValue)) {
// 		matchedConditions.push('leave');
// 	}
//
// 	/*
// 		Condition for build
// 	*/
// 	if (
// 		buildValue <= 13 &&
// 		buildValue >= 9 &&
// 		player.indexOf(buildValue) > -1 &&
// 		(market && ((market[buildValue] && !market[buildValue].isPakka) || !market[buildValue]))
// 	) {
// 		console.log('here 1');
// 		if (this.checkForPakkaGharInSVM(cardsOfSMV)) {
// 			console.log('here 2');
// 			matchedConditions.push('build');
// 		} else {
// 			console.log(
// 				'MADARCHOD JISME APNI GAND MARAANE KI KOSHISH KAR RHA HAI TU, VO EK PAKKA GHAR HAI'
// 			);
// 		}
// 	} else {
// 		console.log('BHOSDK YE ADD KA CASE, NEECHE DEKH TERI AMMA 12 KA GHAR BNA K GYI HAI LAVDE');
// 	}
//
// 	matchedConditions.map(action => {
// 		switch (action) {
// 			case 'leave':
// 				console.log('action available --->', 'leave');
// 				break;
// 			case 'take':
// 				console.log('action available --->', 'take');
// 				break;
// 			case 'build':
// 				console.log('action available --->', 'build');
// 				break;
// 			case 'up':
// 				console.log('action available --->', 'up');
// 				break;
// 			case 'add':
// 				console.log('action available --->', 'add');
// 				break;
//
// 			default:
// 				// code...
// 				break;
// 		}
// 	});
// }
//
// caluculateSumOfSMV(selectedMarketValues) {
// 	let sumOfSMV = 0;
// 	selectedMarketValues.map(value => {
// 		sumOfSMV += value;
// 	});
// 	return sumOfSMV;
// }
//
// fetchCardsOfSMV(selectedMarketValues, market) {
// 	let cardsOfSMV = [];
// 	cardsOfSMV = selectedMarketValues.map(value => market[value]);
// 	return cardsOfSMV;
// }
//
// checkForPakkaGharInSVM(cardsOfSMV) {
// 	const pakkaGharExists = cardsOfSMV
// 		.filter(card => card.isPakka)
// 		.map(pakkaGhar => pakkaGhar.isPakka);
// 	console.log('pakkaGharExists in SMV -->', pakkaGharExists);
// 	if (pakkaGharExists.length) return false;
// 	return true;
// }
