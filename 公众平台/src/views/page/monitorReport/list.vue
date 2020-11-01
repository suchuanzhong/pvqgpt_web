<template>
  <div class="zui-sub-info_List">
    <div style="min-height:600px">
      <div
        class="zui-sub-info_li"
        v-for="(item, idx) in actlist"
        :key="idx"
        @click="routerLink(item, idx)"
      >
        <div class="zui-info-li_rightBox">
          <i class="icon-arr-more el-icon-arrow-right"></i>
          <h3>{{ item.title }}</h3>
        </div>
        <div class="zui-info-li_leftBox">
          {{ item.time | yyyyMMdd }}
        </div>
      </div>
    </div>
    <el-divider></el-divider>
    <div>
      <el-pagination
        background
        class="bdPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageData.page"
        :page-size="pageData.pageSize"
        layout="total,prev, pager, next"
        :total="pageData.total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { getFormatDate } from "@/utils/auth";
export default {
  data() {
    return {
      pageData: {
        page: 1,
        pageSize: 10,
        total: 0
      },
      actlist: [],
      infoList: []
    };
  },
  watch: {
    $route(data) {
      var id = data.params.id || 0;
      this.getNewsList(id);
    }
  },
  filters: {
    MMdd(val) {
      return getFormatDate("MM-dd", val);
    },
    yyyy(val) {
      return getFormatDate("yyyy", val);
    },
    yyyyMMdd(val) {
      return getFormatDate("yyyy.MM.dd", val);
    }
  },
  methods: {
    routerLink(data) {
      this.$router.push("/monitorReport/detail/" + data.id);
    },
    getNewsList() {
      var type = this.$route.params.id || "";
      let _this = this;
      this.$fetch("/MtrMonitoringReport/GetPageViewQuery", {
        Page: this.pageData.page,
        PageSize: this.pageData.pageSize,
        BaseId: type
      }).then(res => {
        _this.infoList = res.data.data;
        _this.actlist = res.data.data;
        _this.pageData.total = res.data.totalCount;
      });
    },
    handleSizeChange(val) {
      this.pageData.pageSize = val;
      this.getNewsList();
    },
    handleCurrentChange(val) {
      this.pageData.page = val;
      this.getNewsList();
    }
  },
  mounted() {
    this.getNewsList();
  }
};
</script>
<style lang="scss" scoped>
.zui-sub-info_li {
  padding: 20px 50px 20px 40px;
  border-bottom: 1px solid #f4f4f4;
  // border-left: 2px solid #f4f4f4;
  position: relative;
  cursor: pointer;
  &:first-of-type {
    border-top: 1px solid #f4f4f4;
  }
  &:hover {
    h3,
    p {
      text-decoration: underline;
    }
  }
  .icon-arr-more {
    font-size: 20px;
    color: #666666;
    position: absolute;
    font-weight: bold;
    right: 30px;
    top: 20px;
  }
  &.firstInfo {
    background: #f4f4f4;
    padding: 40px 150px 70px 40px;
    h1 {
      color: #808080;
      font-size: 36px;
    }
    .zui-info-li_rightBox {
      h3 {
        color: #1bac6b;
        font-size: 24px;
        padding-top: 5px;
        line-height: 36px;
        font-weight: normal;
      }
    }
  }
  h2 {
    color: #666666;
    font-size: 24px;
  }

  p {
    color: #808080;
    font-size: 14px;
    line-height: 24px;
    margin-top: 20px;
    height: 72px;
    overflow: hidden;
  }
  display: flex;
  .zui-info-li_leftBox {
    width: 140px;
    padding-right: 40px;
    white-space: nowrap;
    text-align: right;
    color: #666;
    h5 {
      line-height: 2em;
      text-align: right;
      color: #999999;
    }
  }
  .zui-info-li_rightBox {
    width: calc(100% - 140px);
    h3 {
      color: #666666;
      font-size: 16px;
      // font-weight: bold;
    }
  }
}
</style>
