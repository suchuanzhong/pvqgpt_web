<template>
  <div class="PowerEffectency runAly">
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
        <group class="groupWrap timeChangeSel" v-if="storeTimeName=='year'">
          <datetime v-model="selYear" format="YYYY" @on-change="onChangeYear"></datetime>
        </group>
      </div>
      <group class="groupWrap">
        <popup-picker
          title="基地"
          :data="stationList"
          v-model="selStation"
          @on-change="onChange"
        >
          <template slot="title" slot-scope="props">
            <!-- use scope="props" when vue < 2.5.0 -->
            <span
              style="height:24px;"
              :class="props.labelClass"
              :style="props.labelStyle"
              class="soltTitle"
            >
              <span
                class="demo-icon demo-icon-big soltTitle"
                style="font-size:20px;vertical-align:middle;"
              >
                <img slot="icon" src="./../../../assets/img/dz.png" width="20" height="auto" />
              </span>
              <span style="vertical-align:middle;padding:0 0.12rem">基地</span>
            </span>
          </template>
        </popup-picker>
      </group>
      <div class="indexBox">
        <group>
          <cell value-align="left">
            <p class="label">
              <span>{{selStation[0]!=='全部'?totalName+'总计':'基地总计'}}</span>
            </p>
            <div class="info">
              <p v-for="(item,index) in stationCount" :key="index">
                <label>{{item.title}}</label>
                <span :style="selStation[0]|colorFilter">{{item.value}}</span>
                <i>{{item.unit}}</i>
              </p>
            </div>
          </cell>
        </group>
        <div id="totalPower" v-if="flag">
          <EffectCompBar
            ids="nxbEchartsbar"
            ref="nxbEchartsbar"
            :xAxisData="nxbXaxisData"
            :seriesData="nxbSeriesData"
            yNamel="能效比(%)"
          ></EffectCompBar>
        </div>
        <div class="changerate-table">
          <x-table :cell-bordered="false" class="table-container">
            <thead>
              <tr class="model-title">
                <th>时间</th>
                <th>能效比</th>
              </tr>
            </thead>
          </x-table>
          <div>
            <x-table :cell-bordered="false" class="table-container">
              <tbody>
                <tr
                  v-for="(item,index) in effectComTableList"
                  :key="'runanalysis'+index"
                  class="changerate-cell"
                >
                  <td>{{item.time}}</td>
                  <td>{{item.effect}}</td>
                </tr>
                <tr v-if="effectComTableList.length==0">
                  <td style="text-align:center;line-height:40px;">暂无数据</td>
                </tr>
              </tbody>
            </x-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import { Datetime, Group, Cell, PopupPicker, XTable } from "vux";
