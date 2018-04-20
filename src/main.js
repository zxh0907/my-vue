// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store/index';
import router from './router'
import $api from './api/'
import * as filters from './filters'
import './service/flexible.js';

//注册api接口调用，在组件里调用方法：this.$api.getXXX(params)
Vue.prototype.$api = $api;

Vue.config.productionTip = false

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
