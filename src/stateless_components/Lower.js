import React, { PropTypes } from 'react';
import {
  Text,
  View
} from 'react-native';
import * as lowerStyles from '../styles/lower';
import HighCards from './HighCards';

const Lower = ({
  prop,
}) => {
  const {
    lower
  } = lowerStyles.styles;

  return(
    <View style={lower}>
      <HighCards/>
    </View>
  );
};

Lower.propTypes = {

};

export default Lower;
