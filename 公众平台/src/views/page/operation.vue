<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    class="oper"
    id="operateMonitor"
    @close="close"
    width="1400px"
    top="7vh"
  >
    <el-row :gutter="50" v-if="isrefrash">
      <el-col :lg="12" :md="24">
        <singleTitle title="基地发电分析" subTitle></singleTitle>
        <div class="basePowerBox">
          <el-row>
            <el-col :span="12">
              <el-radio-group
                v-model="currentTime"
                size="small"
                @change="unitCountChange(currentTime)"
              >
                <el-radio-button
                  :label="item.timeUnit"
                  v-for="item in basePowwerList"
                  :key="item.timeUnit"
                ></el-radio-button>
              </el-radio-group>
            </el-col>
            <!-- 图例-->
            <el-col :span="12">
              <div style="line-height: 30px">
                <MyLegend></MyLegend>
              </div>
            </el-col>
          </el-row>
          <el-row class="total-msg">
            <el-col :span="12">
              <div class="basePerPower">
                <i class="basePowerIcon"></i>
                <p>基地发电量</p>
                <span style="color:#02a1fd">{{ baseGenerateTotal }}</span>
                <cite>{{ baseGenerateUnit }}</cite>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="basePerPower b-l-dashed" style="text-align: right;">
                <i class="basePowerHourIcon"></i>
                <p>基地利用小时数</p>
                <span style="color:#1aac6b">{{ baseUseHourTotal }}</span>
                <cite>h</cite>
              </div>
            </el-col>
          </el-row>
          <div class="echarts-box">
            <DbBar
              ids="baseGenerate"
              :xAxis="baseGenerateName"
              :data="baseGenerateData"
              :yMax0="baseGenerateMax"
              :yMax1="useHourMax"
              :yName="baseGenerateYname"
            ></DbBar>
          </div>
        </div>
      </el-col>

      <el-col :lg="12" :md="24">
        <singleTitle title="基地年光资源监测" subTitle></singleTitle>
        <div>
          <MyLegend
            :legendData="fsLegend"
            :legendColor="['#ff8400', '#ff7a05']"
          ></MyLegend>
          <div class="echarts-box" style="height:342px">
            <BarLine
              ids="myBarEchart2"
              style="height:342px;"
              :dataArr="addsB"
              :axisData="yearB"
              :unit="['kW.h/㎡', '']"
              ref="targetsB"
            ></BarLine>
          </div>
        </div>
      </el-col>
      <el-col :lg="12" :md="24">
        <h3 class="long_title">
          <singleTitle
            :class="{ active: isSelLeft2 }"
            title="组件转换效率"
            subTitle=""
            @click.native="clickPvstringeffic(true, 0)"
          ></singleTitle>
          <img src="/img/index/verticalline.png" alt="" class="verticalline" />
          <singleTitle
            :class="{ active: !isSelLeft2 }"
            title="组件衰减率"
            subTitle=""
            @click.native="clickPvstringeffic(false, 1)"
          ></singleTitle>
        </h3>
        <div class="echarts-box" style="margin-top:26px;">
          <myBar
            ids="bar2"
            ref="bar2"
            :data="barData2.data"
            :xAxis="barData2.xAxis"
            :legends="barData2.legend"
            :yName="barData2.yName"
            :xAisRotate="12"
            :gridLeft="gridLeft"
            v-if="isShow"
          ></myBar>
        </div>
        <div class="sourceMark">数据来源：{{ dataSource }}</div>
      </el-col>
      <el-col :md="24" :lg="12">
        <singleTitle title="逆变器转换效率" subTitle=""></singleTitle>
        <div class="echarts-box operationtable">
          <el-table
            :data="tableData"
            stripe
            style="width: 100%;margin-top:24px;"
            height="260px"
          >
            <el-table-column
              prop="code"
              label="逆变器"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="inverterType"
              label="逆变器类型"
              show-overflow-tooltip
              width="140px"
            >
              <!-- <template slot-scope="scope">{{scope.row.stype}}
                </template> -->
            </el-table-column>
            <el-table-column
              prop="maxefficency"
              label="最高转换效率"
              show-overflow-tooltip
              width="140px"
            ></el-table-column>
          </el-table>
        </div>
        <div class="sourceMark">数据来源：{{ dataSource }}</div>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import singleTitle from "@/components/homeModule/singleTitle";
import DbBar from "@/components/charts/dbBar";
import BarLine from "@/components/charts/barLineA";
import MyLegend from "@/components/charts/legend";
import myBar from "@/components/charts/bar";

