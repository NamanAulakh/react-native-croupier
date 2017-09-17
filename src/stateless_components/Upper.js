import React, { PropTypes } from 'react'
import { Text, View } from 'react-native'
import { round } from 'lodash'
import * as upperStyles from '../styles/upper'
import Market from '../stateful_components/Market'
import LowerCards from '../stateful_components/LowerCards'

const Upper = ({ market }) => {
  const { container, upperColumn, lowerColumn } = upperStyles.styles

  console.log(market, '*******market*********')

  // console.log(Object.keys(market).length)

  const keysArray = Object.keys(market)

  const marketLength = keysArray.length

  const upperColumnLength = round(marketLength / 2)

  const lowerColumnLength = marketLength - upperColumnLength

  const upperColumnArray = keysArray.slice(0, upperColumnLength)

  const lowerColumnArray = keysArray.slice(upperColumnLength, marketLength)

  // console.log(upperColumnArray, lowerColumnArray)

  return (
    <View style={container}>
      <View style={upperColumn}>
        <Text>1st column</Text>
      </View>

      <View style={lowerColumn}>
        <Text>2nd column</Text>
      </View>
      {
        //   playerCards.map((item, index) => {
        //   return (
        //     <TouchableOpacity style={card} key={index} onPress={() => onSelectCard(item)}>
        //       <View style={card1}>
        // <Text style={text}>{`${item.value} of ${item.suit}`}</Text>
        //       </View>
        //     </TouchableOpacity>
        //   )
        // })
      }
    </View>
  )
}

Upper.propTypes = {}

export default Upper
