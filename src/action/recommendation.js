let React = require('react-native');
let {
  AlertIOS
} = React;
// import Promise from "bluebird";
// import {fetch} from "isomorphic-fetch";
import extend from "lodash/extend";
import isEmpty from "lodash/isEmpty";
import pick from "lodash/pick";

import { fetchIrsDataMap, fetchPage } from "../fetch/fetcher";
import { getWideImages, getTileImages } from "../utils/regmatch";

export const REQUEST_RECOMMENDATION = "REQUEST_RECOMMENDATION";
export const RECEIVE_IRSDATAMAP = "RECEIVE_IRSDATAMAP";
export const RECEIVE_P13NBANNER = "RECEIVE_P13NBANNER";
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

export const receiveIrsDataMap = (data) => {
  return {
    type: RECEIVE_IRSDATAMAP,
    data
  };
};

export const receiveP13nBanner = (data) => {
  return {
    type: RECEIVE_P13NBANNER,
    data
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
  const MOCK_IMAGE_SOURCES = {
    irsData: [
      {uri: 'http://i5.wal.co/dfw/4ff9c6c9-8c0a/k2-_a9517a22-823c-42e5-8bfb-45e73ac0c4c0.v1.jpg'},
      {uri: 'http://i5.wal.co/dfw/4ff9c6c9-7239/k2-_a78a666c-62a0-4ab1-884d-93b9c08328a4.v1.jpg'},
      {uri: 'http://i5.wal.co/dfw/4ff9c6c9-f7b2/k2-_252e9465-c782-4395-a355-68cc3cde6777.v1.jpg'},
      {uri: 'http://i5.wal.co/dfw/4ff9c6c9-bdae/k2-_4c974574-6fe3-465f-b450-c1d916bc4b4f.v1.jpg'}
    ]
  };
  return fetchIrsDataMap(opts)
    .then((responseJSON) => {
      const moduleList = responseJSON.moduleList;
      const irsData = moduleList.reduce((moduleMap, module) => {
        const {moduleId, html} = module;
        moduleMap[moduleId] = html;
        return moduleMap;
      }, {});
      // {irs-6-b2: "<div....>", irs-6-b1: "<div ...>"}
      console.log(" received irsdata ---> ", irsData);
      dispatch(receiveIrsDataMap({
        irsData
      }));
    })
    .catch((err) => {
      throw err;
    });
};

export const fetchHomePage = (page, queryParams = {}, extras= {} ) => (dispatch) => {
  const opts = {
    ...queryParams,
    page
  };
  const MOCK_DATA = {
    p13nBanner: extras.mockData
  };
  const p13nBanner = [];
  return fetchPage("http://www.walmart.com", opts)
    .then((responseHtml) => {
      const matched = getWideImages(responseHtml);
      matched.forEach( (uri) => {
        p13nBanner.push({
          uri: uri
        });
      });
      // dispatch(receiveP13nBanner(MOCK_DATA));
      dispatch(receiveP13nBanner({
        p13nBanner
      }));
    })
    .catch((err) => {
      throw err;
    });
};

