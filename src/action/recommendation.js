import queryString from "query-string";
import fetchIrsDataMap from "../fetch/fetcher";

export const REQUEST_RECOMMENDATION = "REQUEST_RECOMMENDATION";
export const RECEIVE_IRSDATAMAP = "RECEIVE_IRSDATAMAP";
export const INVALIDATE_RECOMMENDATION = "INVALIDATE_RECOMMENDATION";
export const SELECT_RECOMMENDATION = "SELECT_RECOMMENDATION";
export const P13N_RENDERED = "P13N_RENDERED";
export const P13N_TILE_CLICKED = "P13N_TILE_CLICKED";

export const selectRecommendation = (productId) => {
  return {
    type: SELECT_RECOMMENDATION,
    productId
  };
};

export const invalidateRecommendation = (err) => {
  return {
    type: INVALIDATE_RECOMMENDATION,
    err
  };
};

export const requestRecommendation = (productId) => {
  return {
    type: REQUEST_RECOMMENDATION,
    productId
  };
};

export const receiveIrsDataMap = (json) => {
  return {
    type: RECEIVE_IRSDATAMAP,
    irsDataMap: json.irsData
  };
};

export const p13nTileClicked = () => {
  return {
    type: P13N_TILE_CLICKED
  };
};

export const ajaxRequest = (page, parentItemId, queryParams = {}) => (dispatch) => {
  const opts = {
    ...queryParams,
    page,
    parentItemId
  };
  return fetchIrsDataMap(opts)
    .then((responseJSON) => {
      dispatch(receiveIrsDataMap(responseJSON));
    })
    .catch((err) => {
      throw err;
    });
};
