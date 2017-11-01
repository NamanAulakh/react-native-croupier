import React, { PropTypes, Component } from 'react'
import { Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as rootStyles from './styles/root'
import Upper from './stateless_components/Upper'
import Lower from './stateless_components/Lower'
import { find, isUndefined, differenceBy } from 'lodash'

// let temp = []

class Root extends Component {
  static propTypes = {}

  constructor(props, context) {
    super(props, context)

    this.state = {
      suits: ['X', 'spades', 'hearts', 'diamonds', 'clubs'],
      cards: ['X'],
      deck: [], // ultimate source of truth of our app
      numberOfCardsToDistribute: '4',
      market: {},
      playerCards: [],
      cardsToDistribute: [],
      turnCount: 0,
      allowAll: false
    }

    this.generateCardsInitially = this.generateCardsInitially.bind(this)
    this.calculatePoints = this.calculatePoints.bind(this)
    this.generateName = this.generateName.bind(this)
    this.generateRandomCards = this.generateRandomCards.bind(this)
    this.setMarket = this.setMarket.bind(this)
    this.pickCardsToDistribute = this.pickCardsToDistribute.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.initializeState = this.initializeState.bind(this)
    this.yo = this.yo.bind(this)
    this.setPlayersArray = this.setPlayersArray.bind(this)
    this.createMarket = this.createMarket.bind(this)
    this.matchCondition = this.matchCondition.bind(this)
    this.onSelectCard = this.onSelectCard.bind(this)
  }

  componentWillMount() {
    // before mounting
    this.generateCardsInitially()
  }

  generateCardsInitially() {
    const { suits, cards } = this.state

    const { actions } = this.props

    for (let i = 1; i <= 4; i++) {
      for (let j = 1; j <= 13; j++) {
        cards.push({
          id: 13 * (i - 1) + j,
          suit: suits[i],
          value: j,
          name: `${this.generateName(j)}_of_${suits[i]}`,
          location: null, // deck, P1, P2, TP1, TP2, market
          isClosed: false,
          points: this.calculatePoints(suits[i], j),
          isSelected: false,
          isDealt: false
        })
      }
    }

    this.setState({
      cards,
      deck: this.state.deck.concat(cards)
    })
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
  matchCondition(
    playerCardID = 7,
    bidValue = 12,
    market = {
      5: { cards: [5], isPakka: false, isSelected: false },
      6: { cards: [6], isPakka: false, isSelected: false },
      12: { cards: [12], isPakka: false, isSelected: false },
      9: { cards: [9], isPakka: true, isSelected: false }
    },
    selectedMarketValues = [5],
    player = [7, 3, 5, 12]
  ) {
    console.log('aergaererg', this.state.turnCount, bidValue)
    let matchedConditions = []
    let sumOfSMV = 0 //Y
    let cardsOfSMV = []
    let buildValue
    let playerCard = this.fetchPlayerCard(playerCardID)
    let playerCardValue = playerCard.value //X
    if (selectedMarketValues.length) {
      sumOfSMV = this.caluculateSumOfSMV(selectedMarketValues)
      cardsOfSMV = this.fetchCardsOfSMV(selectedMarketValues, market) // market will be fetched from state later
    }
    buildValue = playerCardValue + sumOfSMV //Z

    console.log('buildValue -->', buildValue)
    console.log('playerCard -->', playerCard)
    console.log('selectedMarketValues -->', selectedMarketValues)
    console.log('sumOfSMV -->', sumOfSMV)
    console.log('cardsOfSMV -->', cardsOfSMV)

    /*
			Condition for leave, first turn
		*/
    if (
      this.state.turnCount === 0 &&
      bidValue === playerCardValue &&
      (market && !market.playerCardValue)
    ) {
      console.log(
        'leave condition matched',
        this.state.turnCount,
        bidValue,
        playerCardValue
      )
      matchedConditions.push('leave')
    }

    /*
			Condition for leave, other than first turn
		*/
    if (this.state.turnCount !== 0 && (market && !market.playerCardValue)) {
      matchedConditions.push('leave')
    }

    /*
			Condition for build
		*/
    if (
      buildValue <= 13 &&
      buildValue >= 9 &&
      player.indexOf(buildValue) > -1 &&
      (market &&
        ((market[buildValue] && !market[buildValue].isPakka) ||
          !market[buildValue]))
    ) {
      console.log('here 1')
      if (this.checkForPakkaGharInSVM(cardsOfSMV)) {
        console.log('here 2')
        matchedConditions.push('build')
      } else {
        console.log(
          'MADARCHOD JISME APNI GAND MARAANE KI KOSHISH KAR RHA HAI TU, VO EK PAKKA GHAR HAI'
        )
      }
    } else {
      console.log(
        'BHOSDK YE ADD KA CASE, NEECHE DEKH TERI AMMA 12 KA GHAR BNA K GYI HAI LAVDE'
      )
    }

    matchedConditions.map(action => {
      switch (action) {
        case 'leave':
          console.log('action available --->', 'leave')
          break
        case 'take':
          console.log('action available --->', 'take')
          break
        case 'build':
          console.log('action available --->', 'build')
          break
        case 'up':
          console.log('action available --->', 'up')
          break
        case 'add':
          console.log('action available --->', 'add')
          break

        default:
          // code...
          break
      }
    })
  }

  caluculateSumOfSMV(selectedMarketValues) {
    let sumOfSMV = 0
    selectedMarketValues.map(value => {
      sumOfSMV += value
    })
    return sumOfSMV
  }

  fetchCardsOfSMV(selectedMarketValues, market) {
    let cardsOfSMV = []
    cardsOfSMV = selectedMarketValues.map(value => market[value])
    return cardsOfSMV
  }

  checkForPakkaGharInSVM(cardsOfSMV) {
    let pakkaGharExists = cardsOfSMV
      .filter(card => card.isPakka)
      .map(pakkaGhar => pakkaGhar.isPakka)
    console.log('pakkaGharExists in SMV -->', pakkaGharExists)
    if (pakkaGharExists.length) return false
    else return true
  }

  fetchPlayerCard(playerCardID) {
    return this.state.deck[playerCardID]
  }

  calculatePoints(suit, value) {
    if (suit !== 'spades' && value === 1) return 1

    if (suit === 'diamonds' && value === 10) return 2

    if (suit === 'spades') return value

    return 0
  }

  generateName(value) {
    if (value === 1) return 'ace'

    if (value === 11) return 'jack'

    if (value === 12) return 'queen'

    if (value === 13) return 'king'

    return `${value}`
  }

  generateRandomCards(numberOfCardsToDistribute, gaddi) {
    return new Promise((resolve, reject) => {
      if (numberOfCardsToDistribute === 0)
        return resolve(this.state.cardsToDistribute)

      // if (numberOfCardsToDistribute !== 0) {
      // console.log(gaddi.length)

      const index = Math.ceil(Math.random() * (gaddi.length - 1))
      // console.log(numberOfCardsToDistribute, index)

      // temp = temp.concat([this.state.cards[index]])

      this.setState(
        {
          cardsToDistribute: this.state.cardsToDistribute.concat([gaddi[index]])
          // cards: gaddi.filter((item, i) => i !== index)
        },
        () => {
          // console.log('return.........')

          return resolve(
            this.generateRandomCards(
              numberOfCardsToDistribute - 1,
              gaddi.filter((item, i) => i !== index)
            )
          )

          // return resolve(Promise.all([
          //   this.generateRandomCards(
          //     numberOfCardsToDistribute - 1,
          //     gaddi.filter((item, i) => i !== index)
          //   )
          // ]))
        }
      )

      // return Promise.all([
      //   this.generateRandomCards(
      //     numberOfCardsToDistribute - 1,
      //     gaddi.filter((item, i) => i !== index)
      //   )
      // ])

      // return resolve(
      //   this.generateRandomCards(
      //     numberOfCardsToDistribute - 1,
      //     gaddi.filter((item, i) => i !== index)
      //   )
      // )
      // } else {
      //   // console.log(this.state.cardsToDistribute, 'else')
      //   console.log(temp, 'else')
      //
      // if (
      //   isUndefined(
      //     find(this.state.cardsToDistribute, item => item.value >= 9)
      //   )
      // )
      // return this.initializeState(
      //   this.generateRandomCards,
      //   parseInt(this.state.numberOfCardsToDistribute)
      // )
      //
      //   console.log('resolving')
      //
      //   return resolve(temp)
      // }
    })
  }

  handleInputChange(numberOfCardsToDistribute) {
    this.setState({
      numberOfCardsToDistribute
    })
  }

  pickCardsToDistribute() {
    const { numberOfCardsToDistribute, cardsToDistribute, cards } = this.state

    // console.log(numberOfCardsToDistribute, cards.length)
    //
    // if (numberOfCardsToDistribute > cards.length - 1)
    //   return alert(`Fuck Off..${cards.length - 1} cards left to distribute`)

    // this.initializeState(this.yo, 4)

    return new Promise((resolve, reject) => {
      Promise.all([
        this.generateRandomCards(
          parseInt(numberOfCardsToDistribute),
          this.state.cards
        )
      ])
        .then(cardsToDistribute => {
          // console.log(cardsToDistribute, this.state.allowAll, 'here')
          if (
            !isUndefined(
              find(this.state.cardsToDistribute, item => item.value >= 9)
            )
          )
            return resolve(cardsToDistribute[0])

          // console.log('condition not satisfied')

          if (!this.state.allowAll)
            return this.setState(
              {
                cardsToDistribute: []
              },
              () => {
                // console.log(this.state.cards, 'casjhvasjhdhsd')
                return resolve(this.pickCardsToDistribute())
              }
            )

          return resolve(cardsToDistribute[0])
        })
        .catch(er => console.log(er, 'err........'))
    })

    // console.log(cardsToDistribute, 'pickCardsToDistribute')

    // this.setState({
    //   playerCards: this.state.playerCards.concat([])
    // })
  }

  setPlayersArray() {
    const { numberOfCardsToDistribute, cards } = this.state

    // console.log(numberOfCardsToDistribute, cards.length)

    if (numberOfCardsToDistribute > cards.length - 1)
      return alert(`Fuck Off..${cards.length - 1} cards left to distribute`)

    Promise.all([this.pickCardsToDistribute()])
      .then(cardsToDistribute => {
        // console.log(cardsToDistribute[0], 'setPlayersArray')

        // console.log(
        //   differenceBy(this.state.cards, cardsToDistribute[0], 'id'),
        //   'diff...'
        // )

        this.setState({
          cards: differenceBy(this.state.cards, cardsToDistribute[0], 'id'),
          playerCards: this.state.playerCards.concat(cardsToDistribute[0]),
          cardsToDistribute: [],
          allowAll: true
        })
      })
      .catch(err => console.log(err, 'setPlayersArray'))
  }

  setMarket() {
    const { numberOfCardsToDistribute, cards } = this.state

    console.log(numberOfCardsToDistribute, cards.length)

    if (numberOfCardsToDistribute > cards.length - 1)
      return alert(`Fuck Off..${cards.length - 1} cards left to distribute`)

    Promise.all([this.pickCardsToDistribute()])
      .then(cardsToDistribute => {
        // console.log(cardsToDistribute[0], 'setMarket')

        // console.log(
        //   differenceBy(this.state.cards, cardsToDistribute[0], 'id'),
        //   'diff...'
        // )

        this.setState({
          cards: differenceBy(this.state.cards, cardsToDistribute[0], 'id'),
          market: this.createMarket(cardsToDistribute[0]),
          cardsToDistribute: [],
          allowAll: true
        })
      })
      .catch(err => console.log(err, 'setMarket'))
  }

  createMarket(values) {
    let { market } = this.state

    // console.log(Object.assign({}, market), values, values.length, '&&&&&&&&&&&&&&&&&&&&')

    for (let i = 0; i < values.length; i++) {
      // if (market[])

      const key = [values[i].value]
      const id = values[i].id

      // console.log(id, 'as,jhd sfgdsjdhfg ads')

      // console.log(market[key], 'uiouiuyiuuigjjh...................')

      if (!isUndefined(market[key]))
        market = Object.assign({}, market, {
          [key]: Object.assign({}, market[key], {
            cards: market[key].cards.concat([id])
          })
        })
      else {
        market = Object.assign({}, market, {
          [values[i].value]: {
            cards: [id],
            isGhar: false,
            isPakka: false,
            isSelected: false
          }
        })
      }
    }

    // console.log(market, '***********************')

    return market
  }

  yo(val) {
    // console.log(val, 'yo')
  }

  initializeState(cb, other) {
    this.setState(
      {
        cardsToDistribute: []
      },
      () => {
        // console.log(this.state.cards, 'casjhvasjhdhsd')
        return cb(other, this.state.cards)
      }
    )
  }

  onSelectCard(card) {
    console.log(card, 'onSelectCard')
  }

  render() {
    // this.matchCondition()

    const { root } = rootStyles.styles

    const {
      cards,
      deck,
      numberOfCardsToDistribute,
      cardsToDistribute,
      playerCards,
      market
    } = this.state

    // console.log(cardsToDistribute)

    // console.log(this.state.cards, 'cards', this.state.deck, 'deck')
    // console.log(cards, 'cards', playerCards, 'players', market, 'market')

    return (
      <View style={root}>
        <Upper market={market} deck={deck} />

        <View style={{ backgroundColor: 'yellow' }}>
          <Button onPress={this.setPlayersArray} title="Player" color="black" />
        </View>

        <View style={{ backgroundColor: 'green' }}>
          <Button onPress={this.setMarket} color="black" title="Market" />
        </View>

        <Lower
          numberOfCardsToDistribute={numberOfCardsToDistribute}
          handleInputChange={this.handleInputChange}
          setPlayersArray={this.setPlayersArray}
          setMarket={this.setMarket}
          onSelectCard={this.onSelectCard}
          playerCards={playerCards}
        />
      </View>
    )
  }
}

const mapStateToProps = () => {
  return {}
}

// const mapDispatchToProps = dispatch => {
//   const actions = Object.assign({}, cardsActions)

//   return {
//     actions: bindActionCreators(actions, dispatch)
//   }
// }

export default connect(mapStateToProps)(Root)
