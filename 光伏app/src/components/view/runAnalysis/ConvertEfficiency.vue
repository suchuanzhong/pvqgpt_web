<template>
  <div class="PowerComp changerate-box">
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
      <div class="indexBox">
        <div id="totalPower" v-if="flag">
          <ConvertRateBar
            ids="convertEchartsbar"
            ref="convertEchartsbar"
            :xAxisData="convertXaxisData"
            :seriesData="convertSeriesData"
            legendOrient="vertical"
            yNamel="%"
          ></ConvertRateBar>
        </div>
        <div class="changerate-table">
          <template v-if="changerateTable.length>0">
            <div
              class="per-changerate-box"
              v-for="(item,index) in changerateTable"
              :key="'runanalysis'+index"
            >
              <div class="left-changerate">
                <i class="equipment-icon"></i>
                <span>{{item.code}}</span>
              </div>
              <div class="right-changerate">
                <span>运行监测转换效率</span>
                <label>
                  {{item.value}}
                  <span>%</span>
                </label>
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
import MtHeader from "@/components/public/MtHeader";
import { setTimeout } from "timers";
import ConvertRateBar from "@/components/public/EchartsBar";
export default {
  components: {
    Datetime,
    Group,
    MtHeader,
    ConvertRateBar
  },
  data() {
    let time = new Date();
    let years = time.getFullYear();
    let months = time.getMonth() < 10 ? "0" + time.getMonth() : time.getMonth();
    return {
      flag: true,
      selYear1: years + "-" + months, //当前显示的年份
      selYear2: String(years - 1),
      currentIndex: 1,
      timeList: [{ title: "年份", type: "year" }],
      storeTimeName: "year",
      convertXaxisData: [], //图表的数据
      convertSeriesData: [],
      changerateTable: [] //表格数据(项目运行监测名义转换效率)
    };
  },
  mounted() {
    // 首次调用
    this.getConvertEfficiencyData(
      "/AppApi/Base/QueryPvStringEffic",
      this.storeTimeName,
      this.selYear2 + "-01-01",
      ""
    );
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
            "/AppApi/Base/QueryPvStringEffic",
            val.type,
            this.selYear1 + "-01"
          );
        } else {
          this.selYear2 = String(years - 1);
          this.getConvertEfficiencyData(
            "/AppApi/Base/QueryPvStringEffic",
            val.type,
            this.selYear2 + "-01-01"
          );
        }
      });
    },
    // 获取逆变器转换效率的数据
    getConvertEfficiencyData(url, dateType, year) {
      let _this = this;
      this.flag = false;
      this.$fetch(url, {
        datatype: dateType,
        datetime: year
      }).then(res => {
        this.convertXaxisData = []; //x轴
        this.convertSeriesData = [];
        this.changerateTable = [];
        let arrayData = [];
        // x轴
        if (res.data && res.data.length > 0) {
          this.flag = true;

          this.convertXaxisData = [...new Set(res.data.map(a => a.code))]; //x轴
          let data1 = [],
            data2 = [],
            data3 = [];
          res.data.map(y => {
            data1.push({
              code: y.code,
              value: y.nameefficiency,
              name: "项目运行监测名义转换效率"
            });
            data2.push({
              code: y.code,
              value: y.afterefficiency,
              name: "组件实证监测名义转换效率"
            });
            data3.push({
              code: y.code,
              value: y.staefficiency,
              name: "组件标称效率"
            });
          });
          this.changerateTable = [...data1];
          arrayData = [data1, data2, data3];
          arrayData.forEach((item, i) => {
            this.convertSeriesData.push({
              name:
                i == 0
                  ? "项目运行监测名义转换效率"
                  : i == 1
                  ? "组件实证监测名义转换效率"
                  : "组件标称效率",
              type: "bar",
              barMaxWidth: 14,
              data: this.convertXaxisData.map(t => {
                let dataCol =
                  item && item.length > 0 ? item.filter(b => b.code == t) : 0;
                if (dataCol && dataCol.length > 0) return dataCol[0].value;
                else return null;
              })
            });
          });
          this.$nextTick(_ => {
            _this.$refs.convertEchartsbar.initEchartsBar(
              this.convertSeriesData
            );
          });
        }
      });
    },
    // 根据月份改变组件转换效率的数据
    onChangeYear1(year) {
      this.getConvertEfficiencyData(
        "/AppApi/Base/QueryPvStringEffic",
        this.storeTimeName,
        year + "-01"
      );
    },
    // 根据年份改变组件转换效率的数据
    onChangeYear2(year) {
      this.getConvertEfficiencyData(
        "/AppApi/Base/QueryPvStringEffic",
        this.storeTimeName,
        year + "-01-01"
      );
    }
  }
};
</script>
<style lang="less" scoped>
.changerate-box {
  display: flex;
  flex-direction: column;
  height: 100%;
  .viewWrap {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-x: hidden;
    #totalPower {
      margin-top: 0.1rem;
      height: 300px;
      background: #fff;
    }
    .indexBox {
      flex: 1;
      overflow-x: hidden;
      .changerate-table {
        margin: 0.1rem;
        .per-changerate-box {
          display: flex;
          justify-content: space-between;
          background: #fff;
          box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.06);
          border-radius: 6px;
          .left-changerate {
            display: flex;
            align-items: center;
            padding: 0.3rem 0 0.3rem 0.1rem;
            box-sizing: border-box;
            .equipment-icon {
              width: 0.3rem;
              height: 0.28rem;
              background: url("../../../assets/img/changerate-icon.png")
                no-repeat;
              background-size: 100% 100%;
            }
            span {
              display: inline-block;
              padding-left: 0.06rem;
              box-sizing: border-box;
              font-size: 0.18rem;
              color: #333;
              font-family: "pingfang-regular";
            }
          }
          .right-changerate {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 0.2rem 0.05rem 0.3rem 0;
            box-sizing: border-box;
            span {
              font-size: 0.12rem;
              color: #aaa;
              font-family: "pingfang-regular";
              white-space: nowrap;
            }
            label {
              font-family: "number";
              font-size: 0.26rem;
              color: #4cac0e;
              display: inline-block;
              padding-top: 0.05rem;
              box-sizing: border-box;
              white-space: nowrap;
              span {
                font-size: 0.13rem;
                color: #aaa;
              }
            }
          }
        }
        .per-changerate-box:not(:last-child) {
          margin-bottom: 0.1rem;
        }
      }
    }
  }
}
</style>

