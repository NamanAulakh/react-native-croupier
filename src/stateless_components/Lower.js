import React, { PropTypes } from 'react'
import { Text, View, TextInput, Button } from 'react-native'
import * as lowerStyles from '../styles/lower'
import HighCards from './HighCards'

const Lower = ({
  diff,
  numberOfCardsToDistribute,
  handleInputChange,
  sendToMarket,
  setPlayersArray
}) => {
  const {
    lower,
    userActions,
    playerCards,
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

        <Button onPress={sendToMarket} title="Market" color="#841584" />

        <Button onPress={setPlayersArray} title="Player" color="#841584" />
      </View>

      <View style={playerCards}>
        <Text>Cards</Text>
      </View>
    </View>
  )
}

Lower.propTypes = {}

export default Lower
