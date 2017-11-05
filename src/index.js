import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { differenceBy } from 'lodash';
import * as gaddiActions from 'app/redux/gaddi/actions';
import * as marketActions from 'app/redux/market/actions';
import * as playerActions from 'app/redux/player/actions';
import * as cardsToDistributeActions from 'app/redux/cardsToDistribute/actions';
import { generateCardsInitially, createMarket } from 'app/util';
import { dealCards } from 'app/util/dealCards';
import Upper from './components/Market';
import Lower from './components/Player';

class Root extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      suits: ['X', 'spades', 'hearts', 'diamonds', 'clubs'],
      numberOfCardsToDistribute: '4',
    };

    this.distributeCards = this.distributeCards.bind(this);
  }

  componentWillMount() {
    const { suits } = this.state;

    const { actions, cards } = this.props;

    actions.setDeck(generateCardsInitially({ suits, cards }));
  }

  distributeCards(key) {
    const { actions, cards, market, turnCount } = this.props;
    const { numberOfCardsToDistribute } = this.state;

    const dealtCards = dealCards({
      key,
      numberOfCardsToDistribute,
      cards,
      turnCount,
    });

    key === 'market'
      ? actions.setMarket(createMarket({ values: dealtCards, market }))
      : key === 'playerCards' ? actions.setPlayerCards(dealtCards) : console.log('Gaand mara'); // eslint-disable-line

    actions.setCards(differenceBy(cards, dealtCards, 'id'));
    actions.incrementTurnCount();
  }

  render() {
    const { numberOfCardsToDistribute } = this.state;

    const { deck, market, playerCards } = this.props;

    return (
      <View style={{ flex: 1, backgroundColor: 'red' }}>
        <Upper market={market} deck={deck} />

        <View style={{ backgroundColor: 'yellow' }}>
          <Button
            onPress={() => this.distributeCards('playerCards')}
            title="Player"
            color="black"
          />
        </View>

        <View style={{ backgroundColor: 'green' }}>
          <Button onPress={() => this.distributeCards('market')} color="black" title="Market" />
        </View>

        <Lower numberOfCardsToDistribute={numberOfCardsToDistribute} playerCards={playerCards} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  deck: state.gaddi.deck,
  cards: state.gaddi.cards,
  market: state.market.data,
  playerCards: state.player.data,
  turnCount: state.gaddi.turnCount,
});

const mapDispatchToProps = (dispatch) => {
  const actions = Object.assign(
    {},
    gaddiActions,
    marketActions,
    playerActions,
    cardsToDistributeActions
  );

  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
