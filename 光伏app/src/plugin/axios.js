import axios from 'axios';
import app from './../main'


import {
  Indicator
} from 'mint-ui';
axios.defaults.timeout = 60000;
const commonApi = webCommonApi;
export {
  commonApi
}
axios.defaults.baseURL = commonApi;
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

let loading //定义loading变量

let needLoadingRequestCount = 0

function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    });
  }
  needLoadingRequestCount++
}

function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    Indicator.close()
  }
}

// 请求拦截器
axios.interceptors.request.use(
  config => {
    let token = localStorage.getItem("token");
    token && (config.headers.Authorization = 'Bearer ' + token);
    showFullScreenLoading();
    return config;
  },
  err => {
    return Promise.reject(err);
  });

// 响应 拦截器
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      if (response.data.code == 401) { //状态401 为通用状态
        Toast(response.data.message)
        setTimeout(() => {
          app.$router.push({
            name: 'login'
          });
        }, 200)

      } else {
        setTimeout(_=>{
          tryHideFullScreenLoading();
        },500)
        
        return Promise.resolve(response);
      }


    } else {
      tryHideFullScreenLoading();
      return Promise.reject(response);
    }

  },
  error => {
    if (error.code == 'ECONNABORTED' && error.message.indexOf('timeout') != -1) {
      Notification.error('请求超时，请重新操作')
    };
    tryHideFullScreenLoading();
    return Promise.reject(error) // 返回接口返回的错误信息
  });
/**
 * 封装get方法
 * @param url
 * @param params
 * @returns {Promise}
 */

export function fetch(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios({
      url: url,
      method: 'get',
      params: params,
      // responseType: 'json',
    }).then((res) => {
      if (res && res.data) {
        resolve(res.data);
      }
    }).catch((error) => {
      reject(error)
    })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {

  return new Promise((resolve, reject) => {
    axios({
      url: url,
      method: "post",
      data: JSON.stringify(data),
      // responseType: "application/json"
    }).then((res) => {
      if (res && res.data)
        resolve(res.data);
    }).catch(error => {
      reject(error)
    })
  })
}
