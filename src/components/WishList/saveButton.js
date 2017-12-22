import React, {Component} from 'react-native';
const {
  StyleSheet,
  Image,
  Text,
  View,
  AsyncStorage,
  TouchableOpacity
} = React;

import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class SaveButton extends Component{

  constructor(props) {
    super(props);
    this.state = {
      saved: false
    };
  }

  getDefaultProps() {
    return {
      data: {}
    };
  }

  componentDidMount() {
    if (!this.props.data.tour || !this.props.data.tour.id) return;

    this.STORAGE_KEY = 'dongu' + this.props.data.tour.id;

    AsyncStorage.getItem(this.STORAGE_KEY)
    .then((value) => {
      if (value !== null) this.setState({ saved: true });
    })
    .catch((error) => console.error('AsyncStorage error: ', error.message))
    .done();
  }

  render() {
    let image = <Image source={require('../../media/Heart.png')} style={styles.image} />;

    if (this.state.saved) {
      image = <Image source={require('../../media/Heart-Selected.png')} style={styles.image} />;
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.handlePress}>
          {image}
        </TouchableOpacity>
      </View>
    );
  }
  handlePress() {
    if (this.state.saved) this.unsaveHouse();
    else this.saveHouse();
  }

  saveHouse() {
    if (!this.STORAGE_KEY) return;

    this.setState({ saved: true });

    const data = _.extend({dateSaved: Date.now()}, this.props.data);

    AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(data))
    .then(() => console.log('house saved: ', this.STORAGE_KEY))
    .catch((error) => console.error('AsyncStorage error: ', error.message))
    .done();
  }

  unsaveHouse() {
    if (!this.STORAGE_KEY) return;

    this.setState({ saved: false });

    AsyncStorage.removeItem(this.STORAGE_KEY)
    .then(() => console.log('house removed: ', this.STORAGE_KEY))
    .catch((error) => console.error('AsyncStorage error: ', error.message))
    .done();
  }
}


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0)'
  },

  image: {
    width: 29,
    height: 26,
  }
});
