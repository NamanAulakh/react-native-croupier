import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { round } from 'lodash';
import { setDropZoneValues } from 'app/redux/market/actions';
import styles from './styles';
import Section from './Section';

const { container } = styles;

class Upper extends React.Component {
  constructor(props) {
    super(props);

    this.state = { tempArr: [] };

    this.setDropZoneValues = this.setDropZoneValues.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { market, deck } = nextProps;
    const { tempArr } = this.state;

    Object.keys(market).forEach((key) => {
      // when all the cards aren't unique in the market
      if (!market[key].isGhar && market[key].cards.length >= 2) {
        market[key].cards.forEach((id) => {
          tempArr.push({ [key]: { cards: [deck[id].id] } });
        });
      } else {
        // unique cards in the market
        tempArr.push({
          [key]: market[key],
        });
      }
    });

    this.setState({
      tempArr,
    });
  }

  setDropZoneValues(event) {
    const dropZoneValues = event.nativeEvent.layout;
    this.props.setDropZoneValues(dropZoneValues);
  }

  render() {
    const { deck } = this.props;
    const { tempArr } = this.state;
    const upperSection = tempArr.slice(0, round(tempArr.length / 2));
    const lowerSection = tempArr.slice(round(tempArr.length / 2), tempArr.length);

    return (
      <View style={container} onLayout={event => this.setDropZoneValues(event)}>
        <View
          style={{
            flex: 1,
            borderWidth: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'yellow',
          }}
        >
          {upperSection.map((item, index) => (
            <Section index={index} deck={deck} item={item} key={index} />
          ))}
        </View>

        <View
          style={{
            flex: 1,
            borderWidth: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'green',
          }}
        >
          {lowerSection.map((item, index) => (
            <Section index={index} deck={deck} item={item} key={index} />
          ))}
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    dropZoneValues: state.market.dropZoneValues,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setDropZoneValues: dropZoneValues => dispatch(setDropZoneValues(dropZoneValues)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Upper);
