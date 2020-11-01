<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    @close="close"
    :width="bodyWidth"
    class="overflow_dialog"
    top="7vh"
  >
    <div v-if="refresh">
      <el-radio-group
        v-model="radiogroupval1"
        style="position: relative;bottom: 1px"
      >
        <el-radio-button label="批次"></el-radio-button>
      </el-radio-group>
      <el-select
        v-model="formbase"
        placeholder="请选择"
        @change="changePc"
        :style="{ width: '200px', margin: '0 10px 10px 10px' }"
      >
        <el-option
          v-for="(item, idx) in basePcOption"
          :label="item.name"
          :value="item.name"
          :key="idx"
        ></el-option>
      </el-select>
      <el-radio-group
        v-model="radiogroupval2"
        style="position: relative;bottom: 1px"
      >
        <el-radio-button label="基地"></el-radio-button>
      </el-radio-group>
      <el-select
        v-model="formbaseid"
        placeholder="请选择"
        @change="changePC2"
        :style="{ width: '200px', margin: '0 10px 10px 10px' }"
      >
        <el-option
          v-for="(item, idx) in baseJdOption"
          :label="item.name"
          :value="item.id"
          :key="idx"
        ></el-option>
      </el-select>
      <div id="basicInfo">
        <contentBox :title="baseName">
          <el-row class="bg_box" slot="content" style="margin: 20px 0">
            <el-col :span="7" class="pieBox">
              <div class="pie_text">
                <span class="" style="color:#666">总装机</span><br />
                <label style="color:#000;font-family: 'euro_regular'!important;"
                  >{{ capTotal }}MW</label
                >
              </div>
              <echartsPie
                ref="allpie"
                style="height:290px;"
                :data="capacityData"
              ></echartsPie>
            </el-col>
            <el-col :span="17" class="cardList">
              <el-row>
                <el-col
                  :xl="8"
                  :lg="12"
                  v-for="(i, index) in cardList"
                  :key="index"
                >
                  <frameTextHome
                    :title="i.title"
                    :imgName="i.imgName"
                    :unit="i.unit"
                    :value="baseinfo[i.key]"
                    :bgColor="i.bgColor"
                    :type="i.type"
                  ></frameTextHome>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </contentBox>
        <el-row class="station" :gutter="40">
          <el-col
            :xl="12"
            :lg="24"
            v-for="(item, j) in stationList"
            :key="j"
            style="margin-bottom: 20px"
          >
            <contentBox :id="'content' + j" :title="item.projectname">
              <div slot="content">
                <div class="station">
                  <div class="labelList">
                    <stationText
                      v-for="(i, index) in labelList"
                      :key="index"
                      :title="i.title"
                      :unit="i.unit"
                      :value="item[i.key]"
                      :type="i.type"
                    ></stationText>
                  </div>
                </div>
                <el-row
                  type="flex"
                  justify="space-between"
                  style="margin-top:20px;"
                >
                  <el-col :span="10">
                    <singleTitle title="项目组件统计" subTitle=""></singleTitle>
                    <el-row
                      type="flex"
                      justify="space-between"
                      class="pie_wrapper"
                    >
                      <el-col :span="11">
                        <doublePie
                          :ids="'doublePie' + j"
                          :data1="item.pvstringData1"
                          :data2="item.pvstringData2"
                        ></doublePie>
                      </el-col>
                      <el-col :span="10" class="invest_legend_wrapper">
                        <div class="legendBox">
                          <div
                            v-for="(legend, index) in pvstringLegend"
                            :key="index"
                          >
                            <div
                              class="pvstring_row single_legend"
                              v-if="item[legend[0].key] != null"
                            >
                              <i
                                class="legend-color"
                                :style="'border-color:' + legend[0].color"
                              ></i>
                              <stationText
                                v-for="(i, index2) in legend"
                                :key="index2"
                                :title="i.title"
                                :unit="i.unit"
                                :value="
                                  i.unit ? item[i.key] : item[i.key] + '%'
                                "
                                :className="i.className"
                              ></stationText>
                            </div>
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="10">
                    <singleTitle
                      title="项目逆变器统计"
                      subTitle=""
                    ></singleTitle>
                    <el-row
                      type="flex"
                      justify="space-between"
                      class="pie_wrapper"
                    >
                      <el-col :span="14">
                        <doublePie1
                          :ids="'doublePie0' + j"
                          :data1="item.investData1"
                          :data2="item.investData2"
                        ></doublePie1>
                      </el-col>
                      <el-col :span="7" class="invest_legend_wrapper">
                        <div class="legendBox">
                          <div v-for="(i, index) in investLegend" :key="index">
                            <div
                              v-if="item[i.key] != null"
                              class="single_legend"
                            >
                              <i
                                class="legend-color"
                                :style="'border-color:' + i.color"
                              ></i>
                              <stationText
                                :title="i.title"
                                :unit="i.unit"
                                :value="item[i.key]"
                                :className="i.className"
                              ></stationText>
                            </div>
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </div>
            </contentBox>
          </el-col>
        </el-row>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import frameTextHome from "@/components/homeModule/frameTextHome";
