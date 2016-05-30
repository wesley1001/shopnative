# Shopnative
This is a demo app to demo how to personalize your shooping experience in mobile.
this is build with react-native and exponentjs.

## Installation

	git clone https://github.com/life0fun/shopnative.git
	npm cache clean && npm i
	npm i buffer


restart packager with clear cache.

	node_modules/react-native/packager/packager.sh --reset-cache


## usage

When testing in ios simulator, the url in exponentjs is `localhost:19004`.

When sending link to exp.host to your phone.
The link is defined in .exponent/packager-info.json

	ngrok": "http://jf-78i.colorcloud.shopnative.exp.direct"
	exp://jd-6h5.colorcloud.shop.exp.direct:80

## Run

Entry point is defined in package.json
	
	"main": "main.js",

landing.js experiments RouterWithRedux with connect()(Router) to Actions with scenes;

	<Provider store={this.store}>
        <RouterWithRedux scenes={scenes}>
        </RouterWithRedux>
     </Provider>


## Debug
1. app runs at `localhost:19004` from simulator and debugger at `localhost:19005/debugger-ui`.
2. Pressing ctrl + cmd + z in the iOS simulator kick off the debugging browser window.
3. click live js debug remote
4. http://localhost:19005/debugger-ui
5. Press ⌘⌥J (cmd+alt-J) to open Developer Tools.
6. `console.warn()` in the code will log to dev tool console.
