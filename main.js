/**
 * This is the entry point for your experience that you will run on Exponent.
 */
'use strict';

let React = require('react-native');
let {
  Animated,
  AppRegistry,
  Easing,
  Image,
  ScrollView,
  StatusBarIOS,
  StyleSheet,
  Text,
  View,
  PropTypes,
  TabBarIOS,
  Navigator,
  NavigatorIOS,
} = React;


// let Login = require('./login');
// let Home = require('./home/index');
// let Market = require('./market/index');
// let ShoppingCart = require('./shoppingcart');
// let Me = require('./me');
// let Search = require('./search/search');
// let Scan = require('./search/search');
// StatusBarIOS.setStyle('light-content');

const UI_COLOR = "rgb(232, 81, 81)";
import ExHome from './src/scenes/ExHome';
// available only NativeModules.RNVectorIconsManager || NativeModules.RNVectorIconsModule
import Icon from 'react-native-vector-icons/Ionicons';
// import FAIcon from "react-native-vector-icons/FontAwesome";

// import TabBarIOS from 'react-native-icons/index.ios.js';
// var { TabBarIOS } = require('react-native-icons');
let TabBarItemIOS = TabBarIOS.Item;

import {Actions, Scene, Router} from 'react-native-router-flux';

class MainScreen extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      headerColor: '#007aff',
      isBoxPressed: false,
      selectedTab:'home',
      lastTab:'home',
      store_id:8805,
      showIndex: {
        height:0,
        opacity:0
      },
    }
  }

  static childContextTypes = {
    uiColor: PropTypes.string
  };
  getChildContext() {
    return {
      uiColor: UI_COLOR
    }
  }

  _selectTab(newTabName) {
    const currentTab = this.state.selectedTab;
    if(currentTab !== newTabName){
      this.setState({
        lastTab: currentTab,
      });
    }
    this.setState({
      selectedTab: newTabName,
    });
  }
  
  _search() {
    this._selectTab('search');
  }

  _scan () {
    this._selectTab('scan');
  }

  _addNavigator(component, title) {
    let data = null;
    // if(this.state.selectedTab ==='home'|| this.state.selectedTab==='market') {
    //   return 
    //     <NavigatorIOS
    //       style={{flex:1}}
    //       barTintColor='#6bb967'
    //       titleTextColor="#fff"
    //       tintColor="#fff"
    //       translucent={false}
    //       initialRoute={
    //         {
    //           component: component,
    //           title: title,
    //           rightButtonTitle:"搜索",
    //           onRightButtonPress: () => this._search(),
    //           leftButtonTitle:"扫一扫",
    //           onLeftButtonPress:() => this._scan(),
    //           passProps:{
    //             data: data
    //          }
    //         }} 
    //     />;
    // }

    return <NavigatorIOS
      style={{flex:1}}
      barTintColor='#6bb967'
      titleTextColor="#fff"
      tintColor="#fff"
      translucent={false}
      initialRoute={{
        component: component,
        title: title,
        rightButtonTitle:"",
        passProps:{
          data: data
        }
      }} />;
  }

  // _renderLogin() {
  //   return (
  //       <Login/>
  //     );
  // },

  _renderNewTab (component, title) {
    const lastTab = this.state.lastTab;

    return <NavigatorIOS
      style={{flex:1}}
      barTintColor='#6bb967'
      titleTextColor="#fff"
      tintColor="#fff"
      translucent={false}
      initialRoute={
        {
          component: component,
          title: title,
          onLeftButtonPress: () => this._selectTab(lastTab),
          leftButtonTitle:"Back",
          passProps:{
            data: this.state.store_id
          }
        }
      } 
    />;
  }

  render() {
    if(this.state.selectedTab ==='search'){
      return this._renderNewTab(Search,'Search');
    }else if(this.state.selectedTab ==='scan'){
      return this._renderNewTab(Scan,'Scan');
    }

    // return (
    //   <TabBarIOS
    //     tintColor="black"
    //     barTintColor="#3abeff">
    //     <Icon.TabBarItemIOS
    //       title="Home"
    //       iconName="ios-home-outline"
    //       selectedIconName="ios-home"
    //       selected={this.state.selectedTab === 'home'}
    //       onPress={this._selectTab.bind(this,'home')}
    //       >
    //       {this._addNavigator(ExHome,'Home')}
    //     </Icon.TabBarItemIOS>
    //     <Icon.TabBarItemIOS
    //       title="Recommendation"
    //       iconName="ios-person-outline"
    //       selectedIconName="ios-person"
    //       selected={this.state.selectedTab === 'recommendation'}
    //       onPress={this._selectTab.bind(this,'recommendation')}
    //       >
    //       {this._addNavigator(ExHome,'Recommendation')}
    //     </Icon.TabBarItemIOS>
    //   </TabBarIOS>
    // );

    return (
      <TabBarIOS
        tintColor="black"
        barTintColor="#3abeff">
        <TabBarItemIOS
          title="Home"
          iconName={'ion|ios-home-outline'}
          selectedIconName={'ion|ios-home'}
          selected={this.state.selectedTab === 'home'}
          onPress={this._selectTab.bind(this,'home')}
          >
          {this._addNavigator(ExHome,'Home')}
        </TabBarItemIOS>
        <TabBarItemIOS
          title="Recommendation"
          iconName={'ion|ios-paper-outline'}
          selectedIconName={'ion|ios-paper'}
          selected={this.state.selectedTab === 'recommendation'}
          onPress={this._selectTab.bind(this,'recommendation')}
          >
          {this._addNavigator(ExHome,'Recommendation')}
        </TabBarItemIOS>
      </TabBarIOS>
    );

    // return (
    //   <TabBarIOS
    //     tintColor="black"
    //     barTintColor="#3abeff">
    //     <TabBarIOS.Item
    //       title="Home"
    //       iconName="ios-home-outline"
    //       selectedIconName="ios-home"
    //       selected={this.state.selectedTab ==='home'}
    //       onPress={this._selectTab.bind(this,'home')}
    //       >
    //       {this._addNavigator(ExHome,'Home')}
    //     </TabBarIOS.Item>
    //     <TabBarIOS.Item
    //       title="Recommendation"
    //       iconName="ios-person-outline"
    //       selectedIconName="ios-person"
    //       selected={this.state.selectedTab ==='recommendation'}
    //       onPress={this._selectTab.bind(this,'recommendation')}
    //       >
    //       {this._addNavigator(ExHome,'Recommendation')}
    //     </TabBarIOS.Item>
    //   </TabBarIOS>
    // );
  }
}

