'use strict';

let React = require('react-native');
let {
  Image,
  ScrollView,
  StyleSheet,
  View,
} = React;

import { connect } from 'react-redux';

// import does not work, only require works here.
// import { Carousel } from 'react-native-carousel';
let Carousel = require('react-native-carousel');
import { ajaxRequest } from "../action/recommendation";

let PHOTO_SPACING = 6;

let IMAGE_SOURCES = [
  {uri: 'http://i5.wal.co/dfw/4ff9c6c9-8c0a/k2-_a9517a22-823c-42e5-8bfb-45e73ac0c4c0.v1.jpg'},
  {uri: 'http://i5.wal.co/dfw/4ff9c6c9-7239/k2-_a78a666c-62a0-4ab1-884d-93b9c08328a4.v1.jpg'},
  {uri: 'http://i5.wal.co/dfw/4ff9c6c9-f7b2/k2-_252e9465-c782-4395-a355-68cc3cde6777.v1.jpg'},
  {uri: 'http://i5.wal.co/dfw/4ff9c6c9-bdae/k2-_4c974574-6fe3-465f-b450-c1d916bc4b4f.v1.jpg'},
];

let styles = StyleSheet.create({
  container: {
    flex: 0,
    width: 320 + PHOTO_SPACING,
    alignSelf: 'flex-start',
    marginTop: 0,
    marginBottom: 6,
    overflow: 'visible',
  },
  photoContainer: {
    marginHorizontal: PHOTO_SPACING / 2,
    overflow: 'visible',
    shadowRadius: 3,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 1 },
  },
  photo: {
    overflow: 'visible',
  },
});

//
// ajax fetcher to request fetcher
//
class ExCarousel extends React.Component {
  constructor(props, context) {
    super(props, context);
    if (!props.items) {
      props.onAjaxRequest("29114188");
    }
  }

  render() {
    const itemImgs = this.props.items;
    return itemImgs ? (
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
    ) : null;
  }

  _renderPhoto(source, size) {
    return (
      <View key={source.uri} style={styles.photoContainer}>
        <Image source={source} style={[styles.photo, size]} />
      </View>
    );
  }
}

ExCarousel.propTypes = {
  items: React.PropTypes.array,
  onAjaxRequest: React.PropTypes.func
};

ExCarousel.defaultProps = {
};

const mapStateToProps = (state) => {
  return {
    items: state.irsDataMap.irsData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAjaxRequest: (parentItemId) => {
      dispatch(ajaxRequest("Homepage", parentItemId, {}));
    }
  }
}

const StatefulExCarousel = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExCarousel);


export default StatefulExCarousel;

