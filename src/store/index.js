import { createStore, applyMiddleware, compose } from 'redux';
import { Provider, connect } from 'react-redux';
import thunkMiddleware from "redux-thunk";
import { Router } from 'react-native-router-flux';
import reducers from '../reducers/index';

export const RouterWithRedux = connect()(Router);

// compose ( createStore => applyMiddleware(thunk) ) => reducers and init state.
const createStoreWithMiddleware = compose(
  applyMiddleware(thunkMiddleware)
)(createStore);

export const configureStore = (initialState) => {
  return createStoreWithMiddleware(reducers, initialState);
}

