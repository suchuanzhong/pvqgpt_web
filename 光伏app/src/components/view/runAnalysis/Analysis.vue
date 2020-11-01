<template>
  <div class="Analysis">
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
      <group class="groupWrap">
        <popup-picker title="指标" :data="stationList" v-model="selStation" @on-change="onChange">
          <template slot="title" slot-scope="props">
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
                <img slot="icon" src="static/img/comprehensiveEval.png" width="20" height="auto" />
              </span>
              <span style="vertical-align:middle;padding:0 0.12rem">指标</span>
            </span>
          </template>
        </popup-picker>
      </group>
      <div class="indexBox">
        <div id="Power">
          <RunAnalysisBar
            ids="yxfxEchartsbar"
            ref="yxfxEchartsbar"
            :xAxisData="yxfxXaxisData"
            :seriesData="yxfxSeriesData"
            :yNamel="yxfxYname"
            v-if="flag"
          ></RunAnalysisBar>
        </div>
        <group v-for="(item,index) in JSON.parse(JSON.stringify(dataList)).slice(0,5)" :key="index">
          <cell>
            <span slot="title" class="soltTitle">
              <img
                slot="icon"
                :src="'static/img/top'+parseInt(index+1)+'.png'"
                width="24"
                height="auto"
              />
              {{item.projectName}}
            </span>
            <span slot="value" class="value">
              <i>{{(item.dataValue==null || item.dataValue=="")?0:item.dataValue}}</i>
              <span>{{currentParamUnit}}</span>
            </span>
          </cell>
        </group>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import { Datetime, Group, Cell, PopupPicker } from "vux";
