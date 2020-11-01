<template>
  <div class="view-container invert-rate-box">
    <MtHeader backPagePathName="runAnalysis"></MtHeader>
    <div class="viewWrap">
      <div class="view-box">
        <span>
          <img slot="icon" src="./../../../assets/img/rili.png" width="20" height="auto" />
          <span class="timeChange">
            <p
              v-for="(item,index) in timeList"
              :key="index"
              @click="changeTime(item,index)"
            >
              <span>{{item.title}}</span>
            </p>
          </span>
        </span>
        <!-- <group class="groupWrap timeChangeSel" v-if="storeTimeName=='month'">
          <datetime v-model="selYear1" format="YYYY-MM" @on-change="onChangeYear1"></datetime>
        </group> -->
        <group class="groupWrap timeChangeSel" v-if="storeTimeName=='year'">
          <datetime v-model="selYear2" format="YYYY" @on-change="onChangeYear2"></datetime>
        </group>
      </div>
      <div>
        <div class="inverter-box">
          <template v-if="iverterTable.length>0">
            <div
              class="per-invert-table"
              v-for="(invert,index) in iverterTable"
              :key="'iinvert'+index"
            >
              <div class="left-invert-name">
                <p
                  :class="{'title-bg1':invert.stype==3,'title-bg2':invert.stype==1}"
                >{{invert.stype|stypeInverte}}</p>
                <span>{{invert.code}}</span>
              </div>
              <div class="right-invert-rate">
                <p>最高转换效率</p>
                <span>
                  {{invert.maxefficency|filterPercent}}
                  <label>%</label>
                </span>
              </div>
            </div>
          </template>
          <div v-else class="no-data-show">暂无数据</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import { Datetime, Group } from "vux";
import { baseImg } from "static/img/base64";
import { setTimeout } from "timers";
import MtHeader from "@/components/public/MtHeader";
export default {
  components: {
    Datetime,
    Group,
    MtHeader
  },
  data() {
    let time = new Date();
    let years = time.getFullYear();
    let months = time.getMonth() < 10 ? "0" + time.getMonth() : time.getMonth();
    return {
      selYear1: years + "-" + months, //当前显示的年份
      selYear2: String(years - 1),
      currentIndex: 1,
      timeList: [{ title: "年份", type: "year" }],
      storeTimeName: "year",
      iverterTable: [] //表格数据
    };
  },
  mounted() {
    // 首次调用
    this.getConvertEfficiencyData(
      "/AppApi/Base/QueryInvert",
      this.storeTimeName,
      this.selYear2 + "-01-01"
    );
  },
  filters: {
    stypeInverte(type) {
      switch (type) {
        case 1:
          return "集中式";
          break;
        case 2:
          return "集散式";
          break;
        case 3:
          return "组串式";
          break;
        default:
          return "";
      }
    },
    filterPercent(val) {
      if (val.indexOf("%") > -1) {
        return val.substring(0, val.length - 1);
      } else {
        return val;
      }
    }
  },
  methods: {
    // 切换日月年触发的事件
    changeTime(val, i) {
      let time = new Date();
      let years = time.getFullYear();
      let months =
        time.getMonth() < 10 ? "0" + time.getMonth() : time.getMonth();
      this.storeTimeName = "";
      this.currentIndex = i;
      this.$nextTick(() => {
        this.storeTimeName = val.type;
        if (i == 0) {
          this.selYear1 = String(years + "-" + months);
          this.getConvertEfficiencyData(
            "/AppApi/Base/QueryInvert",
            val.type,
            this.selYear1 + "-01"
          );
        } else {
          this.selYear2 = String(years - 1);
          this.getConvertEfficiencyData(
            "/AppApi/Base/QueryInvert",
            val.type,
            this.selYear2 + "-01-01"
          );
        }
      });
    },
    // 获取发电量分析的数据
    getConvertEfficiencyData(url, dateType, year) {
      this.$fetch(url, { datatype: dateType, datetime: year }).then(res => {
        this.iverterTable = res.data;
      });
    },
    // 根据月份改变组件转换效率的数据
    onChangeYear1(year) {
      this.getConvertEfficiencyData(
        "/AppApi/Base/QueryInvert",
        this.storeTimeName,
        year + "-01"
      );
    },
    // 根据年份改变组件转换效率的数据
    onChangeYear2(year) {
      this.getConvertEfficiencyData(
        "/AppApi/Base/QueryInvert",
        this.storeTimeName,
        year + "-01-01"
      );
    }
  }
};
</script>
<style lang="less" scoped>
.invert-rate-box {
  display: flex;
  flex-direction: column;
  height: 100%;
  .viewWrap {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-x: hidden;
    .inverter-box {
      margin: 0.1rem;
   
      .per-invert-table {
        display: flex;
        justify-content: space-between;
        background: #fff;
        box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.06);
        border-radius: 6px;
        .left-invert-name {
          p {
            width: 1rem;
            font-size: 0.18rem;
            color: #fff;
            padding: 0.04rem 0 0.04rem 0.1rem;
            box-sizing: border-box;
          }
          .title-bg1 {
            background: url("../../../assets/img/table-titlebg1.png") no-repeat;
            background-size: 100% 100%;
          }
          .title-bg2 {
            background: url("../../../assets/img/table-titlebg2.png") no-repeat;
            background-size: 100% 100%;
          }
          span {
            padding: 0.2rem 0 0.25rem 0.3rem;
            box-sizing: border-box;
            display: inline-block;
            font-size: 0.18rem;
            color: #333;
            font-family: "pingfang-regular";
          }
        }
        .right-invert-rate {
          p {
            font-size: 0.12rem;
            color: #aaa;
            padding: 0.2rem 0.25rem 0.1rem 0;
            white-space: nowrap;
          }
          span {
            font-family: "number";
            font-size: 0.26rem;
            color: #4cac0e;
            white-space: nowrap;
            label {
              font-size: 0.13rem;
              color: #aaa;
            }
          }
        }
      }
      .per-invert-table:not(:last-child) {
        margin-bottom: 0.1rem;
      }
    }
  }
}
</style>

