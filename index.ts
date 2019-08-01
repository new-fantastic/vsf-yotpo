import { module } from "./store";
// import { plugin } from './store/plugin'
// import { beforeRegistration } from './hooks/beforeRegistration'
import { createModule } from "@vue-storefront/core/lib/module";
// import { beforeEach } from './router/beforeEach'
// import { afterEach } from './router/afterEach'
import { initCacheStorage } from "@vue-storefront/core/helpers/initCacheStorage";
import { AddReview } from "@vue-storefront/core/modules/review/components/AddReview";

export const KEY = "vsf-yotpo";
export const cacheStorage = initCacheStorage(KEY);
export const VsfYotpo = createModule({
  key: KEY,
  store: { modules: [{ key: KEY, module }] }
});

/* Tests to write
    - AddReview.js
      - dispatches action with proper payload
      - resets form after send
      - resetForm resets form
    - VoteOnReview.js
      - dispatches action with proper payload
    - GetKey.ts
      - optional config? parameter
      - test it
    - Actions
      - write util function for creating action
      - test it
      - move hasNeededFields to helpers
      - test hasNeededFields
      - move attachQueryStrings to helpers
      - test attachQueryStrings
      - rewrite actions to use actionFactory
      - prepare url patterns and autofill them
      - test it
  Remove afterRegistration
  Improve
*/
