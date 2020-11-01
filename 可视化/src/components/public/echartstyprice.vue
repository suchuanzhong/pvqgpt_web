<template>
  <div :id="ids" class="barHeight"></div>
</template>
<script>
// import EchartOption from "@/utils/initEcharts";
export default {
  props: {
    ids: {
      default: "LightSensors"
    },
    legend: {
      default: function() {
        return ["上网电价", "度电成本"];
      }
    },
    OneData: {
      default: function() {
        return [10, 30,22,23];
      }
    },
    TwoData: {
      default: function() {
        return [10, 20,12,16];
      }
    },
    xAData: {
      default: function() {
        return ["类目120", "类目220","类目051", "类目250"];
      }
    },
    theme: {
      default: function() {
        return ["#2bdee5", "#00e862"];
      }
    },
    theme2: {
      default: function() {
        return ["#005a77", "#027a76"];
      }
    },
    max: {
      default: ""
    },
    title: {
      default: ""
    },
    barWidth: {
      default: 15
    }
  },
  data() {
    return {};
  },
  mounted() {
    this.$nextTick(() => {
      this.drawsChart();
    })
  },

  methods: {
    drawsChart(series) {
      let echarts = this.$echarts;
      this.mychart = echarts.init(document.getElementById(this.ids));
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        title: {
          // text: 'Sales Revenue of CAN-LAX 2016-2017',
          textStyle: {
            fontSize: 14
          }
        },
        // title: EchartOption.title(this.title),
        legend: {
          data: ["上网电价", "度电成本"],
           icon:"circle",
          top: "2%",
          textStyle: {
            color: "#82c2eb"
          },
          itemWidth: 6,
          itemHeight: 6
        },
        grid: {
          top: "16%",
          left: "6%",
          right: "2%",
          bottom: "16%",
          containLabel: true,
          show: false // 网格边框是否显示，上和右边框
        },
        xAxis: {
          type: "category",
          boundaryGap: true, // 坐标轴两边留白
          axisLabel: {
            textStyle: {
              fontSize: 12,
              color: "#82c2eb"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#023f66",
              opacity: 0.8,
              width: 1
            }
          },
          axisTick: {
            show: false
          },
          data: this.xAData
        },
        yAxis: [
          // 双y坐标轴
          {
            name: "元kWh",
            type: "value",
            axisLabel: {
              formatter: "{value}",
              color: "#82c2eb",
              fontSize: 14
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#82c2eb"
                // fontSize:33
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: "solid",
                width: 1,
                color: "#023f66",
                opacity: 0.8
              }
            },
            axisTick: {
              show: false
            }
          },
          // {
          //   name: "h",
          //   //nameLocation: 'start',
          //   axisLabel: {
          //     formatter: "{value}",
          //     color: "#82c2eb",
          //     fontSize: 14
          //   },
          //   axisLine: {
          //     show: false,
          //     lineStyle: {
          //       color: "#82c2eb"
          //       // fontSize:33
          //     }
          //   },
          //   splitLine: {
          //     show: false
          //   },
          //   axisTick: {
          //     show: false
          //   },
          //   min: 0,
          //   max: 16, // growing rate upper limit
          //   type: "value",
          //   //top:10,
          //   inverse: false
          // }
        ],

        series: [
          {
            name: "上网电价",
            type: "bar",
             icon:"rect",
            color: "#00BFFF",
            //stack: '总量',
            barWidth: "6",
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#17e0be"
                  },
                  {
                    offset: 1,
                    color: "#17e0be"
                  }
                ])
                // barBorderRadius: 10,
              }
            },
            data: this.OneData
          },
          {
            name: "度电成本",
             icon:"rect",
            type: "bar",
            color: "#DC143C",
            //stack: '总量',
            barWidth: "6",
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#51a4ff"
                  },
                  {
                    offset: 1,
                    color: "#51a4ff"
                  }
                ])
                // barBorderRadius: 10,
              }
            },
            data: this.TwoData
          }
        ]
      };
      this.mychart.setOption(option);
    }
  }
};
</script>
<style scoped>
.barHeight {
  height: 240px;
  width: 100%;
}
</style>

