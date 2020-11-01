<template>
  <div class="view-container">
    <MtHeader backPagePathName="userSet"></MtHeader>
    <div class="changePwd">
      <mt-field
        label="原 密 码"
        placeholder="请输入原密码"
        v-model="oldPwd"
        @blur.native.capture="blurOldPwd(oldPwd)"
        @focus.native.capture="focusOldPwd"
        :class="{oldPassword:oldErrorBol,oldPasswordEmpty:oldEmptyBol}"
      ></mt-field>
      <mt-field
        label="新 密 码"
        placeholder="不少于6位"
        type="password"
        v-model="newPwd"
        @blur.native.capture="blurNewPwd(newPwd)"
        @focus.native.capture="focusNewPwd"
        :class="{newPassword:newErrorBol,newPasswordEmpty:newEmptyBol}"
      ></mt-field>
      <mt-field
        label="密码确认"
        placeholder="请再次输入密码"
        type="password"
        v-model="confirmNewPwd"
        @blur.native.capture="blurConfirmPwd(confirmNewPwd)"
        @focus.native.capture="focusConfirmPwd"
        :class="{confirmPassword:confirmErrorBol,confirmPasswordEmpty:confirmEmptyBol}"
      ></mt-field>
      <mt-button @click.native="handleClick" class="confirmBtn">确 认</mt-button>
    </div>
  </div>
</template>
<script>
import MtHeader from "@/components/public/MtHeader";
import { Toast } from "mint-ui";
export default {
  components: { MtHeader },
  data() {
    return {
      oldpassword: "",
      oldPwd: "",
      newPwd: "",
      confirmNewPwd: "",
      oldErrorBol: false,
      oldEmptyBol: false,
      newErrorBol: false,
      newEmptyBol: false,
      confirmErrorBol: false,
      confirmEmptyBol: false,
      id: ""
    };
  },
  // 监听数据的变化，验证其有效性
  watch: {},
  mounted() {
    this.oldpassword = JSON.parse(localStorage.getItem("currentPwd"));
    this.id = JSON.parse(localStorage.getItem("currentId"));
  },
  methods: {
    // 原密码
    blurOldPwd(val) {
      if (val == "") {
        this.oldEmptyBol = true;
      } else {
        if (val != this.oldpassword) {
          this.oldEmptyBol = false;
          this.oldErrorBol = true;
        }
      }
    },
    focusOldPwd() {
      this.oldEmptyBol = false;
      this.oldErrorBol = false;
    },
    // 新密码
    blurNewPwd(val) {
      if (val == "") {
        this.newEmptyBol = true;
        this.newErrorBol = false;
      } else {
        if (val.length < 6) {
          this.newEmptyBol = false;
          this.newErrorBol = true;
        }
      }
    },
    focusNewPwd() {
      this.newEmptyBol = false;
      this.newErrorBol = false;
    },
    // 确认密码
    blurConfirmPwd(val) {
      if (val == "") {
        this.confirmErrorBol = false;
        this.confirmEmptyBol = true;
      } else {
        if (val != this.newPwd) {
          this.confirmErrorBol = true;
          this.confirmEmptyBol = false;
        }
      }
    },
    focusConfirmPwd() {
      this.confirmErrorBol = false;
      this.confirmEmptyBol = false;
    },
    handleClick() {
      this.blurOldPwd(this.oldPwd);
      this.blurNewPwd(this.newPwd);
      if (
        this.oldEmptyBol == false &&
        this.newEmptyBol == false &&
        this.newErrorBol == false &&
        this.confirmEmptyBol == false &&
        this.confirmErrorBol == false
      ) {
        let obj = {
          id: this.id,
          oldPassword: this.oldPwd,
          newPassword: this.newPwd
        };
        this.$post("/AppApi/Base/UpdatePassWord", obj).then(res => {
          Toast(res.data.msg);
          this.$router.push("/");
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.changePwd {
  .oldPassword::after {
    color: red;
    content: "旧密码错误，请重试";
    font-size: 12px;
    margin: 20px 0 0 -145px;
    letter-spacing: 2px;
  }
  .oldPasswordEmpty::after {
    color: red;
    content: "您还未输入旧密码";
    font-size: 12px;
    margin: 20px 0 0 -115px;
    letter-spacing: 2px;
  }
  .newPassword::after {
    color: red;
    content: "密码长度不能少于6位";
    font-size: 12px;
    margin: 20px 0 0 -145px;
    letter-spacing: 2px;
  }
  .newPasswordEmpty::after {
    color: red;
    content: "密码不能空";
    font-size: 12px;
    margin: 20px 0 0 -70px;
    letter-spacing: 2px;
  }
  .confirmPassword::after {
    color: red;
    content: "密码不一致";
    font-size: 12px;
    margin: 20px 0 0 -70px;
    letter-spacing: 2px;
  }
  .confirmPasswordEmpty::after {
    color: red;
    content: "请确认密码";
    font-size: 12px;
    margin: 20px 0 0 -70px;
    letter-spacing: 2px;
  }
  // 确认按钮
  .confirmBtn {
    width: 100%;
    margin-top: 0.2rem;
    background: linear-gradient(to right, #65be24 0%, #48a73c 100%);
    color: #fff;
  }
}
</style>

