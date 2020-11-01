<template>
  <div>
    <div class="big-search">
      <el-input
        style="cursor: pointer"
        v-model="kewords"
        placeholder="请输入企业关键字"
        suffix-icon="el-icon-search"
        @change="getComList"
      >
        <!-- @keyup.enter.native="getComList" -->
      </el-input>
    </div>
    <SubTitle
      style="margin:45px 0 30px 0"
      text="光伏企业"
      en="PV enterprises"
      class="inlineBlock"
    ></SubTitle>
    <el-container>
      <el-main style="min-height:400px;padding-top:0" v-if="showList">
        <div class="company-list">
          <div
            class="com-li_card"
            @click="showDetail(item)"
            v-for="item in comListData"
            :key="item.id"
          >
            <div class="com-card_img">
              <img :src="item.logo" alt="" />
            </div>
            <div class="com-card_detail">
              <h4>{{ item.fullname }}</h4>
<!--              <p>{{ item.note }}</p>-->
              <p>
                <img src="../../../assets/img/com_loc.png" alt="" /><small>{{item.headquarters }}</small>
              </p>
              <img src="../../../assets/img/index/time.png" alt="" />
              <span class="com-title">公司类型<small class="com-time">{{item.enterpriseType}}</small></span>
              <img src="../../../assets/img/index/time.png" alt="" />
              <span class="com-title">建设电站<small class="com-time">{{item.powerStations}}座</small></span>
              <img src="../../../assets/img/index/capacity.png" alt="" />
              <span class="com-title">装机规模<small class="com-time">{{item.capacity}} MW</small></span>
              <img src="../../../assets/img/index/investment.png" alt="" />
              <span class="com-title">总投资<small class="com-time">{{item.investment}} 亿元</small></span>

<!--              <div class="arr-more el-icon-arrow-right" @click="showDetail(item)"></div>-->
<!--              <p>-->
<!--                <img src="../../../assets/img/com_loc.png" alt="" /><small>{{-->
<!--                  item.addr-->
<!--                }}</small>-->
<!--              </p>-->
              <div class="arr-more el-icon-arrow-right" ></div>
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
      <el-main v-else>
        <enterpriseDetail
          :articleData="detailData"
          :showList.sync="showList"

          ref="detail"
        ></enterpriseDetail>
      
      </el-main>

    </el-container>

  </div>
</template>
<script>
  import { getFormatDate } from "@/utils/auth";
export default {
  props:['data'],
  components: {
    SubTitle: resolve => {
      require(["@/components/public/subTitle.vue"], resolve);
    },
    enterpriseDetail: resolve => {
      require(["./enterpriseDetail.vue"], resolve);
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
      dialogTypeName:'',
      comListData: [],
      kewords: "",
      pageData: {
        pageSize: 10,
        page: 1,
        total: 0
      },
      showList: true,
      detailData:{},
      tableList:[],
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
      localStorage.setItem("Id",data.id)

      this.showList = false;
      this.$fetch("/LtrEnterprise", {
        Id: data.id
      }).then(res => {
        if(res.data.data&&res.data.data.length>0){
          this.detailData = res.data.data[0];
        }
      });
    },
    getComList() {

      this.$fetch("/LtrEnterprise", {
        fullname:this.kewords,
        page: this.pageData.page,
        pageSize: this.pageData.pageSize
      }).then(res => {
        // if(res.data.data&&res.data.data.length>0) {
          this.comListData = res.data.data;
          this.pageData.total = res.data.totalCount;
        // }
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
<style lang="scss" scope="scope">
.com-li_card {
  display: flex;
  padding: 35px 40px;
  border-top: 1px solid #f4f4f4;
  cursor: pointer;
  &:last-of-type {
    border-bottom: 1px solid #f4f4f4;
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
      font-size: 16px;
      font-weight: bold;
      color: #666666;
      margin-bottom: 20px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
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
      position: absolute;
      right: -20px;
      top: 50%;
      color: #666666;
      margin-top: -10px;
      font-size: 20px;
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
}
</style>
