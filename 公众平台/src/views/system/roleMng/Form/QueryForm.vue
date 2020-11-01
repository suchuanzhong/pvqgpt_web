<template>
  <div class="queryDiv" style="">
    <label class="queryLabel" style="font-weight: normal">角色名称：</label>
    <el-input
      v-model="queryInfo.roleName"
      placeholder="请输入内容"
      style="width:200px"
      size="medium"
    ></el-input>
    <el-button class="seachBtn Btn-blue" @click="Refresh" size="medium"
      >查询</el-button
    >
  </div>
</template>
<script>
export default {
  mounted() {},
  data() {
    return {
      queryInfo: {},
      initQuery: {}
    };
  },
  methods: {
    Refresh() {
      this.$emit("Refresh", this.queryInfo);
    },
    InitQuery() {
      this.queryInfo = JSON.parse(JSON.stringify(this.initQuery));
    }
  }
};
</script>
<style scoped>
.queryLabel {
  font-size: 14px;
  margin: 0 6px 0 10px;
}

.queryDiv {
  margin: 10px 0;
  padding-bottom: 5px;
}

.seachBtn {
  margin-left: 20px;
  /*width:120px;*/
}

.el-select {
  width: 180px;
}

.el-input__inner {
  height: 30px;
}
</style>
