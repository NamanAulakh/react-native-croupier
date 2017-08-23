import React, { PropTypes, Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import * as sixesStyles from '../styles/sixes';

class Sixes extends Component {
  static propTypes = {

  };

  constructor(props, context) {
    super(props, context);

    this.state = {

    };
  }

  render() {
    const {
      sixes
    } = sixesStyles.styles;

    return(
      <View style={sixes}>
        <Text>Sixes</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(Sixes);
