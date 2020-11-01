<template>
  <div class="PowerComp runAly">
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
        <!-- <group class="groupWrap timeChangeSel" v-if="storeTimeName=='day'">
          <datetime v-model="selYear1" format="YYYY-MM" @on-change="onChangeYear1"></datetime>
        </group> -->
        <group class="groupWrap timeChangeSel" v-if="storeTimeName=='year'">
          <datetime v-model="selYear2" format="YYYY" @on-change="onChangeYear2"></datetime>
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
            <p class="label">{{selStation[0]!=='全部'?totalName+'总计':"基地总计"}}</p>
            <div class="info">
              <p v-for="(item,index) in stationCount" :key="index">
                <label>{{item.title}}</label>
                <span
                  class="generateColor"
                  :class="{generateStaColor:selStation[0]!=='全部'}"
                >{{item.value}}</span>
                <i>{{item.unit}}</i>
              </p>
            </div>
          </cell>
        </group>
        <div id="totalPower" v-if="flag">
          <MyEchartbar
            ids="fdlEchartsbar"
            ref="fdlEchartsbar"
            :xAxisData="fdlXaxisData"
            :seriesData="fdlSeriesData"
          ></MyEchartbar>
        </div>
        <div class="changerate-table">
          <x-table :cell-bordered="false" class="table-container">
            <thead>
              <tr class="model-title">
                <th>时间</th>
                <th>理论发电量</th>
                <th>实际发电量</th>
              </tr>
            </thead>
          </x-table>
          <div>
            <x-table :cell-bordered="false" class="table-container">
              <tbody>
                <tr
                  v-for="(item,index) in fdlTableList"
                  :key="'runanalysis'+index"
                  class="changerate-cell"
                >
                  <td>{{item.time}}</td>
                  <td>{{item.theoryfdl}}</td>
                  <td>{{item.actualfdl}}</td>
                </tr>
                <tr v-if="fdlTableList.length==0">
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
import MtHeader from "@/components/public/MtHeader";
import { FormateRule, DealNull } from "@/plugin/dealData";
import { setTimeout } from "timers";
import MyEchartbar from "@/components/public/EchartsBar";
export default {
  components: {
    Datetime,
    Group,
    Cell,
    PopupPicker,
    MtHeader,
    MyEchartbar,
    XTable
  },
  data() {
    let time = new Date();
    let years = time.getFullYear();
    let months =
      time.getMonth() + 1 < 10
        ? "0" + (time.getMonth() + 1)
        : time.getMonth() + 1;
    return {
      roleType: null,
      flag: true,
      selYear1: "", //当前显示的年份
      selYear2: String(years), //当前显示的年份
      selStation: [],
      totalName: "",
      stationList: [[]],
      //电站的分类
      stationCount: [
        //总计总计
        { title: "理论发电量", unit: "亿kWh", value: 0 },
        { title: "实际发电量", unit: "亿kWh", value: 0 }
      ],
      projectData: [], //电站统计的数据
      projectMsg: [], //电站曲线图的信息
      powerNum: null, //存储电站的编号
      allStationMsg: [], //存储电站名称及对应编号
      currentIndex: 2,
      timeList: [
        { title: "年份", type: "year" }
      ],
      fdlXaxisData: [], //图表数据
      fdlSeriesData: [],
      storeTimeName: "year",
      fdlTableList: [], //表格数据
      tableProp: [
        {
          name: "理论发电量",
          prop: "theoryfdl"
        },
        {
          name: "实际发电量",
          prop: "actualfdl"
        }
      ]
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
    console.log(this.stationList)
    this.roleType = localStorage.getItem("currentRoleType");
    if (this.roleType == 1) {
      //1--项目类型,其他--基地类型
      this.selStation.push(this.allStationMsg[0].projectName);
      this.powerNum = this.allStationMsg[0].projectCode;
    } else {
      this.selStation.push("全部");
      this.powerNum = "";
    }
    // 首次调用
    this.getPowerCompData(
      "/AppApi/Base/QueryPowerGeneration",
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
      let months =
        time.getMonth() + 1 < 10
          ? "0" + (time.getMonth() + 1)
          : time.getMonth() + 1;
      this.storeTimeName = "";
      this.currentIndex = i;
      this.allStationMsg.forEach(t => {
        if (this.selStation[0] == t.projectName) this.powerNum = t.projectCode;
      });
      this.$nextTick(() => {
        this.storeTimeName = val.type;
        if (i == 0) {
          this.selYear1 = String(years + "-" + months);
          this.getPowerCompData(
            "/AppApi/Base/QueryPowerGeneration",
            val.type,
            this.selYear1 + "-01",
            this.powerNum
          );
        } else if (i == 1) {
          this.selYear2 = String(years);
          this.getPowerCompData(
            "/AppApi/Base/QueryPowerGeneration",
            val.type,
            this.selYear2 + "-01-01",
            this.powerNum
          );
        } else {
          this.getPowerCompData(
            "/AppApi/Base/QueryPowerGeneration",
            val.type,
            "",
            this.powerNum
          );
        }
      });
    },
    // 计算每个月的天数
    getDay(year, month) {
      var d = new Date(year, month, 0);
      return d.getDate();
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
    // 获取发电量分析的数据
    getPowerCompData(url, dateType, year, code) {
      let _this = this;
      _this.flag = false;
      this.$fetch(url, {
        datatype: dateType,
        datetime: year,
        baseId: code
      }).then(res => {
        _this.flag = true;
        this.fdlXaxisData = []; //x轴
        this.fdlSeriesData = [];
        this.fdlTableList = [];
        // x轴
        if (dateType == "day") {
          let days = this.getDay(year.split("-")[0], year.split("-")[1]);
          for (let i = 1; i <= days; i++) {
            this.fdlXaxisData.push(i);
          }
        } else if (dateType == "month") {
          for (let k = 1; k <= 12; k++) {
            this.fdlXaxisData.push(k + "月");
          }
        } else {
          if (res.data.length > 0) {
            let conbineData = [].concat(res.data[0].data, res.data[1].data);
            conbineData.sort(this.obgSort("yearNum")).map(h => {
              this.fdlXaxisData.push(h.yearNum);
            });
            this.fdlXaxisData = [...new Set(this.fdlXaxisData)];
          }
        }
        this.stationCount[0].value = 0;
        this.stationCount[1].value = 0;
        if (res.data && res.data.length > 0) {
          let data1 = null,
            data2 = null;
          // 表格数据
          this.fdlTableList = this.fdlXaxisData.map(t => {
            let tablelist = {};
            let tableValue = null;
            let filterStandard = null;
            if (dateType == "year") filterStandard = "yearNum";
            else if (dateType == "month") filterStandard = "monthNum";
            else filterStandard = "dayNum";
            this.tableProp.forEach(item => {
              for (let p in res.data) {
                if (res.data[p].name == item.name) {
                  tableValue =
                    res.data[p].data.length > 0
                      ? res.data[p].data.filter( v =>v[filterStandard] ==(filterStandard == "monthNum"? t.substring(0, t.length - 1): t)) : "";
                  if (tableValue.length > 0) {
                    tablelist[item.prop] = tableValue[0].dataValue;
                    // 计算时间
                    if (filterStandard == "yearNum") {
                      tablelist.time = tableValue[0].yearNum;
                    } else if (filterStandard == "monthNum") {
                      tablelist.time = tableValue[0].yearNum + "-" + (tableValue[0].monthNum < 10 ? "0" + tableValue[0].monthNum : tableValue[0].monthNum);
                    } else {
                      tablelist.time = tableValue[0].yearNum + "-" + (tableValue[0].monthNum < 10 ? "0" + tableValue[0].monthNum : tableValue[0].monthNum) + "-" + (tableValue[0].dayNum < 10 ? "0" + tableValue[0].dayNum : tableValue[0].dayNum);
                    }
                  }
                }
              }
            });
            return tablelist;
          });
          res.data.forEach(item => {
            // 计算总发电量
            if (item.name === "总理论") {
              if (code != "")
                this.stationCount[0].value = item.data ? item.data : 0;
              // 计算对应电站的总计
              else this.stationCount[0].value = item.data ? item.data : 0; // 计算总计的项目总计
            } else if (item.name === "总实际") {
              if (code != "")
                this.stationCount[1].value = item.data ? item.data : 0;
              else this.stationCount[1].value = item.data ? item.data : 0;
            }
            if (item.name == "理论发电量") {
              data1 = item.data;
            } else if (item.name == "实际发电量") {
              data2 = item.data;
            }
            //  计算下面发电量统计图
          });
          // y轴
          let echartsLine = [data1, data2];
          for (let i in echartsLine) {
            this.fdlSeriesData.push({
              name: i == 0 ? "理论发电量" : "实际发电量",
              data: this.fdlXaxisData.map(c => {
                let dataCol = null;
                if (dateType == "month") {
                  dataCol = echartsLine[i].filter(
                    b => String(b.monthNum) == c.substring(0, c.length - 1)
                  );
                } else if (dateType == "day") {
                  dataCol = echartsLine[i].filter(b => b.dayNum == c);
                } else {
                  dataCol = echartsLine[i].filter(b => b.yearNum == c);
                }
                if (dataCol && dataCol.length > 0) return dataCol[0].dataValue;
                else return null;
              }),
              type: "bar",
              barMaxWidth: 14
            });
          }
          this.$nextTick(_ => {
            _this.$refs.fdlEchartsbar.initEchartsBar(this.fdlSeriesData);
          });
        }
      });
    },
    // 根据年份触发总计发电量的数据
    onChangeYear1(year) {
      this.allStationMsg.forEach(t => {
        if (this.selStation[0] == t.projectName) this.powerNum = t.projectCode;
      });
      this.getPowerCompData(
        "/AppApi/Base/QueryPowerGeneration",
        this.storeTimeName,
        year + "-01",
        this.powerNum
      );
    },
    onChangeYear2(year) {
      this.allStationMsg.forEach(t => {
        if (this.selStation[0] == t.projectName) this.powerNum = t.projectCode;
      });
      this.getPowerCompData(
        "/AppApi/Base/QueryPowerGeneration",
        this.storeTimeName,
        year + "-01-01",
        this.powerNum
      );
    },
    // 根据当前的电站触发项目发电量的数据
    onChange(val) {
      let currentDay = "";
      this.totalName = val[0];
      this.allStationMsg.forEach(t => {
        if (val[0] == t.projectName) this.powerNum = t.projectCode;
      });
      if (this.storeTimeName == "day") {
        currentDay = this.selYear1 + "-01";
      } else if (this.storeTimeName == "year") {
        currentDay = this.selYear2 + "-01-01";
      } else {
        currentDay = "";
      }
      this.getPowerCompData(
        "/AppApi/Base/QueryPowerGeneration",
        this.storeTimeName,
        currentDay,
        this.powerNum
      );
    }
  }
};
</script>
<style lang="less" scoped>
.indexBox {
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

