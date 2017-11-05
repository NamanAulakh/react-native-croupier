import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import Cards from './Cards';

const Lower = ({ diff, playerCards }) => {
  const { lower, playerCards: plStyles, player2 } = styles;

  if (diff) {
    return (
      <View style={player2}>
        <Text>Player2</Text>
      </View>
    );
  }

  return (
    <View style={[lower, { backgroundColor: 'white' }]}>
      <View style={plStyles}>
        <Cards playerCards={playerCards} />
      </View>
    </View>
  );
};

Lower.propTypes = {};

export default Lower;
