<template>
  <div :id="ids" style="width:100%;height:100%;" class="echartsDiv"></div>
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
        return ["招商承诺", "运行监测"];
      }
    },
    name: {
      default: ""
    },
    yName: {
      default: ""
    },
    yMax: {
      default: 10
    },
    xAxis: {
      default: function() {
        return ["1#", "2#", "3#", "4#", "5#"];
      }
    },
    data: {
      default: function() {
        return [
          [56, 54, 55, 23, 48],
          [54, 55, 23, 48, 95],
          [54, 55, 23, 48, 95]
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
  methods: {
    initEcharts() {
      var series = [];
      var barcolor = [
        [
          new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#ff8400" },
            { offset: 1, color: "rgba(251, 53, 0, 0.1)" }
          ]),
          "rgba(158, 98, 34,0.1)"
        ],
        [
          new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#00c6ff" },
            { offset: 1, color: "rgba(0, 108, 255, 0.1)" }
          ]),
          "rgba(0, 108, 255,0.1)"
        ],
        [
          new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#ff8400" },
            { offset: 1, color: "rgba(251, 53, 0, 0.1)" }
          ]),
          "rgba(158,98,34,0.3)"
        ]
      ];
      for (var i = 0; i < this.data.length; i++) {
        series.push({
          name: this.legend[i],
          type: "bar",
          stack: "a" + i,
          barWidth: 14,
          xAxisIndex: 0,
          yAxisIndex: 0,
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
          yAxisIndex: 0,
          itemStyle: {
            normal: {
              barBorderRadius: 2,
              color: barcolor[i][1]
            }
          },
          data: this.data[i].map(j => this.yMax - j),
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
          show: false
        },
        grid: {
          left: -30,
          right: 0,
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
                color: "#495971",
                width: 2
              }
            },
            axisLabel: {
              show: true,
              color: "#ccc",
              fontSize: 16,
              interval: 0
            },
            triggerEvent: this.triggerEvent
          }
        ],
        yAxis: [
          {
            name: this.yName,
            nameTextStyle: {
              color: "rgba(255,255,255,0.8)",
              fontSize: 16,
              padding: [0, 0, 0, 40]
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
              padding: [0, 20, 0, 40]
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
    data(newVal) {
      this.data = newVal;
      this.initEcharts();
    }
  }
};
</script>
