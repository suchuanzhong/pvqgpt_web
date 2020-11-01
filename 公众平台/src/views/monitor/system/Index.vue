<template>
  <div id="systemMonitor" class="full relative station-run-check">
    <!--select切换-->
    <!--展示内容-->
    <div id="content0" class="content">
      <div class="header m-b-15" style="height:42px;position:relative">
        <stationSelect
          :defaulState="true"
          :emitState="true"
          @selectedStation="onSelectedPC"
          :optindata = optinedataPC
          :defaultKey = optinePcKey
          selName = "批次"
          ref="StationSelect"
        ></stationSelect>
        <stationSelect
          :defaulState="true"
          :emitState="true"
          @selectedStation="onSelectedJD"
          :optindata = optinedataJD
          :defaultKey = optineJdKey
          selName = "基地"
          ref="StationSelect"
        ></stationSelect>
        <stationSelect
          :defaulState="true"
          :emitState="true"
          @selectedStation="onSelectedDZ"
          :optindata = optinedataDZ
          selName = "电站"
          ref="StationSelect"
        ></stationSelect>
      </div>
      <div style="height:calc(100% - 62px)">
        <component
          :is="currentView"
          :valuedz="valueDZ"
          :valuepc="valuePC"
          :valuejd="valueJD"
          :dataXB="dataXB"
          :dataKGZ="dataKGZ"
          :dataNBQ1="dataNBQ1"
          :dataNBQ2="dataNBQ2"
          :dataHLX="dataHLX"
          :dataZJ="dataZJ"
        ></component>
      </div>
    </div>
  </div>
</template>
<script>
// import { DealNull } from "@/plugins/dealData";
import stationSelect from "@/components/station";
import systemmonitor1 from "./components/systemMonitor1"; //集中
import systemmonitor2 from "./components/systemMonitor2"; //组串
import systemmonitor3 from "./components/systemMonitor3"; //全部
import { setInterval, clearInterval } from "timers";
export default {
  components: {
    systemmonitor1,
    systemmonitor2,
    systemmonitor3,
    stationSelect
  },
  data: function() {
    return {
      currentView: "",
      valuePC:"",
      valueJD:"",
      valueDZ: "",
      optinedataPC:[],
      optinedataJD:[],
      optinedataDZ:[],
      optinePcKey:{
                    value:"name",
                    label:"id"
                },
      optineJdKey:{
                    value:"id",
                    label:"name"
                },
      dataXB: {
        totalnum: 0,
        normalnum: 0,
        neterrornum: 0,
        failnum: 0
      },
      dataKGZ: {
        firstpactelec: 0,
        firstractelec: 0,
        firstpreactelec: 0,
        firstrreactelec: 0
      },
      dataNBQ1: {
        total: 0,
        standbynum: 0,
        bwnum: 0,
        commnum: 0,
        faultnum: 0,
        shutdownnum: 0,
        dcpwr: 0,
        acpwr: 0
      },
      dataNBQ2: {
        total: 0,
        standbynum: 0,
        bwnum: 0,
        commnum: 0,
        faultnum: 0,
        shutdownnum: 0,
        dcpwr: 0,
        acpwr: 0
      },
      dataHLX: {
        totalnum: 0,
        zcnum: 0,
        faultnum: 0,
        shutdownnum: 0,
        standbynum: 0,
        onum: 0,
        totalzlnum: 0,
        zczlnum: 0,
        lowzlnum: 0,
        ozlnum: 0
      },
      dataZJ: {
        pvnum: 13464,
        pvstring: []
      }
    };
  },
  mounted(){
    this.getSelateData()
  },
  methods: {
    //获取selsct数据
    getSelateData(){
      this.$fetchGet({url:'/MtrBase/GetBatchBaseTree'}).then(res =>{
        this.optinedataPC = res.data
        this.optinedataJD = res.data[2].childTreeNode
        this.onSelectedJD(res.data[2].childTreeNode[2].id)
      })
    },
    onSelectedPC(data){
      // console.log(data)
      this.valuePC = data
      this.optinedataJD = []
      this.optinedataPC.map(item=>{
        if(item.name == data){
          this.optinedataJD = item.childTreeNode
        }
      })
    },
    onSelectedJD(data){
      this.valueJD = data
       this.optinedataDZ =[]
        this.$fetchGet({url:'/RealTimeData/GetProList',params:{baseid:data}}).then(res =>{
          this.optinedataDZ = res.data
        })
    },
    onSelectedDZ(id) {
      var _this = this;
      this.valueDZ = id;
      // 箱变、变电站信息；stationtype:1-集中式,3-组串式，4-混合式;substation 开关站信息,boxtrans 箱变
      this.$fetchGet({url:"/RealTimeData/GetSumEquipHead",params:{projectcode:id}}).then(res => {
      1
        if (res.data.type == 1 || res.data.type == 2) {
          this.currentView = "systemmonitor1";
        } else if (res.data.type == 3) {
          this.currentView = "systemmonitor2";
        } else if (res.data.type == 4) {
          this.currentView = "systemmonitor3";
        } else {
          this.currentView = "";
        }
      });
      this.getCurrData(id);
      this.getCompData(id);
      const timer = setInterval(() => {
        _this.getCurrData(id);
      }, 300000);
      // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
      this.$once("hook:beforeDestroy", () => {
        clearInterval(timer);
      });
    },
    getCurrData(pro) {
      if (!pro) return;
      var _this = this;

      //开关站、箱变信息
      this.$fetchGet({url:"/RealTimeData/GetSumEquipHead",params:{projectcode:pro}}).then(res => {
        var result = res.data;
        if (result.boxtrans.length) _this.dataXB = result.boxtrans[0];
        if (result.substation.length) _this.dataKGZ = res.data.substation[0];
      });
      // 汇流箱 支路电流
      this.$fetchGet({url:"/RealTimeData/GetSumcombinerbox",params:{projectcode:pro}}).then(res => {
        this.dataHLX = res.data;
      });
      //   逆变器 ----- inverter：逆变器集中,inverter_zc：逆变器组串式
      this.$fetchGet({url:"/RealTimeData/GetSumEquipinvert",params:{projectcode:pro}}).then(res => {
        var result = res.data;
        if (result.inverter.length) _this.dataNBQ1 = result.inverter[0];
        if (result.inverter_zc.length) _this.dataNBQ2 = result.inverter_zc[0];
      });
    },
    getCompData(pro) {
      //  组串
      this.$fetchGet({url:"/RealTimeData/GetSumEquipbox",params:{projectcode:pro}}).then(res => {
        this.dataZJ.pvnum = res.data.pvnum;
        this.dataZJ.pvstring = this.formateZj(res.data.pvstring);
      });
    },
    //格式化组件数据
    formateZj(zjdata) {
      var zj = [];
      for (let index = 0; index < zjdata.length; index += 2) {
        var obj = new Object();
        if (index + 1 < zjdata.length) {
          obj = { col1: zjdata[index], col2: zjdata[index + 1] };
        } else {
          obj = { col1: zjdata[index] };
        }
        zj.push(obj);
      }
      return zj;
    }
  }
};
</script>
<style lang="scss" >
.station-run-check {
  @import "public/css/scss/systemMonitor.scss";
  table {
    width: 100%;
    height: 100%;
    text-align: center;
    border-collapse: collapse;
    border-spacing: 0;
    border: 2px solid #bae6d2;
    color: #fff;
  }

  table tr th,
  table tr td {
    padding-left: 10px;
    padding-right: 10px;
    height: 30px;
    padding-top: 5px;
    padding-bottom: 5px;
  }
}
</style>

