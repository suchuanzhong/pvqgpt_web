<template>
  <div class="view-container bg userSet">
    <Title class="head-title"></Title>
    <div class="userInfo">
      <img src="./../../../assets/img/touxiang.png" alt />
      <span>{{userName}},欢迎您</span>
    </div>
    <div class="indexBox">
      <group>
        <cell
          is-link
          @click.native="cellClick(index)"
          v-for="(item,index) in indexType"
          :key="index"
        >
          <span slot="title" class="soltTitle">
            <img slot="icon" :src="'static/img/'+item.icon" width="20" height="auto" />
            <span>{{item.title}}</span>
          </span>
        </cell>
      </group>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import Title from "@/components/public/HeadTitle";
import { setTimeout } from "timers";
import { Datetime, Group, Cell } from "vux";
import { MessageBox } from "mint-ui";
export default {
  components: {
    Title,
    Datetime,
    Group,
    Cell
  },
  data() {
    return {
      userName: "",
      userPwd: "",
      indexType: [
        {
          title: "修改密码",
          icon: "mm.png"
        },
        // {
        //   title: "版本更新",
        //   icon: "bb.png"
        // },
        // {
        //   title: "文档资料",
        //   icon: "wd.png"
        // },
        // {
        //   title: "基地介绍",
        //   icon: "jd.png"
        // },
        {
          title: "退出登录",
          icon: "tc.png"
        }
      ],
      Chart: null,
      wgtVer: "" //当前的版本号
    };
  },
  created() {
    this.userName = JSON.parse(localStorage.getItem("currentName"));
  },
  mounted() {},
  methods: {
    cellClick(index) {
      switch (index) {
        case 0:
          this.$router.push("/changePwd");
          break;
        // case 1:
        //   this.checkVersion();
        //   break;
        // case 2:
        //   this.$router.push({ name: "documents" });
        //   break;
        // case 2:
        //   this.$router.push({ name: "stationDes" });
        //   break;
        case 1:
          this.loginOut();
          break;
      }
    },
    // 获取当前的版本号
    plusReady() {
      // 获取本地应用资源版本号
      plus.runtime.getProperty(plus.runtime.appid, function(inf) {
        this.wgtVer = inf.version;
        alert("当前应用版本：" + this.wgtVer);
      });
    },
    // 检查版本更新
    checkVersion() {
      if (window.plus) {
        this.plusReady();
      } else {
        document.addEventListener("plusready", this.plusReady, false);
      }

      // 发送请求检测是否有新版本
      plus.nativeUI.showWaiting("检测更新...");
      this.$fetch("/AppApi/Base/CheckAppVersion", {
        versionNumber: this.wgtVer
      }).then(res => {
        if (res.message == "操作成功") {
          if (
            this.wgtVer &&
            re.data.versionNumber &&
            this.wgtVer != re.data.versionNumber
          ) {
            this.downWgt(res.data.downloadUrl); // 下载升级包
          } else {
            plus.nativeUI.alert("无新版本更新！");
          }
        } else {
          plus.nativeUI.alert("检测更新失败！");
        }
      });
    },

    // 从服务器下载应用资源包
    downWgt(wgtUrl) {
      plus.nativeUI.showWaiting("下载wgt文件...");
      plus.downloader
        .createDownload(wgtUrl, { filename: "_doc/update/" }, function(
          d,
          status
        ) {
          if (status == 200) {
            this.installWgt(d.filename); // 安装wgt包
          } else {
            plus.nativeUI.alert("下载wgt失败！");
          }
          plus.nativeUI.closeWaiting();
        })
        .start();
    },
    // 更新应用资源包（wgt文件）
    installWgt(path) {
      plus.nativeUI.showWaiting("安装wgt文件...");
      plus.runtime.install(
        path,
        {},
        function() {
          plus.nativeUI.closeWaiting();
          plus.nativeUI.alert("应用资源更新完成！", function() {
            plus.runtime.restart();
          });
        },
        function(e) {
          plus.nativeUI.closeWaiting();
          plus.nativeUI.alert("安装wgt文件失败[" + e.code + "]：" + e.message);
        }
      );
    },
    // 退出登录
    loginOut() {
      MessageBox.confirm("是否退出登录?").then(action => {
        this.$router.push({ name: "login" });
      });
    }
  }
};
</script>
<style lang="less" scoped>
i {
  font-style: normal;
}
.view-container {
  position: relative;
  background: url("./../../../../static/img/bg01.png") top center no-repeat;
  background-size: 100% 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.userInfo {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  align-items: center;
  img {
    height: 80px;
    width: 80px;
    padding-top: 0.2rem;
  }
  span {
    font-size: 0.18rem;
    padding: 0.2rem 0;
    color: #fff;
  }
}
</style>
<style lang="less">
.userSet .indexBox {
  margin-top: 0.6rem;
  flex: 1;
  overflow-x: hidden;
  .weui-cells {
    background-color: transparent !important;
  }
  .weui-cells.vux-no-group-title {
    margin-top: 0 !important;
    .vux-cell-bd.vux-cell-primary p {
      display: flex;
      align-items: center;
    }
  }
  .value {
    color: #ff9810;
    font-size: 0.2rem;
  }
  .soltTitle {
    display: flex;
    align-items: center;
    span {
      margin-left: 0.2rem;
      font-size: 0.16rem;
    }
  }
  .vux-label-desc {
    color: #333;
  }
  .weui-cells:before {
    border: none;
  }
  .weui-cell:before {
    left: 60px;
  }
  .weui-cells:after {
    left: 60px;
  }
}
</style>