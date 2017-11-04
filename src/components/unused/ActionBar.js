import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import * as lowerStyles from '../styles/lower';

export default class ActionBar extends Component {
  handleActionBarClick(action) {
    console.log('hi', action);
  }
  render() {
    const { actionBarStyles } = lowerStyles.styles;
    const { isLeave, isTake, isBuild, isUp, isAdd } = this.props.actions;
    return (
      <View
        style={{
          borderWidth: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10,
        }}
      >
        <TouchableOpacity
          style={[
            actionBarStyles,
            isLeave ? { backgroundColor: 'green' } : { backgroundColor: 'white' },
          ]}
          onPress={() => this.handleActionBarClick('Leave')}
          disabled={!isLeave}
        >
          <Text>LEAVE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            actionBarStyles,
            isTake ? { backgroundColor: 'green' } : { backgroundColor: 'white' },
          ]}
          onPress={() => this.handleActionBarClick('Take')}
          disabled={!isTake}
        >
          <Text>TAKE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            actionBarStyles,
            isBuild ? { backgroundColor: 'green' } : { backgroundColor: 'white' },
          ]}
          onPress={() => this.handleActionBarClick('Build')}
          disabled={!isBuild}
        >
          <Text>BUILD</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            actionBarStyles,
            isUp ? { backgroundColor: 'green' } : { backgroundColor: 'white' },
          ]}
          onPress={() => this.handleActionBarClick('Up')}
          disabled={!isUp}
        >
          <Text>UP</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            actionBarStyles,
            isAdd ? { backgroundColor: 'green' } : { backgroundColor: 'white' },
          ]}
          onPress={() => this.handleActionBarClick('Add')}
          disabled={!isAdd}
        >
          <Text>ADD</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
