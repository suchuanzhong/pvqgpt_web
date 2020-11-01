<template>
  <div class="barHeight">
    <div :id="ids" class="full"></div>
    <div :id="ids + 'bg'" class="full full-bg"></div>
  </div>
</template>
<script>
export default {
  props: {
    ids: {
      default: "LightSensor"
    },
    rotate: {
      default: false
    },

    index: {
      default: 0
    },
    dataArr: {
      default: function() {
        return [
          {
            name: "利用小时数",
            type: "bar",
            yAxisIndex: 0,
            data: [0.5, 0.332, 0.301, 0.334, 0.39]
          },
          {
            name: "利用小时数",
            type: "bar",
            yAxisIndex: 1,
            data: [0.5, 0.332, 0.301, 0.334, 0.39, 0.332, 0.301, 0.334, 0.39]
          }
        ];
      }
    },
    theme: {
      default: function() {
        return [
          "#51a4ff",
          "#0066ff",
          "#17e0be",
          "#9ee596",
          "#f2ff06",
          "#f0aef9",
          "#17595a",
          "#004d21",
          "#9c8300",
          "#62915a",
          "#9fa603",
          "#7c5a81"
        ];
      }
    },
    max: {
      default: ""
    },
    title: {
      default: ""
    },
    barWidth: {
      default: 6
    },
    unit: {
      default: function() {
        return ["用地(平方公里)", "小时"];
      }
    },
    axisData: {
      default: function() {
        return [
          "2014",
          "2015",
          "2016",
          "2017",
          "2018",
          "2015",
          "2016",
          "2017",
          "2018"
        ];
      }
    },

    showLegend: {
      default: true
    }
  },
  data() {
    return {
      mychart: null
    };
  },
  mounted() {
    this.drawChart();
  },

  methods: {
    drawChart() {
      this.mychart = this.$echarts.init(document.getElementById(this.ids));
      var yAxis = [
        {
          name: this.unit[0],
          nameTextStyle: {
            color: "#666",
            fontSize: 16,
            padding: [0, 0, 0, 40]
          },
          min: 0,
          type: "value",
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#ccc"
            }
          },
          axisLabel: {
            color: "#666",
            fontSize: 16,
            padding: [0, 20, 0, 40]
          }
        }
      ];
      var barcolor = [
        [
          new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#ff8508" },
            { offset: 1, color: "rgba(239, 206, 189, 0.8)" }
          ]),
          "rgba(158, 98, 34,0.1)"
        ],
        [
          new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#00c6ff" },
            { offset: 1, color: "rgba(0, 108, 255, 0.1)" }
          ]),
          "rgba(30,103,164,0.1)"
        ],
        [
          new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#32eac5" },
            { offset: 1, color: "rgba(5, 184, 213, 0.1)" }
          ]),
          "rgba(18,138,121,0.1)"
        ],
        [
          new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#ff8400" },
            { offset: 1, color: "rgba(251, 53, 0, 0.1)" }
          ]),
          "rgba(158,98,34,0.1)"
        ]
      ];
      let maxarr = this.getMaxArr(this.dataArr[0].data);
      let maxarr2 = maxarr.map(item => {
        return (item = Math.ceil(item));
      });
      //   var yAxisLength = 0;
      var series = [
        {
          type: this.dataArr[0].type,
          name: this.dataArr[0].name,
          data: maxarr2,
          stack: "a" + 3,
          barMaxWidth: 30,
          yAxisIndex: 0,
          barGap: "-100%",
          itemStyle: {
            normal: {
              color: "#ede1d5"
            }
          },
          label: {
            normal: {
              show: false,
              position: "top",
              color: this.theme[1],
              fontFamily: "DINOT",
              fontSize: "18px"
            },
            emphasis: {
              color: "#01cfee"
            }
          }
        }
      ];
      // legend = [];

      for (var i = 0; i < this.dataArr.length; i++) {
        // legend.push(this.dataArr[i].name);

        if (this.dataArr[i].yAxisIndex > 0 && yAxis.length == 1) {
          yAxis.push({
            name: this.unit[1],
            type: "value",
            splitNumber: 3,
            nameTextStyle: {
              color: "#666",
              fontSize: 14
            },
            scale: false,

            axisLabel: {
              color: "#ccc",
              fontSize: 16
            },
            max: this.max ? this.max : null,
            axisLine: false,
            splitLine: false
          });
        }
        series.push({
          type: this.dataArr[i].type,
          name: this.dataArr[i].name,
          data: this.dataArr[i].data,
          stack: "a" + i,
          barMaxWidth: 30,
          yAxisIndex: 0,
          itemStyle: {
            normal: {
              color: barcolor[0][0]
            }
          },
          label: {
            normal: {
              show: false,
              position: "top",
              color: this.theme[1],
              fontFamily: "DINOT",
              fontSize: "18px"
            },
            emphasis: {
              color: "#01cfee"
            }
          }
        });
      }
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
            lineStyle: {
              opacity: 0
            }
          }
        },
        title: {
          x: "center",
          text: this.title,
          textStyle: {
            color: "#fff",
            fontWeight: 100,
            fontSize: 14
          },
          top: 10
        },
        grid: {
          left: -30,
          right: 0,
          bottom: "10%",
          top: 35,
          containLabel: true,
          z: 22
        },
        dataZoom: {
          show: true,
          type: "inside"
        },
        xAxis: [
          {
            type: "category",
            gridIndex: 0,
            data: this.axisData,
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: "#ccc",
                width: 2
              }
            },
            axisLabel: {
              show: true,
              color: "#666",
              fontSize: 16
              // interval: 0
            }
          }
        ],
        yAxis: yAxis,
        series: series
      };
      this.mychart.setOption(option);
      // this.initBg(option);
    },
    getMaxArr(arr) {
      let max = Math.max(...arr);
      let maxArr = arr.map(() => {
        return max;
      });
      return maxArr;
    },
    getMaxSeriseData(data, index = 1) {
      let newArr = data.map(item => {
        if (item.type == "bar" && item.yAxisIndex != index) {
          let dataArr = this.getMaxArr(item.data);
          return dataArr.length > 0 ? dataArr[0] : 0;
        } else {
          return false;
        }
      });
      let maxArr = [];
      newArr.forEach(item => {
        if (item !== false) {
          maxArr.push(item);
        }
      });
      return this.getMaxArr(maxArr);
    },
    initBg(option) {
      let echarts = this.$echarts;
      let newyAxis = option.yAxis.map(item => {
        return {
          type: "value",
          name: item.name,
          splitNumber: 3,
          nameTextStyle: {
            color: "#666"
          },
          offset: 0,
          axisLabel: {
            // formatter: '{value} %',
            color: "#666",
            fontSize: 16
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#000",
              type: "solid"
            }
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: "#023f66",
              width: 1
            }
          }
        };
      });
      let optionBg = {
        title: {
          show: false
        },

        // title: EchartOption.title(this.title),
        legend: {
          show: false
        },
        grid: {
          left: 40,
          right: 0,
          bottom: "17%",
          top: 0,
          containLabel: true
        },
        dataZoom: {
          show: true,
          type: "inside"
        },
        xAxis: [
          {
            type: "category",
            data: this.axisData,
            axisLine: {
              show: true,
              lineStyle: {
                color: "#023f66",
                width: 1,
                type: "solid"
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false,

              textStyle: {
                color: "#82c2eb"
              }
            }
          }
        ],
        yAxis: newyAxis
      };

      let yAxisIndex = 0;
      this.dataArr.forEach(item => {
        if (item.yAxisIndex == 1) {
          yAxisIndex = 1;
        }
      });
      let maxData = this.getMaxSeriseData(option.series, 1);
      let maxDatas = this.axisData.map(() => {
        return maxData[0];
      });
      let mychartBg = echarts.init(document.getElementById(this.ids + "bg"));
      optionBg.series = [
        {
          name: "",
          type: "bar",
          color: "#00BFFF",
          //stack: '总量',
          tooltip: {
            show: false
          },
          barMaxWidth: 30,
          barGap: "-100%",
          itemStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(18, 117, 179,0)"
                },
                {
                  offset: 0.5,
                  color: "rgba(18, 117, 179,.5)"
                },
                {
                  offset: 1,
                  color: "rgba(18, 117, 179,0)"
                }
              ])
              // barBorderRadius: 10,
            }
          },
          data: maxDatas
        }
      ];
      if (yAxisIndex == 1) {
        optionBg.series.push({
          name: "",
          type: "bar",
          color: "#00BFFF",
          //stack: '总量',
          tooltip: {
            show: false
          },
          barMaxWidth: 30,
          yAxisIndex: 1,
          barGap: "-100%",
          itemStyle: {
            normal: {
              color: "rgba(18, 117, 179,0)"
              // barBorderRadius: 10,
            }
          },
          data: this.dataArr[1].data
          // data: maxDatasIndex
        });
      }
      mychartBg.setOption(optionBg);
    }
  }
};
</script>
<style scoped>
.barHeight {
  height: 210px;
  width: 100%;
  position: relative;
}
.full {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 9;
}
.full-bg {
  position: absolute;
  z-index: 0;
  top: 0;
  width: 100%;
  height: 100%;
  left: 0;
}
</style>
