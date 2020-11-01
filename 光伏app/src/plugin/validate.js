//用户名正则，4到16位（字母，数字，下划线，减号）
function UserName(str) {
  const reg = /^[a-zA-Z0-9_-]{4,16}$/
  return reg.test(str)
}
//校验密码：只能输入6-20个字母、数字、下划线
function PassWord(str) {
  const reg = /^(\w){6,20}$/
  if (!reg.exec(str)) return false
  return true
}



export let validate= {
  Username: (rule, value, callback) => {
    if (!Username(value)) {
      callback(new Error('用户名为4到16位（字母，数字，下划线，减号）'))
    } else {
      callback()
    }
  },
  PassWord: (rule, value, callback) => {
    if (!PassWord(value)) {
      callback(new Error('密码为6-20位,由字母、数字、下划线组成'))
    } else {
      callback()
    }
  }
};
