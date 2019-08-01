import { YotpoState } from "../types/YotpoState";
import { ActionTree } from "vuex";
import * as types from "./mutation-types";

import { cacheStorage } from "../";

import GetKey from "../helpers/GetKey";

const baseUrl = "https://api.yotpo.com/v1/";
const domain = "http://localhost.pl/";

const hasNeededFields = (object, fields: string[]) => {
  const keys = Object.keys(object);
  console.log(keys, fields);
  for (let field of fields) {
    if (!keys.includes(field)) {
      return false;
    }
  }
  return true;
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
        await fetch(`${baseUrl}widget/reviews`, {
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
        const appkey = GetKey();
        await fetch(
          `${baseUrl}reviews/${payload.review_id}/vote/${payload.updown}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              ...payload,
              appkey,
              domain
            })
          }
        );
      } catch (e) {
        throw new Error(e);
      }
    } else {
      throw new Error("Yotpo - Vote review - Necessary fields not provided");
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
