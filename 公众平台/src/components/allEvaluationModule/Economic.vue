<template>
  <div class="economic_benefits">
    <div class="year-select">
      <el-radio-group
        v-model="yearSelect"
        style="position: relative;bottom: 1px"
      >
        <el-radio-button label="年"></el-radio-button>
      </el-radio-group>
      <el-date-picker
        v-model="detailDate"
        @change="dateChange"
        type="year"
        style="margin-left: 10px"
        value-format="yyyy"
        placeholder="选择年"
      >
      </el-date-picker>
    </div>
    <el-row type="flex" justify="space-between">
      <el-col
        :span="11"
        v-for="(i, index) in cardList"
        :key="index"
        class="econ_cardbox"
      >
        <frameTextHome
          :title="i.title"
          :imgName="i.imgName"
          :unit="i.unit"
          :value="economicData[i.key]"
          :bgColor="i.bgColor"
          :decimals="i.decimals"
        ></frameTextHome>
      </el-col>
    </el-row>
    <p class="pie_title">各批次年上网电量和年上网电量产值分析</p>
    <el-row>
      <el-col :span="16">
        <economicPie
          style="height:300px;"
          :data1="yswdlData1"
          :data2="yswdlData2"
          v-if="yswdlData1.length"
        ></economicPie>
        <p class="mark">注：内环为年上网电量；外环为年上网电量产值</p>
      </el-col>
      <el-col :span="7" :offset="1">
        <div class="legendBox econmic">
          <div
            v-for="(i, index) in yswdlData1"
            :key="index"
            class="single_legend"
          >
            <i
              class="legend-color"
              :style="'border-color:' + colorList[index]"
            ></i>
            <stationText
              :title="i.name"
              unit="万kW.h"
              :value="i.value"
              :className="classNameList[index]"
            ></stationText>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import frameTextHome from "@/components/homeModule/frameTextHome";
import stationText from "@/components/homeModule/stationText";
import economicPie from "@/components/charts/economicPie";

export default {
  components: {
    stationText,
    frameTextHome,
    economicPie
  },
  data() {
    return {
      value5: "",
      cardList: [
        {
          title: "年上网电量",
          key: "totalelEctricity",
          imgName: "base_pc",
          unit: "亿kW.h",
          bgColor: "b_blue",
          decimals: 2
        },
        {
          title: "年上网电量产值",
          key: "totalelOutputAalue",
          imgName: "base_calendar",
          unit: "万元",
          bgColor: "b_green",
          decimals: 2
        }
      ],
      yswdlData1: [], //年上网电量
      yswdlData2: [], //年上网电量产值
      colorList: ["#00c6ff", "#32eac5", "#7487ae", "#ff8400", "#d466f9"],
      classNameList: ["f_blue", "f_green", "f_grey", "f_orange_g", "f_purple"],
      economicData: [],
      yearSelect: "年",
      detailDate: new Date().toLocaleDateString()
    };
  },
  mounted() {
    this.detailDate = this.$moment().format("YYYY");
    // this.initEconomicData(this.$moment().format("YYYY-MM-DD"));
    this.initEconomicData(this.detailDate);
  },
  methods: {
    initEconomicData(dateTime) {
      this.economicData = [];
      this.yswdlData2 = [];
      this.yswdlData1 = [];
      this.$fetch("/MtrBaseChildPages/GetEconomics?year=" + dateTime).then(
        res => {
          this.economicData = res.data;
          for (let i = 0; i < res.data.batchArray.length; i++) {
            this.yswdlData1.push({
              name:
                res.data.batchArray[i] +
                "(" +
                (res.data.priceArray[i] ? res.data.priceArray[i] : "--") +
                "元/kW.h）",
              value:
                res.data.yearPowerArray[i] == undefined ? 0 : res.data.yearPowerArray[i]
            });
            this.yswdlData2.push({
              name: res.data.batchArray[i],
              value:
                res.data.outputAalueArray[i] == undefined
                  ? 0
                  : res.data.outputAalueArray[i],
              itemStyle: {
                color: "#00efff"
              }
            });
          }
        }
      );
    },
    dateChange() {
      this.initEconomicData(this.detailDate);
    }
  }
};
</script>
<style lang="scss">
.economic_benefits {
  padding: 45px 0 0 25px;
  box-sizing: border-box;

  .year-select {
    margin-bottom: 20px;
  }

  .econ_cardbox {
    width: 340px;
    margin-right: 30px;
  }

  .pie_title {
    font-size: 18px;
    text-align: center;
    margin: 60px 0 40px;
    color: #666;
  }

  .mark {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.4);
  }
  .el-col-offset-1 {
    padding-left: 4.16667%;
    margin-left: 0;
  }
  .el-col-7 {
    overflow-x: hidden;
    overflow-y: auto;
    max-height: 400px;
  }
}

// 饼图legend样式
.legendBox {
  .single_legend {
    margin-top: 26px;
    position: relative;

    .legend-color {
      border: 1px solid #fff;
      border-radius: 3px;
      width: 15px;
      height: 5px;
      display: inline-block;
      margin: 0 10px;
      position: absolute;
      left: -20px;
      top: 40%;
    }
  }

  &.econmic {
    .stationText {
      color: #000;
      p {
        white-space: nowrap;
      }
    }
  }

  .stationText {
    font-size: 14px;

    .num {
      font-size: 20px;
    }
  }
}
</style>
