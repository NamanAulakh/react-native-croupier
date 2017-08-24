import React, { PropTypes, Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cardsActions from './redux/actions/cards';
import * as rootStyles from './styles/root';
import Upper from './stateless_components/Upper';
import Lower from './stateless_components/Lower';

class Root extends Component {
  static propTypes = {

  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      suits: ['spades', 'hearts', 'diamonds', 'clubs'],
      cards: ['X'],
    };

    this.generateCardsInitially = this.generateCardsInitially.bind(this);
  }

  componentWillMount() {
    this.generateCardsInitially();
  }

  generateCardsInitially() {
    const {
      suits,
      cards
    } = this.state;

    const {
      actions
    } = this.props;

    for (var i = 0; i < suits.length; i++) {
      for (let j = 1; j <= 13; j++) {
        cards.push({
          suit: suits[i],
          numberOnTheCard: j
        });
      }
    }

    this.setState({
      cards
    }, () => actions.generateAllCards(this.state.cards));
  }

  render() {
    const {
      root
    } = rootStyles.styles;

    return(
      <View style={root}>
        <Upper/>

        <Lower/>
      </View>
    );
  }
}

const mapStateToProps = () => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  const actions = Object.assign({}, cardsActions);

  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
