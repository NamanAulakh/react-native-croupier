import React from 'react';
import { Text, View } from 'react-native';
import { round } from 'lodash';
import styles from './styles';

const Upper = ({ market, deck }) => {
  const { container } = styles;

  const arr1 = [];

  Object.keys(market).forEach((key) => {
    // when all the cards aren't unique in the market
    if (!market[key].isGhar && market[key].cards.length >= 2) {
      market[key].cards.forEach((id) => {
        // console.log(' fdjsdfhjsd dhere......')
        // console.log(deck[id]);
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

  // console.log(market, '***********', deck);
  // console.log(arr1, '***********');

  return (
    <View style={container}>
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
};

Upper.propTypes = {};

export default Upper;
