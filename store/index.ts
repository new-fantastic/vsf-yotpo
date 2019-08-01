import { Module } from "vuex";
import { YotpoState } from "../types/YotpoState";
import { mutations } from "./mutations";
import { getters } from "./getters";
import { actions } from "./actions";
import { state } from "./state";

export const module: Module<YotpoState, any> = {
  namespaced: true,
  mutations,
  actions,
  getters,
  state
};
