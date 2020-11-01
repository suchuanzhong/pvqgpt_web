<template>
  <div class="zui-sub-info_List">
    <div
      class="zui-sub-info_li"
      v-for="(item, idx) in actlist"
      :key="idx"
      :class="{ firstInfo: idx === 0 }"
      @click="routerLink(item, idx)"
    >
      <div class="zui-info-li_leftBox" v-if="idx > 0">
        <h2 class="num">{{ item.time | MMdd }}</h2>
        <h5 class="num">{{ item.time | yyyy }}</h5>
      </div>
      <div class="zui-info-li_rightBox">
        <h1 class="num" v-if="idx == 0">{{ item.time | yyyyMMdd }}</h1>
        <i class="icon-arr-more el-icon-arrow-right" v-else></i>
        <h3>{{ item.title }}</h3>
        <p>{{ item.introduction }}</p>
      </div>
    </div>
    <el-divider></el-divider>
    <div >
      <el-pagination
        background
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
      // var classType = data.query.classType || 0;
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
      this.$fetch('/MtrNewsInformation/UpdateBrowse',{id:data.id,browse:data.browse}).then(res=>{
        if(res.data){
          this.$router.push("/information/detail/" + data.id);
        } 
      })
      
    },
    getNewsList() {

      var type = this.$route.params.id || 0;
      let _this = this;
      this.$fetch("/MtrNewsInformation", {
        Page: this.pageData.page,
        PageSize: this.pageData.pageSize,
        Type: type
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
  padding: 50px 150px 30px 40px;
  border-bottom: 2px solid #f4f4f4;
  border-left: 2px solid #f4f4f4;
  position: relative;
  cursor: pointer;
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
    top: 55px;
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
    h5 {
      line-height: 2em;
      text-align: right;
      color: #999999;
    }
  }
  .zui-info-li_rightBox {
    h3 {
      color: #666666;
      font-size: 16px;
      font-weight: bold;
    }
  }
}
</style>