export default {
  props: {
    title: {
      default: "运行监测"
    }
  },
  components: {
    singleTitle,
    DbBar,
    MyLegend,
    BarLine,
    myBar
  },
  data() {
    return {
      dataSource: "", //数据来源
      currentHour: new Date().getHours(),
      MaxCol: [],
      //   yMaxValue: "",
      isrefrash: true,
      //   value: "",
      //   optionComponents: null,
      baseGenerateUnit: "", //基地发电量的单位
      baseGenerateYname: "", //基地发电量柱状图的单位
      //   isSelLeft2: true,
      dialogVisible: true,
      basePowwerList: [
        { timeUnit: "日" },
        { timeUnit: "月" },
        { timeUnit: "年" },
        { timeUnit: "累计" }
      ],
      currentTime: "日",
      baseGenerateMax: "", //基地发电量的最大值
      useHourMax: "", //基地利用小时数的最大值
      baseGenerateTotal: "", //基地发电总量
      baseUseHourTotal: "", //基地利用小时数
      baseGenerateName: [], //基地发电量分析的横轴
      baseGenerateData: [], //基地发电分析的数据
      annualRadiation: [], //年度辐射量
      lineVal: null, //年度辐射量分割线
      yearB: [],
      addsB: [],
      yearRadialMax: "", //年度辐射量最大值
      monthXaixsData: [], //月度辐射X轴名称
      monthRadMax: "", //月度辐射最大值
      fsLegend: ["监测值", { text: "设计值", type: "line" }],
      fsLegend2019: ["设计值", "监测值"],
      // ivLegend: ["JW-D60N"],
      //   lineDataSD: {
      //     //实时功率及辐射曲线
      //     series: [],
      //     dataAxis: [],
      //     unit: "℃"
      //   },
      lineBarData: [], //年度辐射量的检测值
      yearRadial: "", //年度辐射量设计值
      radMonthData: [], //月度辐射量变化情况的数值
      ivLineData: {
        //iv曲线
        series: [
          {
            symbol: "none",
            symbolSize: 0,
            name: "电流（A）",
            // data: [65, 55, 56, 70, 75, 53, 55, 75, 43, 64, 82, 70],
            data: [95, 93, 92, 91, 90, 89, 80, 40, 0, 0, 0, 0],
            type: "line",
            areaStyle: {
              normal: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 1,
                  x2: 0,
                  y2: 0,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(31,101,217,.2)" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(36,255,189,.2)" // 100% 处的颜色
                    }
                  ],
                  globalCoord: false // 缺省为 false
                }
              }
            },
            lineStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(31,101,217,1)" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(36,255,189,1)" // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              }
            },
            shadowColor: "rgba(0,0,0,0.1)",
            shadowBlur: 1,
            shadowOffsetY: 10,
            smooth: true
          }
        ],
        dataAxis: [
          "5V",
          "10V",
          "15V",
          "20V",
          "25V",
          "30V",
          "35V",
          "40V",
          "45V",
          "50V",
          "55V",
          "60V"
        ],
        unit: "A"
      },
      flagNum: 0,
      isSelLeft2: true,
      barData2: {
        yName: "%",
        legend: ["监测转换率", "实验转换率"],
        xAxis: [],
        data: []
      },
      pvstringeffic: [],
      pvstringDecay: [],
      isShow: true,
      gridLeft: 25,
      tableData: []
    };
  },
  watch: {},
  created() {},
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        that.isrefrash = false;
        that.$nextTick(() => {
          that.isrefrash = true;
        });
      })();
    };
    this.getBaseGenerateData("day"); // 获取基地发电量分析的数据
    this.getdata();
    this.getzjData(); //获取组件转换效率
  },
  methods: {
    // 当基地发电量分析变化
    unitCountChange(val) {
      let currentVal = null;
      switch (val) {
        case "日":
          currentVal = "day";
          break;
        case "月":
          currentVal = "month";
          break;
        case "年":
          currentVal = "year";
          break;
        case "累计":
          currentVal = "total";
          break;
      }
      this.getBaseGenerateData(currentVal);
      this.baseGenerateName = [];
    },
    // 获取基地发电量分析的数据
    getBaseGenerateData(passdata) {
      this.$fetch("/MtrBaseChildPages/GetRunerDate?datetype=" + passdata).then(
        base => {
          // console.log(base)
          if (passdata == "day")
            (this.baseGenerateUnit = "万kW.h"),
              (this.baseGenerateYname = "万kW.h");
          if (passdata == "year" || passdata == "month")
            (this.baseGenerateUnit = "万kW.h"),
              (this.baseGenerateYname = "万kW.h");
          if (passdata == "total")
            (this.baseGenerateUnit = "亿kW.h"),
              (this.baseGenerateYname = "亿kW.h");

          this.baseGenerateTotal =
            passdata == "year"
              ? Math.ceil(base.data.chartgenerat.generattotal)
              : base.data.chartgenerat.generattotal; //基地发电总量
          this.baseUseHourTotal = base.data.chartgenerat.usehourtotal; //基地利用小时总数
          let generateData = [];
          let hourData = [];

          this.baseGenerateName = base.data.chartgenerat.generat.map(
            i => i.baseName
          ); //基地名称

          generateData = base.data.chartgenerat.generat.map(j => j.dataValue);
          hourData = base.data.chartgenerat.usehour.map(h => h.dataValue);
          this.baseGenerateData = [generateData, hourData];
          this.baseGenerateMax = Math.max(...generateData);
          this.useHourMax = Math.max(...hourData);
        }
      );
    },
    //获取基地年光资源及逆变器转换数据
    getdata() {
      //基地年光资源监测
      this.$fetch("/MtrBaseChildPages/GetLightResource").then(res => {
        let seriesDatas = [
          {
            name: "监测值",
            type: "bar",
            data: []
          },
          {
            name: "设计值",
            type: "line",
            // yAxisIndex:1,
            data: []
          }
        ];
        let datas = res.data;
        for (let item of datas) {
          seriesDatas[0].data.push(item.monitoringValue);
          this.yearB.push(item.baseName);
          seriesDatas[1].data.push(item.designValue);
        }
        this.addsB = seriesDatas;
        this.$nextTick(() => {
          this.$refs.targetsB.drawChart();
        });
      });
      // 基地逆变器转化率
      this.$fetch("/MtrBaseChildPages/GetInverter").then(res => {
        for (let item of res.data) {
          item.code = item.factor + item.code;
        }
        this.tableData = res.data;
      });
      //数据来源
      this.$fetch("/MtrBaseChildPages/GetReportName").then(res => {
        this.dataSource = res.data;
      });
    },
    //获取组件转换效率
    getzjData() {
      //组件转换率
      this.$fetch("/MtrBaseChildPages/GetAttenuation").then(res => {
        this.getBarData2(res.data);
        this.$nextTick(() => {
          this.$refs.bar2.initEcharts();
        });
      });
      //组件衰减率
      this.$fetch("/MtrBaseChildPages/GetAttenuation?Type=2").then(res => {
        this.pvstringDecay = [
          res.data.map(i => i.monitoring),
          res.data.map(i => i.experiment)
        ];
        // this.getBarData2(res);
        this.$nextTick(() => {
          this.$refs.bar2.initEcharts();
        });
      });
    },
    getBarData2(data) {
      this.pvstringeffic = [
        data.map(i => i.monitoring),
        data.map(i => i.experiment)
      ];
      this.barData2.xAxis = data.map(i => i.baseName);
      this.barData2.data = this[
        this.isSelLeft2 ? "pvstringeffic" : "pvstringDecay"
      ];
    },
    // 双标题切换
    clickPvstringeffic(bool, flag) {
      if (flag === this.flagNum) return;
      this.flagNum = flag;
      this.isSelLeft2 = bool;
      this.barData2.data = bool ? this.pvstringeffic : this.pvstringDecay;
      this.barData2.legend = bool
        ? ["监测转换率", "实验转换率"]
        : ["监测衰减率", "实验衰减率"];
      this.isShow = false;
      this.$nextTick(() => {
        this.isShow = true;
      });
    },
    close() {
      this.$parent.dialogName = null;
    }
  }
};
</script>
<style lang="scss">
#operateMonitor {
  .el-dialog {
    background-color: #fff !important;
    .el-dialog__header .el-dialog__title {
      color: #303133;
    }
    .el-dialog__body {
      padding: 27px 70px !important;
    }
  }
  .short_title {
    padding-bottom: 5px;
    // border-bottom: 1px solid #ccc;
  }
  .el-radio-button__inner {
    padding: 5px 20px;
    height: 30px;
    line-height: 16px;
    font-size: 16px;
    color: #7eb1ff;
    background: rgba(228, 245, 255, 0.5) !important;
    border-left: none !important;
    border: 1px solid #7eb1ff !important;
  }
  .el-radio-button__inner:hover {
    color: #409eff !important;
  }
  .is-active .el-radio-button__inner,
  .act-btn {
    background: url(/img/index/act-bg.png) repeat-x !important;
    border-color: #00a1ff !important;
    color: #fff;
  }
  .el-radio-button:first-child .el-radio-button__inner {
    border-left: 1px solid #3261a6 !important;
  }
  .el-input__inner {
    background-color: transparent !important;
    height: 28px !important;
    line-height: 28px !important;
    border-radius: 15px !important;
    border: 1px solid #8f9dae !important;
    padding: 0 10px !important;
  }
  .el-input {
    width: 96% !important;
    font-size: 12px !important;
  }
  .el-input__icon {
    height: 28px !important;
    line-height: 28px !important;
    width: 20px !important;
  }
  .el-select .el-input .el-select__caret {
    font-size: 12px !important;
  }
  .el-select-dropdown .el-popper {
    background-color: transparent !important;
    border: 1px solid #8f9dae !important;
    min-width: 124px !important;
  }
  .el-select-dropdown__item {
    font-size: 12px !important;
    padding: 0 15px !important;
    height: 28px !important;
    line-height: 28px !important;
  }
  .el-select-dropdown__item.selected {
    font-size: 12px !important;
  }
}
.selCurrentCont {
  .el-select-dropdown__item {
    font-size: 12px !important;
    padding: 0 15px !important;
    height: 28px !important;
    line-height: 28px !important;
  }
}
</style>
<style lang="scss" scoped>
.el-dialog .el-dialog__body {
  padding: 23px 70px !important;
}
.el-select-dropdown__item.selected {
  color: #fff !important;
  font-size: 12px;
}

