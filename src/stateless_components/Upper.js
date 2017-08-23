import React, { PropTypes } from 'react';
import {
  Text,
  View
} from 'react-native';
import * as upperStyles from '../styles/upper';

const Upper = ({
  prop,
}) => {
  const {
    upper
  } = upperStyles.styles;

  return(
    <View style={upper}>
      <Text>Upper</Text>
    </View>
  );
};

Upper.propTypes = {

};

export default Upper;
