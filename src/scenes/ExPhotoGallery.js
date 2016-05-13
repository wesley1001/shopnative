'use strict';

let React = require('react-native');
let {
  Image,
  ScrollView,
  StyleSheet,
  View,
} = React;

import { connect } from 'react-redux';

// import { ajaxRequest } from "../action/recommendation";

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

class ExPhotoGallery extends React.Component {
  render() {
    return (
      <ScrollView
        horizontal
        scrollsToTop={false}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        style={[styles.container, this.props.style]}>
        {IMAGE_SOURCES.map(source =>
          this._renderPhoto(source, { width: 320, height: 240 })
        )}
      </ScrollView>
    );
  }

  _renderPhoto(source, size) {
    return (
      <View key={source.uri} style={styles.photoContainer}>
        <Image source={source} style={[styles.photo, size]} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // items: state.irsDataMap
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAjaxRequest: (id) => {
      // dispatch(ajaxRequest("Homepage", "46195964", {}));
    }
  }
}

// const StatefulExPhotoGallery = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(ExPhotoGallery);

const StatefulExPhotoGallery = connect(
)(ExPhotoGallery);

export default StatefulExPhotoGallery;
// export default ExPhotoGallery;

