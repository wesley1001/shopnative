import { combineReducers } from 'redux';
import get from "lodash/get";
import assign from "object-assign"

const initialState = {
  scene: {}
};

export const routes = (state = initialState, action = {}) => {
  switch (action.type) {
    // focus action is dispatched when a new screen comes into focus
    case "focus":
      return {
        ...state,
        scene: action.scene,
      };

    // ...other actions

    default:
      return state;
  }
}

export const irsDataMap = (state = initialState, action = {}) => {
  let MOCK_IMAGE_SOURCES = {
    irsData: [
      {uri: 'http://i5.wal.co/dfw/4ff9c6c9-8c0a/k2-_a9517a22-823c-42e5-8bfb-45e73ac0c4c0.v1.jpg'},
      {uri: 'http://i5.wal.co/dfw/4ff9c6c9-7239/k2-_a78a666c-62a0-4ab1-884d-93b9c08328a4.v1.jpg'},
      {uri: 'http://i5.wal.co/dfw/4ff9c6c9-f7b2/k2-_252e9465-c782-4395-a355-68cc3cde6777.v1.jpg'},
      {uri: 'http://i5.wal.co/dfw/4ff9c6c9-bdae/k2-_4c974574-6fe3-465f-b450-c1d916bc4b4f.v1.jpg'}
    ]
  };
  switch (action.type) {
  case "RECEIVE_IRSDATAMAP":
    if (action.data) {
      const irsDataObj = get(action, "data", {});
      // irsdata 
      return assign({}, state, irsDataObj);
    }
    return state;
  case "RECEIVE_P13NBANNER":
    if (action.data) {
      const bannerData = get(action, "data", {});
      // bannerData is an object of {p13nBanner: []}
      return assign({}, state, bannerData);
    }
  default:
    return state;
  }
}

//
// state.irsDataMap.irsData.irs-6-b1: []
// state.irsDataMap.p13nBanner: []
//
export default combineReducers({
  routes,
  irsDataMap
});
