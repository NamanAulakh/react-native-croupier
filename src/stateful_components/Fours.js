import React, { PropTypes, Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import * as foursStyles from '../styles/fours';

class Fours extends Component {
  static propTypes = {

  };

  constructor(props, context) {
    super(props, context);

    this.state = {

    };
  }

  render() {
    const {
      fours
    } = foursStyles.styles;

    return(
      <View style={fours}>
        <Text>Fours</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(Fours);
