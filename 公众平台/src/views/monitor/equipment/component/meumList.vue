<template>
  <div class="navWrap">
    <p class="title">全部方阵</p>
    <el-scrollbar style="height:calc(100% - 70px);">
      <el-tree
        ref="navtree"
        :data="data"
        accordion
        :props="defaultProps"
        @node-click="handleNodeClick"
        node-key="code"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>
            <label v-if="node.level == 1" style="display:inline-block;">
              <span
                v-for="(item, index) in data.type"
                :key="index"
                style="font-size:12px;padding:3px 3px;border:1px solid rgb(0,235,251);border-radius:2px;transform:scale(0.8);color:rgb(0,235,251);display:inline-block;"
                >{{ item | formatType }}</span
              >
            </label>
            {{ node.label }}
          </span>
        </span>
      </el-tree>
    </el-scrollbar>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      defaultProps: {
        children: "child",
        label: "name"
      },
      data: [],
      children: []
    };
  },
  methods: {
    handleNodeClick(data, Nodes, node) {
      // 修改选中样式
      $(".el-tree-node__content").removeClass("select");
      this.$nextTick(() => {
        $(node.$el)
          .children(".el-tree-node__content")
          .addClass("select");
      });

      if (Nodes.level == 1) {
        this.data.forEach(item => {
          this.$refs.navtree.store.nodesMap[item.code].expanded = false;
        });
        this.$emit("selectnodedata", "MainWrap", data);
      } else if (Nodes.level == 2) {
        //groupMonitoring-组串  HLbox-集中
        var viewName = data.type == 3 ? "groupMonitoring" : "HLbox";
        this.$emit("selectnodedata", viewName, data);
      }
    },
    // 获取左侧导航列表一级
    getMenuLevel1(id) {
      var _this = this;
      this.$fetch("/RealTimeData/GetSumBoxList?projectcode=" + id).then(res => {
        let result = JSON.parse(JSON.stringify(res.data));
        result.forEach(item => {
          item.name = item.code.substr(-4, 4) + "﹟方阵";
          item.child.forEach(i => {
            i.name = i.code.substr(-4, 4) + "﹟逆变器";
          });
        });
        _this.data = result;
        _this.$nextTick(() => {
          $('div[role="treeitem"] .el-tree-node__content')
            .eq(0)
            .addClass("select");
          // 传递选中数据
          _this.$emit("selectnodedata", "MainWrap", this.data[0]);
        });
      });
    }
  },
  filters: {
    formatType(type) {
      switch (type) {
        case 1:
          return "集中";
        // break;
        case 2:
          return "集散";
        // break;
        case 3:
          return "组串";
        // break;
      }
    }
  }
};
</script>
<style lang="scss">
.navWrap .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
