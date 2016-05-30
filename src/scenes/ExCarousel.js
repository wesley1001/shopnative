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
import { default as IrsDataAdapter } from "../adapters/irsdata-adapter"

let PHOTO_SPACING = 6;
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
      props.onAjaxRequest("29114188");  // fake parentItemId
    }
    this._renderSingleTile = this._renderSingleTile.bind(this);
    this._renderTiles = this._renderTiles.bind(this);
  }

  _renderSingleTile(tile, size) {
    return (
      <View key={tile.uri} style={styles.photoContainer}>
        <Image source={tile.uri} style={[styles.photo, size]} />
      </View>
    );
  }

  _renderTiles(items) {
    console.log("_renderTiles ---> ", items);
    return items.map( item => {
      this._renderSingleTile(item, { width: 320, height: 240 });
    });
  }

  render() {
    const items = this.props.items;
    return items ? (
      <Carousel
        indicatorAtBottom={true}
        indicatorOffset={-100}
        delay={3000}
        style={styles.carousel}>
        {this._renderTiles(items)}
      </Carousel>
    ) : null;
  }
}

ExCarousel.propTypes = {
  items: React.PropTypes.array,
  onAjaxRequest: React.PropTypes.func
};

ExCarousel.defaultProps = {
};

const mapStateToProps = (state) => {
  // return {
  //   items: state.irsDataMap.irsData
  // }
  const irsDataAdapter = new IrsDataAdapter(state, {});
  return irsDataAdapter.adapt();
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

