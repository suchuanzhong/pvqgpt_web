<template>
  <div class="shareQuery">
    <label class="queryLabel"></label>
    <el-input
      v-model="queryInfo.fileName"
      placeholder="文件名"
      style="width:200px"
      size="medium"
    ></el-input>
    <el-input
      v-model="queryInfo.documentType"
      placeholder="类型"
      style="width:200px"
      size="medium"
    ></el-input>
    <el-button class="seachBtn Btn-blue" @click="refresh" 
      ><img src="../../../assets/img/Search.png" alt=""></el-button
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
    refresh() {
      this.$parent.queryInfo = JSON.parse(JSON.stringify(this.queryInfo));
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


.seachBtn {
  width: 60px;
  height: 40px;
}

.el-select {
  width: 180px;
}

.queryDiv .el-input__inner {
  height: 40px;
}
</style>
