import React, { PropTypes, Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import * as fivesStyles from '../styles/fives';

class Fives extends Component {
  static propTypes = {

  };

  constructor(props, context) {
    super(props, context);

    this.state = {

    };
  }

  render() {
    const {
      fives
    } = fivesStyles.styles;

    return(
      <View style={fives}>
        <Text>Fives</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(Fives);
