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
    console.log("irsdata-adapater ---> ", this.module.html);
    const items = getTileImages(this.module.html);
    return {"items": items};
  }
}