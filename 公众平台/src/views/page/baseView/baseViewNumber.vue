<template>
  <div>
    <div class="base-top">
      <el-row :gutter="40">
        <el-col :span="5">
          <div class="base-title">
            <SubTitle
              text="基地信息"
              en="Base information"
              class="inlineBlock active"
            ></SubTitle>
            <span class="more" @click="moreBaseInfo">MORE</span>
          </div>
          <div class="base-content">
            <ul>
              <li v-for="(item, index) in describeList" :key="index">
                <div class="base-describe">
                  <span class="my-icon" :class="item.icon"></span>
                  <span class="base-left">{{ item.name }}</span>
                  <span class="base-right"
                    >{{ item.value }} <span class="base-unit">MW</span></span
                  >
                </div>
              </li>
            </ul>
          </div>
          <outSendRef
            unit="MW"
            style="height:310px"
            ids="scales"
            :centerObj="centerObj"
            :dataObj="dataObj"
            v-if="showOutSen"
            ref="outSen"
          ></outSendRef>
        </el-col>
        <el-col :span="19">
          <!--                    <div class="maplegend">-->
          <!--                        <div class="legendTitle">基地平均功率 <span class="number">25</span>MW</div>-->
          <!--                        <div><img src="/img/index/blue.png">高于 {{maxpwr}} %</div>-->
          <!--                        <div><img src="/img/index/green.png">正负 {{maxpwr}}%</div>-->
          <!--                        <div><img src="/img/index/yellow.png" style="margin-left: 20px;">低于 负{{minpwr}} %</div>-->
          <!--                    </div>-->

            <HomeMap class="zui-map" :initMap="initMap"  ref="map"  ></HomeMap>

        </el-col>
      </el-row>
      <el-row>
        <el-col :span="9">
          <SubTitle
            text="运行监测"
            en="Operation monitoring"
            class="inlineBlock active"
          ></SubTitle>
          <el-col>
            <div style="display: inline-block">
              <h3 class="short_title">实时功率</h3>
              <div class="number-green">
                <label v-for="(item, key) in numCard" :key="key">
                  <span class="numroll">{{ item }}</span> </label
                >MW
              </div>
            </div>
            <div style="display: inline-block;padding-left: 60px">
              <h3 class="short_title">当日发电量</h3>
              <div class="number_blue">
                <label v-for="(item, key) in numCard2" :key="key">
                  <span class="numroll">{{ item }}</span> </label
                >kWh
              </div>
            </div>
            <h4 class="tilt_title">基地发电量排名</h4>
            <echartBarBase
              ids="yearEnergy"
              unit="(万kWh)"
              :theme="['#00a8f6', '#12c9fe']"
              :dataArr="echartsAllData"
              ref="yearEnergy"
              style="height:460px;"
            ></echartBarBase>
          </el-col>
        </el-col>

        <el-col :span="8" style="padding-left: 18px">
          <div class="base-more">
            <span class="more" @click="operateMonitor">MORE</span>
          </div>

          <div class="long_titles">
            <singleTitle
              :class="{ active: isSelLeft1 }"
              title="上月能效比"
              subTitle=""
              @click.native="clickEffict(true)"
            >
            </singleTitle>
            <singleTitle
              :class="{ active: !isSelLeft1 }"
              title="累计能效比"
              subTitle=""
              @click.native="clickEffict(false)"
            ></singleTitle>
          </div>
          <div style="height:460px;">
            <echartBar1
              ids="bar1"
              ref="bar1"
              :data="barData1.data"
              :xAxis="barData1.xAxis"
              :legend="barData1.legend"
              :yName="barData1.yName"
            ></echartBar1>
          </div>
          <div class="sourceMark">数据来源：{{ dataSource }}</div>
        </el-col>
        <el-col :span="5" class="base-evaluation">
          <div class="base-titles">
            <SubTitle
              text="综合评价"
              en="Comprehensive evaluation"
              class="inlineBlock active"
            ></SubTitle>
            <span class="more" @click="allEvaluation">MORE</span>
          </div>
          <div class="evaluation">
            <frameTextHome
              v-for="(i, index) in evalList"
              :key="index"
              :title="i.title"
              :imgName="i.imgName"
              :unit="i.unit"
              :value="evaluation[i.key]"
              :bgColor="i.bgColor"
              :decimals="i.decimals"
              :ispercent="i.ispercent"
            ></frameTextHome>
          </div>
        </el-col>
      </el-row>
    </div>
    <component
      :is="dialogName"
      :title="titleName"
      :baseName="baseName"
    ></component>
  </div>
