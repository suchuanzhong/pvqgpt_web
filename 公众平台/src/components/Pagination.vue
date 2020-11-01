<template>
  <div class="block">
    <el-pagination
      background
      layout="sizes,prev, pager, next,jumper"
      :total="totalNum"
      :page-size="pageInfo.pageSize"
      :page-sizes="[10, 40, 60, 80]"
      :current-page="pageInfo.page"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  props: ["totalNum"],
  data() {
    return {
      pageInfo: {
        page: 1,
        pageSize: 10
      }
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      this.Refresh();
    },
    handleCurrentChange(val) {
      this.pageInfo.page = val;
      this.Refresh();
    },
    Refresh() {
      this.$parent.pageInfo = JSON.parse(JSON.stringify(this.pageInfo)); //注意：这里自动找父级赋值，如果父级组件不是table，请使用下面的获取方法GetPageInfo()
      this.$emit("Refresh");
    },
    GetPageInfo() {
      //获取分页页数和每页条数
      return this.pageInfo;
    },
    InitPageInfo() {
      //初始化分页信息
      (this.pageInfo.page = 1), (this.pageInfo.pageSize = 10);
    }
  }
};
</script>
<style type="text/css">
.el-pagination button.disabled {
  color: #232121;
}

.block {
  text-align: center;
  margin-top: 1%;
}
</style>
