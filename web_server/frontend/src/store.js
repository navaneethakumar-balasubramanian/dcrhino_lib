import Vue from 'vue'
import Vuex from 'vuex'

import processed_holes from './stores/processed_holes'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    getters : {},
    mutations: {},
    actions:{},
    
    modules : {
      processed_holes
    }
  })