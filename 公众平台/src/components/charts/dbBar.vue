<template>
  <div style="height: 100%;">
    <div :id="ids" style="width:100%;height:100%;" class="echartsDiv"></div>
  </div>
</template>

<script>
export default {
  props: {
    ids: {
      default: "myBar"
    },
    title: {
      default: ""
    },
    legend: {
      default: function() {
        return ["发电量", "利用小时数"];
      }
    },
    name: {
      default: ""
    },
    yName: {
      default: "亿kWh"
    },
    yName2: {
      default: "小时"
    },
    yMax0: {
      default: 5
    },
    yMax1: {
      default: 2500
    },
    xAxis: {
      default: function() {
        return ["1#", "2#", "3#", "4#", "5#"];
      }
    },
    data: {
      default: function() {
        return [
          [2.5, 2, 1, 3, 4.5],
          [2000, 2055, 2230, 2480, 1950]
        ];
      }
    },
    unit: {
      default: ""
    },
    clickEvent: {
      default: function() {}
    },
    triggerEvent: {
      default: false
    }
  },
  data() {
    return {};
  },

  methods: {
    initEcharts() {
      var series = [];
      var barcolor = [
        [
          new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#1fbdfc" },
            { offset: 1, color: "rgba(164, 202, 241, .8)" }
          ]),
          "rgba(30,103,164,0.1)"
        ],
        [
          new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#38e7c8" },
            { offset: 1, color: "rgba(186, 227, 229, .8)" }
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

      for (var i = 0; i < this.data.length; i++) {
        series.push({
          name: this.legend[i],
          type: "bar",
          stack: "a" + i,
          barWidth: 14,
          xAxisIndex: 0,
          yAxisIndex: i,
          itemStyle: {
            normal: {
              barBorderRadius: 2,
              color: barcolor[i][0]
            }
          },
          data: this.data[i],
          zlevel: 11
        });
        series.push({
          name: this.legend[i],
          type: "bar",
          stack: "a" + i,
          barWidth: 14,
          xAxisIndex: 0,
          yAxisIndex: i,
          itemStyle: {
            normal: {
              barBorderRadius: 2,
              color: barcolor[i][1]
            }
          },
          data: this.data[i].map(j => this["yMax" + i] - j),
          zlevel: 11
        });
      }
      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
            lineStyle: {
              opacity: 0
            }
          },
          formatter(params) {
            // formatter(params, ticket, callback){
            var result = params[0].name;
            for (var i = 0; i < params.length; i++) {
              if (!(i % 2)) {
                result +=
                  '<br><i class="legend-dot" style="background:' +
                  params[i].color +
                  '"></i>' +
                  params[i].seriesName +
                  "：" +
                  params[i].data;
              }
            }
            return result;
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
        legend: {
          data: this.legend,
          show: false,
          top: -5,
          right: 0,
          itemWidth: 18,
          itemHeight: 6,
          borderRadius: 6,
          itemGap: 20,
          // width: 100,
          textStyle: {
            color: "#ccc",
            fontSize: 14
          }
        },
        grid: {
          left: -30,
          right: -30,
          bottom: "10%",
          top: 40,
          containLabel: true,
          z: 22
        },
        xAxis: [
          {
            type: "category",
            gridIndex: 0,
            data: this.xAxis,
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
              // interval: 0,
              // rotate:15,
            },
            triggerEvent: this.triggerEvent
          }
        ],
        dataZoom: [
          {
            type: "inside"
          }
        ],
        yAxis: [
          {
            name: this.yName,
            nameTextStyle: {
              color: "#666",
              fontSize: 14,
              padding: [0, 0, 0, 20]
            },
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
              padding: [0, 10, 0, 40]
            }
          },
          {
            name: this.yName2,
            nameTextStyle: {
              color: "#666",
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
                color: "#ccc"
              }
            },
            axisLabel: {
              color: "#666",
              fontSize: 16,
              padding: [0, 40, 0, 10]
            }
          }
        ],
        series: series
      };
      var myChart = this.$echarts.init(document.getElementById(this.ids));
      myChart.setOption(option);
      // setTimeout(function (){
      //     window.onresize = function () {
      //         myChart.resize();
      //     }
      // },200)
      let that = this;
      myChart.on("click", function(params) {
        if (params.componentType == "xAxis") {
          that.clickEvent(params.value);
        }
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initEcharts();
    });
  },
  watch: {
    // data(newVal,oldVal){
    data(newVal) {
      this.data = newVal;
      this.initEcharts();
    }
  }
};
</script>
