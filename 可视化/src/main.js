import Vue from 'vue'

import router from './router'
import store from './store'
import echarts from 'echarts'
import 'echarts-gl'
Vue.config.productionTip = false;

Vue.prototype.$echarts = echarts;
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import request from './utils/request'
import {post} from './utils/request'
import axios from 'axios'
// Vue.prototype.$post = post;
Vue.prototype.$axios = axios;
// Vue.prototype.$axios = request;
Vue.prototype.pathUrl = 'http://172.18.0.32:88/api';

Vue.use(ElementUI);
var index = 2019;
Vue.prototype.JDStatisticsData = {}
Vue.prototype.routerPath = function(path) {
    router.push({
        path: path
    })
};
Vue.prototype.idIndex = function() {
    return index--
};
import App from './App.vue'

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
Vue.filter('timeFilter', function (value) {
    if (value == null || value.length < 4)
        return "";
    let date = new Date(value);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    return Y + M + D;

})


