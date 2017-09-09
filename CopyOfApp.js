import React from 'react';
import {
  StyleSheet,
  Text,
  View ,
  Button,
  TextInput
} from 'react-native';
import Root from './src';

export default class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      suits: ['spades', 'hearts', 'diamonds', 'clubs'],
      cards: ['X'],
      cardsToDistribute: []
    };

    this.distributeCards = this.distributeCards.bind(this);
    this.generateCardsInitially = this.generateCardsInitially.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.calculatePoints = this.calculatePoints.bind(this);
    this.generateName = this.generateName.bind(this);
  }

  componentWillMount() {
    this.generateCardsInitially();
  }

  generateCardsInitially() {
    const {
      suits,
      cards
    } = this.state;

    for (var i = 0; i < suits.length; i++) {
      for (let j = 1; j <= 13; j++) {
        cards.push({
          suit: suits[i],
          value: j,
          name: this.generateName(j),
          location: null,
          isClosed: false,
          points: this.calculatePoints(suits[i], j),
          isSelected: false
        });
      }
    }

    this.setState({
      cards
    });
  }

  calculatePoints(suit, value) {
    if (suit !== 'spades' && value === 1)
      return 1;

    if (suit === 'diamonds' && value === 10)
      return 2;

    if (suit === 'spades')
      return value;

    return 0;
  }

  generateName(value) {
    if (value === 1)
      return 'A';

    if (value === 11)
      return 'J';

    if (value === 12)
      return 'Q';

    if (value === 13)
      return 'K';

    return value;
  }

  distributeCards(numberOfCardsToDistribute) {
    if (numberOfCardsToDistribute !== 0) {
      console.log(this.state.cards.length);

      const index = Math.ceil((Math.random()) * (this.state.cards.length - 1));
      console.log(numberOfCardsToDistribute, index);

      this.setState({
        cardsToDistribute: this.state.cardsToDistribute.concat([
          this.state.cards[index]
        ]),
        cards: this.state.cards.filter((item, i) => i !== index)
      }, () => this.distributeCards(numberOfCardsToDistribute - 1));
    }
  }

  onChangeText(numberOfCardsToDistribute) {
    this.setState({
      numberOfCardsToDistribute
    });
  }

  render() {
    // const {
    //   container,
    //   textField,
    //   button
    // } = styles;

    const {
      numberOfCardsToDistribute,
      cardsToDistribute,
      cards
    } = this.state;

    return <Root/>;
  }
}
