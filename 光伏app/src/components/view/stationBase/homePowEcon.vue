<template>
  <div class="power-and-economic">
    <MtHeader backPagePathName="stationBase"></MtHeader>
    <div class="viewWrap">
      <group class="groupWrap">
        <datetime v-model="selYearData" readonly>
          <span slot="title" class="soltTitleMounth">
            <img slot="icon" src="./../../../assets/img/rili.png" width="20" height="auto" />
            <span style="vertical-align:middle;">时间</span>
          </span>
        </datetime>
      </group>
      <div class="per-station-chart">
        <div class="station-title">
          <span slot="title" class="soltTitleMounth">
            <img slot="icon" src="./../../../assets/img/yfdl.png" alt width="20" height="auto" />
            <span>{{stationTitle}}</span>
          </span>
        </div>
        <div id="Power">
          <StationBar
            ids="perStationBar"
            :xAxisData="stationXaxis"
            :seriesData="stationSeriesData"
            ref="perStationBar"
          ></StationBar>
        </div>
      </div>
      <div class="indexBox">
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
          <div class="staion-per" v-for="(item,index) in stationPriceList" :key="index">
            <p>{{item.projectname}}</p>
            <div>
              <span>{{item.price}}</span>
              <label>{{item.unit}}</label>
            </div>
          </div>
          <div class="no-data" v-if="stationPriceList.length<=0">暂无数据</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import { Datetime, Group, Cell, PopupPicker } from "vux";
import MtHeader from "@/components/public/MtHeader";
import StationBar from "@/components/public/EchartsDoubleBar";
export default {
  components: {
    Datetime,
    Group,
    Cell,
    PopupPicker,
    MtHeader,
    StationBar
  },
  computed: {
    // 显示前面带过来的时间
    selYearData() {
      let time = new Date();
      let years = time.getFullYear();
      let months =
        time.getMonth() + 1 < 10
          ? "0" + (time.getMonth() + 1)
          : time.getMonth() + 1;
      let days = this.$route.query.dateTime;
      if (this.$route.query.dateType == "day") {
        return years + "-" + months + "-" + (days < 10 ? "0" + days : days);
      } else if (this.$route.query.dateType == "month") {
        return (
          years +
          "-" +
          (days.substring(0, days.length - 1) < 10
            ? "0" + days.substring(0, days.length - 1)
            : days.substring(0, days.length - 1))
        );
      } else {
        return days;
      }
    }
  },
  data() {
    return {
      timeFormat: "", //时间格式
      selStation: ["理论利用小时数"],
      stationList: [],
      storeIndexList: [], //存储指标列表的数据
      indexDatas: {
        unit: null,
        type: null,
        data: []
      },
      dataList: [],
      powerNum: null,
      stationTitle: "月度发电量", //各个电站图表的标题
      stationPriceList: [], //各电站电价列表
      stationXaxis: [], //电站图表的数据
      stationSeriesData: []
    };
  },
  mounted() {
    this.getPerStationData(); //获取各个电站的数据
    this.getStationPriceData(); //获取各个电站电价数据
  },
  methods: {
    //获取各个电站的数据
    getPerStationData() {
      this.stationTitle = "";
      this.selYear = "";
      let currentTime = new Date();
      let currentYear = currentTime.getFullYear();
      let currentMonth = currentTime.getMonth() + 1;
      let timeParam = "";
      if (this.$route.query.dateType == "day") {
        timeParam =
          currentYear + "-" + currentMonth + "-" + this.$route.query.dateTime;
        this.stationTitle = "日发电量";
      } else if (this.$route.query.dateType == "month") {
        timeParam =
          currentYear +
          "-" +
          this.$route.query.dateTime.substring(
            0,
            this.$route.query.dateTime.length - 1
          )+'-01';
        this.stationTitle = "月度发电量";
      } else {
        timeParam = this.$route.query.dateTime+'-01-01';
        this.stationTitle = "年度发电量";
      }
      this.$fetch("/AppApi/Base/GetRunerDateByPro", {
        datetype: this.$route.query.dateType,
        dateTime: timeParam
      }).then(res => {
        this.stationXaxis = [];
        this.stationSeriesData = [];
        // x轴
        let combineStationData = [].concat(
          res.data.fdl.length > 0 ? res.data.fdl : [],
          res.data.benefits.length > 0 ? res.data.benefits : []
        );
        combineStationData.sort(this.obgSort("projectName")).map(t => {
          this.stationXaxis.push(t.projectName);
        });
        this.stationXaxis = [...new Set(this.stationXaxis)];
        // series数据
        let seriesNeedData = [
          res.data.fdl.length > 0 ? res.data.fdl : [],
          res.data.benefits.length > 0 ? res.data.benefits : []
        ];
        for (let u in seriesNeedData) {
          this.stationSeriesData.push({
            name: u == 0 ? "发电量" : "经济效益",
            type: "bar",
            barMaxWidth: 14,
            yAxisIndex: u == 0 ? 0 : 1,
            data: this.stationXaxis.map(a => {
              let dataCol = seriesNeedData[u].filter(b => b.projectName == a);
              if (dataCol && dataCol.length > 0) return dataCol[0].dataValue;
              else return null;
            })
          });
        }
        this.$nextTick(() => {
          this.$refs.perStationBar.initEchartsBar(this.stationSeriesData);
        });
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
    //获取各个电站电价数据
    getStationPriceData() {
      this.$fetch("/AppApi/Base/GetStaitionPrice").then(pri => {
        if (pri.data.length > 0) {
          for (let i in pri.data) {
            this.stationPriceList.push({
              projectname: pri.data[i].projectname,
              price: pri.data[i].price,
              unit: "元/kWh"
            });
          }
        }
      });
    },
    // 年份改变时切换的数据
    onChangeYear(year) {
      this.selYear = year;
      this.storeIndexList.forEach(t => {
        if (this.selStation[0] == t.name) this.powerNum = t.code;
      });
      this.getQueryIndexData(
        "/AppApi/Base/QueryIndexData",
        this.selYear,
        this.powerNum
      );
    },
    onChange(val) {
      this.storeIndexList.forEach(t => {
        if (val[0] == t.name) this.powerNum = t.code;
      });
      this.getQueryIndexData(
        "/AppApi/Base/QueryIndexData",
        this.selYear,
        this.powerNum
      );
    }
  }
};
</script>
<style lang="less" scoped>
.power-and-economic {
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
.per-station-chart {
  margin-top: 0.1rem;
  background: #fff;
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
.indexBox {
  flex: 1;
  overflow-x: hidden;

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
      width: calc(100%/3 - 0.2rem/3);
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
}
#Power {
  height: 200px;
  margin-top: 0.1rem;
}
.no-data {
  margin: 0 auto;
  font-size: 0.16rem;
  color: #333;
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
