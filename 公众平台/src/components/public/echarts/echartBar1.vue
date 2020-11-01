<template>
  <div :id="ids" style=" width:100%; height:100%;" class="echartsDiv">
    <div v-if="data.length == 0 || !data" class="no-data">暂无数据</div>
  </div>
</template>

<script>
export default {
  props: {
    ids: {
      default: "myBars"
    },
    title: {
      default: ""
    },
    legends: {
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
    xAxis: {
      default: function() {
        return ["1#", "2#", "3#", "4#", "5#"];
      }
    },
    xAisRotate: {
      default: 0
    },
    gridLeft: {
      default: -30
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
      let series = [];
      var barcolor=[[new this.$echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                {offset: 0, color: '#00c6ff'},
                {offset: 1, color: 'rgba(0, 108, 255, 0.1)'},
              ]
      ),'rgba(30,103,164,0.1)'], [new this.$echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                {offset: 0, color: '#32eac5'},
                {offset: 1, color: 'rgba(5, 184, 213, 0.1)'},
              ]
      ),'rgba(18,138,121,0.1)'], [new this.$echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                {offset: 0, color: '#ff8400'},
                {offset: 1, color: 'rgba(251, 53, 0, 0.1)'},
              ]
      ),'rgba(158,98,34,0.1)' ]];
      let yMax = 0;
      for (let i of this.data) {
        yMax = Math.max(yMax, ...i);
      }
      let cha=Math.ceil(yMax+(yMax));
      // yMax=cha>100?100:cha;
      yMax=cha;
      console.log("1", yMax);
      for (let i = 0; i < this.data.length; i++) {
        series.push({
          name: this.legends[i],
          type: "bar",
          stack: "a" + i,
          barWidth: 14,
          xAxisIndex: 0,
          yAxisIndex: 0,
          itemStyle: {
            normal: {
              barBorderRadius: 2,
              borderWidth: 0,
              color: barcolor[i][0]
            }
          },
          data: this.data[i],
          zlevel: 11
        });
        series.push({
          name: this.legends[i],
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
          data: this.data[i].map(j => yMax - j),
          zlevel: 11
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
          },
          formatter(params) {
            let result = params[0].name;
            for (let i = 0; i < params.length; i++) {
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
          type: "scroll",
          data: this.legends,
          show: true,
          // top: 10,
          bottom: -5,
          // right: 10,
          itemWidth: 18,
          itemHeight: 6,
          borderRadius: 6,
          itemGap: 20,
          textStyle: {
            color: "#666666",
            fontSize: 14
          }
        },
        grid: {
          left: this.gridLeft,
          right: 0,
          bottom: "10%",
          top: 40,
          containLabel: true,
          z: 2
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
              show: true,
              lineStyle: {
                color: "#e4e4e4"
              }
            },
            axisLabel: {
              show: true,
              inside: false,
              textStyle: {
                color: "#666666",
                fontWeight: "normal",
                fontSize: "16"
              },
              // interval: 0,
              // rotate: this.xAisRotate
            },
            triggerEvent: this.triggerEvent
          }
        ],
        yAxis: [
          {
            name: this.yName,
            nameLocation: "end",
            nameTextStyle: {
              color: "#000000",
              fontSize: 14,
              padding: [10, 50, 0, 0]
            },
            // nameGap: 20,
            type: "value",

            splitLine: {
              show: true,
              lineStyle: {
                color: "#e4e4e4 "
              }
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#e4e4e4"
              }
            },
            axisLabel: {
              color: "#666666",
              fontSize: 14,
              padding: [0, 30, 0, 40]
            }
          }
        ],
        series: series
      };
      let myChart = this.$echarts.init(document.getElementById(this.ids));
      let myChart1 = this.$echarts.init(document.getElementById("bar1"));
      //let  myChart2 = this.$echarts.init(document.getElementById('bar2'));
      myChart.setOption(option);
      window.addEventListener("resize", () => {
        myChart.resize();
        myChart1.resize();
        // myChart2.resize();
      });
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
      if (this.data.length === 0 || !this.data) {
        return false;
      } else {
        this.initEcharts();
      }
    });
  },
  watch: {
    data(newVal) {
      this.data = newVal;
    }
  }
};
</script>
