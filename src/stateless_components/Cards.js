import React, { Component } from 'react';
import { Text, View, Image, PanResponder, Animated, TouchableWithoutFeedback } from 'react-native';
import * as cardStyles from '../styles/cards';
import Images from '../themes/Images';

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY(),
    };
  }

  _renderCards(item, key) {
    const cards = Images[item.name];
    const pan = new Animated.ValueXY();
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: Animated.event([null, {
        dx: pan.x,
        dy: pan.y,
      }]),
      onPanResponderRelease: (e, gesture) => {},
    });
    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        style={[pan.getLayout(), { borderWidth: 1, marginBottom: 5 }]}
      >
        <Image source={cards} style={{ width: 50, height: 70 }} resizeMode="contain" />
      </Animated.View>
    );
  }
  render() {
    const {
      container,
    } = cardStyles.styles;
    const { playerCards } = this.props;
    console.log(playerCards, '........Cards......');
    if (playerCards.length === 0) return <Text>Cards</Text>;
    return (
      <View style={container}>
        {playerCards.map((item, key) => (
          <View key={Math.random()}>
            {this._renderCards(item, key)}
          </View>
          ))}
      </View>
    );
  }
}
Cards.propTypes = {};

export default Cards;
