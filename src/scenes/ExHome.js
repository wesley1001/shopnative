/**
 */
'use strict';

let React = require('react-native');
let {
  Animated,
  AppRegistry,
  Easing,
  Image,
  ScrollView,
  StatusBar,
  StatusBarIOS,
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  NavigatorIOS,
} = React;

import { Provider, connect } from 'react-redux';
import { RouterWithRedux, configureStore} from "../store/index";

import LayoutAnimationDemo from './layout-animation'; 
import ListViewDemo from './list-view';

import ExScreen from "./ExScreen";
import ExBoxes from "./ExBoxes";
import {default as ExPhotoGallery} from './ExPhotoGallery';
import {default as ExCarousel} from './ExCarousel';
// import does not work for carouselWrapper !!!!
// import { CarouselWrapper } from "./src/scenes/carousel-wrapper";
let CarouselWrapper = require("./carousel-wrapper");

//
// Root component wraps with Provider and configs store.
//

class ExHome extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = configureStore({});

    this.state = {
      headerColor: '#007aff',
      isBoxPressed: false,
    };
  }

  _handleColorSelected(color) {
    this.setState({ headerColor: color });
  }

  componentDidMount() {
    if (StatusBarIOS) {
      StatusBar.setBarStyle('light-content', true);
      StatusBar.setHidden(false, 'fade');
    }
  }

  render() {
    let boxColors = [
      '#5ac8fa', '#ffcc00', '#ff9500', '#ff2d55', '#563b7e', '#007aff',
      '#4cd964', '#ff3b30', '#8e8e93',
    ];

    return (
      <Provider store={this.store}>
        <ExScreen
          title="Welcome P13N@walmartlabs"
          headerColor={this.state.headerColor}
          scrollEnabled={!this.state.isBoxPressed}
          style={styles.container}>

          {/* Photo gallery demo        */}
          <ExPhotoGallery style={styles.gallery} />
          
          <Text style={styles.sectionTitle}>Trending Items </Text>
          <ExCarousel />

          <CarouselWrapper />

          <ListViewDemo />
          <LayoutAnimationDemo />
          {/* Bouncy boxes demo 
          <Text style={styles.sectionTitle}>Interactive Components</Text>
          <ExBoxes
            colors={boxColors}
            onPressBoxBegin={() => this.setState({ isBoxPressed: true })}
            onPressBoxEnd={() => this.setState({ isBoxPressed: false })}
            onSelectColor={this._handleColorSelected.bind(this)}
            style={styles.boxes}
          />
          <Text style={styles.note}>
            Tap the boxes to change the color of the status bar. Press down
            and drag them to see them bounce back with spring physics.
          </Text>
          */}
        </ExScreen>
      </Provider>
    );
  }
}


let HORIZ_SPACE = 12;
let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: 12
  },
  sectionTitle: {
    color: '#777',
    fontSize: 22,
    fontWeight: '300',
    marginTop: 4,
    marginHorizontal: HORIZ_SPACE,
  },
  paragraph: {
    color: '#000',
    fontSize: 16,
    marginTop: 4,
    marginHorizontal: HORIZ_SPACE,
  },
  note: {
    color: '#333',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: HORIZ_SPACE,
  },
  code: {
    fontFamily: 'Menlo',
    fontSize: 15,
  },
  gallery: {
    flex: 0,
    alignSelf: 'center',
    marginTop: 6,
    marginBottom: 2,
  },
  boxes: {
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 12,
  },
  attribution: {
    color: '#999',
    fontWeight: '300',
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 18,
    marginHorizontal: HORIZ_SPACE,
  },
  exponent: {
    color: '#777',
    fontWeight: '200',
    letterSpacing: 3,
  },
});

module.exports = ExHome;



