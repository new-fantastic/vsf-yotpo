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
      : null,

  productImages: state => index =>
    state.productReviews.hasOwnProperty(index) &&
    state.productReviews[index].hasOwnProperty("images") &&
    state.productReviews[index].images.hasOwnProperty("images")
      ? state.productReviews[index].images.images
      : null,

  productImagesPagination: state => index =>
    state.productReviews.hasOwnProperty(index) &&
    state.productReviews[index].hasOwnProperty("images") &&
    state.productReviews[index].images.hasOwnProperty("pagination")
      ? state.productReviews[index].images.pagination
      : null,

  siteReviews: state =>
    state.widgetSiteReviews.hasOwnProperty("reviews")
      ? state.widgetSiteReviews.reviews
      : null,

  siteProducts: state =>
    state.widgetSiteReviews.hasOwnProperty("products")
      ? state.widgetSiteReviews.products
      : null,

  siteBottomline: state =>
    state.widgetSiteReviews.hasOwnProperty("bottomline")
      ? state.widgetSiteReviews.bottomline
      : null,

  sitePagination: state =>
    state.widgetSiteReviews.hasOwnProperty("pagination")
      ? state.widgetSiteReviews.pagination
      : null,

  albumByName: state => name =>
    state.albums.hasOwnProperty(name) ? state.albums[name] : null,

  albumsImages: state => name =>
    state.albums.hasOwnProperty(name) &&
    state.albums[name].hasOwnProperty("images")
      ? state.albums[name].images
      : null,

  albumsPagination: state => name =>
    state.albums.hasOwnProperty(name) &&
    state.albums[name].hasOwnProperty("pagination")
      ? state.albums[name].pagination
      : null
};
