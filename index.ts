import { module } from './store';
// import { plugin } from './store/plugin'
import { afterRegistration } from './hooks/afterRegistration';
import { createModule } from '@vue-storefront/core/lib/module';
// import { beforeEach } from './router/beforeEach'
// import { afterEach } from './router/afterEach'
// import { initCacheStorage } from "@vue-storefront/core/helpers/initCacheStorage";
import { KEY } from './const';

// export const cacheStorage = initCacheStorage(KEY);
export const VsfYotpo = createModule({
  key: KEY,
  store: { modules: [{ key: KEY, module }] },
  afterRegistration
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
      - [DONE] write util function for creating action
      - [DONE] test it
      - [DONE] rewrite actions to use actionFactory
      - [DONE] prepare url patterns and autofill them
      - [DONE] test it
      - Add support for additional fields
      - Do not override state when fetching more pages!
      - Additional fields for adding a review
      - Inmixin prefix to CONST KEY
  Remove afterRegistration
  Improve
*/
