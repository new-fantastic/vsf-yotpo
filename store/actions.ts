import { YotpoState } from "../types/YotpoState";
import { ActionTree } from "vuex";
import * as types from "./mutation-types";

import { cacheStorage } from "../";

import GetKey from "../helpers/GetKey";

const baseUrl = "https://api.yotpo.com/";
const domain = "http://localhost.pl/";

const hasNeededFields = (object, fields: string[]) => {
  const keys = Object.keys(object);
  for (let field of fields) {
    if (!keys.includes(field)) {
      return false;
    }
  }
  return true;
};

const attachQueryStrings = (url: string, queries: object) => {
  let base = url + "?";
  let values = [];
  for (const [key, value] of Object.entries(queries)) {
    values.push(`${key}=${value}`);
  }
  base += values.join("&");
  return base;
};

export const actions: ActionTree<YotpoState, any> = {
  async addReview({ commit }, payload) {
    if (
      hasNeededFields(payload, [
        "sku",
        "product_title",
        "product_description",
        "product_url",
        "product_image_url",
        "display_name",
        "email",
        "review_content",
        "review_title",
        "review_score"
      ])
    ) {
      try {
        const appkey = GetKey();
        await fetch(`${baseUrl}v1/widget/reviews`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ...payload,
            appkey,
            domain
          })
        });
      } catch (e) {
        throw new Error(e);
      }
    } else {
      throw new Error("Yotpo - Add review - Necessary fields not provided");
    }
  },
  async voteOnReview({ commit }, payload) {
    if (hasNeededFields(payload, ["review_id", "updown"])) {
      try {
        await fetch(
          `${baseUrl}reviews/${payload.review_id}/vote/${payload.updown}`,
          {
            method: "POST"
          }
        );
        commit(
          payload.updown === "up"
            ? types.VOTE_UP_REVIEW
            : types.VOTE_DOWN_REVIEW,
          { review_id: payload.review_id }
        );
      } catch (e) {
        throw new Error(e);
      }
    } else {
      throw new Error("Yotpo - Vote review - Necessary fields not provided");
    }
  },
  async loadCertainReview({ commit }, { review_id }) {
    try {
      let res = await fetch(`${baseUrl}reviews/${review_id}}`);
      let { response } = await res.json();

      commit(types.SET_REVIEW, response.review);
    } catch (e) {
      throw new Error(e);
    }
  },
  async loadProductReviews({ commit }, payload) {
    try {
      const appkey = GetKey();
      let url = `${baseUrl}v1/widget/${appkey}/products/${
        payload.sku
      }/reviews.json`;
      let additionalFields = ["per_page", "page", "start", "sort", "direction"];
      let additionalValues = {};
      for (let field of additionalFields) {
        if (payload.hasOwnProperty(field)) {
          additionalValues[field] = payload[field];
        }
      }
      if (Object.keys(additionalValues).length > 0) {
        url = attachQueryStrings(url, additionalValues);
      }

      let res = await fetch(url);
      let { response } = await res.json();

      commit(types.SET_PRODUCT_REVIEWS, {
        product_id: payload.sku,
        reviews: response.reviews
      });
    } catch (e) {
      throw new Error(e);
    }
  },
  async loadUserReviews({ commit }, payload) {
    // NEEDED PREMIUM PLAN
    try {
      const appkey = GetKey();
      let url = `${baseUrl}products/${appkey}/yotpo_global_reviews/reviews.json`;
      let additionalFields = [
        "since_id",
        "since_date",
        "since_updated_at",
        "count",
        "page"
      ];
      let additionalValues = {
        user_reference: payload.user_id
      };
      for (let field of additionalFields) {
        if (payload.hasOwnProperty(field)) {
          additionalValues[field] = payload[field];
        }
      }
      url = attachQueryStrings(url, additionalValues);

      let res = await fetch(url);
      let { response } = await res.json();

      commit(types.SET_USER_REVIEWS, {
        user_id: payload.user_id,
        reviews: response.reviews
      });
    } catch (e) {
      throw new Error(e);
    }
  },
  async loadWidgetSiteReviews({ commit }, payload = {}) {
    try {
      const appkey = GetKey();

      let url = `${baseUrl}v1/widget/${appkey}/products/yotpo_site_reviews/reviews.json`;
      let additionalFields = ["per_page", "page"];
      let additionalValues = {};
      for (let field of additionalFields) {
        if (payload.hasOwnProperty(field)) {
          additionalValues[field] = payload[field];
        }
      }
      if (Object.keys(additionalValues).length > 0) {
        url = attachQueryStrings(url, additionalValues);
      }

      let res = await fetch(url);
      let { response } = await res.json();

      commit(types.SET_WIDGET_SITE_REVIEWS, response);
    } catch (e) {
      throw new Error(e);
    }
  }
  // async loadProductReviews({ commit }, sku) {
  //   try {
  //     let { data } = await fetch()
  //   } catch(e) {

  //   }
  //   return new Promise((resolve, reject) => {
  //     cacheStorage
  //       .getItem("user")
  //       .then(userData => {
  //         commit(types.SET_USERS, userData);
  //         resolve(userData);
  //       })
  //       .catch(() => reject());
  //   });
  // }
};
