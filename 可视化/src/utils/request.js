import axios from 'axios'
import qs from 'qs'

let baseURL = commonURL;
axios.defaults.baseURL = baseURL;
// axios.get("/json/config.json").then(res => {
//   baseURL = res.data.baseURL;
//   
// });
// 创建axios实例
// const service = axios.create({
//     // baseURL: 'http://172.18.0.23:8084/api/pv0002/', // api的base_url
//      baseURL: 'http://172.18.0.37:8100/api/', // api的base_url
//     //baseURL: 'http://localhost:49832/api/', // api的base_url
//     timeout: 15000, // 请求超时时间
// });
// request拦截器
axios.interceptors.request.use(config => {
    if(config.method  === 'post'){
        config.headers = {
          "Content-Type": "application/x-www-form-urlencoded"
        };
        // config.data = qs.stringify(config.data);
      }
        return config
    }, error => {
        Promise.reject(error)
    })
    // respone拦截器
    axios.interceptors.response.use(response => {
        const res = response.data;
        if (response.status !== 200) {
            Message({
                message: res.message || res.errorMessage,
                type: 'error',
                duration: 5 * 1000
            })
            return Promise.reject('error')
        } else {
            return res

        }
    },
    error => {
        if (error && error.response) {
            switch (error.response.status) {
                case 400:
                    error.message = '错误请求'
                    break;
                case 401:
                    error.message = '未授权，请重新登录'
                    break;
                case 403:
                    error.message = '拒绝访问'
                    break;
                case 404:
                    error.message = '请求错误,未找到该资源'
                    break;
                case 405:
                    error.message = '请求方法未允许'
                    break;
                case 408:
                    error.message = '请求超时'
                    break;
                case 500:
                    error.message = '服务器端出错'
                    break;
                case 501:
                    error.message = '网络未实现'
                    break;
                case 502:
                    error.message = '网络错误'
                    break;
                case 503:
                    error.message = '服务不可用'
                    break;
                case 504:
                    error.message = '网络超时'
                    break;
                case 505:
                    error.message = 'http版本不支持该请求'
                    break;
                default:
                    error.message = `连接错误${error.response.status}`
            }
        } else {
            switch (error.message) {
                case 'Network Error':
                    error.message = '服务器连接失败'
                    break;
                case 'timeout of 15000ms exceeded':
                    error.message = '网络超时,请重试！'
                    break;
                default:
                    error.message = '其他错误'
            }
        }

        return Promise.reject(error)
    }
)
export function post(url, params) {
    let requestParams={
      params: params,
    }
    return new Promise((resolve, reject) => {
        axios.post(url, requestParams)
        .then(response => {
          resolve(response.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
// export default service