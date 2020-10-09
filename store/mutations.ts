import { MutationTree } from 'vuex';
import * as types from './mutation-types';
import Vue from 'vue';

export const mutations: MutationTree<any> = {
  [types.SET_REVIEW](state, payload) {
    state.reviews[payload.id] = payload;
  },
  [types.SET_PRODUCT_REVIEWS](state, payload) {
    Vue.set(state.productReviews, payload.product_id, payload.payload);
  },
  [types.SET_PRODUCT_BOTTOMLINE](state, payload) {
    if (state.productReviews.hasOwnProperty(payload.product_id)) {
      Vue.set(
        state.productReviews[payload.product_id],
        'bottomline',
        payload.content
      );
    } else {
      Vue.set(state.productReviews, payload.product_id, {});
      Vue.set(
        state.productReviews[payload.product_id],
        'bottomline',
        payload.content
      );
    }
  },
  [types.SET_PRODUCT_IMAGES](state, payload) {
    // Inside images we have
    // pagination and images keys
    if (state.productReviews.hasOwnProperty(payload.product_id)) {
      Vue.set(state.productReviews[payload.product_id], 'images', {
        images: payload.image.images,
        pagination: payload.image.pagination
      });
    } else {
      Vue.set(state.productReviews, payload.product_id, {});
      Vue.set(state.productReviews[payload.product_id], 'images', {
        images: payload.image.images,
        pagination: payload.image.pagination
      });
    }
  },
  [types.SET_ALBUM_PHOTOS](state, payload) {
    if (payload.merge) {
      Vue.set(state.albums[payload.album_name], 'images', [
        ...state.albums[payload.album_name].images,
        ...payload.content.images
      ]);
    } else {
      Vue.set(state.albums, payload.album_name, payload.content);
    }
  },
  [types.SET_USER_REVIEWS](state, payload) {
    Vue.set(state.userReviews, payload.user_id, payload.reviews);
  },
  [types.SET_WIDGET_SITE_REVIEWS](state, payload) {
    state.widgetSiteReviews = payload;
  },
  [types.VOTE_UP_REVIEW](state, payload) {
    // Update in reviews
    if (state.reviews.hasOwnProperty(payload.review_id)) {
      Vue.set(
        state.reviews[payload.review_id],
        'votes_up',
        state.reviews[payload.review_id].votes_up + 1
      );
    }
    // if (payload.hasOwnProperty("sku")) {
    //   if (state.productReviews.hasOwnProperty(payload.sku)) {
    //     const index = state.productReviews[payload.sku].reviews.findIndex(
    //       v => v.id === payload.review_id
    //     );
    //     if (index) {
    //       Vue.set(
    //         state.productReviews[payload.sku].reviews,
    //         index,
    //         state.productReviews[payload.sku].reviews[index] + 1
    //       );
    //     }
    //   }
    // }
  },
  [types.VOTE_DOWN_REVIEW](state, payload) {
    if (state.reviews.hasOwnProperty(payload.review_id)) {
      Vue.set(
        state.reviews[payload.review_id],
        'votes_down',
        state.reviews[payload.review_id].votes_up - 1
      );
    }
    // if (payload.hasOwnProperty("sku")) {
    //   if (state.productReviews.hasOwnProperty(payload.sku)) {
    //     const index = state.productReviews[payload.sku].reviews.findIndex(
    //       v => v.id === payload.review_id
    //     );
    //     if (index) {
    //       Vue.set(
    //         state.productReviews[payload.sku].reviews,
    //         index,
    //         state.productReviews[payload.sku].reviews[index] + 1
    //       );
    //     }
    //   }
    // }
  },

  [types.SET_TOTALS](state, payload) {
    state.totals = payload;
  },
  [types.SET_REVIEWS_PER_STORE](state, payload) {
    state.reviewsPerStoreCounter = payload.bottomline
    state.reviewsPerStore.push(...payload.reviews)
  }
};
