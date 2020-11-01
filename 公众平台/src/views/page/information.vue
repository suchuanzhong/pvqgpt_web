<template>
  <div class="zui-page-info">
    <div class="zui-sub-banner">
      <img src="/img/sub-banner.png" alt="" />
      <div class="zui-sub-text">
        <h1>领跑资讯</h1>
        <p>{{ "Leader information" | toUpperCase }}</p>
      </div>
    </div>
    <div class="zui-main">
      <el-container>
        <el-aside width="406px" class="p-t-100">
          <ul class="sub-page-menu">
            <li
              :class="{ active: actMenuType == item.code }"
              @click.stop="routeToType(item.code)"
              v-for="item in subMenuList"
              :key="item.code"
            >
              {{ item.typeName }}
            </li>
          </ul>
        </el-aside>
        <el-main class="p-t-100" style="padding:100px 0 0 0;min-height:500px;">
          <router-view></router-view>
        </el-main>
      </el-container>
    </div>
    <div class="p-t-100"></div>
  </div>
</template>
<script>
export default {
  filters: {
    toUpperCase(text) {
      return text.toUpperCase();
    }
  },
  watch: {
    $route(val) {
      if (val.query.type) {
        this.actMenuType = val.query.type;
      } else {
        if (val.name == "资讯列表") {
          localStorage.setItem("infoType", val.params.id);
          this.actMenuType = val.params.id;
        } else {
          this.actMenuType = localStorage.getItem("infoType");
        }
      }
    }
  },
  created() {
    this.getTypeInfo();
    if (this.$route.query.type) {
      this.actMenuType = this.$route.query.type;
      localStorage.setItem("infoType", this.$route.query.type);
    } else {
      if (this.$route.name == "资讯列表") {
        localStorage.setItem("infoType", this.$route.params.id);
        this.actMenuType = this.$route.params.id;
      } else {
        this.actMenuType = localStorage.getItem("infoType");
      }
    }
  },
  data() {
    return {
      subMenuList: [],
      // actType: 1,
      actMenuType: 0
    };
  },
  methods: {
    getTypeInfo() {
      this.$fetch("/TypeInfo/Query").then(res => {
        this.subMenuList = res.data;
      });
    },
    routeToType(type) {
      this.actMenuType = type;
      // window.location.href = "/information/list/" + type;
      this.$router.push("/information/list/" + type);
    }
  }
};
</script>
<style lang="scss" scoped>
.zui-page-info {
  .zui-sub-banner {
    position: relative;
    height: 260px;
    img {
      width: 100%;
      height: 260px;
    }
    .zui-sub-text {
      position: absolute;
      z-index: 99;
      top: 60%;
      left: 257px;
      transform: translate(0, -60%);
      color: #fff;
      h1 {
        font-size: 40px;
        line-height: 70px;
      }
    }
  }
  .zui-sub-tab {
    display: flex;
    background: #f4f4f4;
    .zui-sub-tab_li {
      flex: 1;
      line-height: 60px;
      height: 60px;
      text-align: center;
      color: #999999;
      cursor: pointer;
      a {
        color: #999999;
      }
      &:hover {
        text-decoration: underline;
      }
      &.active a {
        color: #000000;
      }
    }
  }
  .sub-page-menu {
    width: 100%;
    padding-right: 45px;
    li {
      margin-right: 26px;
      height: 50px;
      line-height: 50px;
      border: 1px solid #e4e4e4;
      color: #666666;
      font-size: 16px;
      margin-bottom: 20px;
      text-align: center;
      letter-spacing: 2px;
      position: relative;
      cursor: pointer;
      &:hover {
        color: #1bac6b;
      }
      &.active {
        border: none;
        background: transparent;
        color: #fff;
        &::after {
          content: "";
          height: 52px;
          top: 0;
          display: block;
          background: url(../../assets/img/sub-li-act.png) no-repeat;
          left: 0;
          position: absolute;
          width: 362px;
          z-index: -1;
        }
      }
    }
  }
}
</style>
