<template>
  <div class="Analysis">
    <MtHeader backPagePathName="stationBase"></MtHeader>
    <div class="viewWrap">
      <group class="groupWrap">
        <datetime v-model="selYear" format="YYYY" @on-change="onChangeYear">
          <span slot="title" class="soltTitleMounth">
            <img slot="icon" src="./../../../assets/img/rili.png" width="20" height="auto" />
            <span style="vertical-align:middle;">年份</span>
          </span>
        </datetime>
      </group>
      <div class="indexBox">
        <div class="netfdl-box">
          <div class="per-net" v-for="(item,index) in economicBanList" :key="index">
            <i class="fdl-icon" :class="'fdl'+index"></i>
            <div>
              <p>{{netfdlObj[item.value]}}</p>
              <span>
                {{item.label}}
                <i>{{item.unit}}</i>
              </span>
            </div>
          </div>
        </div>
        <div class="net-pie-box">
          <span slot="title">
            <img slot="icon" src="./../../../assets/img/fdlanalysis.png" width="20" height="auto" />
            <span>各项目年发电量和年发电量产值分析</span>
          </span>
          <div id="Power">
            <!-- <MyPie ids="economicPie" ref="economicPie" :data1="outRingData" :data2="innerRingData"></MyPie> -->
            <EconomicBar
              ids="economicBarBox"
              ref="economicBarBox"
              :xAxisData="economicXAxis"
              :seriesData="economicSeries"
            ></EconomicBar>
          </div>
          <span slot="title" class="actual-design-box">
            <img slot="icon" src="./../../../assets/img/fdlanalysis.png" width="20" height="auto" />
            <span>各项目实际发电量和设计发电量对比</span>
          </span>
          <div id="actualDesignBar">
            <EconomicBar
              ids="actualDesignFdl"
              ref="actualDesignFdl"
              yNamel="实际发电量(万kWh)"
              yNamer="设计发电量(万kWh)"
              :xAxisData="actualDesignXAxis"
              :seriesData="actualDesignSeries"
            ></EconomicBar>
          </div>
          <!-- <div class="noteTips">注：内环为年发电量；外环为年发电量产值</div> -->
          <!-- <div class="pie-legend-box">
            <div class="legend-container" v-for="(item,index) in pieLegendList" :key="index">
              <div class="legend-color" :class="'legendColor'+index"></div>
              <div class="per-legend">
                <p>
                  <label>
                    {{item.projectName}}(
                    <span>{{item.price}}</span>元/kWh)
                  </label>
                  <span class="generateColor">
                    {{item.dataValue}}
                    <i>万kWh</i>
                  </span>
                </p>
              </div>
            </div>
          </div>-->
          <div class="station-title">
            <span slot="title" class="soltTitleMounth">
              <img
                slot="icon"
                src="./../../../assets/img/stationPrice.png"
                alt
                width="20"
                height="auto"
              />
              <span>各电站电价</span>
            </span>
          </div>
          <div class="station-box">
            <div class="staion-per" v-for="(item,index) in pieLegendList" :key="index">
              <p>{{item.projectname}}</p>
              <div>
                <span>{{item.price}}</span>
                <label>{{item.unit}}</label>
              </div>
            </div>
            <div class="no-data" v-if="pieLegendList.length<=0">暂无数据</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import { Datetime, Group, Cell, PopupPicker } from "vux";
