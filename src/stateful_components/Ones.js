import React, { PropTypes, Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import * as cardStyles from '../styles/card';

class Ones extends Component {
  static propTypes = {

  };

  constructor(props, context) {
    super(props, context);

    this.state = {

    };
  }

  render() {
    const {
      card,
      numberOnTheCardStyles
    } = cardStyles.styles;

    const {
      cards,
    } = this.props;

    return(
      <View style={card}>
        <Text style={numberOnTheCardStyles}>1</Text>
        {
          // cards.filter(item => item.numberOnTheCard === 1)
          // .map((item, index) => {
          //   return (
          //     <View key={index}>
          //       <Text style={{color: 'white'}}>{`${item.numberOnTheCard} of ${item.suit}`}</Text>
          //     </View>
          //   );
          // })
        }
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cards: state.cards.data
  };
};

const mapDispatchToProps = () => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Ones);
