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
      default: "MW"
    },
    yName2: {
      default: "W/㎡"
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
    },
    yMaxValue: {
      default: 100
    }
  },
  data() {
    return {};
  },
  methods: {
    setEcharts(series, dataAxis) {
      // setEcharts(series, dataAxis, unit) {
      let legendIcon = [
        "firstIcon",
        "secondIcon",
        "thirdIcon",
        "fourth",
        "fifth",
        "sixthIcon",
        "eighthIcon",
        "ninthIcon",
        "tenthIcon"
      ];
      // let echarts = this.$echarts;
      // var dataShadow = [];

      var legendData = [];
      var selected_item = {};
      for (let j = 0; j < series.length; j++) {
        var key_name = series[j].name;
        if (key_name == "基地" || key_name == "辐照强度") {
          selected_item[key_name] = true;
          legendData.push({
            name: series[j].name,
            icon:
              "image://./img/operateIcon/" +
              (legendIcon[j] ? legendIcon[j] : legendIcon[0]) +
              ".png"
          });
        } else {
          selected_item[key_name] = false;
          legendData.push({
            name: series[j].name,
            icon: "image://./img/operateIcon/default.png"
          });
        }
      }
      for (let kk in legendData) {
        if (legendData[kk].name == "辐照强度") {
          legendData[kk].icon = "image://./img/operateIcon/seventhIcon.png";
        }
      }

      var option = {
        title: {
          show: false
        },
        color: [
          "#ff8400",
          "#2edaff",
          "#2ad6a5",
          "#7487ae",
          "#cc6bf9",
          "#ff5353",
          "#e2ec3f",
          "#dc281e",
          "#ba5370",
          "#56ab2f",
          "#a8e063",
          "#f4e2d8",
          "#f00"
        ],
        // color:['#02e4ff','#02ff38','rgba(0,192,255,1)','rgb(225,86,87)','rgb(223,125,37)','rgb(158,178,255)','rgb(151,147,255)'],
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
            color: "#00D8FF"
          },
          data: legendData,
          selected: selected_item
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
            min: 0,
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
            max: this.yMaxValue,
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
      myChart.on("legendselectchanged", function(params) {
        let legendIcon = [
          "firstIcon",
          "secondIcon",
          "thirdIcon",
          "fourth",
          "fifth",
          "sixthIcon",
          "eighthIcon",
          "ninthIcon",
          "tenthIcon"
        ];
        var legendData = [];
        var selected = params.selected;
        var j = 0;
        for (var name in selected) {
          if (selected[name]) {
            legendData.push({
              name: name,
              icon:
                "image://./img/operateIcon/" +
                (legendIcon[j] ? legendIcon[j] : legendIcon[0]) +
                ".png",
              textStyle: {
                color: "#00D8FF"
              }
            });
          } else {
            legendData.push({
              name: name,
              icon: "image://./img/operateIcon/default.png",
              textStyle: {
                color: "#fff"
              }
            });
          }
          j++;
        }
        for (let ii in legendData) {
          if (legendData[ii].name == "辐照强度" && selected["辐照强度"]) {
            legendData[ii].icon = "image://./img/operateIcon/seventhIcon.png";
          }
        }
        option.legend.data = legendData;
        option.legend.selected = params.selected;
        option.animation = false;
        // myChart.clear();
        myChart.setOption(option, true);
      });
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
