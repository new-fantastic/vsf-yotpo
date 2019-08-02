import { YotpoState } from "../types/YotpoState";
import { GetterTree } from "vuex";

export const getters: GetterTree<YotpoState, any> = {
  reviewById: state => index =>
    state.reviews.hasOwnProperty(index) ? state.reviews[index] : null,
  productReviewsById: state => index =>
    state.productReviews.hasOwnProperty(index) &&
    state.productReviews[index].hasOwnProperty("reviews")
      ? state.productReviews[index].reviews
      : null,
  // Above will return an array of probably one element!
  productDataById: state => index =>
    state.productReviews.hasOwnProperty(index) &&
    state.productReviews[index].hasOwnProperty("products")
      ? state.productReviews[index].products
      : null
};
