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
            name: "利用小时数2",
            type: "bar",
            yAxisIndex: 1,
            data: [0.5, 0.332, 0.301, 0.334, 0.39]
          }
        ];
      }
    },
    theme: {
      default: function() {
        return [
          "#51a4ff",
          // "#51a4ff",
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
        return ["km²", "h"];
      }
    },
    axisData: {
      default: function() {
        return ["2014", "2015", "2016", "2017", "2018"];
      }
    },

    showLegend: {
      default: false
    }
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
    drawChart() {
      this.mychart = this.$echarts.init(document.getElementById(this.ids));
      var yAxis = [
        {
          type: "value",
          name: this.dataArr.length==1?'':this.unit[0],
          nameLocation:"start",
          nameGap:5,
          boundaryGap: [0, 0.01],
          nameTextStyle: {
            color: "#82c2eb",
            fontSize: 12
          },
          scale: false,
          axisLabel: {
            color: "#82c2eb",
            fontSize: 14
          },
          max: this.max ? this.max : null,
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

      for (var i = 0; i < this.dataArr.length; i++) {
        // console.log(this.dataArr[i].data)
        legend.push(this.dataArr[i].name);
        if (this.dataArr[i].yAxisIndex > 0 && yAxis.length == 1) {
          yAxisLength++;
          yAxis.push({
            name: this.unit[1],
            nameLocation:"start",
            nameGap:5,
            type: "value",
            nameTextStyle: {
              color: "#82c2eb"
            },
            scale: false,
            axisLabel: {
              color: "#82c2eb",
              fontSize: 12
            },
            avoidLabelOverlap: true,
            axisTick: {
              show: false
            },
            max: this.max ? this.max : null,
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(0, 131, 199, 0.4)"
              }
            },
            splitLine: false
          });
        }
        let _this=this;
        series.push({
          type: this.dataArr[i].type,
          name: this.dataArr[i].name,
          data: this.dataArr[i].data.reverse(),
          barMaxWidth: this.barWidth,
          xAxisIndex: this.dataArr[i].yAxisIndex || 0,
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
            // normal: {
              color: this.theme[i]
              // color: (params)=> {            
              //        // 给出颜色组     
              //         var colorList = ['#ff9d00','#17e0be','#0066ff'];
              //         return params.dataIndex>(_this.dataArr[0].data.length-4)?colorList[_this.dataArr[0].data.length-1-params.dataIndex]:'#51a4ff'
              // }
            // }
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
          text: legend.length<=1?this.title+'('+this.unit[0]+')':'',//this.title,
          top: 10,
          left: 10,
          textStyle: {
            color: "#82c2eb",
            fontFamily: "PingFang SC",
            fontWeight: "normal",
            fontSize: 14
          }
        },
        color:this.theme,
        grid: {
          top: 40,
          left: 40,
          right: 30,
          bottom: 10,
          containLabel: true
        },
        dataZoom: {
          show: true,
          type: "inside"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          show: legend.length>1?true:false,
          // show: yAxisLength>0?true:false,
          data: legend,
          icon: "circle",
          align: "left",
          left: "center",
          top: "1%",
          textStyle: {
            color: "#82c2eb"
          },
          itemWidth: 6,
          itemHeight: 6,
          itemGap: 20
        },
        yAxis: [
          {
            type: "category",
            data: this.axisData.reverse(),
            axisLabel: {
              color: "#82c2eb",
              fontSize:14,
              // fontSize: this.rotate &&this.axisData&&this.axisData.length > 5 ? 12 : 14
              // rotate:this.rotate&&this.axisData.length>5?60:0
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

        xAxis: yAxis,
        series: series
      };
      // if (this.rotate) {
      // option.xAxis[0].axisLabel.interval = 0;
      // }
      this.mychart.setOption(option);
      this.initBg(option);
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
        if (item.type == "bar" && item.xAxisIndex != index) {
          let dataArr = this.getMaxArr(item.data);
          return dataArr&&dataArr.length > 0 ? dataArr[0] : 0;
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
      let newyAxis = option.xAxis.map(item => {
        return {
          type: "value",
          name: item.name||"",
          nameTextStyle: {
            color: "rgba(0,0,0,0)"
          },
          boundaryGap: [0, 0.01],
          
          axisLabel: {
            // formatter: '{value} %',
            color: "rgba(255,255,255,0)",
            fontSize: 16
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
        };
      });
      let optionBg = {
        title: {
          show: false
        },

        // title: EchartOption.title(this.title),
        legend: {
          show: false
        },
        grid: {
          top: 40,
          left: 40,
          right: 30,
          bottom: 10,
          containLabel: true
        },
        yAxis: [
          {
            type: "category",
            data: this.axisData,
            axisLine: {
              show: false,
              lineStyle: {
                color: "#023f66",
                width: 1,
                type: "solid"
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false,

              textStyle: {
                color: "#82c2eb"
              }
            }
          }
        ],
        xAxis: newyAxis
      };

      let yAxisIndex = 0;
      this.dataArr.forEach(item => {
        if (item.yAxisIndex == 1) {
          yAxisIndex = 1;
        }
      });
      let maxData = this.getMaxSeriseData(option.series, 1);
      let maxDatas = this.axisData.map(value => {
        return maxData[0];
      });
      let mychartBg = echarts.init(document.getElementById(this.ids + "bg"));
      optionBg.series = [
        {
          name: "",
          type: "bar",
          color: "#00BFFF",
          //stack: '总量',
          tooltip: {
            show: false
          },
          barWidth: this.barWidth * option.series.length + 12,
          itemStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(1, 0, 0, 0, [
                {
                  offset: 0,
                  color: "rgba(18, 117, 179,0)"
                },
                {
                  offset: 0.5,
                  color: "rgba(18, 117, 179,.5)"
                },
                {
                  offset: 1,
                  color: "rgba(18, 117, 179,0)"
                }
              ])
              // barBorderRadius: 10,
            }
          },
          data: maxDatas
        }
      ];
      if (yAxisIndex == 1) {
        let maxDataIndex = this.getMaxSeriseData(option.series, 0);
        let maxDatasIndex = this.axisData.map(value => {
          return maxDataIndex[0];
        });
        optionBg.series.push({
          name: "",
          type: "bar",
          color: "#00BFFF",
          //stack: '总量',
          tooltip: {
            show: false
          },
          barWidth: this.barWidth * option.series.length + 12,
          xAxisIndex: 1,
          barGap: "-100%",
          itemStyle: {
            normal: {
              color: "rgba(18, 117, 179,0)"
              // barBorderRadius: 10,
            }
          },
          data: maxDatasIndex
        });
      }
      mychartBg.setOption(optionBg);
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

