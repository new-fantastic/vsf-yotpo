import { Logger } from "@vue-storefront/core/lib/logger";
import { currentStoreView } from "@vue-storefront/core/lib/multistore";
import {
  isMultilangSet,
  hasMultilangProperStructure
} from "../helpers/Multilang";
import { hasSinglelangProperStructure } from "../helpers/Singlelang";

export function afterRegistration({ Vue, config, store, isServer }) {
  if (!isServer) {
    let appKey = null;
    if (isMultilangSet()) {
      try {
        hasMultilangProperStructure();
        const { storeCode } = currentStoreView();
        if (!config.yotpo.langs.hasOwnProperty(storeCode)) {
          throw new Error(
            "Yotpo - Bad config - Store code " + storeCode + "is not configured"
          );
        }

        appKey = config.yotpo.langs[storeCode].app_key;
      } catch (e) {
        console.error(e);
        return;
      }
    } else {
      try {
        hasSinglelangProperStructure();
        appKey = config.yotpo.app_key;
      } catch (e) {
        console.error(e);
        return;
      }
    }

    // var e = document.createElement("script");
    // (e.type = "text/javascript"),
    //   (e.async = true),
    //   (e.src = `//staticw2.yotpo.com/${appKey}/widget.js`);
    // var t = document.getElementsByTagName("script")[0];
    // t.parentNode.insertBefore(e, t);
  }
}
