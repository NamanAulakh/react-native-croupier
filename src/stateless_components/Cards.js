import React, { PropTypes } from 'react'
import { Text, View, TextInput, Button, TouchableOpacity } from 'react-native'
import * as cardStyles from '../styles/cards'
import HighCards from './HighCards'

const Cards = ({ onSelectCard, playerCards }) => {
  const { container, card, card1, text } = cardStyles.styles

  console.log(playerCards, '........Cards......')

  if (playerCards.length === 0) return <Text>Cards</Text>

  return (
    <View style={container}>
      {playerCards.map((item, index) => {
        return (
          <TouchableOpacity style={card} key={index} onPress={() => onSelectCard(item)}>
            <View style={card1}>
              <Text style={text}>{`${item.value} of ${item.suit}`}</Text>
            </View>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

Cards.propTypes = {}

export default Cards
