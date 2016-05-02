
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
        delay={1000}
        style={styles.carousel}>
        <View style={styles.container}>
          <Text>Tile 1</Text>
        </View>
        <View style={styles.container}>
          <Text>Tile 2</Text>
        </View>
        <View style={styles.container}>
          <Text>Tile 3</Text>
        </View>
      </Carousel>
    );
  }
};

const styles = StyleSheet.create({
  carousel: {
    width: 375,
  },
  container: {
    width: 375,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});

module.exports = CarouselWrapper;
