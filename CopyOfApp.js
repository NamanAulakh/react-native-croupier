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
          numberOnTheCard: j
        });
      }
    }

    this.setState({
      cards
    });
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
