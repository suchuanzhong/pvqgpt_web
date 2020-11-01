<template>
  <div class="zui-page-info">
    <div class="zui-sub-banner">
      <img src="/img/综合.png" alt="" height="260px" />
      <div class="zui-sub-text">
        <h1>综合查询</h1>
        <p>{{ "Comprehensive query" | toUpperCase }}</p>
      </div>
    </div>
    <div class="zui-main p-t-100">
      <el-container>
        <el-aside width="400px">
          <MyTree
            :treeData="subMenuList"
            @firstMenuClick="clickFirstMenu"
            :propData="treeProp"
            v-if="subMenuList.length > 0"
            :checkFirstChild="true"
            :nodeSlide="false"
          ></MyTree>
        </el-aside>
        <el-main style="min-height:400px;padding-top:0">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
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
  components: {
    MyTree: resolve => {
      require(["@/components/public/myTree.vue"], resolve);
    }
  },
  watch: {},
  created() {
    this.subMenuList = this.subMenuList.map(item => {
      item.isOpen = item.name == this.$route.name ? true : false;
      return item;
    });
  },
  methods: {
    getMenuTreeData() {
      this.$fetch("/LtrDevice/GetDeviceTree").then(res => {
        let data = res.data;
        let _this = this;
        this.subMenuList = data.map((item, idx) => {
          if (idx == 0) {
            item.isOpen = true;
            _this.clickFirstMenu(item);
          } else {
            item.isOpen = false;
          }
          return item;
        });
      });
    },
    clickFirstMenu(data) {
      this.$router.push({
        name: data.name
      });
      this.firstData = data;
    }
  },
  data() {
    return {
      treeProp: {
        children: "childTreeNode",
        name: "name"
      },
      firstData: {},
      subMenuList: [
        {
          name: "监测指标查询",
          id: "1",
          isOpen: false,
          childTreeNode: []
        },
        {
          name: "运行效率查询",
          id: "2",
          isOpen: false,
          childTreeNode: []
        },
        {
          name: "对标查询",
          id: "3",
          isOpen: false,
          childTreeNode: []
        }
      ],
      actType: 1
    };
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
