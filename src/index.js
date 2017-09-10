import React, { PropTypes, Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as cardsActions from './redux/actions/cards'
import * as rootStyles from './styles/root'
import Upper from './stateless_components/Upper'
import Lower from './stateless_components/Lower'
import { find, isUndefined, differenceBy } from 'lodash'

let temp = []

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
      cardsToDistribute: []
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
          name: this.generateName(j),
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

  matchCondition() {}

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
    const { numberOfCardsToDistribute, cardsToDistribute } = this.state

    // this.initializeState(this.yo, 4)

    return new Promise((resolve, reject) => {
      Promise.all([
        this.generateRandomCards(
          parseInt(numberOfCardsToDistribute),
          this.state.cards
        )
      ])
        .then(cardsToDistribute => {
          // console.log(cardsToDistribute, 'here')
          if (
            !isUndefined(
              find(this.state.cardsToDistribute, item => item.value >= 9)
            )
          )
            return resolve(cardsToDistribute[0])

          // console.log('condition not satisfied')

          return this.setState(
            {
              cardsToDistribute: []
            },
            () => {
              // console.log(this.state.cards, 'casjhvasjhdhsd')
              return resolve(this.pickCardsToDistribute())
            }
          )

          // return resolve(cardsToDistribute)
        })
        .catch(er => console.log(er, 'err........'))
    })

    // console.log(cardsToDistribute, 'pickCardsToDistribute')

    // this.setState({
    //   playerCards: this.state.playerCards.concat([])
    // })
  }

  setPlayersArray() {
    const { cardsToDistribute } = this.state

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
          cardsToDistribute: []
        })
      })
      .catch(err => console.log(err, 'setPlayersArray'))
  }

  setMarket() {
    const { numberOfCardsToDistribute } = this.state

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
          cardsToDistribute: []
        })
      })
      .catch(err => console.log(err, 'setPlayersArray'))
  }

  createMarket(values) {
    let { market } = this.state

    // console.log(Object.assign({}, market), values, values.length, '&&&&&&&&&&&&&&&&&&&&')

    for (let i = 0; i < values.length; i++) {
      // if (market[])

      const key = [values[i].value]
      const id = [values[i].id]

      // console.log(market[key], 'uiouiuyiuuigjjh...................')

      if (!isUndefined(market[key]))
        market = Object.assign({}, market, {
          [key]: Object.assign({}, market[key], { cards: market[key].cards.concat([id]) })
        })
      else {
        market = Object.assign({}, market, {
          [values[i].value]: { cards: [id], isGhar: false, isPakka: false, isSelected: false }
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

  render() {
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
    console.log(this.state.cards, 'cards', playerCards, 'players', market, 'market')

    return (
      <View style={root}>
        <Lower diff />

        <Upper />

        <Lower
          numberOfCardsToDistribute={numberOfCardsToDistribute}
          handleInputChange={this.handleInputChange}
          setPlayersArray={this.setPlayersArray}
          setMarket={this.setMarket}
        />
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