</template>
<script>
import BasicInfo from "../baseInfo";
import Operation from "../operation";
import AllEvaluation from "../allEvaluation";
export default {
  components: {
    BasicInfo,
    Operation,
    AllEvaluation,
    SubTitle: resolve => {
      require(["@/components/public/subTitle.vue"], resolve);
    },
    HomeMap: resolve => {
      require(["@/components/public/map.vue"], resolve);
    },
    echartBarBase: resolve => {
      require(["@/components/public/echarts/echartBarBase.vue"], resolve);
    },
    echartBar1: resolve => {
      require(["@/components/public/echarts/echartBar1.vue"], resolve);
    },
    outSendRef: resolve => {
      require([
        "@/components/public/echarts/echartBarSwitchboard.vue"
      ], resolve);
    },
    singleTitle: resolve => {
      require(["@/components/public/echarts/singleTitle"], resolve);
    },
    frameTextHome: resolve => {
      require(["@/components/public/echarts/frameTextHome.vue"], resolve);
    },

  },
  data() {
    return {
      initMap: [],
      minpwr: 1,
      maxpwr: 1,
      avgPwr: 0,
      dataObj: [],
      showOutSen: true,
      centerObj: {},
      yAxisName: [],
      dataSource: "", //数据来源
      markerMapData: [],
      numCard: "",
      numCard2: "",
      echartsAllData: [],
      isSelLeft1: true,
      evaluation: {
        allCo2Value: "",
        allCoalValue: "",
        powerValue: "",
        standardRate: ""
      },
      barData1: {
        yName: "%",
        legend: ["招商承诺", "运行监测"],
        xAxis: [],
        data: []
      },
      describeList: [
        {
          icon: "my-icon-power1",
          name: "第一批",
          value: "50"
        },
        {
          icon: "my-icon-power2",
          name: "第一批",
          value: "50"
        },
        {
          icon: "my-icon-power3",
          name: "第一批",
          value: "50"
        },
        {
          icon: "my-icon-power4",
          name: "第一批",
          value: "50"
        }
      ],
      storeIconList: [
        "my-icon-power1",
        "my-icon-power2",
        "my-icon-power3",
        "my-icon-power4"
      ],
      evalList: [
        {
          title: "指标达标率",
          key: "standardRate",
          imgName: "eval_1",
          unit: "",
          bgColor: "b_green",
          ispercent: true
        },
        {
          title: "累计发电效益",
          key: "powerValue",
          imgName: "eval_2",
          unit: "万元",
          bgColor: "b_blue",
          decimals: 2
        },
        {
          title: "累计节约标准煤",
          key: "allCoalValue",
          imgName: "eval_3",
          unit: "万吨",
          bgColor: "b_green",
          decimals: 2
        },
        {
          title: "累计减少二氧化碳排放",
          key: "allCo2Value",
          imgName: "eval_4",
          unit: "万吨",
          bgColor: "b_blue",
          decimals: 2
        }
      ],
      effictList: [],
      dialogName: "",
      titleName: "基地信息",
      baseName: "",
    };
  },

  mounted() {
    this.getQueryData();
    this.baseInformation();
    this.getMapList();
    // this.getMtrDetQuery();
  },
  methods: {
    // 子页面跳转
    // 基地信息
    moreBaseInfo() {
      this.dialogName = "BasicInfo";
      this.titleName = "基地信息";
    },
    //地图界面
    getMapList() {
      // var _this=this;
      this.$fetch("/MtrBase/GetBaseMapList").then(res => {
        this.initMap = res.data;

      });
    },
    //运行监测
    operateMonitor() {
      this.dialogName = "Operation";
      this.titleName = "运行监测";
    },
    //综合评价
    allEvaluation() {
      this.dialogName = "AllEvaluation";
      this.titleName = "综合评价";
    },
    //基地信息总装机
    getQueryData() {
      this.showOutSen = false;
      this.dataObj = [];
      this.describeList = [];
      this.$fetch("/MtrBase/GetBaseInfo").then(res => {
        this.showOutSen = true;
        if (res.code == 1) {
          let Data = res.data;
          for (let i = 0; i < Data.baseInfo.length; i++) {
            this.describeList.push({
              icon: this.storeIconList[i],
              name: Data.baseInfo[i].name,
              value: Data.baseInfo[i].value
            });
          }
          this.centerObj = {
            name: "总装机",
            value: Data.totalScale
          };
          for (let item of Data.baseBatch) {
            this.dataObj.push({
              name: item.name1,
              value: item.value1
            });
          }
          this.$nextTick(() => {
            this.$refs.outSen.drawChart();
          });
        }
      });
    },
    //获取基地信息
    baseInformation() {
      // debugger
      this.evaluation = {};
      this.$fetch("/DigitalPv/DigitalPvHome").then(res => {
        this.dataSource = res.data.successName ? res.data.successName : "";
        let data = res.data;

        this.numCard = data.dayPowerRanking.toString().padStart(7, 0);
        this.numCard2 = data.realTimePower.toString().padEnd(7, 0);
        this.evaluation.standardRate = data.evaluation.standardRate;
        this.evaluation.powerValue = data.evaluation.powerValue;
        this.evaluation.allCoalValue = data.evaluation.allCoalValue;
        this.evaluation.allCo2Value = data.evaluation.allCo2Value;

        let recieveData = [
          {
            year: "",
            data: [],
            nameList: []
          }
        ];
        for (let item of data.powerRankings) {
          recieveData[0].data.push(item.generation);
          recieveData[0].nameList.push(item.baseName);
        }
        this.echartsAllData = recieveData;
        this.$nextTick(() => {
          this.$refs.yearEnergy.initEcharts();
        });
        this.effictList = data.effectt;
        if (data.effectt.length > 5) {
          this.getBarData1(data.effectt);
        } else {
          this.getBarData1(data.effectt);
        }

        this.$nextTick(() => {
          this.$refs.bar1.initEcharts();
        });
      });
    },
    clickEffict(bool) {
      this.isSelLeft1 = bool;
      var arr = bool ? this.monthEffict : this.totalEffict;
      this.$set(this.barData1.data, 1, arr);
      this.$nextTick(() => {
        this.$refs.bar1.initEcharts();
      });
    },

    getBarData1(data) {
      this.monthEffict = data.map(i => i.monthEffict);
      this.totalEffict = data.map(i => i.totalEffict);
      this.promiseEffict = data.map(i => i.promiseEffict);
      this.barData1.xAxis = data.map(i => i.baseName);
      // this.barData1.data = [this.monthEffict,this.promiseEffict]
      this.barData1.data = [
        this.monthEffict,
        this[this.isSelLeft1 ? "promiseEffict" : "totalEffict"]
      ];
    }
  }
};
</script>
<style scoped lang="scss">
//数字可视化
.zui-map {
  height: 680px;
  border: solid 1px #e4e4e4;
}
.base-top {
  position: relative;
  top: 50px;
  padding: 32px 50px 0;
}
.inlineBlock {
  display: inline-block;
  padding-right: 15px;
  padding-left: 15px;
  padding-bottom: 10px;
  position: relative;
  cursor: pointer;
  opacity: 0.4;
  &::before {
    content: "";
    border-left: 1px solid #bdbbbb;
    height: 46px;
    top: 5px;
    left: 0;
    position: absolute;
  }
  &:first-of-type {
    border: none;
    padding-left: 0;
    &::before {
      border: none;
    }
  }
  &.active {
    opacity: 1;
  }
}
.more {
  font-size: 14px;
  color: #888888;
  float: right;
  padding-top: 30px;
  cursor: pointer;
}
.base-content {
  padding-top: 30px;
  li {
    width: 100%;
    height: 56px;
    border-style: solid;
    border-width: 1px;
    border-image-source: linear-gradient(90deg, #19b197 0%, #1da63b 100%);
    background-image: linear-gradient(
      0deg,
      rgba(25, 177, 151, 0.2),
      rgba(29, 166, 59, 0.2)
    );
    border-image-slice: 1;
    margin-bottom: 20px;
  }
  .base-describe {
    padding: 0 19px;
    //     background:url("../../../assets/img/power1.png") no-repeat center;
    //    display: inline;
  }
  .base-left {
    font-size: 16px;
    color: #666666;
    line-height: 52px;
    margin-left: 10px;
    /*float: left;*/
  }
  .base-right {
    font-size: 20px;
    color: #1bac6b;
    font-family: EuroTechnicExt;
    float: right;
    line-height: 54px;
    font-weight: 500;
  }
  .base-unit {
    font-size: 14px;
    color: #000;
    font-weight: 500;
  }
}
.base-map {
  width: 50%;
  min-width: 1330px;
  height: 670px;
}
.short_title {
  font-size: 18px;
  color: #000;
}
.number-green,
.number_blue {
  padding: 20px 0;
  height: 85px;
  font-size: 16px;
  color: #999;
  span {
    font-family: "Digital";
    letter-spacing: 2px;
    display: inline-block;
    width: 24px;
    height: 45px;
    line-height: 50px;
    text-align: center;
    background: url("../../../assets/img/index/num-green.png") no-repeat center;
    margin-right: 8px;
    font-size: 38px;
    color: #fff;
  }
}

.number_blue span {
  font-family: "Digital";
  letter-spacing: 2px;
  display: inline-block;
  width: 24px;
  height: 45px;
  line-height: 50px;
  text-align: center;
  background: url("../../../assets/img/index/num_blue.png") no-repeat center;
  margin-right: 8px;
  font-size: 38px;
  color: #fff;
}
.tilt_title {
  font-size: 18px;
  color: #000;
}
.base-more {
  height: 54px;
}
.base-evaluation {
  margin-left: 60px;
}
.evaluation {
  min-width: 300px;
  display: flex;
  flex-wrap: wrap;

  & > div {
    margin-top: 22px;
  }
}
// 数据来源
.sourceMark {
  color: #999999;
  font-size: 12px;
  font-style: italic;
  padding-top: 5px;
}
.long_titles {
  position: relative;
  cursor: pointer;
  display: flex;
  padding-bottom: 0px;
  border-bottom: 2px solid #eee;

  .short_title {
    cursor: pointer;
    padding-bottom: 16px !important;
    display: inline-block;
    margin-right: 30px;
    background: transparent !important;
    color: #010101 !important;
    span {
      display: inline-block;
    }

    label {
      cursor: pointer;
    }
  }
  .active {
    cursor: pointer;
    color: #1bac6b !important;
    border-bottom: 2px solid #1bac6b;
  }
}
// 改变首页滚动数字字体
.numroll,
.numroll span {
  font-family: "Digital";
  letter-spacing: 2px;
  color: #ffffff;
  box-shadow: 0px 2px 2px 0px rgba(0, 44, 104, 0.5);
}

.maplegend {
  .legendTitle {
    text-align: center;
    color: #000000;
    font-size: 16px;
  }
  .number {
    font-size: 18px;
    color: #1bac6b;
    font-weight: bold;
    margin-right: 8px;
  }

  z-index: 1;
  position: absolute;
  bottom: 40px;
  margin-left: 20px;
  /*left: 30px;*/
  border-style: solid;
  border-width: 1px;
  border-image-source: linear-gradient(90deg, #19b197 0%, #1da63b 100%);
  border-image-slice: 1;
  padding: 6px 14px 6px 6px;
  line-height: 22px;
  color: #bdbdc2;
  > div {
    text-align: center;
    font-size: 14px;
    color: #000000;
    > img {
      width: 20px;
      margin-right: 9px;
    }
  }
}
.my-icon-power1 {
  width: 20px;
  height: 22px;
  display: inline-block;
  background: url("../../../assets/img/power1.png");
}
.my-icon-power2 {
  width: 22px;
  height: 22px;
  display: inline-block;
  background: url("../../../assets/img/power2.png");
}
.my-icon-power3 {
  width: 22px;
  height: 22px;
  display: inline-block;
  background: url("../../../assets/img/power3.png");
}
.my-icon-power4 {
  width: 22px;
  height: 22px;
  display: inline-block;
  background: url("../../../assets/img/power4.png");
}
</style>
