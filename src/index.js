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
      cards: ['X']
    }

    this.generateCardsInitially = this.generateCardsInitially.bind(this)
    this.calculatePoints = this.calculatePoints.bind(this)
    this.generateName = this.generateName.bind(this)
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
        cards
      },
      () => actions.generateAllCards(this.state.cards)
    )
  }

  matchCondition(){

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

  render() {
    const { root } = rootStyles.styles

    // console.log(this.state.cards)

    return (
      <View style={root}>
        <Lower diff/>

        <Upper />

        <Lower />
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
