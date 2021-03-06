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
