import React, { PropTypes } from 'react'
import { Text, View } from 'react-native'
import { round, isUndefined } from 'lodash'
import * as upperStyles from '../styles/upper'
import Market from '../stateful_components/Market'
import LowerCards from '../stateful_components/LowerCards'

const Entity = ({ entity, deck }) => {
  const {
    // container,
    // upperColumn,
    // lowerColumn,
    homeValueStyles,
    listCards
  } = upperStyles.styles

  console.log(entity, 'entity')
  console.log(entity[Object.keys(entity)], 'entity//////')
  // if (!isUndefined(entity))
  // console.log(Object.keys(entity), 'entity')

  return (
    <View style={{ flex: 1, borderWidth: 1 }}>
      <View style={homeValueStyles}>
        <Text style={{ fontWeight: 'bold', fontSize: 25 }}>
          {Object.keys(entity)}
        </Text>
      </View>

      {!isUndefined(entity[Object.keys(entity)].cards) &&
        entity[Object.keys(entity)].cards.map((id, index) => (
          <View style={listCards} key={index}>
            <Text style={{ fontSize: 15 }}>{`${deck[id].value} of ${deck[id].suit}`}</Text>
          </View>
        ))}
    </View>
  )
}

Entity.propTypes = {}

export default Entity
