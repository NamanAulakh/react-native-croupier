import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { round } from 'lodash';
import { connect } from 'react-redux';
import { setDropZoneValues } from '../redux/actions/market';
import * as upperStyles from '../styles/upper';
import Market from '../stateful_components/Market';
import LowerCards from '../stateful_components/LowerCards';

class Upper extends Component {
  _setDropZoneValues(event) {
    const dropZoneValues = event.nativeEvent.layout;
    this.props.setDropZoneValues(dropZoneValues);
  }
  render() {
    const { container, upperColumn, lowerColumn } = upperStyles.styles;
    // console.log(market, '*******market*********');
    // console.log(Object.keys(market).length);
    // const keysArray = Object.keys(market);
    // const marketLength = keysArray.length;
    // const upperColumnLength = round(marketLength / 2);
    // const lowerColumnLength = marketLength - upperColumnLength;
    // const upperColumnArray = keysArray.slice(0, upperColumnLength);
    // const lowerColumnArray = keysArray.slice(upperColumnLength, marketLength);
    return (
      <View style={container} onLayout={() => this.setDropZoneValues}>
        <View style={upperColumn}>
          <Text>1st column</Text>
        </View>
        <View style={lowerColumn}>
          <Text>2nd column</Text>
        </View>
        {
          //   playerCards.map((item, index) => {
          //   return (
          //     <TouchableOpacity style={card} key={index} onPress={() => onSelectCard(item)}>
          //       <View style={card1}>
          // <Text style={text}>{`${item.value} of ${item.suit}`}</Text>
          //       </View>
          //     </TouchableOpacity>
          //   )
          // })
        }
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    dropZoneValues: state.market.dropZoneValues,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setDropZoneValues: dropZoneValues => dispatch(setDropZoneValues(dropZoneValues)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Upper);
