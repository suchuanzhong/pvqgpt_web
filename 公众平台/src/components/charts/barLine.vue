<template>
  <div :id="ids" style="width：100%;height:100%;" class="echartsDiv"></div>
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
    lineVal: {
      default: 2.8
    },
    legend: {
      default: function() {
        return ["监测值", "运行监测"];
      }
    },
    name: {
      default: ""
    },
    yName: {
      default: ""
    },
    yMax: {
      default: 5
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
      console.log(this.data, this.lineVal);
      for (var i = 0; i < this.data.length; i++) {
        series.push({
          name: this.legend[i],
          type: "bar",
          stack: "a" + i,
          barWidth: 30,
          xAxisIndex: 0,
          yAxisIndex: 0,
          itemStyle: {
            normal: {
              barBorderRadius: 2,
              color: barcolor[i][0]
            }
          },
          markLine: {
            label: {
              normal: {
                show: true,
                position: "end"
              }
            },
            lineStyle: {
              normal: {
                color: "#ff7a05",
                type: "dashed",
                width: 1
              },
              emphasis: {
                color: "#ff7a05"
              }
            },
            data: [
              {
                name: "Y 轴值为 100 的水平线",
                yAxis: this.lineVal[i]
              }
            ]
          },
          data: this.data[i],
          zlevel: 11
        });
        // series.push({
        //   name: this.legend[i],
        //   type: "bar",
        //   stack:'a'+i,
        //   barWidth: 30,
        //   xAxisIndex: 0,
        //   yAxisIndex: 0,
        //   itemStyle: {
        //     normal: {
        //       barBorderRadius: 2,
        //       color:barcolor[i][1]
        //     }
        //   },
        //   data: this.data[i].map(j=>this.yMax-j),
        //   zlevel: 11
        // });
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
          left: "-30px",
          right: "50px",
          bottom: "10%",
          top: 35,
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
              color: "rgba(255,255,255,.8)",
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
      //   window.onresize = function () {
      //     myChart.resize();
      //   }
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
    },
    deep: true
  }
};
</script>
