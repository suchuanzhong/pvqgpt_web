<template>
  <div class="barHeight">
    <div :id="ids" class="full"></div>
    <div :id="ids+'bg'" class="full full-bg"></div>
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
        return ["", ""];
      }
    },
    axisData: {
      default: function() {
        return ["2015","2016","2017","2018","2019","2020"];
      }
    },

    showLegend: {
      default: true
    },
    highlight: false,
    checkYear: 0
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
    chartAction(instance, type, index) {
      if (instance != null && index != "" && index != null) {
        instance.dispatchAction({
          type: type,
          name: index
        });
      }
    },
    drawChart() {
      this.mychart = this.$echarts.init(document.getElementById(this.ids));
      var yAxis = [
        {
          type: "value",
          name: this.unit[0],
          nameLocation: "end",
          splitNumber: 3,
          nameTextStyle: {
            color: "#82c2eb",
            fontSize: 14
          },
          scale: false,
          axisLabel: {
            color: "#82c2eb",
            fontSize: 16,
            // fontStyle: "italic"
          },
          // max: this.max ? this.max : null,
          axisTick: {
            show: false
          },

          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(0, 131, 199, 0.4)"
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(0, 131, 199, 0.2)"
            }
          }
        }
      ];

      var yAxisLength = 0;
      var series = [],
        legend = [];
      var _b = this;
      console.log(this.dataArr)
      for (var i = 0; i < this.dataArr.length; i++) {
        legend.push(this.dataArr[i].name);

        if (this.dataArr[i].yAxisIndex > 0 && yAxis.length == 1) {
          yAxis.push({
            name: this.unit[1],
            type: "value",
            splitNumber: 3,
            nameTextStyle: {
              color: "#82c2eb",
              fontSize: 14
            },
            scale: false,

            axisLabel: {
              color: "#82c2eb",
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
          barMaxWidth:this.axisData.length>4?8:12,
          yAxisIndex: this.dataArr[i].yAxisIndex || 0,
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow"
            }
          },
          axisPointer: {
            lineStyle: {
              color: "rgba(0,192,255,0.57)"
            }
          },
          areaStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(250,180,101,0.3)"
                },
                {
                  offset: 1,
                  color: "rgba(250,180,101,0)"
                }
              ]),
              shadowColor: "rgba(250,180,101,0.2)",
              shadowBlur: 20
            }
          },
          itemStyle: {
            normal: {
              color:
                // this.theme[i]
                function(para) {
                  if (_b.highlight == true) {
                    if (para.name == _b.checkYear) {
                      return "#ffec00";
                    } else {
                      return para.seriesIndex == 0 ? _b.theme[0] : _b.theme[1];
                    }
                  } else {
                    return para.seriesIndex == 0 ? _b.theme[0] : _b.theme[1];
                  }
                }
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
        title: {
          show:this.title==''?false:true,
          text: this.title,
          top: 5,
          right:80,
          // left: 'center',
          textStyle: {
            color: "#fff",
            fontFamily: "PingFang SC",
            fontWeight: "normal",
            fontSize: 14
          }
        },
        grid: {
          top: this.title==''?30:58,
          left: 20,
          right: 0,
          bottom: 10,
          containLabel: true
        },
        // dataZoom: {
        //   show: true,
        //   type: "inside"
        // },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          show: this.showLegend,
          data: legend,

          top: this.title==''?0:30,
          textStyle: {
            color: "#82c2eb"
          },
          left: 'center',
          itemWidth: 6,
          itemHeight: 6,
          itemGap: 6
        },
        xAxis: [
          {
            type: "category",
            data: this.axisData,
            axisLabel: {
              color: "#82c2eb",
              // fontSize:14,
              fontSize: 16,
              // rotate:this.rotate&&this.axisData.length>5?60:0
              interval: 0,
              formatter: function(params) {
                var newParamsName = "";
                var paramsNameNumber = params.length;
                var provideNumber = 3; //一行显示几个字
                // var provideNumber = params.indexOf('（');
                if ((paramsNameNumber > provideNumber)&&provideNumber!==-1) {
                  var tempStr = "";
                  tempStr =
                    params.substring(0, provideNumber) +
                    "\n" +
                    params.substring(provideNumber, paramsNameNumber);
                  newParamsName = tempStr;
                } else {
                  newParamsName = params;
                }
                return newParamsName;
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(0, 131, 199, 0.2)"
              }
            },
            avoidLabelOverlap: true,
            axisTick: false
          }
        ],
        color: this.theme[0],
        yAxis: yAxis,
        series: series
      };
      // if (this.rotate) {
      //   // option.xAxis[0].axisLabel.interval = 0;
      // }
      this.mychart.setOption(option);
      this.initBg(option);
      //年份高亮
      this.chartAction(this.mychart, "highlight", this.checkYear);
    },
    getMaxArr(arr) {
      let max = Math.max(...arr);
      let maxArr = arr.map(num => {
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
  
      let optionBg = {
        title: {
          show: false
        },

        // title: EchartOption.title(this.title),
        legend: {
          show: false
        },
        grid: {
          top: this.title==''?30:58,
          left:20,
          right: 0,
          bottom: 10,
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: this.axisData,
            axisLine: {
              show: false,
              lineStyle: {
                color: "#023f66"
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              // show:false,
              color: "rgba(0,0,0,0)",
              fontSize: 16,
              interval: 0,
              formatter: function(params) {
                var newParamsName = "";
                var paramsNameNumber = params.length;
                var provideNumber = 3; //一行显示几个字
                // var provideNumber = params.indexOf('（');
                if ((paramsNameNumber > provideNumber)&&provideNumber!==-1) {
                  var tempStr = "";
                  tempStr =
                    params.substring(0, provideNumber) +
                    "\n" +
                    params.substring(provideNumber, paramsNameNumber);
                  newParamsName = tempStr;
                } else {
                  newParamsName = params;
                }
                return newParamsName;
              }
            },
            axisTick: false
          }
        ],
        yAxis:[
          {
            type: "value",
            name: "",
            nameTextStyle: {
              color: "#71acd3"
            },
            splitNumber: 3,
            // offset: 0,
            axisLabel: {
              // formatter: '{value} %',
              fontSize:16,
              color: "rgba(0,0,0,0)"
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#023f66",
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
          }
        ]
      };

      let yAxisIndex = 0;
      this.dataArr.forEach(item => {
        if (item.yAxisIndex == 1) {
          yAxisIndex = 1;
        }
      });
      let maxData = this.getMaxSeriseData(option.series, 1);
      let maxDatas = this.axisData.map(value => {
        return Math.ceil(maxData[0])+1
      });
      let mychartBg = echarts.init(document.getElementById(this.ids + "bg"));
      optionBg.series = [
        {
          name: "",
          type: "bar",
          color: "#00BFFF",
          // color: "#00BFFF",
          //stack: '总量',

          tooltip: {
            show: false
          },
          barWidth: this.barWidth * option.series.length + 23,

          itemStyle: {
            normal: {
               color:"rgba(18, 117, 179,.3)"
              // barBorderRadius: 10,
            }
          },
          data: maxDatas
        }
      ];
      mychartBg.setOption(optionBg);
      // if (yAxisIndex == 1) {
      //   let maxDataIndex = this.getMaxSeriseData(option.series, 0);
      //   let maxDatasIndex = this.axisData.map(value => {
      //     return maxDataIndex[0];
      //   });
      //   optionBg.series.push({
      //     name: "",
      //     type: "bar",
      //     color: "#00BFFF",
      //     //stack: '总量',
      //     tooltip: {
      //       show: false
      //     },
      //     barWidth: this.barWidth * option.series.length + 12,
      //     yAxisIndex: 1,
      //     barGap: "-100%",
      //     itemStyle: {
      //       normal: {
      //         color: "rgba(18, 117, 179,0)"
      //         // barBorderRadius: 10,
      //       }
      //     },
      //     data: this.dataArr[2].data
      //     // data: maxDatasIndex
      //   });
      // }
    },
    chartAction(instance, type, index) {
      if (instance != null && index != "" && index != null) {
        instance.dispatchAction({
          type: type,
          name: index
        });
      }
    }
  }
};
</script>
<style scoped>
.barHeight {
  height: 180px;
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

