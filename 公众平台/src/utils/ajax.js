import $ from "jquery";
let api = "";
$.ajax({
  url: "/loginConfig.json",
  type: "get",
  success: res => {
    api = res.baseURL;
  }
});
export function ajxaGet(url, data = {}) {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "get",
      url: api + url,
      data: data,
      contentType: "application/json;charset=utf-8",
      dataType: "json",
      success: response => {
        resolve(response.data);
      },
      error: err => {
        reject(err);
      }
    });
  });
}
//登录
export function ajxaPost(url, data = {}) {
  // console.log("post", data);
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "post",
      url: api + url,
      data: data,
      // contentType: "application/json;charset=utf-8",
      dataType: "json",
      success: response => {
        resolve(response);
      },
      error: err => {
        reject(err);
      }
    });
  });
}
