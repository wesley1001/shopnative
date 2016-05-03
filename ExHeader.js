'use strict';

let React = require('react-native');
let {
  Animated,
  Easing,
  StyleSheet,
  View,
} = React;

let BODY_HEIGHT = 34;
let TITLE_MARGIN_TOP = 6;
let STATUS_BAR_HEIGHT = 0;

class ExHeader extends React.Component {
  render() {
    let {
      title,
      scrollDistance,
      ...props,
    } = this.props;

    let bodyStyle = {
      opacity: scrollDistance.interpolate({
        inputRange: [0, BODY_HEIGHT],
        outputRange: [1, 0],
        easing: Easing.in(Easing.linear),
        extrapolate: 'clamp',
      }),
      height: scrollDistance.interpolate({
        inputRange: [0, BODY_HEIGHT],
        outputRange: [BODY_HEIGHT, 0],
        extrapolate: 'clamp',
      }),
    };

    let titleStyle = {
      transform: [{
        scale: scrollDistance.interpolate({
          inputRange: [0, BODY_HEIGHT],
          outputRange: [1, 0],
          extrapolate: 'clamp',
        }),
      }],
      marginTop: scrollDistance.interpolate({
        inputRange: [0, BODY_HEIGHT],
        outputRange: [TITLE_MARGIN_TOP, -STATUS_BAR_HEIGHT],
        extrapolate: 'clamp',
      }),
    };

    return (
      <View {...props} style={[styles.container, props.style]}>
        <View style={styles.statusBarStrut} />
        <Animated.View style={[styles.body, bodyStyle]}>
          <Animated.Text style={[styles.titleText, titleStyle]}>
            {title}
          </Animated.Text>
        </Animated.View>
      </View>
    );
  }
}

ExHeader.HEIGHT = BODY_HEIGHT;

let styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  statusBarStrut: {
    height: 0,
  },
  body: {
    height: BODY_HEIGHT,
  },
  titleText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 4,
    alignSelf: 'center',
  },
});

module.exports = ExHeader;