import MtHeader from "@/components/public/MtHeader";
import MyPie from "@/components/public/economicPie";
import stationText from "@/components/public/stationText";
import EconomicBar from "@/components/public/EchartsDoubleBar";
export default {
  components: {
    Datetime,
    Group,
    Cell,
    PopupPicker,
    MtHeader,
    MyPie,
    stationText,
    EconomicBar
  },
  data() {
    return {
      economicXAxis: [], // 发电量与经济效益的图表
      economicSeries: [],
      actualDesignXAxis: [], //实际发电量与设计发电量图表
      actualDesignSeries: [],
      selYear: String(new Date().getFullYear()),
      stationList: [],
      powerNum: null,
      economicBanList: [
        //年上网电量列表
        {
          value: "fdltotal",
          label: "年发电量",
          unit: "亿kWh"
        },
        {
          value: "fdlvaluetotal",
          label: "年发电量产值",
          unit: "万元"
        }
      ],
      netfdlObj: {},
      outRingData: [], //图表数据
      innerRingData: [],
      pieLegendList: [] //饼图图列
    };
  },
  mounted() {
    this.getEconomicData("/AppApi/Base/GetEconomics", this.selYear + "-01-01");
  },
  methods: {
    // 获取经济效益的数据
    getEconomicData(url, time) {
      this.$fetch(url, {
        dateTime: time
      }).then(res => {
        this.economicXAxis = [];
        this.economicSeries = [];
        this.actualDesignXAxis = [];
        this.actualDesignSeries = [];
        this.pieLegendList = [];
        let economicBenefit = res.data.economics;
        // 发电量与经济效益x轴
        let combineStationData = [].concat(
          economicBenefit.fdl.length > 0 ? economicBenefit.fdl : [],
          economicBenefit.fdlvalue.length > 0 ? economicBenefit.fdlvalue : []
        );
        combineStationData.sort(this.obgSort("projectName")).map(t => {
          this.economicXAxis.push(t.projectName);
        });
        this.economicXAxis = [...new Set(this.economicXAxis)];
        // 实际发电量与经济发电量x轴
        let combineFdlData = [].concat(
          economicBenefit.fdl.length > 0 ? economicBenefit.fdl : [],
          economicBenefit.fdldesign.length > 0 ? economicBenefit.fdldesign : []
        );
        combineFdlData.sort(this.obgSort("projectName")).map(t => {
          this.actualDesignXAxis.push(t.projectName);
        });
        this.actualDesignXAxis = [...new Set(this.actualDesignXAxis)];
        // 统计年发电量与年发电量产值
        this.netfdlObj = {
          fdltotal: economicBenefit.fdltotal,
          fdlvaluetotal: economicBenefit.fdlvaluetotal
        };
        // 发电量与经济效益y轴
        let seriesEconomicData = [
          economicBenefit.fdl.length > 0 ? economicBenefit.fdl : [],
          economicBenefit.fdlvalue.length > 0 ? economicBenefit.fdlvalue : []
        ];
        for (let u in seriesEconomicData) {
          this.economicSeries.push({
            name: u == 0 ? "发电量" : "经济效益",
            type: "bar",
            barMaxWidth: 14,
            yAxisIndex: u == 0 ? 0 : 1,
            data: this.economicXAxis.map(a => {
              let dataCol = seriesEconomicData[u].filter(
                b => b.projectName == a
              );
              if (dataCol && dataCol.length > 0) return dataCol[0].dataValue;
              else return null;
            })
          });
        }
        // 实际发电量与经济发电量y轴
        let seriesFdlData = [
          economicBenefit.fdl.length > 0 ? economicBenefit.fdl : [],
          economicBenefit.fdldesign.length > 0 ? economicBenefit.fdldesign : []
        ];
        for (let h in seriesFdlData) {
          this.actualDesignSeries.push({
            name: h == 0 ? "实际发电量" : "设计发电量",
            type: "bar",
            barMaxWidth: 14,
            yAxisIndex: h == 0 ? 0 : 1,
            data: this.actualDesignXAxis.map(t => {
              let dataCol = seriesFdlData[h].filter(b => b.projectName == t);
              if (dataCol && dataCol.length > 0) return dataCol[0].dataValue;
              else return null;
            })
          });
        }
        this.$nextTick(() => {
          this.$refs.economicBarBox.initEchartsBar(this.economicSeries);
          this.$refs.actualDesignFdl.initEchartsBar(this.actualDesignSeries);
        });
        if (economicBenefit.fdlvalue) {
          let economicFdlValue = economicBenefit.fdlvalue;
          if (economicFdlValue.length > 0) {
            for (let i in economicFdlValue) {
              this.pieLegendList.push({
                projectname: economicFdlValue[i].projectName,
                price: economicFdlValue[i].price,
                unit: "元/kWh"
              });
            }
          }
        }
      });
    },
    // 年份改变时切换的数据
    onChangeYear(year) {
      this.getEconomicData("/AppApi/Base/GetEconomics", year + "-01-01");
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
.netfdl-box {
  display: flex;
  margin: 0.1rem 0.15rem;
  flex: 1;
  .per-net {
    background: url("../../../../static/img/economicborder.png") no-repeat;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    padding: 0.05rem;
    box-sizing: border-box;
    width: calc(100% / 2 - 0.06rem / 2);
    .fdl-icon {
      width: 0.4rem;
      height: 0.4rem;
    }
    .fdl0 {
      background: url("../../../../static/img/economicyear.png") no-repeat;
      background-size: 100% 100%;
    }
    .fdl1 {
      background: url("../../../../static/img/economicnet.png") no-repeat;
      background-size: 100% 100%;
    }
    div {
      padding-left: 0.02rem;
      box-sizing: border-box;
      display: flex;
      flex: 1;
      flex-direction: column;
      p {
        font-family: "DIN OT";
        font-size: 0.28rem;
        color: #fff;
        margin-bottom: 0.05rem;
      }
      span {
        font-size: 0.12rem;
        color: #fff;
        opacity: 0.7;
        white-space: nowrap;
        font-family: "pingfang-regular";
        i {
          opacity: 0.5;
        }
      }
    }
  }
  .per-net:not(:nth-of-type(2n)) {
    margin-right: 0.06rem;
  }
}
.net-pie-box {
  background: #fff;
  & > span {
    padding: 0.1rem 0.15rem;
    box-sizing: border-box;
    font-size: 0.16rem;
    border-bottom: 1px solid #e4e4e4;
    background: #fff;
    color: #333333;
    display: flex;
    align-items: center;
    img {
      margin-right: 0.1rem;
    }
  }
  .actual-design-box {
    margin-top: 0.05rem;
  }
  #Power,
  #actualDesignBar {
    height: 200px;
  }
  .station-title {
    display: flex;
    margin-top: 0.1rem;
    font-size: 0.16rem;
    padding: 0.1rem 0.16rem;
    box-sizing: border-box;
    border-bottom: 1px solid #e4e4e4;
    background: #fff;
    color: #922b2b;
    img {
      margin-right: 0.05rem;
    }
  }
  .no-data {
    margin: 0 auto;
    font-size: 0.16rem;
    color: #333;
  }
  .station-box {
    padding: 0.1rem 0.16rem;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    background: #fff;
    .staion-per {
      background: url("../../../../static/img/stationborder.png") no-repeat;
      background-size: 100% 100%;
      width: calc(100% / 3 - 0.2rem / 3);
      height: 0.7rem;
      margin-bottom: 0.1rem;
      p {
        background: url("../../../../static/img/stationbg.png") left no-repeat;
        background-size: 70% 100%;
        font-size: 0.14rem;
        color: #ffffff;
        padding: 0.05rem 0 0.05rem 0.05rem;
        box-sizing: border-box;
      }
      div {
        padding: 0.1rem 0 0.1rem 0.1rem;
        box-sizing: border-box;
        span {
          font-size: 0.24rem;
          font-family: "DIN OT";
          color: #4cac0e;
        }
        label {
          color: #666666;
          font-size: 0.13rem;
        }
      }
    }
    .staion-per:not(:nth-of-type(3n)),
    .staion-per:first-child {
      margin-right: 0.1rem;
    }
  }
  .pie-legend-box {
    padding: 0.1rem;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    .legend-container {
      padding: 0.05rem;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      .legend-color {
        width: 0.18rem;
        height: 0.08rem;
        margin-bottom: 0.3rem;
        border-radius: 2px;
      }
      .legendColor0 {
        background-image: linear-gradient(
          90deg,
          #0072ff 0%,
          #17a6ff 55%,
          #2edaff 100%
        );
      }
      .legendColor1 {
        background-image: linear-gradient(
          90deg,
          #2dc076 0%,
          #2ad4a1 50%,
          #26ead1 100%
        );
      }
      .legendColor2 {
        background-image: linear-gradient(90deg, #7487ae 0%, #b6caf5 100%);
      }
      .legendColor3 {
        background-image: linear-gradient(90deg, #fb5e00 0%, #ff8400 100%);
      }
      .legendColor4 {
        background-image: linear-gradient(90deg, #d466f9 0%, #74a7ff 100%);
      }
      .per-legend {
        padding: 0 0.05rem 0.3rem 0.06rem;
        box-sizing: border-box;
        & > p {
          display: flex;
          flex-direction: column;
          label {
            font-size: 0.14rem;
            color: #333333;
            span {
              color: #4bac0d;
            }
          }
          & > span {
            font-family: "DIN OT";
            font-size: 0.2rem;
            color: #4cac0e;
            padding-top: 0.08rem;
            i {
              font-size: 0.12rem;
              color: #999;
            }
          }
        }
      }
    }
    .legend-container:not(:nth-of-type(2n)),
    .legend-container:nth-of-type(1) {
      border-right: 1px solid rgba(230, 230, 230, 0.685);
    }
  }
  .noteTips {
    padding: 0.2rem;
    text-align: right;
    color: #aaaaaa;
    font-size: 0.12rem;
  }
}
</style>