.echarts-box {
  height: 260px;
}
.b-l-dashed {
  border-left: 1px dashed rgba(255, 255, 255, 0.2);
}
#operateMonitor {
  .total-msg {
    margin: 10px 0;
  }
  // 基地发电量分析
  .basePowerBox {
    padding: 18px 0 0px;
    box-sizing: border-box;
    .basePerPower {
      width: 251px;
      height: 40px;
      padding: 10px 0;
      white-space: nowrap;
      p,
      span {
        color: #737373;
      }
      .basePowerIcon {
        width: 20px;
        height: 20px;
        vertical-align: middle;
        margin: 0 10px 0 0;
        display: inline-block;
        background: url("../../../public/img/index/icon_monitor_12.png") center
          center no-repeat;
      }
      .basePowerHourIcon {
        width: 20px;
        height: 20px;
        vertical-align: middle;
        margin: 0 10px 0 0;
        display: inline-block;
        background: url("../../../public/img/index/icon_monitor_13.png") center
          center no-repeat;
      }
      p {
        white-space: nowrap;
        vertical-align: middle;
        display: inline-block;
      }
      cite {
        font-style: normal;
        color: #737373;
        vertical-align: text-bottom;
      }
      span {
        font-size: 26px;
        font-family: "DINOT";
        vertical-align: text-bottom;
        padding: 0 10px;
        line-height: 20px;
        min-width: 2em;
        text-align: center;
        display: inline-block;
      }
    }
  }
  .IVLine {
    margin-top: 30px;
  }
}
</style>
<style lang="scss">
.sourceMark {
  font-size: 12px;
  font-style: italic;
  color: #b7b7b7;
}

