<template>
  <div class="queryDiv">
    <label class="queryLabel" style="font-weight: normal">用户账号：</label>
    <el-input
      v-model="queryInfo.userName"
      placeholder="请输入用户账号"
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
      queryInfo: {}
    };
  },
  methods: {
    Refresh() {
      if (this.$parent.queryInfo != undefined) {
        this.$parent.queryInfo = JSON.parse(JSON.stringify(this.queryInfo));
      }
      console.log( this.$parent.queryInfo)
      this.$emit("Refresh",this.queryInfo);
    }
  }
};
</script>
<style lang="scss" scoped>
.queryLabel {
  font-size: 14px;
  margin: 0 6px 0 15px;
}

.queryDiv {
  margin: 10px 0;
}

.seachBtn {
  margin-left: 20px;
  /*width:120px;*/
}

.el-select {
  width: 180px;
}

.queryDiv .el-input__inner {
  height: 30px;
}
</style>
