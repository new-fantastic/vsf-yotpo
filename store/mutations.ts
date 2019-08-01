import { MutationTree } from "vuex";
import * as types from "./mutation-types";
import Vue from "vue";

export const mutations: MutationTree<any> = {
  [types.SET_REVIEW](state, payload) {
    state.reviews[payload.id] = payload;
  },
  [types.SET_PRODUCT_REVIEWS](state, payload) {
    Vue.set(state.productReviews, payload.product_id, payload.reviews);
  },
  [types.SET_USER_REVIEWS](state, payload) {
    Vue.set(state.userReviews, payload.user_id, payload.reviews);
  },
  [types.SET_WIDGET_SITE_REVIEWS](state, payload) {
    state.widgetSiteReviews = payload;
  },
  [types.VOTE_UP_REVIEW](state, { review_id }) {
    // Update in reviews
    if (state.reviews.hasOwnProperty(review_id)) {
      Vue.set(
        state.reviews[review_id],
        "votes_up",
        state.reviews[review_id].votes_up + 1
      );
    }
  },
  [types.VOTE_DOWN_REVIEW](state, { review_id }) {
    if (state.reviews.hasOwnProperty(review_id)) {
      Vue.set(
        state.reviews[review_id],
        "votes_down",
        state.reviews[review_id].votes_up - 1
      );
    }
  }
};
