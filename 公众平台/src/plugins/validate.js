//用户名正则，4到16位（字母，数字，下划线，减号）
// function UserName(str) {
//   const reg = /^[a-zA-Z0-9_-]{4,16}$/
//   return reg.test(str)
// }
//校验密码：只能输入6-20个字母、数字、下划线
// function PassWord(str) {
//   const reg = /^(\w){6,20}$/
//   if (!reg.exec(str)) return false
//   return true
// }
//大于0的数,含整数和小数
// function ValNumber(str) {
//   const reg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/
//   return reg.test(str)
// }

/* 手机号码*/
// function Phone(str) {
//   const reg = /^[1][3,4,5,7,8][0-9]{9}$/
//   return reg.test(str)
// }
/*邮编*/
function postcode(str) {
  const reg = /^[0-9]{6}$/;
  return reg.test(str);
}
/* 邮箱*/
function Email(str) {
  const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
  // const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
  return reg.test(str);
}
//校验普通电话、传真号码：可以“+”开头，除数字外，可含有“-”
function Tel(str) {
  const reg = /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/;
  if (!reg.exec(str)) return false;
  return true;
}
/**
 *
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
let validateObj = {};
validateObj.Username = (rule, value, callback) => {
  if (!/^[a-zA-Z0-9_-]{4,16}$/.test(value)) {
    callback(new Error("用户名为4到16位（字母，数字，下划线，减号）"));
  } else {
    callback();
  }
};

validateObj.PassWord = (rule, value, callback) => {
  if (value === "" || !/^\w{1,}$/.test(value)) {
    callback(new Error("请输入数字字母下划线！"));
  } else if (value.length > 8 || value.length < 6) {
    callback(new Error("密码长度为6-8位"));
  } else {
    callback();
  }
};

// 验证手机和座机
validateObj.Phone = (rule, value, callback) => {
  let phone = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1})|(19[0-9]{1})|(16[0-9]{1}))+\d{8})$/;
  let tel = /([0-9]{3,4}-)?[0-9]{7,8}/;
  if (!(phone.test(value) || tel.test(value))) {
    return callback(new Error("请输入有效号码"));
  } else {
    callback();
  }
};

validateObj.Postcode = (rule, value, callback) => {
  if (!postcode(value)) {
    callback(new Error("邮编格式不正确"));
  } else {
    callback();
  }
};
validateObj.Email = (rule, value, callback) => {
  if (!Email(value)) {
    callback(new Error("邮箱格式不正确"));
  } else {
    callback();
  }
};

validateObj.Tel = (rule, value, callback) => {
  if (!Tel(value)) {
    callback(new Error("电话格式不正确"));
  } else {
    callback();
  }
};
export default validateObj;
