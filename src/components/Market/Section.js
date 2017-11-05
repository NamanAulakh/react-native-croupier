import React from 'react';
import { Text, View } from 'react-native';

const Section = ({ item, deck, index }) => {
  const cardsArr = item[parseInt(Object.keys(item)[0], 10)].cards;

  return (
    <View key={index} style={{ flex: 1, borderWidth: 1 }}>
      <Text>{`H: ${Object.keys(item)[0]}`}</Text>
      {cardsArr.map((item1, index1) => (
        <View key={index1}>
          <Text>{`${deck[item1].value} of ${deck[item1].suit}`}</Text>
        </View>
      ))}
    </View>
  );
};

Section.propTypes = {};

export default Section;
