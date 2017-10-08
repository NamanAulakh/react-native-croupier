import React, { Component } from 'react';
import { Text, View, Image, PanResponder, Animated, TouchableWithoutFeedback } from 'react-native';
import styles from './styles';
import Images from '../../../themes/Images';

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY(),
      selectedCard: null,
    };
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.state.pan.x,
          dy: this.state.pan.y,
        },
      ]),
      // onPanResponderRelease: (e, gesture) => {},
    });
  }
  onSelectCard(item) {
    // console.log('selectedCard', item);
    this.setState({
      selectedCard: item,
    });
    // console.log(this.card, 'this.card');
  }
  _renderCards(item, key) {
    const cards = Images[item.name];
    return (
      <TouchableWithoutFeedback onPress={() => this.setState({ activeBlock: key })}>
        <Animated.View
          {...this.panResponder.panHandlers}
          style={[this.state.pan.getLayout(), { borderWidth: 1, marginBottom: 5 }]}
        >
          <Image source={cards} style={{ width: 50, height: 70 }} resizeMode="contain" />
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
  render() {
    const { container } = styles;
    const { playerCards } = this.props;
    // console.log(playerCards, '........Cards......');
    if (playerCards.length === 0) return <Text>Cards</Text>;
    return (
      <View style={container}>
        {playerCards.map((item, key) => (
          <View key={Math.random()}>{this._renderCards(item, key)}</View>
        ))}
      </View>
    );
  }
}
Cards.propTypes = {};

export default Cards;
