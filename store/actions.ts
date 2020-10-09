import { YotpoState } from '../types/YotpoState';
import { ActionTree } from 'vuex';
import * as types from './mutation-types';

import fetch from 'isomorphic-fetch';

import GetKey from '../helpers/GetKey';
import ActionFactory from '../helpers/ActionFactory';
import { currentStoreView } from '@vue-storefront/core/lib/multistore';
import config from 'config';

import SideRequest from '@vue-storefront/core/lib/side-request';

const baseUrl = 'https://api.yotpo.com/';
const domain = 'http://localhost.pl/';

export const actions: ActionTree<YotpoState, any> = {
  addReview: ActionFactory({
    neededFields: [
      'sku',
      'product_title',
      'product_description',
      'product_url',
      'product_image_url',
      'display_name',
      'email',
      'review_content',
      'review_title',
      'review_score'
    ],
    url: {
      href: `${baseUrl}v1/widget/reviews`
    },
    method: 'POST',
    body: {
      appkey: true,
      domain
    }
  }),
  async voteOnReview(store, payload) {
    await ActionFactory({
      neededFields: ['review_id', 'updown'],
      url: {
        href: `${baseUrl}reviews/<review_id>/vote/<updown>`,
        fillers: {
          review_id: payload.review_id,
          updown: payload.updown
        }
      },
      method: 'POST',
      body: {
        appkey: true,
        domain
      },
      error: 'Yotpo - Vote review - Necessary fields not provided',
      onSuccess(response) {
        store.commit(
          payload.updown === 'up'
            ? types.VOTE_UP_REVIEW
            : types.VOTE_DOWN_REVIEW,
          payload
        );
      }
    })(store, payload);
  },
  async loadCertainReview(store, payload) {
    await ActionFactory({
      neededFields: ['review_id'],
      url: {
        href: `${baseUrl}reviews/<review_id>`,
        fillers: {
          review_id: payload.review_id
        }
      },
      body: {
        appkey: true,
        domain
      },
      error: 'Yotpo - Load certain review - Something went wrong',
      onSuccess(response) {
        store.commit(types.SET_REVIEW, response.review);
      }
    })(store, payload);
  },
  async loadProductReviews(store, payload) {
    let additionalFields = ['per_page', 'page', 'start', 'sort', 'direction'];
    let additionalValues = {};
    for (let field of additionalFields) {
      if (payload.hasOwnProperty(field)) {
        additionalValues[field] = payload[field];
      }
    }
    await ActionFactory({
      neededFields: ['sku'],
      url: {
        href: `${baseUrl}v1/widget/<appkey>/products/<sku>/reviews.json`,
        fillers: {
          appkey: GetKey(),
          sku: payload.sku
        }
      },
      body: {},
      queries: additionalValues,
      error: 'Yotpo - Load product reviews - Something went wrong',
      onSuccess(response) {
        store.commit(types.SET_PRODUCT_REVIEWS, {
          product_id: payload.sku,
          payload: response
        });
      },
      onFailure(err) {
        console.log(err);
      }
    })(store, payload);
  },
  async loadUserReviews(store, payload) {
    let additionalFields = [
      'since_id',
      'since_date',
      'since_updated_at',
      'count',
      'page'
    ];
    let additionalValues = {
      user_reference: payload.user_id
    };
    for (let field of additionalFields) {
      if (payload.hasOwnProperty(field)) {
        additionalValues[field] = payload[field];
      }
    }

    await ActionFactory({
      neededFields: ['user_id'],
      url: {
        href: `${baseUrl}products/<appkey>/yotpo_global_reviews/reviews.json`,
        fillers: {
          appkey: GetKey()
        }
      },
      body: {},
      queries: additionalValues,
      error: 'Yotpo - Load product reviews - Something went wrong',
      onSuccess(response) {
        store.commit(types.SET_USER_REVIEWS, {
          user_id: payload.user_id,
          reviews: response.reviews
        });
      }
    })(store, payload);
  },
  async loadWidgetSiteReviews(store, payload = {}) {
    let additionalFields = ['per_page', 'page'];
    let additionalValues = {};
    for (let field of additionalFields) {
      if (payload.hasOwnProperty(field)) {
        additionalValues[field] = payload[field];
      }
    }

    await ActionFactory({
      url: {
        href: `${baseUrl}v1/widget/<appkey>/products/yotpo_site_reviews/reviews.json`,
        fillers: {
          appkey: GetKey()
        }
      },
      body: {},
      queries: additionalValues,
      error: 'Yotpo - Load product reviews - Something went wrong',
      onSuccess(response) {
        store.commit(types.SET_WIDGET_SITE_REVIEWS, response);
      }
    })(store, payload);
  },

  async loadBottomLine(store, payload) {
    await ActionFactory({
      url: {
        href: `${baseUrl}products/<appkey>/<product_id>/bottomline`,
        fillers: {
          appkey: GetKey(),
          product_id: payload.sku
        }
      },
      body: {},
      error: 'Yotpo - Load bottom line - Something went wrong',
      onSuccess(response) {
        store.commit(types.SET_PRODUCT_BOTTOMLINE, {
          product_id: payload.sku,
          content: response.bottomline
        });
      }
    })(store, payload);
  },

  async loadPhotosByAlbum(store, payload) {
    let additionalFields = ['page', 'per_page'];
    let additionalValues = {};
    for (let field of additionalFields) {
      if (payload.additionalFields.hasOwnProperty(field)) {
        additionalValues[field] = payload.additionalFields[field];
      }
    }

    await ActionFactory({
      neededFields: ['album_name'],
      url: {
        href: `${baseUrl}v1/widget/<appkey>/albums/by_name`,
        fillers: {
          appkey: GetKey()
        }
      },
      queries: {
        album_name: payload.album_name,
        ...additionalValues
      },
      body: {},
      error: 'Yotpo - Load photos by album - Something went wrong',
      onSuccess(response) {
        // Hmm?
        store.commit(types.SET_ALBUM_PHOTOS, {
          album_name: payload.album_name,
          content: response,
          merge: payload.additionalFields && payload.additionalFields.merge
        });
      }
    })(store, payload);
  },

  async loadProductsImages(store, payload) {
    let additionalFields = ['page', 'per_page'];
    let additionalValues = {};
    for (let field of additionalFields) {
      if (payload.hasOwnProperty(field)) {
        additionalValues[field] = payload[field];
      }
    }

    await ActionFactory({
      neededFields: ['sku'],
      url: {
        href: `${baseUrl}v1/widget/<appkey>/albums/product/<product_id>`,
        fillers: {
          appkey: GetKey(),
          product_id: payload.sku
        }
      },
      body: {},
      error: 'Yotpo - Load products image - Something went wrong',
      onSuccess(response) {
        // Hmm?
        store.commit(types.SET_PRODUCT_IMAGES, {
          product_id: payload.sku,
          image: response
        });
      }
    })(store, payload);
  },

  async loadTotals({ commit }) {
    try {
      const { storeCode } = currentStoreView();
      let r = await fetch(`${SideRequest(config.api, 'url')}ext/yotpo/${storeCode}`);
      let { result } = await r.json();
      commit(types.SET_TOTALS, result);
    } catch (err) {
      console.error(err);
    }
  },

  async loadReviewsPerStore({ commit }, { page = 1 }) {
    try {
      const appKey = GetKey()
      const reviewsPerPage = 10
      const res = await fetch(`${baseUrl}products/${appKey}/yotpo_global_reviews/reviews.json?count=${reviewsPerPage}&page=${page}`)
      const { response } = await res.json()
      commit(types.SET_REVIEWS_PER_STORE, response)
    } catch (err) {
      console.log(err)
    }
  }
};