import stationText from "@/components/homeModule/stationText";
import echartsPie from "@/components/charts/echartsPie";
import doublePie from "@/components/charts/doublePie";
import doublePie1 from "@/components/charts/doublePie1";
// import ringPie from '@/components/charts/ringPie'
import singleTitle from "@/components/homeModule/singleTitle";
import contentBox from "@/components/homeModule/contentBox";
export default {
  props: {
    title: {
      default: "基地信息"
    }
    // baseName: {
    //     default:'XXX基地'
    // }
  },
  components: {
    frameTextHome,
    stationText,
    echartsPie,
    doublePie,
    doublePie1,
    // ringPie,
    singleTitle,
    contentBox
  },
  data() {
    return {
      radiogroupval1: "批次",
      radiogroupval2: "基地",
      baseName: "XXX基地",
      formbase: "",
      formbaseid: "",
      refresh: true,
      dialogVisible: true,
      bodyWidth: "100%",
      cardList: [
        {
          title: "批次",
          key: "batchname",
          imgName: "base_pc",
          bgColor: "b_green",
          type: "text"
        },
        {
          title: "并网时间",
          key: "gridtime",
          imgName: "base_calendar",
          bgColor: "b_green",
          type: "date"
        },
        {
          title: "年均总辐射（设计值）",
          key: "zfs",
          imgName: "base_hour",
          unit: "kW.h/m²",
          bgColor: "b_blue"
        },
        {
          title: "建设时间",
          key: "buildtime",
          imgName: "base_calendar",
          bgColor: "b_green",
          type: "date"
        },
        {
          title: "平均等效利用时数（设计值）",
          key: "lyxss",
          imgName: "base_hour",
          unit: "h",
          bgColor: "b_blue"
        },
        {
          title: "年平均日照时数（设计值）",
          key: "rzss",
          imgName: "base_hour",
          unit: "h",
          bgColor: "b_blue"
        }
      ],
      labelList: [
        { title: "装机容量", key: "capacity", unit: "MW", type: "number" },
        { title: "上网电价", key: "price", unit: "元/kW.h", type: "number" },
        { title: "建设时间", key: "buildtime", type: "date" },
        { title: "并网时间", key: "nettime", type: "date" },
        { title: "业主单位", key: "ownercode", type: "text" }
      ],
      pvstringLegend: [
        [
          {
            title: "单晶组件",
            key: "danjnum",
            unit: "块",
            className: "f_green",
            color: "#32eac5"
          }
        ],
        [
          {
            title: "单晶组件-安装容量",
            key: "danjcapacity",
            unit: "MW",
            className: "f_lakeBlue",
            color: "#00efff"
          }
        ],
        [
          {
            title: "多晶组件",
            key: "duojnum",
            unit: "个",
            className: "f_blue",
            color: "#00c6ff"
          }
          // { title: "标称转换效率", key: 'duojeffect', className: 'f_blue' }
        ],
        [
          {
            title: "多晶组件-安装容量",
            key: "duojcapacity",
            unit: "MW",
            className: "f_orange",
            color: "#ff8400"
          }
        ]
      ],
      investLegend: [
        {
          title: "集中式逆变器",
          key: "invertnuM1",
          unit: "台",
          className: "f_green",
          color: "#2dc076"
        },
        {
          title: "集中式逆变器-安装容量",
          key: "invertcapacitY1",
          unit: "MW",
          className: "f_lakeBlue",
          color: "#00efff"
        },
        {
          title: "集散式逆变器",
          key: "invertnuM2",
          unit: "台",
          className: "f_blue",
          color: "#0072ff"
        },
        {
          title: "集散式逆变器-安装容量",
          key: "invertcapacitY2",
          unit: "MW",
          className: "f_orange",
          color: "#fe7e00"
        },
        {
          title: "组串式逆变器",
          key: "invertnuM3",
          unit: "台",
          className: "f_grey_n",
          color: "#b6caf5"
        },
        {
          title: "组串式逆变器-安装容量",
          key: "invertcapacitY3",
          unit: "MW",
          className: "f_purple",
          color: "#978ffd"
        }
      ],
      capTotal: "",
      baseinfo: {},
      stationList: [],
      capacityData: [],
      isShow: true,
      basePcOption: [],
      baseJdOption: []
    };
  },
  mounted() {
    this.getselectinfo();
    // this.getBaseInfo();
    var w = document.getElementById("app").clientWidth;
    // console.log('A',w)
    w = w == 1903 ? 1920 : w;
    this.bodyWidth = 1200 < w && w < 1903 ? "1200px" : w + "px";
    window.onresize = () => {
      w = document.getElementById("app").clientWidth;
      w = w == 1903 ? 1920 : w;
      this.bodyWidth = 1200 < w && w < 1903 ? "1200px" : w + "px";
      // this.refresh=false;
      setTimeout(() => {
        this.refresh = true;
      }, 10);
    };
  },
  methods: {
    getselectinfo() {
      this.$fetch("/MtrBase/GetBatchBaseTree").then(res => {
        if (res.data && res.data.length > 0) {
          this.basePcOption = res.data;
          this.baseName = "XXX基地";
          this.formbase = res[0].name;
          this.formbaseid = res[0].childTreeNode[0].name;
          this.getBaseInfo(res[0].childTreeNode[0].id);
        }
      });
    },
    getBaseInfo(baseNumber) {
      var _this = this;
      this.$fetch("/MtrBaseChildPages/GetBaseInfo?baseId=" + baseNumber).then( res => {
          let batcharr = ["第一批", "第二批", "第三批","第三批奖励"];
          var data = res.data;
          data.baseinfo[0].batchname = batcharr[data.baseinfo[0].batchname - 1];
          _this.baseinfo = data.baseinfo[0];
          console.log(_this.baseinfo)
          _this.baseName = data.baseinfo[0].basename;
          _this.capTotal = 0;
          data.station.forEach(item => {
            _this.$set(item, "isTable", true);
            _this.capTotal += item.capacity;
            _this.capacityData.push({
              name: item.projectname,
              value: item.capacity
            });
            _this.isShow = false;
            _this.$nextTick(() => {
              _this.isShow = true;
            });

            item.investData1 = [];
            item.investData2 = [];
            _this.investLegend.forEach((i, index) => {
              item[index % 2 ? "investData2" : "investData1"].push({
                name: i.title,
                value: item[i.key]
              });
            });
            item.pvstringData1 = [];
            item.pvstringData2 = [];
            _this.pvstringLegend.forEach((i, index) => {
              item[index % 2 ? "pvstringData2" : "pvstringData1"].push({
                name: i[0].title,
                value: item[i[0].key]
              });
            });
          });
          _this.stationList = data.station;
          _this.$nextTick(() => {
            _this.$refs.allpie.initEcharts();
          });
        }
      );
    },
    changePc() {
      let basepc = this.formbase;
      this.baseJdOption = [];
      this.formbaseid = "";
      for (let i = 0; i < this.basePcOption.length; i++) {
        if (basepc == this.basePcOption[i].name) {
          this.baseJdOption = this.basePcOption[i].childTreeNode;
        }
      }
    },
    changePC2() {
      let baseId = this.formbaseid;
      this.capacityData = [];
      this.stationList = [];
      this.getBaseInfo(baseId);
    },
    close() {
      this.$parent.dialogName = null;
    }
  }
};
</script>

