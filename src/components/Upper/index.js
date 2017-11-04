import React from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import { round } from 'lodash';
import { setDropZoneValues } from 'app/redux/market/actions';
import styles from './styles';

const { container } = styles;
class Upper extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     arr1: [],
  //   };
  // }
  // componentWillMount() {
  //   const { market, deck } = this.props;
  //   const arr1 = [];
  //   Object.keys(market).forEach((key) => {
  //     // when all the cards aren't unique in the market
  //     if (!market[key].isGhar && market[key].cards.length >= 2) {
  //       market[key].cards.forEach((id) => {
  //         // console.log(' fdjsdfhjsd dhere......')
  //         // console.log(deck[id]);
  //         arr1.push({ [key]: { cards: [deck[id].id] } });
  //       });
  //     } else {
  //       // unique cards in the market

  //       // console.log('elsejdsg dgsfdsmfasd')
  //       arr1.push({
  //         [key]: market[key],
  //       });
  //     }
  //   });
  //   this.setState({
  //     arr1,
  //   });
  // }
  setDropZoneValues(event) {
    // console.log(event, 'event');
    const dropZoneValues = event.nativeEvent.layout;
    this.props.setDropZoneValues(dropZoneValues);
  }

  // console.log(market, '***********', deck);
  // console.log(arr1, '***********');
  render() {
    const { deck, market } = this.props;
    // const { arr1 } = this.state;

    console.log(market, '@@@@@@@@@@', deck)

    const arr1 = [];
    Object.keys(market).forEach((key) => {
      // when all the cards aren't unique in the market
      if (!market[key].isGhar && market[key].cards.length >= 2) {
        market[key].cards.forEach((id) => {
          console.log('fdjsdfhjsd dhere......', deck)
          console.log(deck[id]);
          arr1.push({ [key]: { cards: [deck[id].id] } });
        });
      } else {
        // unique cards in the market

        // console.log('elsejdsg dgsfdsmfasd')
        arr1.push({
          [key]: market[key],
        });
      }
    });

    return (
      <View style={container} onLayout={event => this.setDropZoneValues(event)}>
        <View
          style={{
            flex: 1,
            borderWidth: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'yellow',
          }}
        >
          {arr1.slice(0, round(arr1.length / 2)).map((item, index) => (
            // console.log(item, '***********');
            // console.log(Object.keys(item), '***********');

            <View key={index} style={{ flex: 1, borderWidth: 1 }}>
              <Text>{`H: ${Object.keys(item)[0]}`}</Text>

              {item[parseInt(Object.keys(item)[0], 10)].cards.map((item1, index1) => (
                // console.log(item1, '&&&&&&&');

                <View key={index1}>
                  <Text>{`${deck[item1].value} of ${deck[item1].suit}`}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        <View
          style={{
            flex: 1,
            borderWidth: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'green',
          }}
        >
          {arr1.slice(round(arr1.length / 2), arr1.length).map((item, index) => (
            // console.log(item, '***********');

            <View key={index} style={{ flex: 1, borderWidth: 1 }}>
              <Text>{`H: ${Object.keys(item)[0]}`}</Text>

              {item[parseInt(Object.keys(item)[0], 10)].cards.map((item1, index1) => (
                // console.log('&&&&&&&');

                <View key={index1}>
                  <Text>{`${deck[item1].value} of ${deck[item1].suit}`}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
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
