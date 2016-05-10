import { createStore, applyMiddleware, compose } from 'redux';
import { Provider, connect } from 'react-redux';
import thunkMiddleware from "redux-thunk";
import { Router } from 'react-native-router-flux';
import reducers from '../reducers/index';

export const RouterWithRedux = connect()(Router);

const createStoreWithMiddleware = compose(
  applyMiddleware(thunkMiddleware)
)(createStore);

export const configureStore = (initialState) => {
  return createStoreWithMiddleware(reducers, initialState);
}

