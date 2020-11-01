import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import echarts from "echarts";
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");
import { fetch, post, put,Delete, fetchGet } from "./utils/request";
import { ajxaGet, ajxaPost } from "./utils/ajax";

import { ajax } from "./plugins/axios";

Vue.prototype.$echarts = echarts;
Vue.prototype.$fetch = fetch;
Vue.prototype.$post = post;
Vue.prototype.$put = put;
Vue.prototype.$delete = Delete;
Vue.prototype.$fetchGet = fetchGet;
Vue.prototype.$get = ajxaGet;
Vue.prototype.$loginpost = ajxaPost; //登录post 方法
Vue.prototype.$ajax = ajax;
Vue.prototype.$moment = moment;
// Vue.prototype.commeUrl = commonURL;
Vue.config.productionTip = false;
Vue.prototype.eventBus = new Vue();

let eventBus = new Vue({
  methods: {
    emit(event, args) {
      this.$emit(event, args);
    },
    on(event, callback) {
      this.$on(event, callback);
    },
    off(event, callback) {
      this.$off(event, callback);
    }
  }
});
Vue.prototype.$eventBus = eventBus;

Vue.filter('timeFilter', function(value) {
  if (value == null || value.length < 4)
    return "";
  let date = new Date(value);
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
  return Y + M + D;

});
Vue.filter("replaceT", function(time) {
  //过滤时间串中的T
  if (!time) return "";
  return time.replace(/T/, " ");
});

Vue.filter("dateFilter", function(time) {
  //过滤时间串中的T
  if (!time) return "";
  return time.substring(0, 10);
});
var moneyFilter = function(val) {
  if (!isNaN(val) && val != null) {
    return parseFloat(val).toFixed(2);
  }
  if (val == null) return null;
  return "0.00";
};

Vue.filter("moneyFilter", val => {
  return moneyFilter(val);
});
Vue.filter("subFileName", function(url) {
  if (url != null && url != "") {
    var index = url.lastIndexOf("\\");
    return url.substring(index + 1, url.length);
  }
});

Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
