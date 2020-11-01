<template>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="pageInfo.page"
      :page-size="pageInfo.pageSize"
      layout="total, prev, pager, next, jumper"
      :total="totalNum"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  props: {
    totalNum: {
      default: 0
    },
    pageInfo: {
      default: function() {
        return {
          page: 1,
          pageSize: 20
        };
      }
    }
  },
  data() {
    return {
      // pageInfo: {
      //     page: 1,
      //     pageSize: 20
      // }
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      this.Refresh();
    },
    handleCurrentChange(val) {
      console.log(val);
      this.pageInfo.page = val;
      this.Refresh();
    },
    Refresh() {
      this.$parent.pageInfo = JSON.parse(JSON.stringify(this.pageInfo)); //注意：这里自动找父级赋值，如果父级组件不是table，请使用下面的获取方法GetPageInfo()
      console.log(this.$parent.pageInfo)
      this.$emit("Refresh",this.$parent.pageInfo);
    },
    GetPageInfo() {
      //获取分页页数和每页条数
      return this.pageInfo;
    },
    InitPageInfo() {
      //初始化分页信息
      this.pageInfo.page = 1;
      this.pageInfo.pageSize = 20;
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
  /*padding-right: 8%;*/
  margin-top: 1%;
}
.block .el-input__inner {
  color: #1da63b;
  background-color: #fff;
  border-color: #1da63b !important;
}
</style>
