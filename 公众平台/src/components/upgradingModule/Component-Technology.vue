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
      data: {
        default: function() {
          return [
            {
              name: "组件成本",
              type: "line",
              symbol: 'triangle',
              yAxisIndex: 0,
              data: [0.3, 0.29,0.27, 0.24, 0.23,0.22] ,


            },
            {
              name: "系统成本",
              type: "line",
              symbol: 'diamond',
              yAxisIndex: 1,
              data: [0.37,0.34,0.32,0.3, 0.28,0.26] ,

            }
          ];
        }
      },
      theme: {
        default: function() {
          return [
            "#0090FF",
            "#36CE9E",
            "#9793ff",
            "#fe9a8b",
          ];
        }
      },
      theme2: {
        default: function() {
          return [
            "rgba(0,144,255)",
            "rgb(54,206,158)",
            "rgb(151,147,255)",
            "rgb(0,232,6)",
            "rgb(254,154,139)",

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
        default:8
      },
      unit: {
        default: function() {
          return ["价格(元/W)"];
        }
      },
      year: {
        default: function() {
          return ["2015","2016", "2017", "2018","2019"];
        }
      },

      showLegend:{
        default:true
      }
    },
    data() {
      return {
        mychart: null
      };
    },
    mounted() {
      this.$nextTick(()=>{
        this.drawChart(this.data,this.year);
      })

    },

    methods: {
      drawChart(seriesData,xAxisData) {
        this.mychart = this.$echarts.init(document.getElementById(this.ids));
        var yAxis = [
          {
            type: "value",
            name: this.unit[0],
            splitNumber: 3,
            nameTextStyle: {
              color: "#737373",
              fontSize: 16
            },
            scale: false,
            axisLabel: {
              color: "#737373",
              fontSize: 16,
              // fontStyle:"italic"
            },
            max: this.max ? this.max : null,
            axisTick: {
              show: false
            },

            axisLine: {
              show: false,
              lineStyle: {
                color: "#737373",
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#737373",
              }
            }
          }
        ];

        var yAxisLength = 0;
        var series = [],
                legend = [];

        for (var i = 0; i < seriesData.length; i++) {
          legend.push(seriesData[i].name);
          if (seriesData[i].yAxisIndex > 0 && yAxis.length == 1) {
            yAxis.push({
              name: this.unit[1],
              type: "value",
              splitNumber: 3,
              nameTextStyle: {
                color: "#737373",
                fontSize: 16
              },
              scale: false,
              axisLabel: {
                color: "#737373",
                fontSize: 16
              },
              max: this.max ? this.max : null,
              axisLine: false,
              splitLine: false
            });
          }
          // debugger
          series.push({
            type: seriesData[i].type,
            name: seriesData[i].name,
            data: seriesData[i].data,
            barMaxWidth: this.barWidth,
            yAxisIndex: seriesData[i].yAxisIndex || 0,
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "shadow"
              }
            },
            areaStyle: {
              normal: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 1,
                  x2: 0,
                  y2: 0,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(3,92,255,.2)" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(2,228,255,0.2)" // 100% 处的颜色
                    }
                  ],
                  globalCoord: false // 缺省为 false
                }
              }
            },
            lineStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: this.theme2[i]
                  },
                  {
                    offset: 1,
                    color: this.theme2[i]
                  }
                ],
                globalCoord: false // 缺省为 false
              }
            },
            axisPointer: {
              lineStyle: {
                color: "#737373",
              }
            },
            itemStyle: {
              normal: {
                color: this.theme[i]
              },
            },

            label: {
              normal: {
                show: true,
                position: "top",
                // color: this.theme[1],
                fontSize: "16px"
              },
              emphasis: {
                color: "#737373"
              }
            }
          });
        }
        let option = {
          title: {
            text: this.title,
            top: 0,
            left: 0,
            textStyle: {
              color: "#737373",
              fontWeight: "normal",
              fontSize: 16
            }
          },
          grid: {
            top: "9%",
            left: "4%",
            right: "0%",
            bottom: "0%",
            containLabel: true,
            show: false // 网格边框是否显示，上和右边框
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
            data: legend,
            // icon: "rect",
            align: "left",
            left: "center",
            right: "0%",
            top: "0%",
            textStyle: {
              fontSize:16,
              color: "#737373"
            },
            itemWidth: 20,
            itemHeight:10,
            itemGap: 20
          },
          xAxis: [
            {
              type: "category",
              data: xAxisData,
              axisLabel: {
                color: "#737373",
                // fontSize:14,
                fontSize: 16
                // rotate:this.rotate&&this.year.length>5?60:0
                // interval:1
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: "#737373",
                }
              },
              avoidLabelOverlap: true,
              axisTick: false
            }
          ],

          yAxis: yAxis,
          series: series
        };
        // if (this.rotate) {
        //   // option.xAxis[0].axisLabel.interval = 0;
        // }
        this.mychart.setOption(option);
        // this.initBg(option);
      },

    }
  };
</script>

<style scoped>
  .barHeight {
    width: 100%;
    min-height: 700px;
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
