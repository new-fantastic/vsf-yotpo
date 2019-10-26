import { isMultilangSet, hasMultilangProperStructure } from "./Multilang";
import { hasSinglelangProperStructure } from "./Singlelang";
import { currentStoreView } from "@vue-storefront/core/lib/multistore";
import config from "config";

export default (customConfig?) => {
  const cfg = customConfig ? customConfig : config;

  if (isMultilangSet(cfg)) {
    try {
      hasMultilangProperStructure(cfg);
      const { storeCode } = currentStoreView();
      if (!cfg.yotpo.langs.hasOwnProperty(storeCode)) {
        console.log(
          "Yotpo - Store code " + storeCode + " is not configured. Fallback to eu/es"
        );
        if (storeCode === 'mx') {
          return cfg.yotpo.langs['es'].app_key;
        } else {
          return cfg.yotpo.langs['eu'].app_key;
        }
      }

      return cfg.yotpo.langs[storeCode].app_key; 
    } catch (e) {
      console.error(e);
      return;
    }
  } else {
    try {
      hasSinglelangProperStructure(cfg);
      return cfg.yotpo.app_key;
    } catch (e) {
      console.error(e);
      return;
    }
  }
};
