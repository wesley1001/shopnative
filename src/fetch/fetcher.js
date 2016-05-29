'use strict';
let React = require('react-native');

import queryString from "query-string";
import extend from "lodash/extend";
import isEmpty from "lodash/isEmpty";
import pick from "lodash/pick";

import Promise from "bluebird";

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

let MOCK_IMAGE_SOURCES = {
  irsData: [
    {uri: 'http://i5.wal.co/dfw/4ff9c6c9-8c0a/k2-_a9517a22-823c-42e5-8bfb-45e73ac0c4c0.v1.jpg'},
    {uri: 'http://i5.wal.co/dfw/4ff9c6c9-7239/k2-_a78a666c-62a0-4ab1-884d-93b9c08328a4.v1.jpg'},
    {uri: 'http://i5.wal.co/dfw/4ff9c6c9-f7b2/k2-_252e9465-c782-4395-a355-68cc3cde6777.v1.jpg'},
    {uri: 'http://i5.wal.co/dfw/4ff9c6c9-bdae/k2-_4c974574-6fe3-465f-b450-c1d916bc4b4f.v1.jpg'}
  ]
};

export const p13nFetch = (opts) => {
  // return Promise.resolve({});

  const parameters = extend(pick(opts, queryParams), {
    "clientGuid": "b151d211-5282-4d34-85de-cfe12266c5ce",
    "visitor_id": opts.visitorId,
    "parent_item_id": opts.parentItemId,
    "module": "Homepage",
    "parentItemId[]": opts.parentItemId,
    "page": opts.page
  });
  const url = "http://www.walmart.com/irs";
  const fetchUrl = `${url}?${queryString.stringify(parameters)}`;
  const fetchOpt = extend(opts, {method: "GET", credentials: "same-origin"});
  console.warn("fetchUrl ---> ", fetchUrl, fetchOpt);
  return fetch(fetchUrl, fetchOpt)
    .then((res) => {
      if (res.status >= 400) {
        return {
          err: `service response ${res.status}`
        };
      }
      return res.json();
      // return MOCK_IMAGE_SOURCES;
    }).then((data) => {
      // return data.text();
      console.warn("data --> ", data);
      return MOCK_IMAGE_SOURCES;
    }).catch((err) => {
      console.warn("err --> ", err);
      return {err};
    });
};

export const fetchIrsDataMap = (opts) => {
  return p13nFetch(opts)
    .then((responseJSON) => {
      // const resultDetail = responseJSON.result.resultDetail;
      // const irsData = responseJSON.result.moduleList.reduce((dataMap, module) => {
      //   const placementId = getPlacementSuffix(module.placementId);
      //   dataMap[placementId] = module;
      //   return dataMap;
      // }, {});
      const irsData = responseJSON;
      return irsData;
    }).catch(() => {
      // If we have an error with the response don't render anything,
      // don't rethrow because that would cause the page request to return an error
      return {};
    });
};

export const fetchPage = (url, opt) => {
  return fetch(url, {method: "GET", credentials: "same-origin"})
    .then((res) => {
      if (res.status >= 400) {
        return {
          err: `service response ${res.status}`
        };
      }
      return res.text();
    }).then((data) => {
      // return data.text();
      console.warn("data --> ", data);
      return data;
    }).catch((err) => {
      console.warn("err --> ", err);
      return {err};
    });
};
