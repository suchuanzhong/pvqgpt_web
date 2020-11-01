<template>
  <el-container style="height:100%;">
    <!-- <el-header class="el-primary header-shadow">
      <el-container class="header-bg">
        <el-aside width="auto" class="header-shadow-right" style="overflow: hidden">
          <img src="/img/logo.png" alt style="position: relative; top: 4px ;" />
        </el-aside>
        <el-main class="header-right">
          <div
            class="business_button"
            v-if="hidemenu!=1 && roleType != 1"
            @click="goBaseInfo"
          >{{ isIndex?"业务板块":'首页' }}</div>
          <div class="right">
            <span class="username">
              <i class="my-icon my-icon-user"></i>
              你好，{{name}}
            </span>
            <span class="header-b-l">
              <i class="my-icon my-icon-exit" @click="exit()"></i>
            </span>
            <span class="weather_box">
              <img :src="'/img/index/weather_'+wtype+'.png'" alt />
              {{tem}}℃
            </span>
          </div>
        </el-main>
      </el-container>
    </el-header> -->
    <Header class="white" />
    <el-container
      style="height:calc(100% - 60px);position: relative;marginTop:60px"
    >
      <!-- <router-view></router-view> -->
      <!-- <div class="home-box-shadow"></div> -->
      <!-- <el-container> -->
      <main-menu
        v-on:refrash="refrash"
        ref="menu"
        v-on:menuClick="clickMenu"
      ></main-menu>
      <el-main
        class="dark-bg main-width"
        :style="{
          width: isCollapse ? 'calc(100% - 124px)' : 'calc(100% - 360px)'
        }"
      >
        <keep-alive v-if="$route.keepAlive && $route.keepAlive == 1">
          <router-view></router-view>
        </keep-alive>
        <router-view>
          <!-- 这里是会被缓存的视图组件 -->
        </router-view>
      </el-main>
      <!-- </el-container> -->
    </el-container>
  </el-container>
</template>

<script>
import Header from "@/components/public/header.vue";
import mainMenu from "@/components/mainMenu.vue";
export default {
  name: "HelloWorld",
  components: {
    mainMenu,
    Header
  },
  watch: {
    $route(to) {
      if (to.path != "/index") {
        this.isIndex = false;
      }
    }
  },
  data() {
    return {
      isIndex: true,
      wtype: 2,
      tem: "",
      hidemenu: 0,
      roleType: null,
      isCollapse: false,
      refrashs: true
    };
  },
  computed: {
    name() {
      return localStorage.getItem("username");
    }
  },
  mounted() {
    this.roleType = sessionStorage.getItem("currentRoleType");
    // this.hidemenu = hidemenu;
    if (this.$route.path != "/index") {
      this.isIndex = false;
    }
    // this.getWeather();
  },
  methods: {
    refrash(val) {
      this.isCollapse = val;
      this.refrashs = false;
      this.$nextTick(() => {
        this.refrashs = true;
      });
    },
    clickMenu() {},
    getWeather() {
      var _this = this;
      this.$ajax({
        url: "/StatisticsApi/BisHome/GetRealWeather"
      }).then(res => {
        if (res.data[0]) {
          let tempStatus = res.data[0].weatherstatus;
          if (tempStatus.indexOf("晴") !== -1) {
            _this.wtype = 1;
          } else if (tempStatus.indexOf("雨") !== -1) {
            _this.wtype = 3;
          } else if (tempStatus.indexOf("雪") !== -1) {
            _this.wtype = 4;
          } else {
            _this.wtype = 2;
          }
          _this.tem = res.data[0].airtemp;
        }
      });
    },
    goBaseInfo() {
      if (sessionStorage.getItem("currentRoleType") == 1) {
        return;
      } else {
        this.isIndex = !this.isIndex;
        var path = this.isIndex
          ? "/"
          : this.$router.options.routes[1].children[1].children[0].path;
        this.$router.push(path);
      }
    },
    exit() {
      this.$confirm("是否退出当前登录状态？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          sessionStorage.clear();
          location.reload();

          // this.$router.push("/login");
        })
        .catch(() => {});
    },
    clickTitle() {
      //   window.location.href = $globalconfig.getJumpUrl();
    }
  }
};
</script>
<style scoped lang="scss">
.header-shadow {
  background-color: #142841 !important;
}

.home-box-shadow {
  width: 100%;
  height: 10px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 4px 10px inset;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 9;
}
</style>
<style lang="scss">
// .username {
//   color: #fff;
//   font-size: 14px;
// }

.header-shadow {
  height: 70px !important;
}

.header-bg {
  height: 70px;
  background: url("/images/header.png") no-repeat;
  // background-size: 100% 100%;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
}

.header-shadow-right img {
  vertical-align: bottom !important;
  margin-left: 24px;
}

// .el-aside img {
//   cursor: pointer;
// }

.header-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .business_button {
    cursor: pointer;
    width: 120px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    color: #fff;
    background-image: linear-gradient(
        0deg,
        #0083ff 1%,
        #00b5ff 63%,
        #00e7ff 100%
      ),
      linear-gradient(#324a6f, #324a6f);
    box-shadow: 0px 10px 20px 0px rgba(0, 131, 255, 0.35);
    border-radius: 18px;
    margin-right: 50px;
  }

  .weather_box {
    display: inline-block;
    padding: 0 20px;
    height: 100%;
    font-size: 18px;
    background: #29456c;

    img {
      margin: 0 10px 10px 0;
    }
  }
}
</style>
