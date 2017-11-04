/* eslint-disable */
import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { find, isUndefined, differenceBy } from 'lodash';
import * as gaddiActions from 'app/redux/gaddi/actions';
import * as marketActions from 'app/redux/market/actions';
import * as playerActions from 'app/redux/player/actions';
import * as cardsToDistributeActions from 'app/redux/cardsToDistribute/actions';
import { generateCardsInitially, fuckOff, createMarket } from 'app/util';
import Upper from './components/Upper';
import Lower from './components/Lower';

class Root extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      suits: ['X', 'spades', 'hearts', 'diamonds', 'clubs'],
      cards: ['X'],
      numberOfCardsToDistribute: '4',
      market: {}, // --> global
      // playerCards: [], // --> global
      cardsToDistribute: [],
      turnCount: 0, // --> global
      allowAll: false,
    };

    this.setPlayersArray = this.setPlayersArray.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.initializeState = this.initializeState.bind(this);
    this.onSelectCard = this.onSelectCard.bind(this);
    this.mathur = this.mathur.bind(this);
  }

  async componentWillMount() {
    const { suits } = this.state;

    const { actions, cards } = this.props;

    actions.setDeck(generateCardsInitially({ suits, cards }));

    // console.log(res, '******************');

    // console.log(res1, '******************');
  }

  fetchPlayerCard(playerCardID) {
    const { deck } = this.props;

    return deck[playerCardID];
  }

  handleInputChange(numberOfCardsToDistribute) {
    this.setState({
      numberOfCardsToDistribute,
    });
  }

  setPlayersArray() {
    const { numberOfCardsToDistribute } = this.state;

    const { cards, actions } = this.props;

    if (numberOfCardsToDistribute > cards.length - 1) {
      return alert(`Fuck Off..${cards.length - 1} cards left to distribute`);
    }

    Promise.all([this.pickCardsToDistribute()])
      .then(cardsToDistribute => {
        this.setState(
          {
            playerCards: this.state.playerCards.concat(cardsToDistribute[0]),
            cardsToDistribute: [],
            allowAll: true,
          },
          () => actions.setCards(differenceBy(cards, cardsToDistribute[0], 'id'))
        );
      })
      .catch(err => console.log(err, 'setPlayersArray'));
  }

  setMarket() {
    const { numberOfCardsToDistribute } = this.state;

    const { cards, actions } = this.props;

    if (numberOfCardsToDistribute > cards.length - 1) {
      return alert(`Fuck Off..${cards.length - 1} cards left to distribute`);
    }

    Promise.all([this.pickCardsToDistribute()])
      .then(cardsToDistribute => {
        this.setState(
          {
            market: this.createMarket(cardsToDistribute[0]),
            cardsToDistribute: [],
            allowAll: true,
          },
          () => actions.setCards(differenceBy(cards, cardsToDistribute[0], 'id'))
        );
      })
      .catch(err => console.log(err, 'setMarket'));
  }

  mathur(key) {
    const { actions, cardsToDistribute, cards, allowAll, market } = this.props;
    const { numberOfCardsToDistribute } = this.state;
    const { setCardsToDistribute, addCardsToDistribute } = actions;

    fuckOff({
      key,
      numberOfCardsToDistribute,
      cards,
      cardsToDistribute,
      setCardsToDistribute,
      addCardsToDistribute,
      allowAll,
    })
      .then(cardsToDistribute => {
        console.log('WHAT`s this -->', key);
        key === 'market'
          ? actions.setMarket(createMarket({ values: cardsToDistribute[0], market }))
          : key === 'playerCards'
            ? actions.setPlayerCards(cardsToDistribute[0])
            : console.log('Gaand mara');

        actions.setCards(differenceBy(cards, cardsToDistribute[0], 'id'));
        actions.setCardsToDistribute([]);
        actions.toggleAllowAll(true);
      })
      .catch(err => console.log(err, 'setMarket'));
  }

  // createMarket(values) {
  //   let { market } = this.state;
  //
  //   for (let i = 0; i < values.length; i++) {
  //     const key = [values[i].value];
  //     const id = values[i].id;
  //
  //     if (!isUndefined(market[key])) {
  //       market = Object.assign({}, market, {
  //         [key]: Object.assign({}, market[key], {
  //           cards: market[key].cards.concat([id]),
  //         }),
  //       });
  //     } else {
  //       market = Object.assign({}, market, {
  //         [values[i].value]: {
  //           cards: [id],
  //           isGhar: false,
  //           isPakka: false,
  //           isSelected: false,
  //         },
  //       });
  //     }
  //   }
  //
  //   return market;
  // }

  initializeState(cb, other) {
    const { cards } = this.props;

    this.setState(
      {
        cardsToDistribute: [],
      },
      () => cb(other, cards)
    );
  }

  onSelectCard(card) {
    console.log(card, 'onSelectCard');
  }

  render() {
    const { numberOfCardsToDistribute, cardsToDistribute } = this.state;

    const { deck, cards, market, playerCards } = this.props;

    return (
      <View style={{ flex: 1, backgroundColor: 'red' }}>
        <Upper market={market} deck={deck} />

        <View style={{ backgroundColor: 'yellow' }}>
          <Button onPress={()=> this.mathur('playerCards')} title="Player" color="black" />
        </View>

        <View style={{ backgroundColor: 'green' }}>
          <Button onPress={() => this.mathur('market')} color="black" title="Market" />
        </View>

        <Lower
          numberOfCardsToDistribute={numberOfCardsToDistribute}
          handleInputChange={this.handleInputChange}
          onSelectCard={this.onSelectCard}
          playerCards={playerCards}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    deck: state.gaddi.deck,
    cards: state.gaddi.cards,
    market: state.market.data,
    playerCards: state.player.data,
    cardsToDistribute: state.cardsToDistribute.data,
    allowAll: state.cardsToDistribute.allowAll,
  };
};

const mapDispatchToProps = dispatch => {
  const actions = Object.assign({}, gaddiActions, marketActions, playerActions, cardsToDistributeActions);

  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
