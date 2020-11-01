// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill"
import Vue from 'vue'
import App from './App'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import store from './store/index';
// import 'jquery'
import {
  router
} from './router';
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'normalize.css';
import '../static/css/common.css';
import {
  post,
  fetch,
} from '@/plugin/axios';

import ajax from '@/plugin/request';
import {
  ToastPlugin
} from 'vux'
import Router from 'vue-router'
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(MintUI);
Vue.use(ToastPlugin);
Vue.prototype.$post = post;
Vue.prototype.$fetch = fetch;
Vue.prototype.$ajax = ajax;
Vue.config.productionTip = false;


let app = new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
});
export default app
