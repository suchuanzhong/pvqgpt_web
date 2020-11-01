<template>
  <div style="height:100%;" :id="ids"></div>
</template>

<script>
export default {
  props: {
    ids: {
      type: String,
      default: "echartline"
    },
    yName: {
      default: "kw"
    },
    yName2: {
      default: "kWh/㎡"
    },
    data: {
      default: {
        title: "",
        series: [],
        dataAxis: []
      }
    },
    isShowLegend: {
      default: false
    },
    legendLineGap: {
      default: 40
    }
  },
  data() {
    return {};
  },
  methods: {
    setEcharts(series, dataAxis) {
      let legendIcon = [
        "firstIcon",
        "secondIcon",
        "thirdIcon",
        "fourth",
        "fifth",
        "sixthIcon",
        "seventhIcon"
      ];
      // let echarts=this.$echarts;
      // var dataShadow = [];

      var legendData = [];
      var selected_item = {};

      for (let j = 0; j < series.length; j++) {
        var key_name = series[j].name;
        if (key_name == "基地" || key_name == "辐射值") {
          selected_item[key_name] = true;
        } else {
          selected_item[key_name] = false;
        }
        legendData.push({
          name: series[j].name,
          icon: "image://img/operateIcon/" + legendIcon[j] + ".png"
        });
      }

      var option = {
        title: {
          show: false
        },
        color: [
          "#02e4ff",
          "#02ff38",
          "rgba(0,192,255,1)",
          "rgb(225,86,87)",
          "rgb(223,125,37)",
          "rgb(158,178,255)",
          "rgb(151,147,255)"
        ],
        tooltip: {
          trigger: "axis"
        },
        dataZoom: [
          {
            type: "inside"
          }
        ],
        legend: {
          show: this.isShowLegend,
          top: 10,
          right: 0,
          width: "60%",
          itemWidth: 20,
          itemHeight: 8,
          textStyle: {
            color: "#b3d9ff"
          },
          data: legendData
          // selected:selected_item
        },
        xAxis: {
          type: "category",
          data: dataAxis,
          boundaryGap: false,
          axisTick: {
            show: false
          },
          // splitLine: {
          // 	show:true,
          // 	lineStyle:{
          // 		color:'rgba(255,255,255,.05)'
          // 	}
          // },
          axisLine: {
            lineStyle: {
              color: "rgba(255,255,255,.05)"
            }
          },
          axisLabel: {
            color: "#fff",
            fontSize: 16
          }
        },
        yAxis: [
          {
            name: this.yName,
            nameTextStyle: {
              color: "rgba(255,255,255,.8)",
              fontSize: 14,
              padding: [0, 0, 0, 20]
            },
            type: "value",
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: "#495971"
              }
            },
            axisLabel: {
              color: "#ccc",
              fontSize: 16,
              padding: [0, 10, 0, 40]
            }
          },
          {
            name: this.yName2,
            nameTextStyle: {
              color: "rgba(255,255,255,.8)",
              fontSize: 14,
              padding: [0, 0, 0, 0]
            },
            min: 0,
            position: "right",
            type: "value",
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: "#495971"
              }
            },
            axisLabel: {
              color: "#ccc",
              fontSize: 16,
              padding: [0, 40, 0, 10]
            }
          }
        ],
        grid: {
          left: -30,
          right: -30,
          bottom: "10%",
          top: this.legendLineGap,
          containLabel: true,
          z: 22
        },
        series: series
      };

      let myChart = this.$echarts.init(document.getElementById(this.ids));
      myChart.setOption(option);
    }
  },
  watch: {
    data: {
      handler(newVal, oldVal) {
        if (this.myChart) {
          if (newVal) {
            this.myChart.setOption(newVal);
          } else {
            this.myChart.setOption(oldVal);
          }
        } else {
          this.setEcharts(this.data.series, this.data.dataAxis);
        }
      },
      deep: true
    }
  },
  created() {},
  mounted() {
    this.setEcharts(this.data.series, this.data.dataAxis);
  },
  destoryed() {}
};
</script>

<style></style>
