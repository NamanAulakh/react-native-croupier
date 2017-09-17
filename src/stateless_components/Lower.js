import React, { PropTypes } from 'react'
import { Text, View, TextInput, Button } from 'react-native'
import * as lowerStyles from '../styles/lower'
import HighCards from './HighCards'
import Cards from './Cards'

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
    inputStyles
  } = lowerStyles.styles

  if (diff)
    return (
      <View style={player2}>
        <Text>Player2</Text>
      </View>
    )

  return (
    <View style={lower}>
      <View style={userActions}>
        <TextInput
          style={inputStyles}
          value={numberOfCardsToDistribute}
          onChangeText={handleInputChange}
        />

        <Button onPress={setMarket} title="Market" color="#841584" />

        <Button onPress={setPlayersArray} title="Player" color="#841584" />
      </View>

      <View style={plStyles}>
        <Cards onSelectCard={onSelectCard} playerCards={playerCards} />
      </View>
    </View>
  )
}

Lower.propTypes = {}

export default Lower
