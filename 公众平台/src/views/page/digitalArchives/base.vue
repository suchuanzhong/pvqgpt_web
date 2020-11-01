<template>
  <div class="base-mian">
    <SubTitle
            style="margin:60px 0 30px 0"
            text="光伏基地"
            en="photovoltaic base"
            class="inlineBlock"
    ></SubTitle>
    <el-container >
      <el-main style="min-height:400px;padding-top:0" >
        <div class="company-list">
          <div
                  class="com-li_card"
                  v-for="(item,index) in comListData"
                  :key="index"
          >
            <div class="com-card_img">
              <img :src="item.showPicture" alt="" />
            </div>
            <div class="com-card_detail">
              <a @click="showDetail(item)" style="display: inline-flex;margin-right: 10px;">
                <h4>{{ item.baseName }}</h4>
              </a>

              <span class="com-card-title" :class="{' com-card-two-title' :item.batchName=='第二批次','com-card-three-title':item.batchName=='第三批次'||item.batchName=='第三批次奖励'}"><i >{{item.batchName}}</i></span>
              <p>
                <img src="../../../assets/img/com_loc.png" alt="" /><small>{{item.point }}</small>
              </p>
              <img src="../../../assets/img/index/time.png" alt="" />
              <span class="com-title">建设时间<small class="com-time">{{item.buildtime | dateFilter}}</small></span>
              <img src="../../../assets/img/index/time.png" alt="" />
              <span class="com-title">并网时间<small class="com-time">{{item.gridtime | dateFilter}}</small></span>
              <img src="../../../assets/img/index/capacity.png" alt="" />
              <span class="com-title">并网容量<small class="com-time">{{item.gridsCale}} MW</small></span>
              <img src="../../../assets/img/index/investment.png" alt="" />
              <span class="com-title">总投资<small class="com-time">{{item.invest}} 亿元</small></span>

              <div class="arr-more el-icon-arrow-right" @click="showDetail(item)"></div>
            </div>
          </div>
        </div>
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
      </el-main>
      <!--      <el-main v-else>-->
      <!--        <ComDetail-->
      <!--                :articleData="detailData"-->
      <!--                :showList.sync="showList"-->
      <!--                ref="detail"-->
      <!--        ></ComDetail>-->
      <!--      </el-main>-->
    </el-container>

  </div>
</template>
<script>
  import { getFormatDate } from "@/utils/auth";
  export default {
    components: {
      SubTitle: resolve => {
        require(["@/components/public/subTitle.vue"], resolve);
      },
    },
    filters: {
      MMdd(val) {
        return getFormatDate("MM-dd", val);
      },
      yyyy(val) {
        return getFormatDate("yyyy", val);
      },
      yyyyMMdd(val) {
        return getFormatDate("yyyy-MM-dd", val);
      }
    },
    data() {
      return {

        comListData: [],
        kewords: "",
        pageData: {
          pageSize: 10,
          page: 1,
          total: 0
        },
      };
    },
    watch: {
      kewords() {
        this.pageData.page = 1;
      }
    },
    mounted() {
      this.getComList();
    },
    methods: {
      showDetail(data) {
        // debugger
        let routeOne = this.$router.resolve({
          path:"/typical",
          query: {
            id: data.id ,
            point:data.point
          }
        });
        window.open(routeOne.href, '_blank');


      },
      getComList() {
        this.$fetch("/MtrBase", {
          page: this.pageData.page,
          pageSize: this.pageData.pageSize
        }).then(res => {
          if(res.data.data&&res.data.data.length>0){

            this.comListData = res.data.data;
            this.pageData.total = res.data.totalCount;
          }
        });

      },
      handleSizeChange(val) {
        this.pageData.pageSize = val;
        this.getComList();
      },
      handleCurrentChange(val) {
        this.pageData.page = val;
        this.getComList();
      }
    }
  };
</script>
<style lang="scss" scoped>
  .base-mian{
    width: 100%;
    height: 100%;
  }
  .com-li_card {
    display: flex;
    padding: 35px 40px;
    border-top: 1px solid #f4f4f4;

    &:last-of-type {
      border-bottom: 2px solid #f4f4f4;
    }
    .com-card_img {
      width: 160px;
      margin-right: 30px;
      img {
        width: 100%;
        border: 1px solid #e4e4e4;
        overflow: hidden;
        height: 96px;
      }
    }
    .com-card_detail {
      flex: 1;
      position: relative;
      h4 {
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
        color: #666666;
        margin-bottom: 20px;
        display: inline-block;
      }
      p {
        color: #808080;
        font-size: 14px;
        line-height: 1.8em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        height: 1.8em;
        img {
          margin-right: 8px;
          vertical-align: middle;
        }
        small {
          color: #999999;
          font-size: 14px;
          max-width: calc(100% - 40px);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .arr-more {
        cursor: pointer;
        position: absolute;
        right: -20px;
        top: 50%;
        color: #666666;
        margin-top: -10px;
        font-size: 20px;
      }
    }
    .com-card-title{
      width:100%;
      height: 100%;
      display: inline;
      background-size: cover !important;
      background: url("../../../assets/img/index/third-batch.png")no-repeat;
      font-size: 12px;
      color: #fff;
      padding: 2px 6px 2px 10px;
      i{
        font-style:normal;
      }
    }
    .com-card-two-title{
      background: url("../../../assets/img/index/first-time.png")no-repeat;
    }
    .com-card-three-title{
      background: url("../../../assets/img/index/second-batch.png")no-repeat;

    }

    .com-title{
      color: #1bac6b;
      font-size: 14px;
      padding-left: 10px;

    }
    .com-time{
      color: #666 !important;
      font-size: 14px;
      margin-left: 12px;
      margin-right: 50px;
    }
  }
</style>
