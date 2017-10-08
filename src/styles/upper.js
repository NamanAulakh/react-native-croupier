import React from 'react';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: 'green',
    borderWidth: 20
  },
  upperColumn: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'yellow',
    borderWidth: 2,
    borderColor: 'red'
  },
  lowerColumn: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'violet',
    borderWidth: 2,
    borderColor: 'yellow'
  },
  homeValueStyles: {
    flex: 1,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center'
  },
  listCards: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
