<template>
  <div class="login-bg">
    <div class="login-left"></div>
    <div class="login-right">
      <div class="login-right-bg">
        <i class="animate-circle1"></i>
        <i class="animate-circle2"></i>
        <i class="animate-circle3"></i>
      </div>
      <div class="login-form">
        <div class="login-title"><span>登录</span></div>
        <el-form ref="loginForm" :model="loginForm" :rules="rules">
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              placeholder="账号"
            ></el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="密码"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="login-form-btn" @click="loginFn('loginForm')">登录</div>
        <!-- <p class="to-register">我要注册</p> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  mounted() {},
  methods: {
    loginFn(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loginfuc();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    loginfuc() {
      var _this = this;
      this.$loginpost("identityServer/token",{
          username: this.loginForm.username,
          Grant_type: "password",
          password: this.loginForm.password,
          client_id: "client1",
          Client_secret: "api.managerapi"
      }).then(toeknData => {
        let roleType = JSON.parse(toeknData.RoleType);
       
        sessionStorage.setItem("currentRoleType", JSON.stringify(roleType));
        localStorage.setItem("username", toeknData.UserName);
        _this.$fetch("/DevBase/GetBaseInfo").then(res => {
          var name = res.data.name;
          localStorage.setItem("name", name); 
          var startTime = res.data.startTime;
          localStorage.setItem("startTime", startTime);
          var endTime = res.data.endTime;
          localStorage.setItem("endTime", endTime);
        });
        //存放token
        sessionStorage.setItem("token", toeknData.access_token);
        sessionStorage.setItem("UserId", toeknData.UserId);
        //存放routers
        let menuList = JSON.parse(toeknData.UserMenu);
        sessionStorage.setItem("routers", JSON.stringify(menuList));
         
        //添加动态路由
        var routers = [];
        menuList[0].Children.map(item => {
          let child = {
            path: item.Attributes.data.MenuUrl,
            name: item.Text,
            iconCls: item.Icon,
            hidden: !item.Attributes.data.Enable,
            leaf:
            item.Children !== null && item.Children.length > 0 ? false : true,
            component: item.Attributes.data.PathUrl ? resolve => { require(["@/" + (item.Attributes.data.PathUrl.slice(3)).trim()], resolve) } : null
          };
          _this.getRouterChilds(child, item);
          routers.push(child);
        });
        // 合并路由
        _this.$router.options.routes[2].children = routers;
       _this.$router.addRoutes(_this.$router.options.routes);
        console.log(routers)
        if (routers.length == 0) {
          _this.$message({
            message: "用户未获权限，请联系管理员",
            type: "error",
            offset:70
          })
        } else {
          _this.$router.push({ path: "/homeindex" });
        }
      }).catch(res=>{
        this.$message({
          message: res.responseJSON.error_description,
          type: "error",
          offset:70
        })
      });
    },
    // 菜单路由的拼接
    getRouterChilds(parent, chidrenList) {
      if (chidrenList.Children && chidrenList.Children.length > 0) {
        let C_routeName = [];
        parent.redirect = {
          path: chidrenList.Children[0].Attributes.data.MenuUrl
        };
        chidrenList.Children.map(C => {
          let childData = {
            path: C.Attributes.data.MenuUrl,
            name: C.Text,
            iconCls: C.Icon,
            hidden: !C.Attributes.data.Enable,
            leaf: C.Children !== null && C.Children.length > 0 ? false : true,
            component: C.Attributes.data.PathUrl ? resolve => { require(["@/" + (C.Attributes.data.PathUrl.slice(3)).trim()], resolve) } : null
          };
          C_routeName.push(childData);
          this.getRouterChilds(childData, C);
        });
        parent.children = C_routeName;
      }
    }
  }
};
</script>
<style lang="scss">
.login-form {
  .el-input__inner {
    background: rgba($color: #ffffff, $alpha: 0.4);
    border-radius: 1px;
    height: 58px;
    line-height: 58px;
    font-size: 16px;
  }
  .el-form-item {
    margin-bottom: 40px;
  }
  .to-register {
    font-size: 16px;
    text-align: center;
    color: #999999;
  }
  .login-form-btn {
    cursor: pointer;
    width: 370px;
    height: 55px;
    line-height: 55px;
    text-align: center;
    color: #fff;
    letter-spacing: 10px;
    padding-left: 10px;
    background: url(../../../assets/img/login/btn.png);
    margin: 0 auto;
    position: relative;
    font-size: 22px;
    margin-bottom: 35px;
    font-family: "PingFang SC", "Helvetica Neue", Helvetica, "Hiragino Sans GB",
      "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    &::after {
      content: "";
      position: absolute;
      height: 135px;
      width: 428px;
      display: block;
      background: url(../../../assets/img/login/btn-shadow.png);
      top: -20px;
      left: -29px;
      opacity: 0.8;
      z-index: -1;
    }
  }
}
.login-bg {
  background: #000;
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  .login-left {
    width: 60%;
    background: url(../../../assets/img/login/bg-left.png) no-repeat center center;
    background-size: cover;
    height: 100%;
  }
  .login-right {
    flex: 1;
    background: #fbfbfb url(../../../assets/img/login/bg-right.png) no-repeat right
      top;
    height: 100%;
    width: 100%;
    position: relative;
    .login-title {
      font-size: 48px;
      color: #333333;
      font-family: "PingFang SC", "Helvetica Neue", Helvetica;
      letter-spacing: 6px;
      border-bottom: 1px solid #eee;
      span {
        font-weight: bold;
        // border-bottom: 5px solid #19b197;
        background: url(../../../assets/img/login/border.png) no-repeat bottom left;
      }
      margin-bottom: 60px;
    }
    .login-form {
      width: 460px;
      height: 520px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
.login-right-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
}
.animate-circle1,
.animate-circle2 {
  width: 852px;
  height: 852px;
  display: inline-block;
  position: absolute;
  background: url(../../../assets/img/login/circle1.png) no-repeat;
}
.animate-circle1 {
  animation: circle1 120s ease-in infinite;
}
.animate-circle2 {
  animation: circle2 120s ease-in infinite;
  background: url(../../../assets/img/login/circle2.png) no-repeat;
}
.animate-circle3 {
  width: 462px;
  display: inline-block;
  position: absolute;
  height: 462px;
  animation: circle3 180s ease-in infinite;
  background: url(../../../assets/img/login/circle3.png) no-repeat;
}
@keyframes circle1 {
  0% {
    left: -426px;
    top: 0;
  }
  20% {
    left: 300px;
    top: 400px;
  }
  40% {
    left: 550px;
    top: -500px;
  }
  60% {
    left: 100px;
    top: 0px;
  }
  80% {
    left: -826px;
    top: 500px;
  }
  100% {
    left: -426px;
    top: 0;
  }
}
@keyframes circle2 {
  0% {
    left: 426px;
    top: -300px;
  }
  20% {
    left: -100px;
    top: 0px;
  }
  40% {
    left: 450px;
    top: 300px;
  }
  60% {
    left: -300px;
    top: 0px;
  }
  80% {
    left: -826px;
    top: 500px;
  }
  100% {
    left: 426px;
    top: -300px;
  }
}
@keyframes circle3 {
  0% {
    left: 426px;
    top: 600px;
  }
  20% {
    left: -100px;
    top: -400px;
  }
  40% {
    left: -450px;
    top: 300px;
  }
  60% {
    left: 600px;
    top: 0px;
  }
  80% {
    left: -826px;
    top: -500px;
  }
  100% {
    left: 426px;
    top: 600px;
  }
}
</style>
