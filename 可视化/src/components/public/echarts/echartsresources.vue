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
              name: "初始投资",
              type: "bar",
              yAxisIndex: 0,
              data:[0.49, 0.45, 0.43, 0.39, 0.37,0.36 ]
            },
            {
              name: "1800h",
              type: "line",
              symbol: 'triangle',
              yAxisIndex: 1,
              data: [0.3, 0.29,0.27, 0.24, 0.23,0.22]
            },
            {
              name: "1500h",
              type: "line",
              symbol: 'diamond',
              // yAxisIndex: 1,
              data: [0.37,0.34,0.32,0.3, 0.28,0.26]
            } ,
            {
              name: "1200h",
              type: "line",
              symbol: 'rect',
              // yAxisIndex: 1,
              data: [0.46,0.43, 0.38,0.37,0.36,0.35]
            } ,
            {
              name: "1000h",
              type: "line",
              symbol: 'rect',
              // yAxisIndex: 1,
              data: [0.55,0.51,0.48,0.46,0.43,0.42]
            },
            {
              name: "1100h",
              type: "line",
              symbol: 'rect',
              // yAxisIndex: 1,
              data: [0.55,0.51,0.48,0.46,0.43,0.42]
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
        this.drawChart(this.dataArr,this.axisData);
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
              color: "#82c2eb",
              fontSize: 14
            },
            scale: false,
            axisLabel: {
              color: "#82c2eb",
              fontSize: 14,
              fontStyle:"italic"
            },
            max: this.max ? this.max : null,
            axisTick: {
              show: false
            },

            axisLine: {
              show: false,
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

        for (var i = 0; i < seriesData.length; i++) {
          legend.push(seriesData[i].name);
          if (seriesData[i].yAxisIndex > 0 && yAxis.length == 1) {
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
                fontSize: 14
              },
              max: this.max ? this.max : null,
              axisLine: false,
              splitLine: false
            });
          }
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
            axisPointer: {
              lineStyle: {
                color: "rgba(0,192,255,0.57)"
              }
            },
            itemStyle: {
              normal: {
                color: this.theme[i]
              }
            },
            label: {
              normal: {
                show: false,
                position: "top",
                color: this.theme[1],
                fontFamily: "DINOT",
                fontSize: "14px"
              },
              emphasis: {
                color: "#01cfee"
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
              color: "#01cfee",
              fontFamily: "PingFang SC",
              fontWeight: "normal",
              fontSize: 16
            }
          },
          grid: {
            top: 38,
            left: 20,
            right: 15,
            bottom: 10,
            containLabel: false,
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
            right: "6%",
            top: "4%",
            textStyle: {
              color: "#82c2eb"
            },
            itemWidth: 20,
            itemHeight:8,
            itemGap: 10
          },
          xAxis: [
            {
              type: "category",
              data: xAxisData,
              axisLabel: {
                color: "#82c2eb",
                // fontSize:14,
                fontSize: this.rotate && xAxisData.length > 5 ? 12 : 14
                // rotate:this.rotate&&this.axisData.length>5?60:0
                // interval:1
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

