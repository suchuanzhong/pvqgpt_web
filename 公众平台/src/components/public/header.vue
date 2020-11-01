<template>
  <div class="zui-header-box">
    <div class="zui-header-bg"></div>
    <div class="zui-header">
      <div class="zui-header-logo">
        <img src="../../assets/img/logo.png" alt />
      </div>
      <div class="zui-header-nav">
        <ul>
          <li
            v-for="(item, index) in menuRouters"
            :key="index"
            :class="{ active: actRouteName == item.name }"
          >
            <router-link v-if="item.name == '监测报告'" :to="{ name: '监测报告列表' }"
              class="menu-link"
              >{{ item.name }}</router-link>
            <router-link v-else-if="item.name == '综合管理'" :to="{ name: 'homes' }"
              class="menu-link"
              >{{ item.name }}</router-link>
            <router-link v-else-if="item.name == '领跑资讯'" :to="{ name: '资讯列表', params: { id: 1 } }"
              class="menu-link"
              >{{ item.name }}</router-link>

            <router-link v-else-if="item.name == '共享服务'" :to="{ name: item.name }" class="menu-link">{{
              item.name
            }}</router-link>
            <router-link v-else :to="{ name: item.name }" class="menu-link">{{
              item.name
            }}</router-link>
            <div class="zui-sub-menu" v-if="item.name == '数字领跑'">
              <router-link
                :to="{ name: '数字可视化' }"
                :class="{ active: $route.name == '数字可视化' }"
                >数字可视化</router-link
              >
              <router-link
                :to="{ name: '数字档案馆' }"
                :class="{ active: $route.meta.subMenuName == '数字档案馆' }"
                >数字档案馆</router-link>
            </div>
            <div class="zui-sub-menu" v-if="item.name == '共享服务'&&item.children">
              <router-link
                :to="{ name: '共享列表' }"
                :class="{ active: $route.name == '共享列表' }"
                >共享列表</router-link
              >
              <router-link
                :to="{ name: '我的共享' }"
                :class="{ active: $route.name == '我的共享' }"
                >我的共享</router-link
              >
            </div>
          </li>
        </ul>
      </div>
      <div
        v-if="ismange !== '1'"
        class="zui-login-btn"
        @click="$router.push('/login')"
      >
        登录
      </div>
      <div v-else class="zui-login-name">
        <span class="username">
          <i class="my-icon my-icon-user"></i>
          你好，{{ name }}
        </span>
        <span class="header-b-l">
          <i class="my-icon my-icon-exit" @click="exit()"></i>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchModel: "",
      menuRouters: []
    };
  },
  computed: {
    actRouteName() {
     
      if(this.$route.matched[0].meta.pMenuName&&this.$route.matched[0].meta.pMenuName!==undefined){
        
        return this.$route.matched[0].meta.pMenuName;
      }
      return this.$route.meta.pMenuName;
    },
    ismange() {
      let ismange = sessionStorage.getItem('routers')?'1':'0';
      return ismange;
    },
    name() {
      return localStorage.getItem("username");
    }
  },
  mounted() {
    this.getmenudata();
  },
  methods: {
    getmenudata() {
      let ManageMenuList = []
       ManageMenuList =sessionStorage.getItem('routers')? JSON.parse(sessionStorage.getItem('routers'))[0].Children:[];
      let type = ManageMenuList.length>0 ? 1 : 0;
      let _this = this;
      this.$fetch("/SystemMenu/GetUserMenus?type=" + type).then(res => {
        //存放官网路由
        let menuList = res.data;
        var menuRouters = [];
        menuList.map(item => {
          let child = {
            path: item.attributes.data.menuUrl,
            name: item.name,
            iconCls: item.Icon,
            hidden: !item.attributes.data.enable,
            leaf:
              item.child !== undefined &&
              item.child !== null &&
              item.child.length > 0
                ? false
                : true,
            component: item.attributes.data.pathUrl
              ? resolve => {
                  require([item.attributes.data.pathUrl], resolve);
                }
              : null
          };

          _this.getRouterChilds(child, item);
          menuRouters.push(child);
        });
        this.menuRouters = menuRouters;
      });
    },
    // 菜单路由的拼接
    getRouterChilds(parent, chidrenList) {
      if (chidrenList.child && chidrenList.child.length > 0) {
        let C_routeName = [];
        parent.redirect = {
          path: chidrenList.child[0].attributes.data.menuUrl
        };
        chidrenList.child.map(C => {
          let childData = {
            path: C.attributes.data.menuUrl,
            name: C.name,
            iconCls: C.Icon,
            hidden: !C.attributes.data.enable,
            leaf:
              C.child !== undefined && C.child !== null && C.child.length > 0
                ? false
                : true,
            component: C.attributes.data.pathUrl
              ? resolve => {
                  require([
                    "@/" + C.attributes.data.pathUrl.slice(1).trim()
                  ], resolve);
                }
              : null
          };

          C_routeName.push(childData);
          this.getRouterChilds(childData, C);
        });
        parent.children = C_routeName;
      }
    },
    exit() {
      this.$confirm("是否退出当前登录状态？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning" 
      })
        .then(() => {
          // sessionStorage.clear();
          sessionStorage.removeItem("token")
          sessionStorage.removeItem("routers")
          sessionStorage.removeItem("UserId")
          location.reload();

          // this.$router.push("/");
        })
        .catch(() => {});
    }
  }
};
</script>
<style lang="scss">
.zui-header-box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid rgba($color: #fff, $alpha: 0.2);
  z-index: 9999;
  min-width: 1600px;
  background-color: #fff;
  .zui-header-bg {
    height: 70px;
    width: 100%;
    z-index: -1;
    background: url("../../assets/img/header-shadow.png") repeat-x;
    position: absolute;
  }
  .zui-header {
    height: 60px;
    padding: 0 70px;
    box-sizing: border-box;
    display: flex;
    .zui-header-logo {
      width: 450px;
      padding: 20px 0;
    }
    .zui-header-search {
      width: 250px;
      padding: 15px 0;
      .el-input {
        width: 40px;
        float: right;
        transition: width 0.5s;
        background: transparent;
        .el-icon-search {
          font-size: 19px;
        }
        &:hover {
          width: 200px;
          transition: width 0.5s;
          .el-input__inner {
            border-color: #fff;
          }
        }
        .el-input__inner {
          border-radius: 30px;
          padding-right: 23px;
          color: #fff;

          background: transparent;
          border-color: transparent;
        }
      }
    }
    .zui-header-nav {
      vertical-align: middle;
    }
    .zui-header-nav {
      flex: 1;
      text-align: right;
      padding-right: 50px;

      ul {
        margin: 0 auto;
        display: inline-block;
        li {
          display: inline-block;
          position: relative;
          vertical-align: top;
          background: transparent;
          &.active {
            &:hover {
              a.menu-link {
                color: #1bac6b;
              }
            }
            a.menu-link {
              background: linear-gradient(to right, #19b197, #1da63b);
              -webkit-background-clip: text;
              color: transparent;
            }
            a::before {
              content: "";
              width: 100%;
              left: 0;
              background-image: linear-gradient(to right, #19b197, #1da63b);
            }
          }
          a {
            color: #fff;
            font-size: 16px;
            display: inline-block;
            padding: 20px 30px;
            box-sizing: border-box;
          }
          a::before {
            content: "";
            width: 0;
            height: 2px;
            position: absolute;
            // bottom: -10px;
            top: 59px;
            background-image: linear-gradient(to right, #19b197, #1da63b);
            left: calc(100% - 29px);
            -webkit-transition: all 0.3s ease;
            -moz-transition: all 0.3s ease;
            -ms-transition: all 0.3s ease;
            -o-transition: all 0.3s ease;
            transition: all 0.3s ease;
          }

          a:hover::before {
            width: 100%;
            left: 0;

            -webkit-transition: width 0.3s ease;
            -moz-transition: width 0.3s ease;
            -ms-transition: width 0.3s ease;
            -o-transition: width 0.3s ease;
            transition: width 0.3s ease;
          }
          &:hover {
            a {
              color: #fff;
            }
            .zui-sub-menu {
              display: block;
            }
            background: rgba(0, 0, 0, 0.5);
          }
          .zui-sub-menu {
            vertical-align: top;
            display: none;
            a {
              width: 100%;
              padding: 0;
              text-align: center;
              display: block;
              line-height: 52px;
              &.active,
              &:hover {
                color: #1bac6b;
              }
            }
          }
        }
      }
    }
  }
  .zui-login-btn {
    color: #fff;
    width: 80px;
    border-radius: 15px;
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    text-align: center;
    margin: 15px 0 15px 15px;
    border: 1px solid #1da63b;
    font-size: 14px;
    cursor: pointer;
    &:active {
      opacity: 0.7;
    }
  }
  .zui-login-name {
    color: #000;
    height: 30px;
    padding: 0 10px;
    margin: 15px 0 15px 15px;
    font-size: 14px;
    cursor: pointer;
    &:active {
      opacity: 0.7;
    }
  }
  &.white {
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    transition: all 0.5s;
    .zui-login-btn {
      color: #333;
    }
    .zui-header-bg {
      display: none;
    }
    .zui-header-nav {
      ul {
        li {
          &:hover {
            // background: rgba(29, 166, 59, 0.5);
            background: #fff;
            a {
              color: #333;
            }
          }
          a {
            color: #333;
          }
          .zui-sub-menu {
            a {
              color: #333;
            }
          }
        }
      }
    }
    .zui-header-search {
      width: 250px;
      .el-input {
        width: 40px;
        float: right;
        transition: width 0.5s;
        transition-delay: 0.1s;
        background: transparent;
        .el-icon-search {
          font-size: 19px;
        }
        .el-input__inner {
          color: #333;
        }
        &:hover {
          width: 200px;
          transition: width 0.5s;
          .el-input__inner {
            border-color: #c0c4cc;
          }
        }
      }
    }
  }
}
</style>
