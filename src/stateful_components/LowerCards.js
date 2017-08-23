import React, { PropTypes, Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import * as lowerCardsStyles from '../styles/lowerCards';
import Ones from './Ones';
import Twos from './Twos';
import Threes from './Threes';
import Fours from './Fours';
import Fives from './Fives';
import Sixes from './Sixes';
import Sevens from './Sevens';
import Eights from './Eights';

class LowerCards extends Component {
  static propTypes = {

  };

  constructor(props, context) {
    super(props, context);

    this.state = {

    };
  }

  render() {
    const {
      lowerCards,
      lowerCardsContainer
    } = lowerCardsStyles.styles;

    return(
      <View style={lowerCards}>
        <View style={lowerCardsContainer}>
          <Ones/>

          <Twos/>

          <Threes/>

          <Fours/>

          <Fives/>

          <Sixes/>

          <Sevens/>

          <Eights/>
        </View>
      </View>
    );
  }
}

const mapStateToProps = () => {
  return {

  };
};

const mapDispatchToProps = () => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LowerCards);
