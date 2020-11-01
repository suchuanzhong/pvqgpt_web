<template>

<!--  <div class="full">-->
    <div class="full_body equip_box">
      <div class="table-box" style="height:calc(50% - 40px)">
        <div class="clearfix box-header">
          <h4>组件构成</h4>
          <img src="/img/arrDB-R.png" @click="getTable(1)" />
        </div>
        <div class="box-body">
          <el-row :gutter="120" class="row-split clearHight">
            <el-col :span="8" v-for="(item, index) in pieData" :key="index" class="per-components-box">
              <singleTitle :title="item.title" subTitle=""></singleTitle>
              <el-row type="flex" justify="space-between" class="pie_wrapper">
                <el-col :span="9">
                  <doublePie v-if="IsShow" :ids="'doublePie' + index" :data1="item.data1" :data2="item.data2" ref="doublePies" ></doublePie>
                </el-col>
                <el-col :span="12" class="invest_legend_wrapper">
                  <div class="legendBox" :class="[item.legend.length > 2 ? 'scroll' : '']">
                    <div v-for="(l, index) in item.legend" :key="index">
                      <div class="pvstring_row single_legend  m-t-20">
                        <i class="legend-color " :class="'border-color' + index"></i>
                        <p>{{ l.dataCode }}组件</p>
                        <p>
                          <span :class="'color' + index">{{ l.dataValue }}</span
                          >块
                        </p>
                      </div>
                      <div class="pvstring_row single_legend  m-t-20">
                        <i class="legend-color " :class="'AZ-border-color' + index"></i>
                        <p>{{ l.dataCode }}组件--安装容量</p>
                        <p>
                                                <span :class="'AZ-color' + index">{{ l.installCapacity }}</span
                                                >MW
                        </p>
                      </div>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </div>

      <el-row style="height:calc(50% - 40px);" :gutter="20" class="row2">
        <el-col :span="16">
          <div class="table-box" style="height:100%">
            <div class="clearfix box-header">
              <h4>逆变器构成</h4>
              <img src="/img/arrDB-R.png" @click="getTable(2)" />
            </div>
            <div class="box-body">
              <el-row :gutter="120" class="row-split clearHight">
                <el-col :span="12" v-for="(item, i) in pieData1" :key="i" class="per-components-box">
                  <singleTitle :title="item.title" subTitle=""></singleTitle>
                  <el-row type="flex" justify="space-between" class="pie_wrapper">
                    <el-col :span="9">
                      <doublePie v-if="IsShow" :ids="'doublePie' + (i + 3)" :data1="item.data1" :data2="item.data2" ref="barpie"></doublePie>
                    </el-col>
                    <el-col :span="12" class="invest_legend_wrapper">
                      <div class="legendBox" :class="[item.legend.length > 2 ? 'scroll' : '']">
                        <div v-for="(l, index) in item.legend" :key="index">
                          <div class="pvstring_row single_legend single_one ">
                            <i class="legend-color " :class="'border-color' + index"></i>
                            <!-- <p class="display">{{ l.dataCode }}</p> -->
                            <p class="ellipsis">{{ l.dataCode }}</p>
                            <p class="ellipsis">
                                                        <span :class="'color' + index">{{ l.dataValue }}</span
                                                        >台
                            </p>
                          </div>
                          <div class="pvstring_row single_legend single_one m-t-20">
                            <i class="legend-color " :class="'AZ-border-color' + index"></i>
                            <!-- <p class="display" >{{ l.dataCode }}--安装容量</p> -->
                            <p class="ellipsis">{{ l.dataCode }}--安装容量</p>
                            <p class="ellipsis">
                                                        <span :class="'AZ-color' + index">{{ l.installCapacity }}</span
                                                        >MW
                            </p>
                          </div>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="table-box " style="height:100%">
            <div class="clearfix box-header">
              <h4>支架构成</h4>
            </div>
            <div class="box-body bracket-box">
              <el-row class="row-split">
                <el-col :span="24" v-for="(item, i) in pieData2" :key="i" class="per-components-box">
                  <singleTitle :title="item.title" subTitle=""></singleTitle>
                  <el-row type="flex" justify="space-between" class="pie_wrapper">
                    <el-col :span="9">
                      <doublePie v-if="IsShow" :ids="'doublePie' + (i + 6)" :data1="item.data1" :data2="item.data2"></doublePie>
                    </el-col>
                    <el-col :span="12" class="invest_legend_wrapper">
                      <div class="legendBox" :class="[item.legend.length > 2 ? 'scroll' : '']">
                        <div v-for="(l, index) in item.legend" :key="index">
                          <!-- <div class="pvstring_row single_legend  m-t-20">
                              <i class="legend-color " :class="'border-color' + index"></i>
                              <p>{{ l.dataCode }}</p>
                              <p>
                                  <span :class="'color' + index">{{ l.dataValue }}</span
                                  >个
                              </p>
                          </div> -->
                          <div class="pvstring_row single_legend  m-t-20">
                            <i class="legend-color " :class="'border-color' + index"></i>
                            <p>{{ l.dataCode }}--安装容量</p>
                            <p>
                                                        <span :class="'color' + index">{{ l.installCapacity }}</span
                                                        >MW
                            </p>
                          </div>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
      <component :is="dialogName" :title="dialogTitle" :data="tableData" ></component>
    </div>
