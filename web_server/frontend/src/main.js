import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'


import VuetifyDaterangePicker from "vuetify-daterange-picker";
import "vuetify-daterange-picker/dist/vuetify-daterange-picker.css";
Vue.use(VuetifyDaterangePicker);

window.moment = require('moment')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  
  render: h => h(App)
}).$mount('#app')
