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

export const p13nFetch = (opts) => {
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
  console.log("fetchUrl ---> ", fetchUrl, fetchOpt);
  return fetch(fetchUrl, fetchOpt)
    .then((res) => {
      if (res.status >= 400) {
        return {
          err: `service response ${res.status}`
        };
      }
      return res.json();
    }).then((data) => {
      console.log("data --> ", data);
      return data;
    }).catch((err) => {
      console.warn("err --> ", err);
      return {err};
    });
};

export const fetchIrsDataMap = (opts) => {
  return p13nFetch(opts)
    .then((responseJSON) => {
      return responseJSON;
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
      return res.text();  // response is rendered html as plain/text
    }).then((data) => {
      return data;
    }).catch((err) => {
      console.warn("err --> ", err);
      return {err};
    });
};