import { baseImg } from "static/img/base64";
import MtHeader from "@/components/public/MtHeader";
import { FormateRule, DealNull } from "@/plugin/dealData";
import EffectCompBar from "@/components/public/EchartsBar";
export default {
  components: {
    Datetime,
    Group,
    Cell,
    PopupPicker,
    MtHeader,
    EffectCompBar,
    XTable
  },
  data() {
    return {
      roleType: null,
      flag: true,
      selYear: String(new Date().getFullYear()),
      selStation: [],
      stationList: [[]],
      stationCount: [{ title: "能效比", unit: "%", value: 0 }], //电站
      // projectCount: [{ title: "综合发电效率", unit: "", value: 0 }],//基地
      currentIndex: 1,
      timeList: [{ title: "年份", type: "year" }],
      storeTimeName: "year",
      nxbXaxisData: [], //图表的数据
      nxbSeriesData: [],
      allStationMsg: [], //存储电站名称及编号
      totalRateData: [], //电站的总计数据
      powerNum: null, //存储电站对应的编号
      totalName: "",
      effectComTableList: [], //表格的数据
      tbaleProp: [{ name: "能效比", prop: "effect" }]
    };
  },
  mounted() {
    // 获取电站集合
    this.allStationMsg = JSON.parse(localStorage.getItem("storeStationMsg"));
    let msg = [];
    if (this.allStationMsg && this.allStationMsg.length > 0) {
      this.allStationMsg.forEach(ss => {
        msg.push(ss.projectName);
      });
      this.stationList = [msg]; //当前的电站
    }
    this.roleType = localStorage.getItem("currentRoleType");
    if (this.roleType == 1) {
      //1--项目类型,其他--基地类型
      this.selStation.push(this.allStationMsg[0].projectName);
      this.powerNum = this.allStationMsg[0].projectCode;
    } else {
      this.selStation.push("全部");
      this.powerNum = "";
    }
    this.getEffectCompData(
      "/AppApi/Base/QueryPowerEfficiency",
      this.storeTimeName,
      "",
      this.powerNum
    );
  },
  methods: {
    // 切换日月年触发的事件
    changeTime(val, i) {
      let time = new Date();
      let years = time.getFullYear();
      this.storeTimeName = "";
      this.currentIndex = i;
      this.allStationMsg.forEach(t => {
        if (this.selStation[0] == t.projectName) this.powerNum = t.projectCode;
      });
      this.$nextTick(() => {
        this.storeTimeName = val.type;
        if (i == 0) {
          this.selYear = String(years);
          this.getEffectCompData(
            "/AppApi/Base/QueryPowerEfficiency",
            val.type,
            this.selYear + "-01-01",
            this.powerNum
          );
        } else {
          this.getEffectCompData(
            "/AppApi/Base/QueryPowerEfficiency",
            val.type,
            "",
            this.powerNum
          );
        }
      });
    },
    // 对数组对象升序
    obgSort(prop) {
      return function(obj1, obj2) {
        var val1 = obj1[prop];
        var val2 = obj2[prop];
        if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
          val1 = Number(val1);
          val2 = Number(val2);
        }
        if (val1 < val2) {
          return -1;
        } else if (val1 > val2) {
          return 1;
        } else {
          return 0;
        }
      };
    },
    // 获取能效比的数据
    getEffectCompData(url, dateType, year, code) {
      let _this = this;
      _this.flag = false;
      this.$fetch(url, {
        datatype: dateType,
        datetime: year,
        baseId: code
      }).then(res => {
        _this.flag = true;
        this.stationCount[0].value = 0;
        this.nxbXaxisData = []; //x轴
        this.nxbSeriesData = [];
        this.effectComTableList = [];
        // x轴
        if (dateType == "month") {
          for (let k = 1; k <= 12; k++) {
            this.nxbXaxisData.push(k + "月");
          }
        } else {
          if (res.data && res.data.datas.length > 0) {
            let conbineData = res.data.datas;
            conbineData.sort(this.obgSort("yearNum")).map(h => {
              this.nxbXaxisData.push(h.yearNum);
            });
            this.nxbXaxisData = [...new Set(this.nxbXaxisData)];
          }
        }
        if (res.data && res.data.datas.length > 0) {
          // 计算表格数据

          this.effectComTableList = this.nxbXaxisData.map(c => {
            let tablelist = {};
            let tableValue = null;
            let filterStandard = null;
            if (dateType == "year") filterStandard = "yearNum";
            else filterStandard = "monthNum";
            this.tbaleProp.forEach(t => {
              tableValue = res.data.datas.filter(
                w =>
                  w[filterStandard] ==
                  (filterStandard == "monthNum"
                    ? c.substring(0, c.length - 1)
                    : c)
              );
              if (tableValue.length > 0) {
                tablelist[t.prop] = tableValue[0].dataValue;
                if (filterStandard == "yearNum") {
                  tablelist.time = tableValue[0].yearNum;
                } else {
                  tablelist.time =
                    tableValue[0].yearNum +
                    "-" +
                    (tableValue[0].monthNum < 10
                      ? "0" + tableValue[0].monthNum
                      : tableValue[0].monthNum);
                }
              }
            });
            return tablelist;
          });
          this.stationCount[0].value = res.data.total ? res.data.total : 0;
          // y轴
          let echartsLine = res.data.datas;
          this.nxbSeriesData.push({
            name: "",
            data: this.nxbXaxisData.map(c => {
              let dataCol = null;
              if (dateType == "month") {
                dataCol = echartsLine.filter(
                  b => String(b.monthNum) == c.substring(0, c.length - 1)
                );
              } else {
                dataCol = echartsLine.filter(b => b.yearNum == c);
              }
              if (dataCol && dataCol.length > 0) return dataCol[0].dataValue;
              else return null;
            }),
            type: "bar",
            barMaxWidth: 14
          });
          this.$nextTick(_ => {
            _this.$refs.nxbEchartsbar.initEchartsBar(this.nxbSeriesData);
          });
        }
      });
    },
    // 根据年份改变基地发电量的数据
    onChangeYear(year) {
      this.allStationMsg.forEach(t => {
        if (this.selStation[0] == t.projectName) this.powerNum = t.projectCode;
      });
      this.getEffectCompData(
        "/AppApi/Base/QueryPowerEfficiency",
        this.storeTimeName,
        year + "-01-01",
        this.powerNum
      );
    },

    onChange(val) {
      let currentDay = "";
      this.totalName = val[0];
      this.allStationMsg.forEach(t => {
        if (val[0] == t.projectName) this.powerNum = t.projectCode;
      });
      if (this.storeTimeName == "year") {
        currentDay = this.selYear + "-01-01";
      } else {
        currentDay = "";
      }
      this.getEffectCompData(
        "/AppApi/Base/QueryPowerEfficiency",
        this.storeTimeName,
        currentDay,
        this.powerNum
      );
    }
  },
  filters: {
    colorFilter(val) {
      if (val == "全部") return "color: #68bc32";
      else return "color: #ff9810";
    }
  }
};
</script>
<style lang="less" scoped>
.indexBox {
  flex: 1;
  overflow-x: hidden;
  #totalPower {
    margin-top: 0.1rem;
    height: 200px;
    background: #fff;
  }
  .changerate-table {
    margin-top: 0.1rem;
    background: #fff;
    .table-container {
      background-color: #fff;
      table-layout: fixed;
      border-collapse: collapse;
      .changerate-cell {
        min-height: 40px;
      }
    }
  }
}
</style>

