'use strict';
var React = require('react-native');
var {
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

export const p13nFetch = (opts) => {
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
  return p13nFetch(opts)
    .then((responseJSON) => {
      const resultDetail = responseJSON.result.resultDetail;
      const irsData = responseJSON.result.moduleList.reduce((dataMap, module) => {
        const placementId = getPlacementSuffix(module.placementId);
        dataMap[placementId] = module;
        return dataMap;
      }, {});
      return {
        irsData,
        resultDetail,
        visitorId: opts.visitorId
      };
    }).catch(() => {
      // If we have an error with the response don't render anything,
      // don't rethrow because that would cause the page request to return an error
      return {};
    });
};
