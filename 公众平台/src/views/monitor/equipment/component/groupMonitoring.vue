<template>
  <div style="height:100%">
    <div class="title">
      <h1>组串监测</h1>
      <p>数据采集时间:{{ lastTime | replaceT }}</p>
    </div>
    <div class="groupMonitoring maincontainer">
      <div style="height:426px;">
        <el-table
          :header-cell-style="headercellstyle"
          :cell-style="cellstyle"
          :data="tableData"
          height="426px"
          border
          size="medium"
        >
          <el-table-column label="输入支路" prop="zlnum" align="center">
            <template slot-scope="scope">
              <span>{{ "i" + scope.row.zlnum }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="实时电压(V)"
            prop="zlv"
            align="center"
          ></el-table-column>
          <el-table-column
            label="实时电流(A)"
            prop="zlcurr"
            align="center"
          ></el-table-column>
          <el-table-column
            label="日平均电流(A)"
            prop="zlavgcurr"
            align="center"
          ></el-table-column>
        </el-table>
      </div>
      <EleCurrEcharts ref="elecharts" :chartData="chartData"></EleCurrEcharts>
    </div>
  </div>
</template>

<script>
import EleCurrEcharts from "./EleCurrEcharts";
// import list from "./list";
// import matrixView from "./matrixView";
export default {
  props: ["nodedata"],
  components: {
    EleCurrEcharts
    // list,
    // matrixView
  },
  watch: {
    nodedata(val) {
      this.getDataByCode(val.code);
    }
  },
  data() {
    return {
      tableData: [],
      xaxisData: [],
      result: [],
      lastTime: "",
      chartData: []
    };
  },
  mounted() {},
  methods: {
    getDataByCode(code) {
      var _this = this;
      this.$fetchGet({
        url: "/RealTimeData/GetZlList",
        params: { invertercode: code }
      }).then(res => {
        _this.lastTime = res.data.timestamp;
        _this.tableData = res.data.zlsList;
        _this.chartData = res.data.chartzl;
      });
    },
    headercellstyle() {
      return {
        background: "#1da63b",
        color: "#fff",
        "border-right-color": "#8dd5b5",
        "border-bottom-color": "#8dd5b5"
      };
    },
    cellstyle() {
      return {
        color: "#1da63b",
        "border-right-color": "#8dd5b5",
        "border-bottom-color": "#8dd5b5"
      };
    }
  }
};
</script>
<style scoped>
#systemEquipmentMonitor .mainWrap .groupMonitoring {
  height: auto !important;
}
</style>