let styles = StyleSheet.create({
  navBar: {
    backgroundColor: UI_COLOR
  }
});

AppRegistry.registerComponent('main', () => MainScreen);

// --------------- working version --------------------------
// 'use strict';
// let React = require('react-native');
// let {
//   AppRegistry,
//   Platform,
//   Navigator,
//   StyleSheet,
//   Text,
//   View,
//   PropTypes
// } = React;
// const UI_COLOR = "rgb(232, 81, 81)";
// import HomeScreen from './src/index';
// import RouteMapper from './src/utils/route-mapper';

// class App extends React.Component {
//   static childContextTypes = {
//     uiColor: PropTypes.string
//   };
//   getChildContext() {
//     return {
//       uiColor: UI_COLOR
//     }
//   }
//   _renderScene(route, navigator) {
//     var Component = route.component;
//     return (
//       <Component {...route.props} navigator={navigator} route={route} />
//     );
//   }
//   render() {
//     return (
//       <Navigator
//         initialRoute={{
//           component: HomeScreen,
//           title: 'Demo'
//         }}
//         renderScene={this._renderScene}
//         navigationBar={
//           <Navigator.NavigationBar
//             routeMapper={RouteMapper}
//             navigationStyles={Navigator.NavigationBar.StylesIOS}
//             style={styles.navBar}
//           />
//         }
//       />
//     );
//   }
// }

// let styles = StyleSheet.create({
//   navBar: {
//     backgroundColor: UI_COLOR
//   }
// });

// AppRegistry.registerComponent('main', () => App);




