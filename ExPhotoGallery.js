'use strict';

let React = require('react-native');
let {
  Image,
  ScrollView,
  StyleSheet,
  View,
} = React;

let PHOTO_SPACING = 40;

let IMAGE_SOURCES_X = [
  // hedgehog
  {uri: 'https://i.imgur.com/8049SBB.jpg'},
  // kittens
  {uri: 'https://i.imgur.com/m7DZR1A.jpg'},
  // flower hamsters
  {uri: 'https://i.imgur.com/BeMfZu3.jpg'},
  // puppy
  {uri: 'https://i.imgur.com/ExQom0o.jpg'},
  // duckling
  {uri: 'https://i.imgur.com/cSb7OTE.jpg'},
  // polar bear
  {uri: 'https://i.imgur.com/xlhiPb9.jpg'},
];

let IMAGE_SOURCES = [
  {uri: 'http://i5.wal.co/dfw/4ff9c6c9-8c0a/k2-_a9517a22-823c-42e5-8bfb-45e73ac0c4c0.v1.jpg'},
  {uri: 'http://i5.wal.co/dfw/4ff9c6c9-7239/k2-_a78a666c-62a0-4ab1-884d-93b9c08328a4.v1.jpg'},
  {uri: 'http://i5.wal.co/dfw/4ff9c6c9-f7b2/k2-_252e9465-c782-4395-a355-68cc3cde6777.v1.jpg'},
  {uri: 'http://i5.wal.co/dfw/4ff9c6c9-bdae/k2-_4c974574-6fe3-465f-b450-c1d916bc4b4f.v1.jpg'},
];

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

let styles = StyleSheet.create({
  container: {
    flex: 0,
    width: 320 + PHOTO_SPACING,
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 12,
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

module.exports = ExPhotoGallery;
