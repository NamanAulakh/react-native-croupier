import React from 'react'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  lower: {
    flex: 1,
    backgroundColor: 'blue',
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  playerCards: {
    flex: 1,
    backgroundColor: 'yellow',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  userActions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'yellow',
    height: 10,
  },
  player2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue'
  },
  inputStyles: {
    height: 40,
    width: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5
  },
  actionBarStyles: {
    flex: 1,
    borderWidth: 1,
    padding: 5,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
