import React, { PropTypes } from 'react';
import {
  Text,
  View
} from 'react-native';
import * as highCardsStyles from '../styles/highCards';
import Kings from '../stateful_components/Kings';

const HighCards = ({
  prop,
}) => {
  const {
    highCards
  } = highCardsStyles.styles;

  return(
    <View style={highCards}>
      <Text>HighCards</Text>

      {
        <Kings/>
        //
        // <Queens/>
        //
        // <Jacks/>
        //
        // <Tens/>
        //
        // <Nines/>
      }
    </View>
  );
};

HighCards.propTypes = {

};

export default HighCards;
