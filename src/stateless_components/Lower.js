import React, { PropTypes } from 'react'
import { Text, View, TextInput } from 'react-native'
import * as lowerStyles from '../styles/lower'
import HighCards from './HighCards'

const Lower = ({ diff }) => {
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
        <Text>Actions</Text>
      </View>

      <View style={playerCards}>
        <Text>Cards</Text>
      </View>
    </View>
  )
}

Lower.propTypes = {}

export default Lower
