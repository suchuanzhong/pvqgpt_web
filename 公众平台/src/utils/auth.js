/*获取字符串中所有的数字集合*/
export function getStrNumArr(Str, isFilter = false) {
  //用来判断是否把连续的0去掉
  if (typeof Str === "string") {
    var arr = Str.match(/\d{1,}/g);
    return arr.map(function(item) {
      if (isFilter) {
        return parseInt(item);
      } else {
        return item;
      }
    });
  } else if (typeof Str === "number") {
    return [Str];
  } else {
    return [];
  }
}

//时间格式化
export function getFormatDate(fmt = "yyyy-MM-dd hh:mm:ss", time) {
  time = time ? new Date(time) : new Date();
  var o = {
    "M+": time.getMonth() + 1, //月份
    "d+": time.getDate(), //日
    "h+": time.getHours(), //小时
    "m+": time.getMinutes(), //分
    "s+": time.getSeconds(), //秒
    "q+": Math.floor((time.getMonth() + 3) / 3), //季度
    S: time.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (time.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
}

//日期格式化为 yyyy-MM-dd格式
export function getNowFormatDate(theDate, splitStr = "-") {
  var day = theDate ? new Date(theDate) : new Date();
  var Year = 0;
  var Month = 0;
  var Day = 0;
  var CurrentDate = "";
  // 初始化时间
  Year = day.getFullYear(); // ie火狐下都可以
  Month = day.getMonth() + 1;
  Day = day.getDate();
  CurrentDate += Year + splitStr;
  if (Month >= 10) {
    CurrentDate += Month + splitStr;
  } else {
    CurrentDate += "0" + Month + splitStr;
  }
  if (Day >= 10) {
    CurrentDate += Day;
  } else {
    CurrentDate += "0" + Day;
  }
  return CurrentDate;
}

// 手机号、邮箱地址打****码
export function formatName(str) {
  str = str ? String(str) : "";
  return str
    .replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2")
    .replace(/^(.{3})[^@]*(@.+)$/, "$1****$2");
}

// //将数字或字符串，格式化成货币的格式,保留两位小数
// export function formatMoney(s) {
//   s = String(s);
//   if (/[^0-9\.]/.test(s)) return "";
//   s = s.replace(/^(\d*)$/, "$1.");
//   s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
//   s = s.replace(".", ",");
//   var re = /(\d)(\d{3},)/;
//   while (re.test(s)) s = s.replace(re, "$1,$2");
//   s = s.replace(/,(\d\d)$/, ".$1");
//   s = s.replace(/^\./, "0.");
//   return s;
// }

//获取当前页地址栏url中的参数
export function getUrlParam() {
  let search = location.search;
  let _str = search && decodeURIComponent(search.replace(/^\?/, ""));
  let _arr = !_str ? [] : _str.split("&"),
    param = {};
  _arr.forEach(function(item) {
    let key = item.split("=")[0];
    let val = item.split("=")[1];
    param[key] = val;
  });
  return param;
}

// //拼接url和参数（json）
// export function jointUrl(url, obj) {
//   let rangeArr = [];
//   if (obj && typeof obj === "object") {
//     if (rangeArr.length == 0) {
//       rangeArr.push(url);
//     }
//     /\?/g.test(url) ? rangeArr.push("&") : rangeArr.push("?");
//     for (let i in obj) {
//       if (obj.hasOwnProperty(i)) {
//         // if(obj[i] !== ''){   //导致数据不能修改为空
//         rangeArr.push(i);
//         rangeArr.push("=");
//         rangeArr.push(obj[i]);
//         rangeArr.push("&");
//         // }
//       }
//     }
//     return rangeArr.join("").replace(/&$/, "");
//   } else {
//     return url;
//   }
// }

export function getCookie(name) {
  var arr,
    reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if ((arr = document.cookie.match(reg))) return arr[2];
  else return null;
}

export function setCookie(c_name, value, expiredays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie =
    c_name +
    "=" +
    escape(value) +
    (expiredays == null ? "" : ";expires=" + exdate.toGMTString());
}

export function delCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
//获取图片尺寸（根据file）
export function getImageSize(file) {
  return new Promise(function(resolve, reject) {
    let image = new Image();
    image.onload = function() {
      let width = image.width;
      let height = image.height;
      resolve({
        width: width,
        height: height
      });
    };
    image.onerror = function(e) {
      reject("获取图片宽高失败" + e);
    };
    image.src = window.URL.createObjectURL(
      new Blob([file], { type: file.type })
    );
  });
}

//获取图片尺寸（根据url）
export function getImageSizeByUrl(url) {
  return new Promise(function(resolve) {
    let img = new Image();
    img.src = url + "?_=" + Date.parse(new Date());
    var check = function() {
      if (img.width > 0 && img.height > 0) {
        clearInterval(set);
        resolve({
          width: img.width,
          height: img.height
        });
      }
    };
    var set = setInterval(check, 50);
  });
}

//获取字符串长度（单字符算1，其他算2）
export function getNickLen(str) {
  str = str ? String(str) : "";
  var len = 0;
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i);
    //单字节加1
    if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
      len++;
    } else {
      len += 2;
    }
  }
  return len;
}

/**
 * 克隆对象
 * @param {Object} source
 */
export function Clone(source) {
  return JSON.parse(JSON.stringify(source));
}
/**
 * 数组去重
 */
export function Unique(arr) {
  return [...new Set(arr)];
}
/**
 * 获取距离今天的N天的日期  N可正可负
 * @param {Number} interval default 0  -n 表示前几天  n表示后几天
 */
export function getIntervalDate(interval = 0) {
  interval = Number(interval);
  let currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + interval);
  let year = currentDate.getFullYear();
  let month =
    currentDate.getMonth() + 1 < 10
      ? "0" + (currentDate.getMonth() + 1)
      : currentDate.getMonth() + 1;
  let day =
    currentDate.getDate() < 10
      ? "0" + currentDate.getDate()
      : currentDate.getDate();
  return year + "-" + month + "-" + day;
}

/**
 * 返回浏览器版本
 */
export function getExplorerInfo() {
  let explorer = window.navigator.userAgent.toLowerCase();
  // ie
  if (explorer.indexOf("msie") >= 0) {
    let ver = explorer.match(/msie ([\d.]+)/)[1];
    return {
      type: "IE",
      version: ver
    };
  }
  // firefox
  else if (explorer.indexOf("firefox") >= 0) {
    let ver = explorer.match(/firefox\/([\d.]+)/)[1];
    return {
      type: "Firefox",
      version: ver
    };
  }
  // Chrome
  else if (explorer.indexOf("chrome") >= 0) {
    let ver = explorer.match(/chrome\/([\d.]+)/)[1];
    return {
      type: "Chrome",
      version: ver
    };
  }
  // Opera
  else if (explorer.indexOf("opera") >= 0) {
    let ver = explorer.match(/opera.([\d.]+)/)[1];
    return {
      type: "Opera",
      version: ver
    };
  }
  // Safari
  else if (explorer.indexOf("Safari") >= 0) {
    let ver = explorer.match(/version\/([\d.]+)/)[1];
    return {
      type: "Safari",
      version: ver
    };
  }
}