import MtHeader from "@/components/public/MtHeader";
import RunAnalysisBar from "@/components/public/EchartsBar";
export default {
  components: {
    Datetime,
    Group,
    Cell,
    PopupPicker,
    MtHeader,
    RunAnalysisBar
  },
  data() {
    let time = new Date();
    let years = time.getFullYear();
    let months =
      time.getMonth() + 1 < 10
        ? "0" + (time.getMonth() + 1)
        : time.getMonth() + 1;
    return {
      flag: true,
      selYear1: years + "-" + months,
      selYear2: String(years),
      selStation: ["发电量"],
      stationList: [],
      storeIndexList: [], //存储指标列表的数据
      indexDatas: {
        unit: null,
        type: null,
        data: []
      },
      dataList: [], //展示电站信息的列表信息
      powerNum: null,
      currentIndex: 1,
      timeList: [ { title: "年份", type: "year" }],
      storeTimeName: "year",
      currentIndexCode: null, //存储当前显示指标的编号
      yxfxXaxisData: [], //图表数据
      yxfxSeriesData: [],
      yxfxYname: "发电量(万kWh)",
      currentParamUnit: "万kWh"
    };
  },
  mounted() {
    this.getIndexListData(); //获取指标列表数据
    this.getQueryIndexData(
      "/AppApi/Base/QueryIndexData",
      this.storeTimeName,
      this.selYear2 + "-01-01",
      "D_YearPower"
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
      this.currentIndexCode = "";
      this.currentIndex = i;
      this.$nextTick(() => {
      this.storeTimeName = val.type;
        if (i == 0) {
          this.selYear1 = years + "-" + months;
          if (this.storeIndexList.length > 0) {
            this.storeIndexList.forEach(t => {
              if (this.selStation[0] == t.name && t.methodType == 2)
                this.currentIndexCode = t.code;
            });
          }
          this.getQueryIndexData(
            "/AppApi/Base/QueryIndexData",
            val.type,
            this.selYear1 + "-01",
            this.currentIndexCode
          );
        } else {
          if (this.storeIndexList.length > 0) {
            this.storeIndexList.forEach(t => {
              if (this.selStation[0] == t.name && t.methodType == 1)
                this.currentIndexCode = t.code;
            });
          }
          this.selYear2 = String(years);
          this.getQueryIndexData(
            "/AppApi/Base/QueryIndexData",
            val.type,
            this.selYear2 + "-01-01",
            this.currentIndexCode
          );
        }
      });
    },
    // 获取指标列表的数据
    getIndexListData() {
      this.$fetch("/AppApi/Base/GetIndexList").then(index => {
        let distributeIndexCol = [];
        if (index.data && index.data.length > 0) {
          this.storeIndexList = index.data;
          if (this.currentIndex == 0) {
            distributeIndexCol = index.data.filter(t => t.methodType == 2);
          } else if (this.currentIndex == 1) {
            distributeIndexCol = index.data.filter(t => t.methodType == 1);
          }
          this.stationList = [distributeIndexCol.map(a => a.name)];
        }
      });
    },
    // 获取综合分析图表的数据
    getQueryIndexData(url, dateType, year, code) {
      let _this = this;
      _this.flag = false;
      this.$fetch(url, { dateType: dateType, datetime: year, code: code }).then(
        res => {
          this.dataList = [];
          this.yxfxXaxisData = [];
          this.yxfxSeriesData = [];
          this.indexDatas.data = [];
          _this.flag = true;
          if (res.data && res.data.length > 0) {
            let obj = {}; //数组对象去重
            res.data = res.data.reduce(function(itemValue, next) {
              obj[next.projectName]
                ? ""
                : (obj[next.projectName] = true && itemValue.push(next));
              return itemValue;
            }, []);
            res.data.map(pro => {
              this.storeIndexList.map(item => {
                if (item.code == pro.indexCode) {
                  this.indexDatas.type = item.name;
                  this.indexDatas.unit = item.unit;
                }
              });
              this.indexDatas.data.push({
                projectName: pro.projectName,
                dataValue: pro.dataValue
              });
            });
            this.dataList = this.indexDatas.data.sort((a, b) => {
              return b.dataValue - a.dataValue;
            });
            if (this.dataList && this.dataList.length > 0) {
              this.yxfxXaxisData = this.dataList.map(d => d.projectName);
              this.yxfxSeriesData.push({
                itemStyle: {
                  normal: {
                    color: "#68bc32"
                  }
                },
                data: this.yxfxXaxisData.map(v => {
                  let dataCol = this.dataList.filter(k => k.projectName == v);
                  if (dataCol && dataCol.length > 0)
                    return dataCol[0].dataValue;
                  else return null;
                }),
                type: "bar",
                smooth: true,
                barMaxWidth: 14,
                lineStyle: {
                  color: "#68bc32"
                },
                symbolSize: 0,
                markLine: {
                  label: {
                    show: true,
                    formatter: "{a|{b}}",
                    rich: {
                      a: {
                        padding: [0, 0, 0, -35]
                      }
                    }
                  },
                  lineStyle: {
                    color: "#ff9810"
                  },
                  data: [
                    { type: "average", name: "平均值" },
                    { type: "max", name: "最大值" },
                    { type: "min", name: "最小值" }
                  ],
                  symbolSize: 0
                }
              });
              this.$nextTick(() => {
                _this.$refs.yxfxEchartsbar.initEchartsBar(this.yxfxSeriesData);
              });
            }
          }
        }
      );
    },
    // 年份改变时切换的数据
    onChangeYear1(year) {
      this.storeIndexList.forEach(t => {
        if (this.selStation[0] == t.name && t.methodType == 2)
          this.currentIndexCode = t.code;
      });
      this.getQueryIndexData(
        "/AppApi/Base/QueryIndexData",
        this.storeTimeName,
        year + "-01",
        this.currentIndexCode
      );
    },
    onChangeYear2(year) {
      this.storeIndexList.forEach(t => {
        if (this.selStation[0] == t.name && t.methodType == 1)
          this.currentIndexCode = t.code;
      });
      this.getQueryIndexData(
        "/AppApi/Base/QueryIndexData",
        this.storeTimeName,
        year + "-01-01",
        this.currentIndexCode
      );
    },
    onChange(val) {
      let currentDay = "";
      if (this.storeTimeName == "month") {
        currentDay = this.selYear1 + "-01";
      } else {
        currentDay = this.selYear2 + "-01-01";
      }
      for (let i = 0; i < this.storeIndexList.length; i++) {
        if(this.currentIndex == 0){
          if (val[0] == this.storeIndexList[i].name &&this.storeIndexList[i].methodType == 2) {
            this.currentIndexCode = this.storeIndexList[i].code;
            this.yxfxYname = val[0] + "(" + this.storeIndexList[i].unit + ")";
            this.currentParamUnit = this.storeIndexList[i].unit;
          }
        }else if(this.currentIndex == 1){
             if (val[0] == this.storeIndexList[i].name &&this.storeIndexList[i].methodType == 1) {
            this.currentIndexCode = this.storeIndexList[i].code;
            this.yxfxYname = val[0] + "(" + this.storeIndexList[i].unit + ")";
            this.currentParamUnit = this.storeIndexList[i].unit;
          }
        }
      }
      this.getQueryIndexData(
        "/AppApi/Base/QueryIndexData",
        this.storeTimeName,
        currentDay,
        this.currentIndexCode
      );
    }
  }
};
</script>
<style lang="less" scoped>
.Analysis {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.viewWrap {
  flex: 1;
  overflow-x: hidden;
  box-sizing: border-box;
  padding-bottom: 0.1rem;
  display: flex;
  flex-direction: column;
}
.soltTitle {
  display: flex !important;
  align-items: center !important;
  color: #999;
  img {
    margin-right: 0.1rem;
  }
}
.indexBox {
  flex: 1;
  overflow-x: hidden;
}
#Power {
  height: 200px;
  background: #fff;
  margin-top: 0.1rem;
}
</style>

<style lang="less">
.Analysis .indexBox {
  .weui-cell {
    padding: 0.15rem 0.15rem;
  }
  padding: 0 0.1rem;
  .weui-cells.vux-no-group-title {
    margin-top: 0.1rem !important;
    border-radius: 4px;
    // border: 1px solid #d9d9d9;
    box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.05);
    .vux-cell-bd.vux-cell-primary p {
      display: flex;
      align-items: center;
    }
  }
  .value {
    i {
      color: #ff9810;
      font-size: 0.24rem;
      font-family: "number";
    }
    span {
      font-size: 0.14rem;
    }
    margin-right: 0.1rem;
  }
  .weui-cells:before,
  .weui-cells:after {
    border: none;
  }
}
</style>
