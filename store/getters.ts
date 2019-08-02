import { YotpoState } from "../types/YotpoState";
import { GetterTree } from "vuex";

export const getters: GetterTree<YotpoState, any> = {
  reviewById: state => index =>
    state.reviews.hasOwnProperty(index) ? state.reviews[index] : null,
  abc: state => "abc"
};
