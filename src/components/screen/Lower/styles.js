import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;

export default {
  container: {
    flex: 1,
    borderWidth: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width,
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingTop: 10,
  },
  card: {
    flex: 1,
    borderColor: 'black',
    borderWidth: 1,
  },
  card1: {
    flex: 1,
    padding: 2,
  },
  text: {
    // flex: 1
  },
  itemImageContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  lower: {
    flex: 1,
    backgroundColor: 'blue',
  },
  playerCards: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userActions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'yellow',
    height: 10,
  },
  player2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  inputStyles: {
    height: 40,
    width: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5,
  },
  actionBarStyles: {
    flex: 1,
    borderWidth: 1,
    padding: 5,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
};
