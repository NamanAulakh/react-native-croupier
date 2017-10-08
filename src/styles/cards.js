import React from 'react'
import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: width,
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingTop: 10,
  },
  card: {
    flex: 1,
    borderColor: 'black',
    borderWidth: 1
  },
  card1: {
    flex: 1,
    padding: 2
  },
  text: {
    // flex: 1
  },
  itemImageContainer: {
    flex: 1,
    justifyContent: 'center'
  }
})
