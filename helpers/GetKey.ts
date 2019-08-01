import { isMultilangSet, hasMultilangProperStructure } from "./Multilang";
import { hasSinglelangProperStructure } from "./Singlelang";
import { currentStoreView } from "@vue-storefront/core/lib/multistore";
import config from "config";

export default () => {
  if (isMultilangSet()) {
    try {
      hasMultilangProperStructure();
      const { storeCode } = currentStoreView();
      if (!config.yotpo.langs.hasOwnProperty(storeCode)) {
        throw new Error(
          "Yotpo - Bad config - Store code " + storeCode + "is not configured"
        );
      }

      return config.yotpo.langs[storeCode].app_key;
    } catch (e) {
      console.error(e);
      return;
    }
  } else {
    try {
      hasSinglelangProperStructure();
      return config.yotpo.app_key;
    } catch (e) {
      console.error(e);
      return;
    }
  }
};
