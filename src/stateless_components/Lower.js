import React, { PropTypes } from 'react';
import { Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import * as lowerStyles from '../styles/lower';
import ActionBar from './ActionBar';
import HighCards from './HighCards';
import Cards from './Cards';

const Lower = ({
  diff,
  numberOfCardsToDistribute,
  handleInputChange,
  setMarket,
  setPlayersArray,
  onSelectCard,
  playerCards
}) => {
  const {
    lower,
    userActions,
    playerCards: plStyles,
    player2,
    inputStyles,
  } = lowerStyles.styles

  if (diff)
    return (
      <View style={player2}>
        <Text>Player2</Text>
      </View>
    )
  const actions = {
    'isLeave': false,
    'isTake': true,
    'isBuild': false,
    'isUp': true,
    'isAdd': false,
  };
  return (
    <View style={[lower, {backgroundColor: 'white'}]}>
      <View style={plStyles}>
        <Cards onSelectCard={onSelectCard} playerCards={playerCards} />
      </View>
    </View>
  )
}

Lower.propTypes = {}

export default Lower
