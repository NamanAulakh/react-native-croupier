import React, { PropTypes } from 'react';
import {
  Text,
  View
} from 'react-native';
import * as highCardsStyles from '../styles/highCards';
import Kings from '../stateful_components/Kings';
import Queens from '../stateful_components/Queens';
import Jacks from '../stateful_components/Jacks';
import Tens from '../stateful_components/Tens';
import Nines from '../stateful_components/Nines';
import Action from '../stateful_components/Action';

const HighCards = ({
  prop,
}) => {
  const {
    highCards
  } = highCardsStyles.styles;

  return(
    <View style={highCards}>
      <Kings/>

      <Queens/>

      <Jacks/>

      <Tens/>

      <Nines/>

      <Action/>
    </View>
  );
};

HighCards.propTypes = {

};

export default HighCards;
