<template>
  <div :id="ids" class="echartsDiv myBar"></div>
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
        return ["a", "b", "c"];
      }
    },
    name: {
      default: ""
    },
    yName: {
      default: ""
    },
    currentTime: {
      default: ""
    },
    currentTimeType: {
      default: ""
    },
    xAxis: {
      default: function() {
        return [];
      }
    },
    data: {
      default: function() {
        return [];
      }
    },
    unit: {
      default: "h",
      type: String
    },
    clickEvent: {
      default: function() {}
    },
    triggerEvent: {
      default: false
    }
  },
  data() {
    return {
      xName: "年份",
      myChart: {}
    };
  },
  computed: {
    tooltipObj() {
      let type = this.currentTimeType;
      let date = this.currentTime;
      return {
        trigger: "axis",
        axisPointer: {
          type: "line",
          lineStyle: {
            opacity: 0
          }
        },
        formatter: function(params) {
          var result = "";
          let dateArr = date.split("/");
          if (type == "月")
            result = dateArr[0] + "年" + params[0].axisValue + "月" + "<br/>";
          else result = params[0].axisValue + "年" + "<br/>";
          params.forEach(function(item) {
            result +=
              '<span style="background:' +
              item.color.colorStops[0].color +
              ';display:inline-block;margin-right:5px;-webkit-border-radius: 10px;-moz-border-radius: 10px;border-radius:10px;width:10px;height:10px;"></span>' +
              item.seriesName +
              ":" +
              (item.data == null ? "--" : item.data) +
              "<br/>";
          });
          return result;
        }
      };
    }
  },
  methods: {
    initEcharts() {
      var series = [];
      var barcolor = [
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
        ],
        [
          new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#FF5252" },
            { offset: 1, color: "rgba(255,82,82, 0.1)" }
          ]),
          "rgba(158,98,34,0.1)"
        ],
        [
          new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#B5C9F4" },
            { offset: 1, color: "rgba(181,201,244, 0.1)" }
          ]),
          "rgba(158,98,34,0.1)"
        ]
      ];

      var yMax = 0;
      for (var i of this.data) {
        yMax = Math.max(yMax, ...i);
      }
      yMax = Math.ceil(yMax + yMax * 0.05);
      // yMax=cha>100?100:cha;
      for (let i = 0; i < this.legend.length; i++) {
        // if(this.data[i] && this.data[i] instanceof Array &&this.data[i].length > 0){
        // if(this.xAxis[i].length > 0){

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
        // series.push({
        //   name: '',
        //   type: "bar",
        //   stack:'a'+i,
        //   barWidth: 14,
        //   xAxisIndex: 0,
        //   yAxisIndex: 0,
        //   itemStyle: {
        //     normal: {
        //       barBorderRadius: 2,
        //       color:barcolor[i][1]
        //     }
        //   },
        //   data: this.data[i].map(j=>yMax-j),
        //   zlevel: 8
        // });
      }
      var option = {
        tooltip: this.tooltipObj,
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
          show: true,
          top: 5,
          right: 5,
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
          right: 0,
          bottom: 0,
          top: 40,
          containLabel: true,
          z: 22
        },
        xAxis: [
          {
            type: "category",
            name: this.xName,
            gridIndex: 0,
            data: this.xAxis,
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: "#495971",
                width: 1
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
            name: this.unit,
            nameTextStyle: {
              color: "#ccc",
              fontSize: 16,
              padding: [0, 0, 0, -20]
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
              padding: [0, 30, 0, 40]
            }
          }
        ],
        series: series
      };
      // console.log(option);
      this.myChart.clear();
      this.myChart.setOption(option);

      window.addEventListener("resize", () => {
        this.myChart.resize();
      });
      let that = this;
      this.myChart.on("click", function(params) {
        if (params.componentType == "xAxis") {
          that.clickEvent(params.value);
        }
      });
    }
  },
  mounted() {
    this.myChart = this.$echarts.init(document.getElementById(this.ids));
    // this.$nextTick(_ => {
    this.initEcharts();
    // });
  },
  watch: {
    // data(newVal, oldVal) {}
  }
};
</script>
<style lang="scss" scope>
.myBar {
  height: 100%;
  margin-top: 20px;
  width: 100%;
}
</style>
