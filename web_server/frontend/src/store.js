import Vue from "vue";
import Vuex from "vuex";

import processed_holes from "./stores/processed_holes";
import hole_info from "./stores/hole_info";
import comparison_hole_info from "./stores/comparison_hole_info";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},

  modules: {
    processed_holes,
    hole_info,
    comparison_hole_info
  }
});
