import React, { PropTypes, Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import * as sevensStyles from '../styles/sevens';

class Sevens extends Component {
  static propTypes = {

  };

  constructor(props, context) {
    super(props, context);

    this.state = {

    };
  }

  render() {
    const {
      sevens
    } = sevensStyles.styles;

    return(
      <View style={sevens}>
        <Text>Sevens</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(Sevens);
