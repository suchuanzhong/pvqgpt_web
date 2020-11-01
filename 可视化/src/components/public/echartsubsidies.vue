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
    title: {
      default: ""
    },
    subText: {
      default: ""
    },
    dataTitle: {
      default: function() {
        return ["一类资源区", "二类资源区", "三类资源区", "电站造价"];
      }
    },
    databottom: {
      default: function() {
        return ["2013", "2014", "2015", "2016", "2017", "2018", "2019"];
      }
    },
    databorone: {
      default: function() {
        return [-1, 0.3, 1.2, 1.6, -0.3, 3.6, 7.8, 23, 19.7];
      }
    },
    databortwo: {
      default: function() {
        return [-3, -4, 5, 10.4, 8.2, 2.1, 30, 35, 50.5];
      }
    },
    databorthree: {
      default: function() {
        return [-3.2, -4.8, 5.1, 14.4, 18.2, 21.1, 27, 46.7, 69.3];
      }
    },
    databorfrou: {
      default: function() {
        return [-6.2, -8.5, 5.1, 15.4, 1.2, 21.1, 27, 48.7, 60.3];
      }
    },
    highlight: false,
    checkYear: 0
  },
  data() {
    return {};
  },
  mounted() {
    this.setEcharts();
  },
  methods: {
    setEcharts(series) {
      let echarts = this.$echarts;
      let myChart = this.$echarts.init(document.getElementById(this.ids));
      var _b = this;
      var option = {
        title: {
          textStyle: {
            fontWeight: "normal",
            fontSize: 12,
            color: "#82c2eb"
          },
          left: "6%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: "#82c2eb"
            }
          }
        },

        legend: {
          icon: "rect",
          itemWidth: 10,
          itemHeight: 4,
          itemGap: 6,
          top: "3%",
          data:this.dataTitle,
          // right: "6%",
          textStyle: {
            fontSize: 12,
            color: "#82c2eb"
          }
        },
        grid: {
          top: "23%",
          left: "2%",
          right: "2%",
          bottom: "14%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLabel: {
              color: "#82c2eb",
              fontSize:16
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(0, 131, 199, 0.2)"
              }
            },
            data: this.databottom
          }
        ],
        yAxis: [
          {
            name: "元/kW.h",
            type: "value",
            nameTextStyle: {
              color: "#82c2eb",
              fontSize: 14
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(0, 131, 199, 0.4)"
              }
            },
            axisLabel: {
              color: "#82c2eb",
              fontSize: 16,
              // fontStyle:"italic"
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(0, 131, 199, 0.2)"
              }
            }
          },
          {
            name: "元/kW",
            type: "value",
            nameTextStyle: {
              color: "#82c2eb",
              fontSize: 14
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(0, 131, 199, 0.4)"
              }
            },
            axisLabel: {
              color: "#82c2eb",
              fontSize: 16,
              // fontStyle:"italic"
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(0, 131, 199, 0.2)"
              }
            }
          }
        ],
        series: [
          {
            name: "一类资源区",
            label: {
              normal: {
                show: false,
                position: "top"
              }
            },
            type: "line",
            smooth: true,
            lineStyle: {
              normal: {
                width: 1
              }
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(250,180,101,0.1)"
                  },
                  {
                    offset: 1,
                    color: "rgba(250,180,101,0)"
                  }
                ])
              }
            },
            itemStyle: {
              normal: {
                color: //"#ff2066"
                function(para) {
                  if (_b.highlight == true) {
                    if (para.name == _b.checkYear) {
                      return "#ffec00";
                    } else {
                      return "#ff2066";
                    }
                  } else {
                    return "#ff2066";
                  }
                }
              }
            },
            data: this.databorone
          },
          {
            name: "二类资源区",
            label: {
              normal: {
                show: false,
                position: "top"
              }
            },
            type: "line",
            smooth: true,
            lineStyle: {
              normal: {
                width: 1
              }
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(250,180,101,0.1)"
                  },
                  {
                    offset: 1,
                    color: "rgba(250,180,101,0)"
                  }
                ])
              }
            },
            itemStyle: {
              normal: {
                color: //"#17e0be"
                function(para) {
                  if (_b.highlight == true) {
                    if (para.name == _b.checkYear) {
                      return "#ffec00";
                    } else {
                      return "#17e0be";
                    }
                  } else {
                    return "#17e0be";
                  }
                }
              }
            },
            data: this.databortwo
          },
          {
            name: "三类资源区",
            label: {
              normal: {
                show: false,
                position: "top"
              }
            },
            type: "line",
            smooth: true,
            lineStyle: {
              normal: {
                width: 1
              }
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(250,180,101,0.1)"
                  },
                  {
                    offset: 1,
                    color: "rgba(250,180,101,0)"
                  }
                ])
              }
            },
            itemStyle: {
              normal: {
                color: //"#9E87FF"
                function(para) {
                  if (_b.highlight == true) {
                    if (para.name == _b.checkYear) {
                      return "#ffec00";
                    } else {
                      return "#9E87FF";
                    }
                  } else {
                    return "#9E87FF";
                  }
                }
              }
            },
            data: this.databorthree
          },
          {
            name:"电站造价",//"电价补贴",
            label: {
              normal: {
                show: false,
                position: "top"
              }
            },
            type: "line",
            smooth: true,
            yAxisIndex:1,
            lineStyle: {
              normal: {
                width: 1
              }
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(250,180,101,0.1)"
                  },
                  {
                    offset: 1,
                    color: "rgba(250,180,101,0)"
                  }
                ])
              }
            },
            itemStyle: {
              normal: {
                color: //"#51a4ff"
                function(para) {
                  if (_b.highlight == true) {
                    if (para.name == _b.checkYear) {
                      return "#ffec00";
                    } else {
                      return "#51a4ff";
                    }
                  } else {
                    return "#51a4ff";
                  }
                }
              }
            },
            data: this.databorfrou
          }
        ]
      };
      myChart.setOption(option);
      //年份高亮
      this.chartAction(myChart, "highlight", this.checkYear);
    },
    chartAction(instance, type, index) {
      if (instance != null && index != "" && index != null) {
        instance.dispatchAction({
          type: type,
          name: index
        });
      }
    }
  },
  watch: {},
  created() {},

  destoryed() {}
};
</script>

<style>
</style>