<!--  </div>-->

</template>

<script>
  import doublePie1 from "@/components/charts/doublePie1"
  import doublePie from "@/components/echarts/doublePie2"
  import singleTitle from "@/components/homeModule/singleTitle"

  import InverterComp from "./InverterComp"
  import PvstringComp from "./PvstringComp"

  export default {
    components: {
      doublePie,
      doublePie1,
      singleTitle,
      InverterComp,
      PvstringComp
    },
    mounted() {},
    data() {
      return {
        dialogName: null,
        dialogTitle: "",
        IsShow: true,
        color: [
          {
            color1: ["#00efff", "#fe7e00", "#978ffd",'#32eac5','#2dc076'],
            color2: {}
          }
        ],
        pieData: [
          {
            key: "batterytype",
            title: "单晶多晶组件构成",
            subTitle: "MONOCRYSTALLINE  POLYCRYSTALS",
            data1: [],
            data2: [],
            legend: []
          },
          {
            key: "stringtype",
            title: "单面双面组件构成",
            subTitle: "DNE-SIOEO AND TWO-SIOEO",
            data1: [],
            data2: [],
            legend: []
          },
          {
            key: "zjfactor",
            title: "厂家型号组件构成",
            subTitle: "MANUFACTURER MOOEL",
            data1: [],
            data2: [],
            legend: []
          }
        ],
        pieData1: [
          {
            key: "nbqtype",
            title: "逆变器类型构成",
            subTitle: "INVERTER COMPOSITION",
            data1: [],
            data2: [],
            legend: [],
            color: { color1: "#2bd19a" }
          },
          {
            key: "nbqfactor",
            title: "逆变器厂家构成",
            subTitle: "INVERTER MANLIFACTURER COMPOSITION",
            data1: [],
            data2: [],
            legend: []
          }
        ],
        pieData2: [
          {
            key: "stentstype",
            title: "支架安装容量构成",
            subTitle: "BRACKET MOUNTING CAPACITY",
            data1: [],
            data2: [],
            legend: []
          }
        ],

        tableData: [],
        tableData1: [],
        isShow: false,
        isShow1: false,
        arr: []
      }
    },
    created() {
      this.equipmentDetails()
      // this.getTable(1)
    },
    methods: {
      equipmentDetails() {
        var _this = this
        _this.IsShow = false
        // let id = JSON.parse(sessionStorage.getItem("storeBaseId"))

        this.$fetch('/MtrBase/CompositionAnalysis',{
          baseId:this.$route.query.id
        }).then(res=>{
          var resArr = []
          for (var i in res.data) {
            resArr.push(res.data[i])
          }
          resArr.forEach(ele => {
            _this.IsShow = true
            _this.pieData.forEach(item => {
              if (ele.key == item.key) {
                item.legend = ele.value
                item.data1 = []
                item.data2 = []
                ele.value.forEach((i) => {
                  item.data1.push({
                    name: i.dataCode + "组件",
                    value: i.dataValue == "0" ? "" : i.dataValue
                  })
                  item.data2.push({
                    name: i.dataCode + "组件-安装容量",
                    value: i.installCapacity == "0" ? "" : i.installCapacity
                  })
                })
              }
            })
            _this.pieData1.forEach(item => {
              if (ele.key == item.key) {
                item.legend = ele.value
                item.data1 = []
                item.data2 = []
                ele.value.forEach(i => {
                  item.data1.push({
                    name: i.dataCode,
                    value: i.dataValue == "0" ? "" : i.dataValue
                  })
                  item.data2.push({
                    name: i.dataCode + "-安装容量",
                    value: i.installCapacity == "0" ? "" : i.installCapacity
                  })
                })
              }
            })
            _this.pieData2.forEach(item => {
              if (ele.key == item.key) {
                item.legend = ele.value
                item.data1 = []
                item.data2 = []
                ele.value.forEach(i => {
                  item.data1.push({
                    name: i.dataCode + "-安装容量",
                    value: i.installCapacity == "0" ? "" : i.installCapacity
                  })
                })
              }
            })
          })
        })

      },

      getTable(val) {
        let id=JSON.parse(sessionStorage.getItem("storeBaseId"));
        // let type;
        var _this = this
        _this.$fetch( "/MtrBase/ComponentDetail",{
          baseid:id,
          type:val
        }).then(res => {
          _this.tableData = res.data
          if(val == 1){
            _this.dialogName = "PvstringComp"
            _this.dialogTitle = "组件构成详情"
          }else{
            _this.dialogName = "InverterComp"
            _this.dialogTitle = "逆变器构成详情"
          }


        })
      }
    }
  }
