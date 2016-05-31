import get from "lodash/get";
import { getTileImages } from "../utils/regmatch"

export default class IrsDataAdapter {
  constructor(state, ownProps) {
    this.irsData = get(state, "irsDataMap.irsData");
    this.module = {};
    if (this.irsData) {
      if (!ownProps.placementId) {
        this.placementId = Object.keys(this.irsData)[0];
      } else {
        this.placementId = ownProps.placementId;
      }
      this.module = ownProps.module ?
        ownProps.module : get(this.irsData, this.placementId, {});
    }
  }

  /**
   */
  adapt() {
    if (this.module.length > 10) {
      console.log("irsdata-adapater module ---> ", this.placementId, this.module.substring(0, 20));
    }
    const items = getTileImages(this.module);
    console.log(" adapted items ---> ", items);
    const tiles = items.map((uri) => {
      return {
        uri: `http:${uri}`
      };
    });
    return {"items": tiles};
  }
}