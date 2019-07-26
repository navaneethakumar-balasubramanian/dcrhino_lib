import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
});


window.arrayRemove = function (arr, value) {

  return arr.filter(function(ele){
      return ele != value;
  });

}