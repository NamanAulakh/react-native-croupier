import React, { Component } from 'react';
import { Text, View, Image, PanResponder, Animated } from 'react-native';
import { connect } from 'react-redux';
import * as cardStyles from '../styles/cards';
import Images from '../themes/Images';

class Cards extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     // dropZoneValues: null,
  //   };
  // }
  isDropZone(gesture) {
    console.log(this.props.dropZoneValues, gesture);
    const dz = this.props.dropZoneValues;
    return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height;
  }
  _renderCards(item) {
    const cards = Images[item.name];
    const pan = new Animated.ValueXY();
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: Animated.event([null, {
        dx: pan.x,
        dy: pan.y,
      }]),
      onPanResponderRelease: (e, gesture) => {
        if (this.isDropZone(gesture)) {
          alert('dropped in drop zone');
        } else {
          Animated.spring(
            this.state.pan,
            { toValue: { x: 0, y: 0 } }
          ).start();
        }
      },
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
        {playerCards.map(item => (
          <View key={Math.random()}>
            {this._renderCards(item)}
          </View>
          ))}
      </View>
    );
  }
}
Cards.propTypes = {};

function mapStateToProps(state) {
  return {
    dropZoneValues: state.market.dropZoneValues,
  };
}
export default connect(mapStateToProps)(Cards);