</script>
<style lang="scss">
  .el-dialog .el-dialog__header .el-dialog__title {
    color: #303133 !important;
  }
  .short_title label{
    color:#1BAB6B !important; ;
  }
</style>

<style lang="scss" scoped>

  .full_body {
    padding: 50px 50px 10px 50px;
    background: rgba(241,245,249,1);
    margin: 0px;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: hidden;
  }
  .box-header {
    line-height: 50px;
    border-bottom: 1px solid #D1D1D1;
    // margin-top: 20px;
  }
  .table-box {
    width: 100%;
    background:#fff;
    box-shadow:0px 0px 4px 0px rgba(0,44,104,0.1);
    border-radius:1px;
    // margin-top: 20px;
    h4 {
      display: inline-block;
      font-size: 16px;
      color: #000000;
      margin-left: 12px;
    }
    img {
      float: right;
      padding: 18px 8px;
      font-size: 20px;
      color: #fff;
      cursor: pointer;
    }
  }
  .row2 {
    margin-top: 20px;
  }
  .el-row,
  .el-col,
  .invest_legend_wrapper {
    height: 100%;
  }
  .box-body {
    padding: 0 60px;
    height: calc(100% - 50px);
    .pie_wrapper {
      height: calc(100% - 57px);
    }

    .row-split {
      .short_title {
        margin-top: 20px;
      }

      & > .el-col {
        position: relative;
        // padding: 20px 0;
      }
      & > .el-col:not(:last-child)::after {
        content: "";
        display: inline-block;
        width: 1px;
        height: calc(100% - 36px);
        /*background:rgba(210,210,210,1);*/
        /*border-radius:50%;*/
        background: url("../../../assets/img/splitLine.png") no-repeat;
        background-size: 1px 100%;
        position: absolute;
        top: 20px;
        right: 0;
      }
    }
  }
  .bracket-box {
    padding: 0 60px;
  }
  .grid-content {
    p {
      font-size: 14px;
      text-align: center;
      margin-top: 10px;
    }
  }
  //详情
  .tableData-box {
    position: fixed;
    top: 235px;
    left: 440px;
    background-color: #fff;
    width: 1100px;
    height: 400px;
    border: none;
    .header {
      span {
        color: #fff;
        font-size: 16px;
      }
      img {
        float: right;
        padding: 3px 10px;
        cursor: pointer;
      }
    }
  }
  .scroll {
    height: 100%;
    padding-left: 25px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .invest_legend_wrapper {
    display: flex;
    align-items: center;

    .legendBox {
      width: 100%;
      .single_legend {
        margin-top: 12px;
        position: relative;
        .legend-color {
          border: 1px solid #ff9f7f;
          border-radius: 3px;
          width: 15px;
          height: 5px;
          display: inline-block;
          margin: 0 0px;
          position: absolute;
          left: -25px;
          top: 40%;
        }
        p {
          padding-bottom: 3px;
          font-size: 14px;
          color: #666666;
          span {
            font-size: 20px;
            font-weight:400;
            font-family: DINOT;
            margin-right: 10px;
          }
        }
      }
    }
  }

  .single_one {
    .ellipsis {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 165px;
    }
    .ellipsis:hover {
      overflow: visible;
    }
  }
  .color0 {

    background:linear-gradient(0deg,rgba(39,234,209,1) 0%, rgba(45,192,118,1) 99.267578125%);
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent
  }
  .color1 {
    color: #16a3ff !important;
  }
  .color2 {
    color: #7e91b9 !important;
  }
  .color3 {
    color: #f03a3a !important;
  }
  .color4 {
    color: #fe8463 !important;
  }
  .color5 {
    color: #72fae2 !important;
  }

  .AZ-color0 {
    color: #fe7e00 !important;
  }
  .AZ-color1 {
    color: #00efff !important;
  }
  .AZ-color2 {
    color: #978ffd !important;
  }
  .AZ-color3 {
    color: #ce6af9 !important;
  }
  .AZ-color4 {
    color: #fe8463 !important;
  }
  .AZ-color5 {
    color: #72fae2 !important;
  }

  .border-color0 {
    border-color: #2ad39e !important;
  }
  .border-color1 {
    border-color: #16a3ff !important;
  }
  .border-color2 {
    border-color: #7e91b9 !important;
  }
  .border-color3 {
    border-color: #f03a3a !important;
  }
  .border-color4 {
    border-color: #fe8463 !important;
  }
  .border-color5 {
    border-color: #72fae2 !important;
  }
  .AZ-border-color0 {
    border-color: #fe7e00 !important;
  }
  .AZ-border-color1 {
    border-color: #00efff !important;
  }
  .AZ-border-color2 {
    border-color: #978ffd !important;
  }
  .AZ-border-color3 {
    border-color: #ce6af9 !important;
  }
  .AZ-border-color4 {
    border-color: #fe8463 !important;
  }
  .AZ-border-color5 {
    border-color: #72fae2 !important;
  }
  .per-components-box {
    // overflow-y: auto;
  }

  @media screen and (min-width: 1600px) {
    .per-components-box {
      // padding-left: 60px !important;
      // padding-right: 60px !important;
    }
  }
  @media screen and (min-width: 1130px) and (max-width: 1600px) {
    .per-components-box {
      padding-left: 10px !important;
      padding-right: 10px !important;
    }
    .bracket-box {
      padding: 0;
    }
  }
  @media screen and (min-width: 700px) and (max-width: 1130px) {
    .full_body {
      overflow: scroll;
      .el-row {
        height: auto;
        .el-col {
          height: auto;
        }
      }
      .table-box {
        height: auto !important;
      }
      .el-col-16 {
        width: 100%;
        margin-bottom: 20px;
        .el-row {
          height: auto;
        }
      }
      .el-col-8 {
        width: 100%;
      }
      .per-components-box {
        width: 100%;
        padding: 20px 40px !important;
        height: auto;
        overflow-x: auto;
      }
      .bracket-box {
        padding: 0;
      }
    }
  }
  @media screen and (min-width: 624px) and (max-width: 700px) {
    .full_body {
      overflow: scroll;
      .el-row {
        height: auto;
        .el-col {
          height: auto;
        }
      }
      .table-box {
        height: auto !important;
      }
      .el-col-16 {
        width: 100%;
        margin-bottom: 20px;
        .el-row {
          height: auto;
        }
      }
      .el-col-8 {
        width: 100%;
      }
      .per-components-box {
        width: 100%;
        padding: 20px 5px !important;
        height: auto;
      }
      .bracket-box {
        padding: 0;
      }
    }
  }
  @media screen and (max-width: 624px) {
    .full_body {
      overflow: scroll;

      .el-row {
        height: auto;
        .el-col {
          height: auto;
        }
      }
      .table-box {
        height: auto !important;
      }
      .el-col-16 {
        width: 100%;
        margin-bottom: 20px;
        .el-row {
          height: auto;
        }
      }
      .el-col-8 {
        width: 100%;
        .legendBox {
          display: none;
        }
      }
      .per-components-box {
        width: 100%;
        padding: 20px 5px !important;
        height: auto;
      }
      .bracket-box {
        padding: 0;
      }
    }
  }
</style>
