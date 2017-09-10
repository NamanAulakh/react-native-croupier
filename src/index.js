import React, { PropTypes, Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as cardsActions from './redux/actions/cards'
import * as rootStyles from './styles/root'
import Upper from './stateless_components/Upper'
import Lower from './stateless_components/Lower'

class Root extends Component {
  static propTypes = {}

  constructor(props, context) {
    super(props, context)

    this.state = {
      suits: ['spades', 'hearts', 'diamonds', 'clubs'],
      cards: ['X'],
      deck: [], // ultimate source of truth of our app
      numberOfCardsToDistribute: '4',
      turnCount: 0
    }

    this.generateCardsInitially = this.generateCardsInitially.bind(this)
    this.calculatePoints = this.calculatePoints.bind(this)
    this.generateName = this.generateName.bind(this)
    this.distributeCards = this.distributeCards.bind(this);
    this.matchCondition = this.matchCondition.bind(this);
  }

  componentWillMount() { // before mounting
    this.generateCardsInitially()
  }

 	generateCardsInitially() {
	    const { suits, cards } = this.state

	    const { actions } = this.props

	    for (var i = 1; i <= suits.length; i++) {
	      for (let j = 1; j <= 13; j++) {
	        cards.push({
	          id: 13 * (i - 1) + j,
	          suit: suits[i],
	          value: j,
	          name: this.generateName(j),
	          location: null, // deck, P1, P2, TP1, TP2, market
	          isClosed: false,
	          points: this.calculatePoints(suits[i], j),
	          isSelected: false,
	          isDealt: false
	        })
	      }
	    }

	    this.setState(
	      {
	        cards,
	        deck: this.state.deck.concat(cards)
	      },
	      () => actions.generateAllCards(this.state.cards)
	    )
 }

 	/**
 	 * [matchCondition funtion to check conditions and match it with particular action]
 	 * @param  {Number} playerCardID         [id of the player's card-> set to 12 for testing leave action, set to 7 for tesing build action]
 	 * @param  {Number} bidValue             [value bided at start of the game]
 	 * @param  {Object} market               [market object (as assosciative object) contains obj of houses/cards present in the market]
 	 * @param  {Array}  selectedMarketValues [array of houses/cards selected by the player]
 	 * @param  {Array}  player               [araay of cards available to the player]
 	 * @return {[type]}                      [description]
 	 */
 	matchCondition(playerCardID = 7, bidValue = 12, market = {5: {cards: [5], isPakka: false}, 6: {cards: [6], isPakka: false}, 12: {cards: [12], isPakka: false}, 9: {cards: [9], isPakka: true}}, selectedMarketValues = [5], player = [7,3,5,12] ){
		console.log('aergaererg', this.state.turnCount, bidValue);
		let matchedConditions = [];
		let sumOfSMV = 0; //Y
		let cardsOfSMV = [];
		let buildValue;
		let playerCard = this.fetchPlayerCard(playerCardID);
		let playerCardValue = playerCard.value; //X
		if(selectedMarketValues.length){
			sumOfSMV = this.caluculateSumOfSMV(selectedMarketValues);
			cardsOfSMV = this.fetchCardsOfSMV(selectedMarketValues, market);// market will be fetched from state later
		}
		buildValue = playerCardValue + sumOfSMV; //Z


		console.log('buildValue -->', buildValue);
		console.log('playerCard -->', playerCard);
		console.log('selectedMarketValues -->', selectedMarketValues);
		console.log('sumOfSMV -->', sumOfSMV);
		console.log('cardsOfSMV -->', cardsOfSMV);

		/*
			Condition for leave, first turn
		*/
		if(this.state.turnCount === 0 && bidValue === playerCardValue && (market && !market.playerCardValue)){
			console.log('leave condition matched',this.state.turnCount,bidValue, playerCardValue);
			matchedConditions.push('leave');
		}

		/*
			Condition for leave, other than first turn
		*/
		if(this.state.turnCount !==0 && (market && !market.playerCardValue)){
			matchedConditions.push('leave');
		}

		/*
			Condition for build
		*/
		if(buildValue<=13 && buildValue>=9 && player.indexOf(buildValue)>-1 && (market && ( (market[buildValue] && !market[buildValue].isPakka) || (!market[buildValue])) )){
			console.log('here 1');
			if (this.checkForPakkaGharInSVM(cardsOfSMV)){
				console.log('here 2');
				matchedConditions.push('build');
			}else{
				console.log('MADARCHOD JISME APNI GAND MARAANE KI KOSHISH KAR RHA HAI TU, VO EK PAKKA GHAR HAI');
			}
		}else{
			console.log('BHOSDK YE ADD KA CASE, NEECHE DEKH TERI AMMA 12 KA GHAR BNA K GYI HAI LAVDE');
		}

		matchedConditions.map((action)=>{
			switch (action) {
				case 'leave':
				    console.log('action available --->', 'leave');
				    break;
				case 'take':
				    console.log('action available --->', 'take');
				    break;
				case 'build':
				    console.log('action available --->', 'build');
				    break;
				case 'up':
				    console.log('action available --->', 'up');
				    break;
				case 'add':
				    console.log('action available --->', 'add');
				    break;

				default:
				    // code...
				    break;
			}
		});
	}

	caluculateSumOfSMV(selectedMarketValues){
		let sumOfSMV = 0;
		selectedMarketValues.map((value)=>{
				sumOfSMV += value;
			});
		return sumOfSMV;
	}

	fetchCardsOfSMV(selectedMarketValues, market){
		let cardsOfSMV = [];
		cardsOfSMV = selectedMarketValues.map((value)=>market[value]);
		return cardsOfSMV;
	}

	checkForPakkaGharInSVM(cardsOfSMV){
		let pakkaGharExists = cardsOfSMV.filter((card)=> card.isPakka).map((pakkaGhar)=> pakkaGhar.isPakka);
		console.log('pakkaGharExists in SMV -->', pakkaGharExists);
		if(pakkaGharExists.length)
			return false;
		else
			return true;
	}

	fetchPlayerCard(playerCardID){
		return this.state.deck[playerCardID];
	}

  calculatePoints(suit, value) {
    if (suit !== 'spades' && value === 1) return 1

    if (suit === 'diamonds' && value === 10) return 2

    if (suit === 'spades') return value

    return 0
  }

  generateName(value) {
    if (value === 1) return 'A'

    if (value === 11) return 'J'

    if (value === 12) return 'Q'

    if (value === 13) return 'K'

    return `${value}`
  }

  distributeCards(numberOfCardsToDistribute) {
    if (numberOfCardsToDistribute !== 0) {
      console.log(this.state.cards.length);

      const index = Math.ceil((Math.random()) * (this.state.cards.length - 1));
      console.log(numberOfCardsToDistribute, index);

      this.setState(
      {
        cardsToDistribute: this.state.cardsToDistribute.concat([
          this.state.cards[index]
        ]),
        cards: this.state.cards.filter((item, i) => i !== index)
      }, () => this.distributeCards(numberOfCardsToDistribute - 1)
      );
    }
  }

  handleInputChange(numberOfCardsToDistribute) {
    this.setState({
      numberOfCardsToDistribute
    })
  }

  render() {
  	this.matchCondition();
    const { root } = rootStyles.styles

    const {
      cards, deck, numberOfCardsToDistribute
    } = this.state

    console.log(this.state.cards, 'cards', this.state.deck, 'deck')

    return (
      <View style={root}>
        <Lower diff/>

        <Upper />

        <Lower numberOfCardsToDistribute={numberOfCardsToDistribute} handleInputChange={this.handleInputChange}/>
      </View>
    )
  }
}

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = dispatch => {
  const actions = Object.assign({}, cardsActions)

  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Root)
