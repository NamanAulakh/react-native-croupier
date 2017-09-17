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
    backgroundColor: 'blue',
    borderWidth: 2,
    borderColor: 'red'
  },
  lowerColumn: {
    flex: 1,
    backgroundColor: 'violet',
    borderWidth: 2,
    borderColor: 'yellow'
  }
});
