import { module } from "./store";
// import { plugin } from './store/plugin'
// import { beforeRegistration } from './hooks/beforeRegistration'
import { createModule } from "@vue-storefront/core/lib/module";
// import { beforeEach } from './router/beforeEach'
// import { afterEach } from './router/afterEach'
import { initCacheStorage } from "@vue-storefront/core/helpers/initCacheStorage";
import { KEY } from "./const";

export const cacheStorage = initCacheStorage(KEY);
export const VsfYotpo = createModule({
  key: KEY,
  store: { modules: [{ key: KEY, module }] }
});

/* Tests to write
    - [DONE] AddReview.js
      - dispatches action with proper payload
      - resets form after send
      - resetForm resets form
    - [DONE] VoteOnReview.js
      - dispatches action with proper payload
    - [DONE] GetKey.ts
      - optional config? parameter
      - test it
    - Actions
      - [DONE] move hasNeededFields to helpers
      - [DONE] test hasNeededFields
      - [DONE] move attachQueryStrings to helpers
      - [DONE] test attachQueryStrings
      - [PREAPRING] write util function for creating action
      - [PREAPRING] test it
      - rewrite actions to use actionFactory
      - prepare url patterns and autofill them
      - test it
  Remove afterRegistration
  Improve
*/
