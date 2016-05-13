
import React, { Component, PropTypes } from 'react-native';

// import does not work, only require works here.
// import { Carousel } from 'react-native-carousel';
let Carousel = require('react-native-carousel');

const {
  Text,
  TextInput,
  StyleSheet,
  View
} = React;

class CarouselWrapper extends Component {  
  render() {
    return (
      <Carousel
        indicatorAtBottom={true}
        indicatorOffset={-100}
        delay={3000}
        style={styles.carousel}>
        <View style={styles.container}>
          <Text>Electronics</Text>
        </View>
        <View style={styles.container}>
          <Text>Home and Furniture</Text>
        </View>
        <View style={styles.container}>
          <Text>Grocery</Text>
        </View>
      </Carousel>
    );
  }
};

const styles = StyleSheet.create({
  carousel: {
    width: 320,
  },
  container: {
    width: 320,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});

module.exports = CarouselWrapper;
