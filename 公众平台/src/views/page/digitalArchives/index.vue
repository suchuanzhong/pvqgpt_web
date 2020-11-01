<template>
  <div class="zui-page-info">
    <div class="zui-sub-banner" >
      <img :src="'/img/' + $route.name + '.png'" alt="" height="260px" />
      <div class="zui-sub-text">
        <h1>数字档案馆</h1>
        <p>{{ "Digital Archives" | toUpperCase }}</p>
      </div>
    </div>
    <div class="zui-sub-tab" >
      <div
        class="zui-sub-tab_li"
        :class="{ active: $route.name == '基地档案馆' }"
      >
        <router-link to="/digitalArchives/base">基地</router-link>
      </div>
      <div
        class="zui-sub-tab_li"
        :class="{ active: $route.name == '企业档案馆' }"
      >
        <router-link to="/digitalArchives/company">企业</router-link>
      </div>
      <div
        class="zui-sub-tab_li"
        :class="{ active: $route.name == '厂家档案馆' }"
      >
        <router-link to="/digitalArchives/factor">厂家</router-link>
      </div>
<!--      <div-->
<!--        class="zui-sub-tab_li"-->
<!--        :class="{ active: $route.name == '设备档案馆' }"-->
<!--      >-->
<!--        <router-link to="/digitalArchives/equipment">设备</router-link>-->
<!--      </div>-->
    </div>
    
    <div class="zui-main" >
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <div class="p-t-100"></div>
  </div>
</template>
<script>
export default {
  filters: {
    toUpperCase(text) {
      console.log('1',text)
      return text.toUpperCase();

    }

  },
  watch: {},
  created() {},
  data() {
    return {
      actType: 1
    };
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
  .typical-detail{
    margin-top: 54px;
    width: 100%;
  }
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
      line-height: 44px;
      height: 52px;
      text-align: center;
      color: #999999;
      cursor: pointer;
      position: relative;
      &::before {
        content: "";
        height: 0;
        width: calc(50% - 6px);
        margin-top: -8px;
        border-bottom: 8px solid #f4f4f4;
        display: inline-block;
        border-right: 6px solid #f4f4f4;
        position: absolute;
        left: 0%;
      }
      &::after {
        content: "";
        height: 0;
        width: calc(50% - 6px);
        margin-top: -8px;
        border-bottom: 8px solid #f4f4f4;
        border-left: 6px solid #f4f4f4;
        display: inline-block;
        position: absolute;
        left: 50%;
      }
      a {
        color: #999999;
      }
      &:hover {
        text-decoration: underline;
      }
      &.active {
        &::before {
          border-right: 6px solid transparent;
        }
        &::after {
          border-left: 6px solid transparent;
        }
        a {
          color: #1bac6b;
          display: inline-block;
          height: 50px;
          border-bottom: 2px solid #1da63b;
        }
      }
    }
  }
}
</style>