// 双标题
.long_title {
  cursor: pointer;
  background: url("/img/index/underline_short.png") no-repeat bottom;
  // border-bottom: 1px solid #ccc;
  background-size: contain;
  position: relative;

  .short_title {
    padding-bottom: 0 !important;
    display: inline-block;
    background: transparent !important;
    color: #000 !important;

    span {
      display: inline-block;
    }

    label {
      cursor: pointer;
    }
  }

  .verticalline {
    margin: -14px 12px 0;
  }

  .active label {
    color: #00baff !important;
  }

  .moreImg {
    position: absolute;
    right: -10px;
  }
}
</style>
<style lang="scss">
.el-table,
.operationtable .el-table tr {
  background-color: transparent;
  font-size: 16px;
  // color: #fff;
}

.el-table thead {
  color: #fff !important;

  th {
    background-color: #1bac6b;
    // border-top: solid 1px #1570d0;
    // border-bottom: none;
  }
}
.operationtable .el-table tbody {
  color: #8c8c8c !important;
}

.el-table thead th:first-child {
  // border-left: solid 1px #1570d0;
}

.el-table thead th:nth-last-child(2) {
  // border-right: solid 1px #1570d0;
}

.el-table--enable-row-transition .el-table__body td {
  background-color: rgba(#fff, 0.8);
}

.el-table--striped .el-table__body tr.el-table__row--striped td {
  background-color: rgba(#eef3f7, 0.5);
}
.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: transparent;
}
.el-table__body-wrapper {
  border: solid 1px #e4e4e4;
  overflow-x: hidden !important;
}

.el-table--group::after,
.el-table--border::after,
.el-table::before {
  background-color: transparent;
}

// .el-table tr:not(:last-child) td {
//   border-bottom: solid 1px #19528e;
// }
.esriSimpleSlider {
  display: none !important;
}
// /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
// .el-table__body-wrapper::-webkit-scrollbar {
//   width: 6px; /*滚动条宽度*/
//   height: 3px; /*滚动条高度*/
//   // background-color: white;
// }

// /*定义滑块 内阴影+圆角*/
// .el-table__body-wrapper::-webkit-scrollbar-thumb {
//   -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
//   background-color: rgb(221, 222, 224); /*滚动条的背景颜色*/
// }
</style>