<style lang="scss">
.overflow_dialog{
    .el-select {
        // width: 100%;
        .el-input{
            display: inline-block !important;
            top: 0 !important;
        }
    }
  }
.el-dialog {
  background-color: #fff !important;

  .el-dialog__header .el-dialog__title {
    color: #303133;
  }
  .el-dialog__body {
    padding: 30px 70px !important;
  }
}
.overflow_dialog .el-dialog__header {
  width: 100%;
  position: absolute;
  z-index: 3;
}

/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
// ::-webkit-scrollbar {
//   width: 6px; /*滚动条宽度*/
//    height: 3px; /*滚动条高度*/
//   // background-color: white;
// }

// /*定义滑块 内阴影+圆角*/
// ::-webkit-scrollbar-thumb {
//   -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
//   background-color: rgb(221, 222, 224); /*滚动条的背景颜色*/
// }
#basicInfo {
  .el-select {
    border: 1px solid #8f9dae;
    border-radius: 10px;
  }
  .el-select,
  .el-input__inner {
    width: 54px;
    height: 30px;
    float: right;
  }
  .el-select-dropdown {
    background-color: #1f395b;
  }
  .box_rec {
    margin: 40px 0 0 40px;
    p {
      color: #666 !important;
      background-color: #fff;
    }
  }
  // 饼图legend样式
  .legendBox {
    width: 100%;
    .single_legend {
      margin-top: 14px;
      position: relative;
      .legend-color {
        border: 1px solid #fff;
        border-radius: 3px;
        width: 15px;
        height: 5px;
        display: inline-block;
        margin: 0 10px;
        position: absolute;
        left: -40px;
        top: 40%;
      }
      .numcls {
        height: auto !important;
      }
    }
    .stationText {
      // color: #fff;
      padding: 0;
      font-size: 14px;
      .num {
        font-size: 20px;
      }
      label {
        font-size: 12px;
      }
    }
    .pvstring_row {
      display: flex;
      & > .stationText {
        flex: 1;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.italic_title {
  text-align: center;
  position: absolute;
  width: 45%;
  font-style: italic;
  font-family: "MStiffHeiPRC-Bold";
  color: #00baff;
}
.bg_box {
  padding: 0;
  background-color: #fff;
  // background: url('/img/index/base_box1.png') no-repeat;
  // background-size: 100% 100%;
  position: relative;
  .italic_title {
    font-size: 24px;
    width: 40%;
    top: 5%;
    left: 40px;
  }
  .cardList {
    margin-bottom: 60px;
    display: flex;
    flex-wrap: wrap;
    .box_rec {
      width: 340px;
      padding: 43px 0;
    }
  }
  .pieBox {
    position: relative;
    .pie_text {
      position: absolute;
      text-align: center;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      span {
        font-size: 16px;
        // font-weight: 600;
      }
      label {
        font-size: 14px;
      }
    }
  }
}
.pie_wrapper {
  height: 320px;
  overflow: hidden;
}
.station {
  position: relative;
  z-index: 9;
  margin-top: 10px;
  .station_box {
    width: 49%;
    padding: 4% 3% 3%;
    background: url("/img/index/base_box2.png") no-repeat;
    background-size: 100% 100%;
    margin-top: 30px;
    position: relative;
    .italic_title {
      font-size: 20px;
      top: 3%;
      left: 6%;
    }
    .pie_wrapper {
      height: 300px;
      .invest_legend_wrapper {
        display: flex;
        align-items: center;
      }
    }
  }
  .station_box:nth-child(2n + 1) {
    margin-right: 2%;
  }
  .labelList {
    color: #666;
    display: flex;
    width: 100%;
    & > div {
      // flex: 1;
      width: 150px;
      border-right: 1px dotted rgba(255, 255, 255, 0.2);
    }
    & > div:first-child {
      padding: 0;
    }
    & > div:last-child {
      flex: 1;
      border: none;
    }
  }
}
</style>
