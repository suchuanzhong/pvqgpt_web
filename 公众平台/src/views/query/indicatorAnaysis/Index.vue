<template>
  <div class="full multify-box-index">
    <div class="anaysis-container">
      <div class="search-conditions">
        <el-radio-group class="date-type" v-model="queryCondition.dateType" @change="changeTimeTab">
          <el-radio-button label="days">日</el-radio-button>
          <el-radio-button label="months">月</el-radio-button>
          <el-radio-button label="years">年</el-radio-button>
        </el-radio-group>
        <el-date-picker
          v-if="pickerType"
          :type="pickerType"
          v-model="queryCondition.dateTime"
          :editable="false"
          value-format="yyyy/MM/dd"
          class="picker"
          :clearable="clearable"
        ></el-date-picker>
        <div class="selStationBox">
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
          @selectedStation="selectedStation"
          :optindata = optinedataDZ
          selName = "电站"
          ref="selectedStation"
        ></stationSelect>
        </div>
        <label class="title-font square-box">方阵：</label>
        <el-select
          v-model="queryCondition.phalanx"
          placeholder="请选择方阵"
          class="normal-select"
          multiple
          clearable
          collapse-tags
          @change="chnageSquareValue"
        >
          <el-option
            :label="i.boxtranscode"
            v-for="(i,index) in storeSqureList"
            :key="index"
            :value="i.code | filterCode"
          >
            <span style="float: left">{{i.code | filterCode}}</span>
            <span
              style="font-size:12px;padding:3px 3px;border:1px solid rgb(0,235,251);border-radius:2px;transform:scale(0.8);color:rgb(0,235,251);display:inline-block;line-height: 16px;"
              v-if="i.child"
            >{{ i.child[0].type | formatType }}</span>
          </el-option>
        </el-select>
        <label class="title-font">设备：</label>
        <el-select
          v-model="queryCondition.equipment"
          placeholder="请选择设备"
          class="normal-select"
          @change="getEquipeData"
        >
          <el-option
            v-for="item in equipmentList"
            :key="item.name"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
        <label class="title-font">类型：</label>
        <el-select
          v-model="queryCondition.equipmentType"
          placeholder="请选择设备类型"
          class="normal-select"
          multiple
          collapse-tags
          @change="changeEquipTypeValue"
        >
          <el-option
            v-for="item in equipTypeList"
            :key="item.name"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
        <label class="title-font">指标：</label>
        <el-select
          v-model="queryCondition.index"
          placeholder="请选择指标"
          class="normal-select"
          multiple
          collapse-tags
          @change="changeIndexValue"
        >
          <el-option
            v-for="item in indexList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
        <el-button class="Btn-blue btn-gd normal-select" @click="queryMultiBtn">查询</el-button>
        <el-button class="back" v-show="backYear" @click="backForward">返回</el-button>
      </div>
      <div class="chart-wrapper">
        <div class="title_box">
          <div class="echartsTitle">
            <p>指标分析</p>
          </div>
        </div>
        <div class="bar-box">
          <myDoubleBar
            ids="multiBarBox"
            ref="multiBarBox"
            :data="multiData"
            :currentTimeType="currentTimeType"
            :currentTime="currentTime"
            :yNamel="yNamel"
            :yNamer="yNamer"
            :triggerEvent="!backYear"
            :clickEvent="enterNextEvent"
            :differentComponents="1"
            :clickCount="clickCount"
          ></myDoubleBar>
        </div>
        <div class="resourceTableBox">
          <div class="title_box" style="margin-bottom:28px;">
            <div class="echartsTitle tableTitle">
              <p>数据表格</p>
            </div>
          </div>
          <template>
            <div class="table-box formcls">
              <el-table :data="tableData" border style="width: 100%" v-if="isShowTable" stripe>
                <el-table-column type="index" label="序号" width="180" align="center"></el-table-column>
                <el-table-column prop="time" label="时间" width="180" align="center"></el-table-column>
                <el-table-column
                  prop="timenum"
                  label="方阵编号"
                  width="180"
                  align="center"
                  v-if="squareShow"
                ></el-table-column>
                <el-table-column
                  v-for="(item,i) in tablecol"
                  :key="i"
                  :prop="item.prop"
                  :label="item.lable"
                  :min-width="item.width"
                  align="center"
                ></el-table-column>
              </el-table>
              <div v-if="!isShowTable" style="text-align:center;">暂无数据</div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myDoubleBar from "@/components/echarts/clickEcharts";
