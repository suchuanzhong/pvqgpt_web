<template>
  <div style="height:100%">
    <div class="title">
      <h1>逆变器监测</h1>
      <p>数据采集时间:{{ lastTime | replaceT }}</p>
    </div>
    <div class="echartsWrap">
      <div>
        <div class="containter1">
          <h3>
            <span>逆变器信息</span>
            <!-- <span>GRID-CONNECTED INVERTER INFORMATION</span>
            <img src="/img/location.png" alt="" /> -->
          </h3>
          <div class="item">
            <p style="width:100%;">
              <span>逆变器数量</span>
              <span
                ><i style="color:#08b6f9;">{{ NBQTotalData.total }}</i
                >台</span
              >
            </p>
            <p>
              <span>并网</span>
              <span
                ><i>{{ NBQTotalData.bwnum }}</i
                >台</span
              >
            </p>
            <p>
              <span>正常待机</span>
              <span
                ><i>{{ NBQTotalData.standbynum }}</i
                >台</span
              >
            </p>
            <p>
              <span>关机</span>
              <span
                ><i>{{ NBQTotalData.shutdownnum }}</i
                >台</span
              >
            </p>
            <p>
              <span>故障</span>
              <span
                ><i>{{ NBQTotalData.errornum }}</i
                >台</span
              >
            </p>
            <!-- <p style=" border-bottom:none;">
              <span>通讯故障</span>
              <span
                ><i>{{ NBQTotalData.commnum }}</i
                >台</span
              >
            </p> -->
            <p style=" border-bottom:none;">
              <span>通讯中断</span>
              <span
                ><i>{{ NBQTotalData.commnum }}</i
                >台</span
              >
            </p>
            <p style=" border-bottom:none;">
              <span>数据中断</span>
              <span
                ><i>{{ NBQTotalData.dataInterrupt }}</i
                >台</span
              >
            </p>
          </div>
        </div>
        <MatrixEcharts
          :transData="transData"
          :nodedata="nodedata"
        ></MatrixEcharts>
      </div>
      <div style="height:calc(100% - 280px)">
        <div class="selectShow">
          <span :class="{ active: selectTypeState }" @click="selectType(0)"
            >平铺</span
          >
          <span :class="{ active: !selectTypeState }" @click="selectType(1)"
            >列表</span
          >
        </div>
        <component
          :is="selectComponent"
          :dataList="dataList"
          @viewnbqinfo="viewnbqinfo"
          :nodedata="nodedata"
        ></component>
      </div>
    </div>
  </div>
</template>

<script>
import MatrixEcharts from "./matrixEcharts";
import list from "./list";
import matrixView from "./matrixView";
export default {
  props: ["nodedata"],
  components: {
    MatrixEcharts,
    list,
    matrixView
  },
  watch: {
    nodedata: function(newVal) {
      if (!newVal) {
        this.transData = [];
        this.NBQTotalData = {};
        this.dataList = [];
        return;
      }

      this.getMatrixData(newVal.code);
      this.selectTypeState = true;
      this.selectComponent = "matrixView";
    }
  },
  data() {
    return {
      selectTypeState: true, //控制平铺、列表
      selectComponent: "matrixView",
      transData: [], //方阵折线图
      NBQTotalData: {}, //逆变器统计
      dataList: [],
      lastTime: ""
    };
  },
  methods: {
    viewnbqinfo(row, nodedata) {
      this.$emit("viewnbqinfo", row, nodedata);
    },
    // 获取方阵页面信息
    getMatrixData(code) {
      if (!code) return;
      var _this = this;
      this.$fetchGet({
        url: "/RealTimeData/GetInvertList",
        params: { boxcode: code }
      }).then(res => {
        let result = res.data;
        let activePower = [],
          dcActivePower = []; //交流有功功率，直流有功功率
        result.trans.map(item => {
          activePower.push({
            timestamp: item.timestamp,
            datavalue: item.jlpwr
          });
          dcActivePower.push({
            timestamp: item.timestamp,
            datavalue: item.zlpwr
          });
        });
        _this.transData = [activePower, dcActivePower, result.transsource];
        // console.log(_this.transData)
        _this.NBQTotalData = result.inverter;
        let errornum = _this.NBQTotalData.commnum + _this.NBQTotalData.faultnum;
        _this.$set(_this.NBQTotalData, "errornum", errornum);
        let dataInterrupt =
          _this.NBQTotalData.total -
          (_this.NBQTotalData.bwnum +
            _this.NBQTotalData.commnum +
            _this.NBQTotalData.faultnum +
            _this.NBQTotalData.shutdownnum +
            _this.NBQTotalData.standbynum);
        _this.$set(_this.NBQTotalData, "dataInterrupt", dataInterrupt);
        _this.lastTime = result.time;
        _this.dataList = result.inverterlist.map(item => {
          item.name = item.code.substr(-4, 4) + "﹟逆变器";
          return item;
        });
      });
    },
    selectType(val) {
      if (val == 0) this.selectTypeState = true;
      else this.selectTypeState = false;
      if (this.selectTypeState) {
        this.selectComponent = "matrixView";
      } else this.selectComponent = "list";
    }
  }
};
</script>
