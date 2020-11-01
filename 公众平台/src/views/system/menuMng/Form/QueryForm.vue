<template>
  <div>
    <span>菜单名称:</span>
    <el-input
      placeholder="请输入菜单名称"
      style="width:200px;"
      v-model="menuName"
    ></el-input>
    <el-button type="primary" @click="queryRef">查询</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      result: {
        queryInfo: {},
        menuName: ""
      }
    };
  },
  methods: {
    //查询
    queryRef: function() {
      this.$emit("Refresh", this.menuName);
    },
    //清空查询
    queryClear: function() {}
  }
};
</script>
