import $ from "jquery";
// const api = "http://127.0.0.1:5000/api";
let api = "";
$.ajax({
  url: "/config.json",
  type: "get",
  success: res => {
    api = res.baseURL;
    // api='http://172.18.0.37:5000'
  }
});

export function downLoad(url) {
  const a = document.createElement("a"); // 创建a标签
  a.setAttribute("download", ""); // download属性
  a.setAttribute("href", url); // href链接
  var evt = document.createEvent("MouseEvents");
  evt.initEvent("click", true, true);
  a.dispatchEvent(evt); //兼容火狐和谷歌
  // a.click(); // 自执行点击事件
}

export function loadwithurl(url, filename) {
  function createObjectURL(object) {
    return window.URL
      ? window.URL.createObjectURL(object)
      : window.webkitURL.createObjectURL(object);
  }
  var xhr = new XMLHttpRequest();
  var formData = new FormData();
  xhr.open("get", api + url); //url填写后台的接口地址，如果是post，在formData append参数（参考原文地址）
  xhr.setRequestHeader(
    "Authorization",
    "Bearer " + sessionStorage.getItem("token")
  );
  xhr.responseType = "blob";
  xhr.onload = function() {
    if (this.status == 200) {
      var blob = this.response;
      // console.log(this.response)
      if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, filename);
      } else {
        var a = document.createElement("a");
        var url = createObjectURL(blob);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      }
    }
  };
  xhr.send(formData);
}
