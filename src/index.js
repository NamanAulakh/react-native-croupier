import React, { PropTypes } from 'react';
import {
  Text,
  View
} from 'react-native';
import * as rootStyles from './styles/root';
import Upper from './stateless_components/Upper';
import Lower from './stateless_components/Lower';

const Root = ({
  prop,
}) => {
  const {
    root
  } = rootStyles.styles;

  return(
    <View style={root}>
      <Upper/>

      <Lower/>
    </View>
  );
};

Root.propTypes = {

};

export default Root;
