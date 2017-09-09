import React, { PropTypes } from 'react';
import {
  Text,
  View
} from 'react-native';
import * as upperStyles from '../styles/upper';
import Market from '../stateful_components/Market';
import LowerCards from '../stateful_components/LowerCards';

const Upper = ({
  prop,
}) => {
  const {
    upper,
    upperContainer
  } = upperStyles.styles;

  return(
    <View style={upper}>
      <Text>Market</Text>
    </View>
  );
};

Upper.propTypes = {

};

export default Upper;
