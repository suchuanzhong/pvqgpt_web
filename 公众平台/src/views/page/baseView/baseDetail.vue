<template>
  <div>
    <div class="base-introduce">
      <SubTitle
        :text="'基地介绍'"
        en="Base introduction"
        class="inlineBlock active"
      ></SubTitle>
      <div class="zui-row">
        <div class="zui-col-left" style="padding-top:0">
          <el-image
            style="width: 100%; height: 480px;"
            :src="baseInfo.showPicture"
            :preview-src-list="[baseInfo.showPicture]"
          >
          </el-image>
        </div>
        <div class="zui-col-right base-html-bg">
          <el-scrollbar style="height:380px" class="scroller-y">
            <div v-html="baseInfo.synopsis" class="base-html"></div>
          </el-scrollbar>
        </div>
      </div>
    </div>
    <div class="zui-row" v-if="refrashData">
      <div class="zui-col-left">
        <SubTitle
          :text="'年辐射量'"
          en="Annual radiation dose"
          class="inlineBlock active"
        ></SubTitle>
        <echartBarHorizontal
          ids="yearRadiation"
          unit="(kWh/m²)"
          style="height:460px"
          :dataArr="echartsAllData.radiation.dataArr"
        ></echartBarHorizontal>
      </div>
      <div class="zui-col-right">
        <SubTitle
          :text="'年发电量'"
          en="Annual energy efficiency ratio"
          class="inlineBlock active"
        ></SubTitle>
        <echartBarHorizontal
          ids="yearEnergy"
          unit="(万kWh)"
          :theme="['#1da63b', '#19b197']"
          style="height:460px"
          :dataArr="echartsAllData.powerGeneration.dataArr"
        ></echartBarHorizontal>
      </div>
      <div class="zui-col-left">
        <SubTitle
          :text="'年能效比'"
          en="Annual radiation dose"
          class="inlineBlock active"
        ></SubTitle>
        <echartsPieTime
          ids="pieyear"
          style="height:460px;"
          :dataArr="echartsAllData.efficiency.dataArr"
        ></echartsPieTime>
      </div>
      <div class="zui-col-right">
        <SubTitle
          :text="'年产值'"
          en="Annual output value"
          class="inlineBlock active"
        ></SubTitle>
        <div>
          <echartsBar
            style="height:460px;"
            :dataArr="echartsAllData.outputValue.dataArr"
          ></echartsBar>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    SubTitle: resolve => {
      require(["@/components/public/subTitle.vue"], resolve);
    },
    echartsBar: resolve => {
      require(["@/components/public/echarts/echartBar.vue"], resolve);
    },
    echartBarHorizontal: resolve => {
      require(["@/components/public/echarts/echartBarHorizontal.vue"], resolve);
    },
    echartsPieTime: resolve => {
      require(["@/components/public/echarts/echartPieTime.vue"], resolve);
    }
  },
  filters: {},
  data() {
    return {
      refrashData: true,
      baseForm: {
        BatchName: "",
        Dataid: ""
      },
      echartsAllData: {
        radiation: {
          data: []
        },
        powerGeneration: {
          data: []
        },
        outputValue: {
          data: []
        },
        efficiency: {
          data: []
        }
      },
      baseInfo: {},
      batchOption: [
        {
          value: 0,
          label: "批次一"
        }
      ],
      markerData: [{ basename: "泗洪光伏基地", x: 117.944303, y: 33.251485 }]
    };
  },
  methods: {
    //地图电站列表
    getMapBaseList() {
      this.$fetch("/MtrBase/Query", {
        Basename: this.$route.params.id
      }).then(res => {
        this.markerData = res.data;
      });
    },
    getBaseDetail() {
      this.baseInfo = {};
      this.$fetch("/MtrBase/" + this.$route.params.id).then(res => {
        this.baseInfo = res.data;
      });
    },
    getQueryData() {
      this.refrashData = false;
      this.echartsAllData = {
        radiation: {},
        powerGeneration: {},
        outputValue: {},
        efficiency: {}
      };
      this.$fetch("/LtrStation/GetLtrStation", {
        Baseid: this.baseForm.Dataid
      })
        .then(res => {
          let Data = res.data;

          // let scale = [];
          for (var name in Data) {
            switch (name) {
              case "radiation":
                this.initYearListData(
                  "radiation",
                  this.echartsAllData,
                  Data[name],
                  "radiation",
                  "stationName"
                );
                break;
              case "powergeneration":
                this.initYearListData(
                  "powerGeneration",
                  this.echartsAllData,
                  Data[name],
                  "powergeneration",
                  "stationName"
                );
                break;
              case "outputvalue":
                this.initYearListData(
                  "outputValue",
                  this.echartsAllData,
                  Data[name],
                  "outputvalue",
                  "stationName"
                );
                break;
              case "efficiency":
                this.initYearPieData(
                  "efficiency",
                  this.echartsAllData,
                  Data[name],
                  "efficiency",
                  "stationName"
                );
                break;
            }
          }
          // console.log("echartsAllData", this.echartsAllData);
          this.refrashData = true;
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "数据请求失败，请重试"
          });
          this.refrashData = true;
        });
    },

    initYearListData(name, data, Data, valueName, textName = "basename") {
      var yearData = [];
      data[name].dataArr = [];
      if (Data && Data.length > 0) {
        Data.forEach(item => {
          var idx = yearData.indexOf(item.year);
          if (idx < 0) {
            yearData.push(item.year);
            data[name].dataArr.push({
              year: item.year.toString(),
              data: [],
              nameList: []
            });
            idx = yearData.length - 1;
          }
          data[name].dataArr[idx].data.push(item[valueName]);
          data[name].dataArr[idx].nameList.push(item[textName]);
        });
      }
    },
    initYearPieData(name, data, Data, valueName, textName = "basename") {
      var yearData = [];
      data[name].dataArr = [];
      if (Data && Data.length > 0) {
        Data.forEach(item => {
          var idx = yearData.indexOf(item.year);
          if (idx < 0) {
            yearData.push(item.year);
            data[name].dataArr.push({
              year: item.year.toString(),
              data: []
            });
            idx = yearData.length - 1;
          }
          data[name].dataArr[idx].data.push({
            name: item[textName],
            value: item[valueName],
            unit: "%"
          });
        });
      }
    }
  },
  watch: {
    $route(data) {
      this.baseForm.Dataid = data.params.id;
      this.baseForm.BatchName = data.query.BatchName || "";
      this.getQueryData();
      this.getBaseDetail();
    }
  },
  mounted() {
    this.baseForm.Dataid = this.$route.params.id;
    this.baseForm.BatchName = this.$route.query.BatchName || "";
    this.getBaseDetail();
    this.getQueryData();
  }
};
</script>
<style lang="scss" scoped>
.zui-main {
  padding: 50px 0;
  min-height: 263px;
}
.inlineBlock {
  margin-bottom: 20px;
}

