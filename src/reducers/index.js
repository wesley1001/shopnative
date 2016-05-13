import { combineReducers } from 'redux';

const initialState = {
  scene: {},
  irsDataMap: {}
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
    if (action.irsDataMap) {
      const irsDataObj = get(action, "irsDataMap", {});
      return assign({}, state, irsDataObj);
    }
    return state;

  default:
    return state;
  }
}

export default combineReducers({
  routes,
  irsDataMap
});
