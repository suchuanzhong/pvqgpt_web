<template>
  <div class="wrap">
    <div id="loginPage">
      <img src="~/static/img/loginTitle.png" alt class="loginTitle" />
      <div class="lgoinBox">
        <group>
          <x-input title type="text" placeholder="请输入账号" v-model="userName">
            <span slot="label">
              <img slot="icon" src="static/img/user.png" alt width="20" height="20" />
            </span>
          </x-input>
          <x-input title class="password" v-model="password" type="password" placeholder="请输入密码">
            <span slot="label">
              <img slot="icon" src="static/img/password.png" alt width="20" height="20" />
            </span>
          </x-input>
        </group>
        <mt-button type="default" style="width:100%" class="loginBtn" @click.native="loginIn">登录</mt-button>
      </div>
      <div class="lgoinbottom"></div>
    </div>
  </div>
</template>
<script>
import { Group, Cell, XInput } from "vux";
import validate from "@/plugin/validate";

export default {
  components: { Group, Cell, XInput },
  data() {
    return {
      userName: "",
      password: ""
    };
  },
  methods: {
    loginIn() {
      if (this.userName == null || this.userName == "") {
        this.$vux.toast.text("请输入账号");
        return;
      }
      if (this.password == null || this.password == "") {
        this.$vux.toast.text("请输入密码", top);
        return;
      }
      localStorage.setItem("currentPwd", JSON.stringify(this.password));
      let that = this;
      that
        .$ajax({
          url: "identityServer/token",
          method: "post",
          data: {
            username: this.userName,
            Grant_type: "password",
            password: this.password,
            client_id: "client1",
            Client_secret: "api.managerapi"
          },
          headerType: { "Content-Type": "application/x-www-form-urlencoded" },
          transformRequest: [
            function(data) {
              let ret = "";
              for (let it in data) {
                ret +=
                  encodeURIComponent(it) +
                  "=" +
                  encodeURIComponent(data[it]) +
                  "&";
              }
              return ret;
            }
          ],
          showMessage: "登录成功",
          isLogin: true
        })
        .then(toeknData => {
          localStorage.setItem("currentRoleType",JSON.stringify(JSON.parse(toeknData.RoleType)));
          localStorage.setItem("token", toeknData.access_token);
          localStorage.setItem(
            "currentName",
            JSON.stringify(toeknData.UserName)
          );
          localStorage.setItem("currentId", JSON.stringify(toeknData.UserId));
          this.$router.push({ name: "stationBase" });
        });
    }
  }
};
</script>
<style lang="less" scoped>
.wrap {
  height: 100%;
  background: #fff;
}
#loginPage {
  height: 100%;
  background: url("./../../../static/img/loginbg.png") top center no-repeat;
  
  background-size: 100% 45%;
  position: relative;

  .loginTitle {
    height: 0.2rem;
    width: auto;
    position: absolute;
    top: 46%;
    left: 50%;
    transform: translateX(-50%) translateY(-0.1rem);
  }
  .lgoinBox {
    width: 100%;
    padding: 0 0.5rem;
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    z-index: 1;
  }
  .lgoinbottom {
    width: 100%;
    height: 0.7rem;
    background: url("./../../../static/img/homebottom.png") bottom center no-repeat;
    background-size: 100% 100%;
    position: absolute;
    bottom: 0;
    z-index: 0;
  }
  .loginBtn {
    width: 100%;
    margin-top: 0.2rem;
    background: linear-gradient(to right, #65be24 0%, #48a73c 100%);
    color: #fff;
  }
}
</style>
<style lang="less">
#loginPage {
  .weui-cell__hd {
    margin:0 0.2rem;
    span {
      display: flex;
      align-items: center;
    }
  }
  .vux-x-input.weui-cell {
    display: flex;
    align-items: center;
    background-color: #f1f1f1;
    border-radius: 30px;
    margin-bottom: 22px;
    
  }
  .weui-cells:before,.weui-cells:after  {
    border: none;
  }
  .password:before {
    border: none;
    left: 0;
  }
  .mint-button {
    border-radius: 41px;
  }
}
</style>


