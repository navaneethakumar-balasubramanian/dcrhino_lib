import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";

import axios from "axios";
import store from "./store";

import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
Vue.component('date-range-picker', DateRangePicker);
window.moment = require("moment");
axios.defaults.baseURL = process.env.VUE_APP_API_SERVER;


window.axios = axios;



Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");


