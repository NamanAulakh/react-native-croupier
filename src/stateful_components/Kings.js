import React, { PropTypes, Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import * as kingsStyles from '../styles/kings';

class Kings extends Component {
  static propTypes = {

  };

  constructor(props, context) {
    super(props, context);

    this.state = {

    };
  }

  render() {
    const {
      kings
    } = kingsStyles.styles;

    return(
      <View style={kings}>
        <Text>Kings</Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);

  return {

  };
};

const mapDispatchToProps = () => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Kings);