//数字可视化
.zui-map {
  height: 680px;
  background: #e4e4e4;
}
.zui-row {
  width: 100%;
  &::after {
    content: "";
    display: block;
    clear: both;
  }
  .zui-col-left {
    width: 670px;
    float: left;
    padding-top: 50px;
  }
  .zui-col-right {
    width: 730px;
    padding-top: 50px;
    float: left;
    padding-left: 50px;
    box-sizing: border-box;
  }
}
.baseType {
  padding: 27px 0 5px;
  background: -moz-linear-gradient(right, #1da63b 0%, #19b197 100%);
  background: -webkit-gradient(
    linear,
    top left,
    top right,
    color-stop(0%, #1da63b),
    color-stop(100%, #19b197)
  );
  background: -webkit-linear-gradient(right, #1da63b 0%, #19b197 100%);
  background: -o-linear-gradient(right, #1da63b 0%, #19b197 100%);
  background: -ms-linear-gradient(right, #1da63b 0%, #19b197 100%);
  background: linear-gradient(to right, #1da63b 0%, #19b197 100%);
}
</style>
<style lang="scss">
.base-html-bg {
  background: #f8f8f8;
  padding: 50px 0 50px 50px;
  box-sizing: border-box;
}
.base-html {
  p {
    font-size: 16px;
    line-height: 2em;
  }
}
.baseType {
  .el-form-item__label {
    color: #ffffff;
  }
  .el-select:hover .el-input__inner,
  .el-input.is-active .el-input__inner,
  .el-input__inner:focus,
  .el-select .el-input.is-focus .el-input__inner {
    border-color: #ffffff;
  }
  .el-input__inner {
    background: transparent;
    border-color: #ffffff;
    color: #ffffff;
  }
  .el-select .el-input .el-select__caret {
    color: #ffffff;
  }
  ::-webkit-input-placeholder {
    /*Webkit browsers*/
    color: #ffffff;
  }
  :-moz-placeholder {
    /*Mozilla Firefox 4 to 8*/
    color: #ffffff;
  }
  ::moz-placeholder {
    /*Mozilla Firefox 19+*/
    color: #ffffff;
  }
  :-ms-input-placeholder {
    /*Internet Explorer 10+*/
    color: #ffffff;
  }
}
</style>
