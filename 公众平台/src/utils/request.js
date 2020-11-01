import axios from "axios";
import router from "vue-router";
// import { Message } from "element-ui";
import { Loading } from "element-ui";
let baseURL = "";
axios.get("/config.json").then(res => {
  baseURL = res.data.baseURL;
  axios.defaults.baseURL = baseURL;
});
axios.defaults.timeout = 15000;
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
//等待效果
let loadingInstance = null;
let needLoadingRequestCount = 0;
function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    loadingInstance = Loading.service({
      fullscreen: true
    });
  }
  needLoadingRequestCount++;
}
function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    loadingInstance.close();
  }
}
//http request 拦截器
axios.interceptors.request.use(
  config => {
    config.headers = {
      "X-XSRF-TOKEN": null,
      "Content-Type": "application/json;charset=UTF-8"
    };
    if (config.showLoading) {
      showFullScreenLoading();
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

//http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.code == 2) {
      router.push({
        path: "/login",
        query: {
          redirect: router.currentRoute ? router.currentRoute.fullPath : ""
        }
      });
    }
    if (response.config.showLoading) {
      setTimeout(() => {
        tryHideFullScreenLoading();
      }, 500);
    }
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      response => {
        resolve(response.data);
      },
      err => {
        reject(err);
      }
    );
  });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data).then(
      response => {
        resolve(response.data);
      },
      err => {
        reject(err);
      }
    );
  });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data).then(
      response => {
        resolve(response.data);
      },
      err => {
        reject(err);
      }
    );
  });
}
/**
 * 封装delete请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function Delete(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.delete(url, data).then(
      response => {
        resolve(response.data);
      },
      err => {
        reject(err);
      }
    );
  });
}

/**
 * 封装后台请求等待效果get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetchGet({ url, params, showLoading = true }) {
  let requestParams = {
    baseURL: baseURL,
    params: params,

    showLoading: showLoading
  };
  return new Promise((resolve, reject) => {
    axios
      .get(url, requestParams)
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}
