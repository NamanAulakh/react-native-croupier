import React, { PropTypes } from 'react'
import { Text, View, TextInput } from 'react-native'
import * as lowerStyles from '../styles/lower'
import HighCards from './HighCards'

const Lower = ({ diff, numberOfCardsToDistribute, handleInputChange }) => {
  const { lower, userActions, playerCards, player2 } = lowerStyles.styles

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
          value={numberOfCardsToDistribute}
          onChangeText={handleInputChange}/>
      </View>

      <View style={playerCards}>
        <Text>Cards</Text>
      </View>
    </View>
  )
}

Lower.propTypes = {}

export default Lower
