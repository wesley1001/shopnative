'use strict';
let React = require('react-native');
let {
  AlertIOS
} = React;

import queryString from "query-string";

import extend from "lodash/extend";
import isEmpty from "lodash/isEmpty";
import pick from "lodash/pick";


/* jshint camelcase: false */
export const queryParams = [
  "parent_item_id",
  "placement",
  "category",
  "strategy",
  "visitor_id",
  "to_shipping_threshold",
  "template",
  "filtered_items",
  "cache_pipeline"
];
/* jshint camelcase: true */

let MOCK_IMAGE_SOURCES = {
  irsData: [
    {uri: 'http://i5.wal.co/dfw/4ff9c6c9-8c0a/k2-_a9517a22-823c-42e5-8bfb-45e73ac0c4c0.v1.jpg'},
    {uri: 'http://i5.wal.co/dfw/4ff9c6c9-7239/k2-_a78a666c-62a0-4ab1-884d-93b9c08328a4.v1.jpg'},
    {uri: 'http://i5.wal.co/dfw/4ff9c6c9-f7b2/k2-_252e9465-c782-4395-a355-68cc3cde6777.v1.jpg'},
    {uri: 'http://i5.wal.co/dfw/4ff9c6c9-bdae/k2-_4c974574-6fe3-465f-b450-c1d916bc4b4f.v1.jpg'}
  ]
};

export const p13nFetch = (opts) => {
  AlertIOS.alert("p13nFetch url :", opts);
  return null;
  if (isEmpty(opts)) {
    return null;
  }
  /* jshint camelcase: false */
  const parameters = extend(pick(opts, queryParams), {
    "visitor_id": opts.visitorId,
    "parent_item_id": opts.parentItemId,
    "page": opts.page
  });
  /* jshint camelcase: true */
  const url = "www.walmart.com/irs?"
  const fetchUrl = `${url}${irsPath}?${queryString.stringify(parameters)}`;
  const fetchOpt = extend(opts, {method: "GET", credentials: "same-origin"});
  AlertIOS.alert("fetching url :", fetchUrl);
  return fetch(fetchUrl, fetchOpt).then((res) => {
    if (res.status >= 400) {
      return {
        err: `service response ${res.status}`
      };
    }
    return res.json();
  }).then((data) => {
    AlertIOS.alert(data);
    // return data.text();
    return data.text();
  }).catch((err) => {
    return {err};
  });
};

export const fetchIrsDataMap = (opts) => {
  return MOCK_IMAGE_SOURCES;
  // return p13nFetch(opts)
  //   .then((responseJSON) => {
  //     const resultDetail = responseJSON.result.resultDetail;
  //     const irsData = responseJSON.result.moduleList.reduce((dataMap, module) => {
  //       const placementId = getPlacementSuffix(module.placementId);
  //       dataMap[placementId] = module;
  //       return dataMap;
  //     }, {});
  //     return {
  //       irsData,
  //       resultDetail,
  //       visitorId: opts.visitorId
  //     };
  //   }).catch(() => {
  //     // If we have an error with the response don't render anything,
  //     // don't rethrow because that would cause the page request to return an error
  //     return {};
  //   });
};