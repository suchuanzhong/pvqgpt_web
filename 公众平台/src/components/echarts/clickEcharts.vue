<template>
  <div style="height:100%;" ref="barLineId" :id="ids"></div>
</template>

<script>
export default {
  props: {
    ids: {
      default: "barLineId"
    },
    yNamel: {
      default: "左边单位"
    },
    yNamer: {
      default: "右边单位"
    },
    tooltipType: {
      default: ""
    },
    tooltipBg: {
      default: ""
    },
    currentTime: {
      default: ""
    },
    currentTimeType: {
      default: ""
    },
    data: {
      default: {
        series: [],
        dataAxis: []
      }
    },
    triggerEvent: {
      default: "false"
    },
    clickEvent: {
      default: function() {}
    },
    differentComponents: {
      default: ""
    },
    clickCount: {
      default: "0"
    },
    roleType: {
      default: "0"
    }
  },
  data() {
    return {};
  },
  computed: {
    tooltipObj() {
      let type = this.currentTimeType;
      let date = this.currentTime;
      let compPage = this.differentComponents;
      return {
        trigger: "axis",
        axisPointer: {
          type: this.tooltipType
        },
        formatter: function(params) {
          var result = "";
          let dateArr = date.split("/");
          if (type == "days") {
            if (compPage == 1) {
              result =
                params[0].axisValue.length < 4
                  ? dateArr[0] +
                    "年" +
                    dateArr[1] +
                    "月" +
                    params[0].axisValue +
                    "日"
                  : params[0].axisValue + "方阵";
            } else {
              result =
                params[0].axisValue.indexOf("站") < 0
                  ? dateArr[0] +
                    "年" +
                    dateArr[1] +
                    "月" +
                    params[0].axisValue +
                    "日"
                  : params[0].axisValue;
            }
          } else if (type == "months") {
            if (compPage == 1) {
              result =
                params[0].axisValue.length < 4
                  ? dateArr[0] + "年" + params[0].axisValue + "月"
                  : params[0].axisValue + "方阵";
            } else {
              result =
                params[0].axisValue.indexOf("站") < 0
                  ? dateArr[0] + "年" + params[0].axisValue + "月"
                  : params[0].axisValue;
            }
          } else if (type == "years") {
            if (compPage == 1) {
              result =
                params[0].axisValue.length < 4
                  ? params[0].axisValue + "年"
                  : params[0].axisValue + "方阵";
            } else {
              result =
                params[0].axisValue.indexOf("站") < 0
                  ? params[0].axisValue + "年"
                  : params[0].axisValue;
            }
          } else {
            result = params[0].axisValue;
          }
          params.forEach(function(item) {
            result += "<br/>";
            result +=
              '<span style="background:' +
              item.color.colorStops[0].color +
              ';display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;"></span>' +
              item.seriesName +
              ":" +
              (item.data == null ? "--" : item.data);
          });
          return result;
        }
      };
    }
  },
  methods: {
    setEcharts(series, dataAxis) {
      let echarts = this.$echarts;
      let legend = [];
      for (let item of series) {
        legend.push(item.name);
        // if (item.type === 'bar') {
        //     if (item.sign === '0') {
        //         item.itemStyle = {
        //             normal: {
        //                 color: new echarts.graphic.LinearGradient(
        //                     0, 0, 0, 1,
        //                     [
        //                         {offset: 0, color: '#83bff6'},
        //                         {offset: 0.5, color: '#188df0'},
        //                         {offset: 1, color: '#188df0'}
        //                     ]
        //                 )
        //             }
        //         }
        //     } else {
        //         item.itemStyle = {
        //             normal: {
        //                 color: new echarts.graphic.LinearGradient(
        //                     0, 0, 0, 1,
        //                     [
        //                         {offset: 0, color: '#32eac5'},
        //                         {offset: 0.5, color: '#15ea73'},
        //                         {offset: 1, color: '#19cc3b'}
        //                     ]
        //                 )
        //             }
        //         }
        //     }
        // }
      }
      console.log(legend)
      const option = {
        color: [
          new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#00c6ff" },
            { offset: 1, color: "rgba(0, 108, 255, 0.1)" }
          ]),
          new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#32eac5" },
            { offset: 1, color: "rgba(5, 184, 213, 0.1)" }
          ]),
          new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#ff8400" },
            { offset: 1, color: "rgba(251, 53, 0, 0.1)" }
          ]),
          new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#d466f9" },
            { offset: 1, color: "#74a7ff" }
          ])
        ],
        tooltip: this.tooltipObj,
        axisPointer: {
          link: { xAxisIndex: "all" },
          label: {
            backgroundColor: "#777"
          }
        },
        // dataZoom: [
        //   {
        //     type: "inside"
        //   }
        // ],
        //   graphic: {
        // 	type: "text",
        // 	right: "2%",
        // 	top: "2%",
        // 	style: {
        // 		text:unit,
        // 		fill: "#fff",
        // 		fontSize: 14,
        // 		fontFamily: "PingFang-SC-Medium"
        // 	}
        // 	},
        legend: {
          width: 800,
          show: true,
          data: legend,
          top: 30,
          itemGap: 20,
          // textStyle: {
          //   color: "fff"
          // }
        },
        xAxis: {
          type: "category",
          data: dataAxis,
          //  boundaryGap: false,
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
              color: "#adadad"
            }
          },
          axisLabel: {
            color: "#666",
            fontSize: 16
          },
          triggerEvent: this.triggerEvent
        },
        yAxis: [
          {
            type: "value",
            // minInterval: 1,
            // splitNumber:3,
            name: this.yNamel,
            nameTextStyle: {
              color: "#000"
            },
            // nameGap:30,
            // min: function(value) {
            //     return (value.min - 100)>0?value.min - 100:0;
            // },
            axisTick: {
              show: true
            },

            axisLine: {
              show: true,
              lineStyle: {
                color: "#adadad"
              }
            },
            axisLabel: {
              formatter: "{value} ",
              color: "#666",
              fontSize: 14
            },
            splitLine: {
              lineStyle: {
                color: "#68879e", //纵坐标轴和字体颜色
                width: 1,
                type: "dashed"
              },
              show: true
            }
          },
          {
            type: "value",
            // minInterval: 1,
            // splitNumber:3,
            name: this.yNamer,
            nameTextStyle: {
              color: "#000"
            },
            // nameGap:30,
            // min: function(value) {
            //     return (value.min - 100)>0?value.min - 100:0;
            // },
            axisTick: {
              show: true
            },
            splitLine: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#adadad"
              }
            },
            axisLabel: {
              formatter: "{value} ",
              color: "#666",
              fontSize: 14
              // align:'right',
              // showMinLabel:false
            }
          }
        ],
        grid: {
          left: 80,
          right: "5%",
          top: "80px",
          bottom: "10px",
          show: false,
          containLabel: true
        },
        series: series
      };

      let myChart = this.$echarts.init(this.$refs.barLineId);
      //myChart.setOption(option);
      let that = this;
      this.$nextTick(() => {
        myChart.off("click");
        myChart.clear();
        if (that.roleType == 1) {
          myChart.setOption(option, true);
        } else if (that.clickCount != "2") {
          myChart.on("click", function(params) {
            if (
              params.componentType === "xAxis" ||
              params.componentType === "series"
            ) {
              that.clickEvent(
                params.componentType === "xAxis" ? params.value : params.name
              );
            }
          });
        }
        myChart.setOption(option, true);
      });
    }
  },
  watch: {
    data: {
      handler(newVal) {
        this.data = newVal;
        this.setEcharts(this.data.series, this.data.dataAxis);
      }
    },
    deep: true
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.setEcharts(this.data.series, this.data.dataAxis);
    });
  },
  destoryed() {}
};
</script>

<style></style>