import stationSelect from "@/components/station";
// import { filter } from "minimatch";
export default {
  name: "index",
  components: {
    myDoubleBar,
    stationSelect
  },
  filters: {
    filterCode(val) {
      return val.substring(val.length - 4);
    },
    formatType(type) {
      switch (type) {
        case 1:
          return "集中";
          // break;
        case 2:
          return "集散";
          // break;
        case 3:
          return "组串";
          // break;
      }
    }
  },
  data() {
    return {
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
      isShowTable: true, //表格是否展示
      clickCount: "",
      currentTime: new Date().toLocaleDateString(),
      currentTimeType: "days",
      clearable: false,
      pickerType: "month",
      currentSelStation: "",
      queryCondition: {
        dateType: "months",
        dateTime: new Date().toLocaleDateString(),
        phalanx: ["全部方阵"], //当前方阵的值
        equipment: "total", //当前设备的值
        equipmentType: [], //当前设备类型
        index: [] //当前指标
      },
      squareList: [], //方阵列表
      storeSqureList: [], //存储方阵；列表信息
      equipmentList: [], //设备列表
      equipTypeList: [], //设备类型列表
      indexList: [], //指标列表
      multiData: {
        //echarts图的数据
        series: [],
        dataAxis: []
      },
      yNamel: "",
      yNamer: "",
      storeEquipment: [],
      backYear: false,
      yNameFlag: "", //echarts中yAxisIndex的取值
      tableData: [], //表格数据
      tablecol: [],
      squareShow: false,
      storeTableTime: "" //存储表格的时间
    };
  },
  mounted() {
    this.getSelateData()
    this.changeEquipment("0", true);
    this.$nextTick(() => {
      setTimeout(() => {
        this.queryMultiBtn();
      }, 500);
    });
  },
  methods: {
    // 切换日月年时候的事件
    changeTimeTab(label) {
      this.clickCount = "";
      this.backYear = false;
      this.currentTimeType = label;
      this.multiData.dataAxis = [];
      switch (label) {
        case "months":
          this.pickerType = "year";
          break;
        case "days":
          this.pickerType = "month";
          break;
        case "years":
          this.pickerType = "";
          break;
      }
      this.queryMultiBtn();
    },
    //获取selsct数据
    getSelateData(){
      this.$fetch('/MtrBase/GetBatchBaseTree').then(res =>{
        this.optinedataPC = res.data
        this.optinedataJD = res.data[0].childTreeNode
        this.onSelectedJD(res.data[0].childTreeNode[0].id)
      })
    },
    onSelectedPC(data){
      this.optinedataJD = []
        this.optinedataPC.map(item=>{
          if(item.name == data){
            this.optinedataJD = item.childTreeNode
          }
        })
    },
    onSelectedJD(data){
       this.optinedataDZ =[]
        this.$fetch('/RealTimeData/GetProList?baseid='+data).then(res =>{
          this.optinedataDZ = res.data
        })
    },
    // 选择电站触发，得到相应的方阵列表的事件
    selectedStation(val) {
      this.currentSelStation = val;
      this.storeSqureList = []; //电站改变时，方阵列表清空
      this.$fetch("/IndexQuery/GetBoxList?projectcode="+val).then(res => {
        if (res.data) {
          this.storeSqureList = res.data;
        }
      });
    },
    // 方阵的值变化时触发的事件(默认或没有勾选值时，显示全部方阵)
    chnageSquareValue(val) {
      if (val.length > 1 && val[0] == "全部方阵") {
        return val.splice(0, 1);
      } else if (val.length == 1 && val[0] == "全部方阵") {
        return val;
      } else if (val.length == 0) {
        return val.push("全部方阵");
      }
    },
    // 设备类型的值变化时触发的事件（当没有勾选值时，默认显示全部）
    changeEquipTypeValue(val) {
      if (val.length == 0) {
        for (let item of this.equipTypeList) {
          val.push(item.value);
        }
        return val;
      }
    },
    // 指标的值发生变化时触发的事件（当没有勾选值时，默认显示全部）
    changeIndexValue(val) {
      if (val.length == 0) {
        for (let item of this.indexList) {
          val.push(item.code);
        }
        return val;
      }
    },
    // 根据当前选中的设备，筛选出对应的设备类型
    changeEquipment(val) {
      this.$fetch("/IndexQuery/GetDevices").then(res => {
          if (res.data) {
            this.storeEquipment = res.data;
            this.getEquipeData(val);
          }
        }
      );
    },
    getEquipeData(val) {
      if (val != "0") {
        //清空列表
        this.equipmentList = [];
        this.indexList = [];
        this.equipTypeList = [];
        this.queryCondition.equipmentType = [];
      }
      if (this.storeEquipment.devices) {
        for (let equiptem of this.storeEquipment.devices) {
          this.equipmentList.push({
            name: equiptem.name,
            value: equiptem.value
          });

          if (this.queryCondition.equipment == equiptem.value) {
            this.equipTypeList = equiptem.types ? equiptem.types : [];
            if (equiptem.types) {
              equiptem.types.map(item => {
                this.queryCondition.equipmentType.push(item.value); //首次加载，设备类型默认全选
              });
            }
          }
        }
      }
      if (this.storeEquipment.index) {
        this.indexList = this.storeEquipment.index;
        for (let indextem of this.storeEquipment.index) {
          if (val == "0") {
            //首次加载，指标默认选中2个
            if (this.storeEquipment.index.length <= 2) {
              this.queryCondition.index.push(indextem.code);
            } else {
              this.queryCondition.index.push(indextem.code);
              this.queryCondition.index.splice(2);
            }
          }
        }
      }
    },
    // 查询参数
    queryNeedParams() {
      this.multiData.dataAxis = [];
      this.multiData.series = [];
      this.squareShow = false;
      this.tablecol = [];
      this.tableData = [];
      let queryParam = {};
      let date = this.queryCondition.dateTime.split("/");
      this.currentTime = this.queryCondition.dateTime;
      let giveParam = {};
      let storeSquareValue = [];
      for (let h = 0; h < this.storeSqureList.length; h++) {
        for (let r = 0; r < this.queryCondition.phalanx.length; r++) {
          if (
            this.queryCondition.phalanx[r] ==
            this.storeSqureList[h].code.substring(
              this.storeSqureList[h].code.length - 4
            )
          ) {
            storeSquareValue.push(this.storeSqureList[h].code);
          }
        }
      }
      queryParam = {
        datetype: this.queryCondition.dateType,
        date: date[0] + "-" + date[1] + "-" + date[2],
        device: this.queryCondition.equipment,
        devicetype: this.queryCondition.equipmentType
          ? this.queryCondition.equipmentType.join(",")
          : "",
        boxcode:
          this.queryCondition.phalanx[0] == "全部方阵"
            ? ""
            : storeSquareValue.join(","),
        index: this.queryCondition.index
          ? this.queryCondition.index.join(",")
          : ""
      };
      giveParam = Object.assign(queryParam, {
        projectcode: this.currentSelStation
      });
      return {
        giveParam: giveParam,
        date: date
      };
    },
    // 查询按钮
    queryMultiBtn() {
      this.clickCount = "";
      this.$fetchGet({url:'/IndexQuery/QueryList',params:this.queryNeedParams().giveParam}).then(result => {
        this.backYear = false;
        this.isShowTable = true;
        this.tableData = [];
        let dateTime = this.queryNeedParams().date;
        // x轴
        if (this.queryCondition.dateType == "days") {
          let days = new Date(dateTime[0], dateTime[1], 0).getDate();

          for (let i = 1; i <= days; i++) {
            if (!result.data || result.data.length == 0) {
              this.isShowTable = false;
            } else {
              this.tableData.push({
                time:
                  dateTime[0] +
                  "-" +
                  dateTime[1] +
                  "-" +
                  (i.length == 1 ? "0" + i : i),
                timenum: i.length == 1 ? "0" + i : i
              });
            }
            this.multiData.dataAxis.push(i);
          }
        } else if (this.queryCondition.dateType == "months") {
          for (var j = 1; j <= 12; j++) {
            if (!result.data || result.data.length == 0) {
              this.isShowTable = false;
            } else {
              this.tableData.push({
                time: dateTime[0] + "-" + (j.length == 1 ? "0" + j : j),
                timenum: j.length == 1 ? "0" + j : j
              });
            }
            this.multiData.dataAxis.push(j);
          }
        } else {
          if (!result.data || result.data.length == 0) {
            this.isShowTable = false;
          } else {
            var timearry = [
              ...new Set(
                result.data.map(c => {
                  return c.timeNum;
                })
              )
            ];
            for (let item of timearry) {
              this.tableData.push({
                time: item,
                timenum: item
              });
            }
          }
          let yearXaisData = [];
          if (result.data) {
            for (let item of result.data) {
              yearXaisData.push(item.timeNum);
            }
            this.multiData.dataAxis = [...new Set(yearXaisData)];
          }
        }
        if (result.data) {
          // 当前的指标类型有几种
          var echartsTypes = [];
          for (var k in result.data) {
            if (echartsTypes.indexOf(result.data[k].indexName) === -1) {
              echartsTypes.push(result.data[k].indexName);
            }
          }
          // console.log(echartsTypes)
          // 将不同的指标进行归类
          let echartsObj = {};
          for (var q in echartsTypes) {
            for (var w in result.data) {
              if (result.data[w].indexName == echartsTypes[q]) {
                echartsObj[echartsTypes[q]] = echartsObj[echartsTypes[q]] || [];
                echartsObj[echartsTypes[q]].push(result.data[w]);
              }
            }
          }
          // y轴
          if (echartsObj.power && echartsObj.usehour) {
            this.yNamel = "发电量(万kW.h)";
            this.yNamer = "利用小时数(h)";
            this.yNameFlag = 0;
          } else if (echartsObj.power && !echartsObj.usehour) {
            this.yNamel = "发电量(万kW.h)";
            this.yNamer = "";
            this.yNameFlag = 1;
          } else if (!echartsObj.power && echartsObj.usehour) {
            this.yNamel = "利用小时数(h)";
            this.yNamer = "";
            this.yNameFlag = 1;
          }
          if (echartsObj.power) {
            this.filterDataObj(
              echartsObj.power,
              "deviceType",
              this.equipTypeList,
              "bar",
              "发电量",
              this.yNameFlag,
              "万kW.h",
              "0"
            );
          }
          if (echartsObj.usehour) {
            this.filterDataObj(
              echartsObj.usehour,
              "deviceType",
              this.equipTypeList,
              "line",
              "利用小时数",
              this.yNameFlag,
              "h",
              "0"
            );
          }
          this.$nextTick(() => {
            this.$refs.multiBarBox.setEcharts(
              this.multiData.series,
              this.multiData.dataAxis
            );
          });
        }
      });
    },
    // 封装数据处理
    filterDataObj(
      acceptData,
      determineType,
      thanType,
      echartsType,
      nameParam,
      showYname,
      unit,
      clickCount
    ) {
      if (this.queryCondition.equipment == "total") {
        //当设备为全部时，只有一种柱状图和一种折线图
        this.multiData.series.push({
          type: echartsType,
          name: nameParam,
          barWidth: echartsType == "bar" ? "10px" : "",
          yAxisIndex: showYname == 0 ? (echartsType == "bar" ? 0 : 1) : 0,
          data: this.multiData.dataAxis.map(c => {
            let dataCol = acceptData.filter(t =>
              clickCount == "0"
                ? t.timeNum == c
                : t.boxtranscode.substring(t.boxtranscode.length - 4) == c
            );
            if (dataCol && dataCol.length > 0) {
              let filters = this.tableData.filter(t => t.timenum == c);
              if (filters.length > 0) {
                filters[0][nameParam == "发电量" ? "power" : "usehour"] =
                  dataCol[0].dataValue;
              }
              return dataCol[0].dataValue;
            } else return "--";
          })
        });
        this.tablecol.push({
          prop: nameParam == "发电量" ? "power" : "usehour",
          lable: nameParam + "(" + unit + ")",
          width: nameParam.length <= 2 ? "80" : ""
        });
      } else {
        var types = [];
        for (var i in acceptData) {
          if (types.indexOf(acceptData[i][determineType]) === -1) {
            types.push(acceptData[i][determineType]);
          }
        }
        //一个包含多个list的结果对象
        var obj = {};
        // 根据determineType生成多个数组
        for (var k in types) {
          for (var j in acceptData) {
            if (acceptData[j][determineType] == types[k]) {
              obj[types[k]] = obj[types[k]] || [];
              obj[types[k]].push(acceptData[j]);
            }
          }
        }
        let currentLiveArr = [];
        for (let b in obj) {
          //将对象转成数组
          currentLiveArr.push(obj[b]);
        }
        // 和类型列表做比对，转换
        for (let k = 0; k < currentLiveArr.length; k++) {
          let nameType = "";
          if (this.queryCondition.equipment == "total") {
            nameType = "";
          } else {
            for (let a = 0; a < thanType.length; a++) {
              if (thanType[a].value == currentLiveArr[k][0][determineType]) {
                nameType = thanType[a].name;
              }
            }
          }
          this.multiData.series.push({
            type: echartsType,
            name: nameType + nameParam,
            barWidth: echartsType == "bar" ? "10px" : "",
            yAxisIndex: showYname == 0 ? (echartsType == "bar" ? 0 : 1) : 0,
            data: this.multiData.dataAxis.map(c => {
              let dataCol = currentLiveArr[k].filter(t =>
                clickCount == "0"
                  ? t.timeNum == c
                  : t.boxtranscode.substring(t.boxtranscode.length - 4) == c
              );
              if (dataCol && dataCol.length > 0) {
                let filters = this.tableData.filter(t => t.timenum == c);
                if (filters.length > 0) {
                  filters[0][
                    nameParam == "发电量"
                      ? "power_" + nameType
                      : "usehour_" + nameType
                  ] = dataCol[0].dataValue;
                }
                return dataCol[0].dataValue;
              } else return "--";
            })
          });
          this.tablecol.push({
            prop:
              nameParam == "发电量"
                ? "power_" + nameType
                : "usehour_" + nameType,
            lable: nameType + nameParam + "(" + unit + ")",
            width: ""
          });
        }
      }
    },
    // 下钻事件
    enterNextEvent(val) {
      let clickParams = this.queryNeedParams().giveParam;
      clickParams = Object.assign(clickParams, { TimeNum: val });
      this.$fetchGet({
        url: "/IndexQuery/QueryListOne",
        params: clickParams
      }).then(res => {
        this.backYear = true;
        this.squareShow = true;
        let clickTime = clickParams.date.split("-");
        if(res.data.length==0){//如果没有数据，隐藏表格
            this.isShowTable=false;
        }
        if (res.data) {
          // x轴
          for (let s in res.data) {
            if (res.data[s].boxtranscode) {
              let clickXaixsData = res.data[s].boxtranscode.substring(
                res.data[s].boxtranscode.length - 4
              );
              this.multiData.dataAxis.push(clickXaixsData);
              if (
                this.tableData.filter(r => r.timenum == clickXaixsData)
                  .length == 0
              ) {
                if (this.queryCondition.dateType == "days") {
                  this.tableData.push({
                    time: clickTime[0] + "-" + clickTime[1] + "-" + val,
                    timenum: clickXaixsData
                  });
                  this.tableData = this.tableData.sort(this.obgSort("timenum"));
                } else if (this.queryCondition.dateType == "months") {
                  this.tableData.push({
                    time: clickTime[0] + "-" + val,
                    timenum: clickXaixsData
                  });
                  this.tableData = this.tableData.sort(this.obgSort("timenum"));
                } else {
                  this.tableData.push({
                    time: val,
                    timenum: clickXaixsData
                  });
                  this.tableData = this.tableData.sort(this.obgSort("timenum"));
                }
              }
            }
          }
          this.multiData.dataAxis = [
            ...new Set(this.multiData.dataAxis.sort())
          ];
          // y轴
          // 当前的指标类型有几种
          var echartsTypes = [];
          for (var k in res.data) {
            if (echartsTypes.indexOf(res.data[k].indexName) === -1) {
              echartsTypes.push(res.data[k].indexName);
            }
          }
          // 将不同的指标进行归类
          let echartsObj = {};
          for (var q in echartsTypes) {
            for (var w in res.data) {
              if (res.data[w].indexName == echartsTypes[q]) {
                echartsObj[echartsTypes[q]] = echartsObj[echartsTypes[q]] || [];
                echartsObj[echartsTypes[q]].push(res.data[w]);
              }
            }
          }
          // y轴
          if (echartsObj.power && echartsObj.usehour) {
            this.yNamel = "发电量(万kW.h)";
            this.yNamer = "利用小时数(h)";
            this.yNameFlag = 0;
          } else if (echartsObj.power && !echartsObj.usehour) {
            this.yNamel = "发电量(万kW.h)";
            this.yNamer = "";
            this.yNameFlag = 1;
          } else if (!echartsObj.power && echartsObj.usehour) {
            this.yNamel = "利用小时数(h)";
            this.yNamer = "";
            this.yNameFlag = 1;
          }
          if (echartsObj.power) {
            this.filterDataObj(
              echartsObj.power,
              "deviceType",
              this.equipTypeList,
              "bar",
              "发电量",
              this.yNameFlag,
              "万kW.h",
              "1"
            );
          }
          if (echartsObj.usehour) {
            this.filterDataObj(
              echartsObj.usehour,
              "deviceType",
              this.equipTypeList,
              "line",
              "利用小时数",
              this.yNameFlag,
              "h",
              "1"
            );
          }
          this.$nextTick(() => {
            this.$refs.multiBarBox.setEcharts(
              this.multiData.series,
              this.multiData.dataAxis
            );
          });
        }
        this.clickCount = "2";
      });

      this.backYear = false;
    },
    // 返回上一级
    backForward() {
      this.clickCount = "";
      this.backYear = false;
      this.squareShow = false;
      this.queryMultiBtn();
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
<style lang="scss">
.anaysis-container {
  .el-select {
        // width: 100%;
        .el-input{
            display: inline-block !important;
            top: 0 !important;
        }
    }
  .el-radio-button__inner{
    height: 42px;
    padding: 12px 20px;
  }
  .el-select .el-select__tags .el-tag {
    border: none;
    color: #1bac6b;
  }
  // .el-select .el-select__tags > span > span:first-child {
  //   left: 5px;
  //   top: -15px;
  // }
  // .el-select .el-select__tags > span > span:nth-child(2) {
  //   right: 14px;
  //   top: -15px;
  // }

  .el-select__tags {
    max-width: 100% !important;
  }
  .el-input--suffix .el-input__inner {
    color: #1bac6b;
    // background-color: #fff;
    border-color: #e4e4e4 !important
  }
  .el-select .el-select__tags .el-tag--info.el-tag--small > span:first-child{
      left: 5px;
  }
  .el-select-dropdown.is-multiple .el-select-dropdown__item.selected.hover{
    padding: 0 20px;
  }
  .el-select__tags{
    position: relative;
    &>span{
      span:first-child{
        position: absolute;
        left: 5px;
        top: 3px;
      }
      span:nth-of-type(2){
        position: absolute;
        left: 100px;
        top: 3px;

      }
    }
  }
  // .el-select__tags>span>span:nth-of-type(2) .el-select__tags-text{
  //   // padding-left: 100px;
  //   // box-sizing: border-box;
  //   left: 60px;
  // }
  
}
</style>
<style scoped lang="scss">
.multify-box-index {
  overflow: auto;
}
.anaysis-container {
  padding: 20px;
  background: #fff;
  .search-conditions {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    // margin-bottom: 20px;
    flex-wrap: wrap;
    .date-type {
      margin-right: 15px;
      margin-bottom: 15px;
    }

    .picker,
    .normal-select {
      margin-right: 28px;
      margin-bottom: 15px;
    }
    .selStationBox {
      margin: -14px 91px 0 -3px;
      width: 957px;
      display: flex;
      justify-content: space-between;
    }
  }

  .chart-wrapper {
    .bar-box {
      padding: 20px 0 0;
      width: 100%;
      height: 558px;
    }
    .title_box {
      border-bottom: 1px solid #1bac6b;

      .echartsTitle {
        margin: 38px 0 8px;
        height: 24px;
        background: url("../../../assets/img/echartsbar.png") no-repeat;

        p {
          margin-left: 32px;
           background-image: linear-gradient(to right, #19b197, #1da63b) !important;
          // background-image: -webkit-linear-gradient(
          //   top,
          //   #00e7ff 1%,
          //   #00b5ff 63%,
          //   #0083ff 100%
          // );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-size: 20px;
          line-height: 24px;
          color: #1bac6b;
          font-weight: normal;
          font-family: MicrosoftYaHei;
        }
      }
      .tableTitle {
        background: url("../../../assets/img/list.png") no-repeat;
      }
    }
  }
}
.title-font {
  color: #666 !important;
  font-size: 14px;
  margin-top: -18px;
  margin-left: -2px;
}
.square-box {
  
  margin-left: 20px;
}
.back {
  position: absolute;
  top: 56px;
  right: 64px;
  z-index: 1000;
  cursor: pointer;
}
</style>