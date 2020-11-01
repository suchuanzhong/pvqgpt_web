<template>
  <div :id="ids" class="barHeight"></div>
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
            name: "2019年",
            type: "bar",
            data: [370, 332, 301, 334, 330, 320]
          },
          {
            name: "2020年",
            type: "bar",
            yAxisIndex: 0,
            data: [320, 332, 301, 334, 390, 0]
          }
        ];
      }
    },
    theme: {
      default: function() {
        return [
          "#ff9127",
          "#f9d000",
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
    theme2: {
      default: function() {
        return [
          "#ed7500",
          "#9c8300",
          "#62915a",
          "#9fa603",
          "#7c5a81",
          "#2bdee5",
          "#00e862",
          "#f9d000",
          "#9ee596",
          "#f2ff06",
          "#f0aef9"
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
        return ["用地(平方公里)", "小时"];
      }
    },
    axisData: {
      default: function() {
        return ["1月", "2月", "3月", "4月", "5月", "6月"];
      }
    }
  },
  data() {
    return {
      mychart: null
    };
  },
  mounted() {
    this.mychart = this.$echarts.init(document.getElementById(this.ids));
    this.drawChart();
  },
  computed: {
    TData() {
      var arr = [];
      this.dataArr.map(item => {
        var data = item.map(data => {
          return data.value;
        });
        arr.push(data);
      });
      return arr;
    }
  },
  methods: {
    drawChart() {
      var yAxis = [
        {
          type: "value",
          name: this.unit[0],
          splitNumber: 5,
          nameTextStyle: {
            fontSize: 14,
            color: "#000"
          },
          scale: false,
          axisLabel: {
            color: "#666666",
            fontSize: 14
          },
          max: this.max ? this.max : null,
          axisTick: {
            show: false
          },

          axisLine: {
            show: false,
            lineStyle: {
              color: "rgba(255,255,255,.3)"
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#e4e4e4"
            }
          }
        }
      ];

      var series = [],
        legend = [];
      var echarts = this.$echarts;
      var totalMax = [];
      for (var d = 0; d < this.dataArr.length; d++) {
        var max = Math.max.apply(null, this.dataArr[d].data);
        totalMax.push(max < 1 ? 1 : max);
      }
      var tMax = Math.max.apply(null, totalMax);

      for (var i = 0; i < this.dataArr.length; i++) {
        legend.push(this.dataArr[i].name);
        var maxArr = this.dataArr[i].data.map(value => {
          return tMax - value;
        });
        if (this.dataArr[i].yAxisIndex > 0 && yAxis.length == 1) {
          yAxis.push({
            name: this.unit[1],
            type: "value",
            splitNumber: 5,
            nameTextStyle: {
              fontSize: 14,
              color: "#000000"
            },
            scale: false,
            axisLabel: {
              color: "#666666",
              fontSize: 14
            },
            max: this.max ? this.max : null,
            axisLine: false,
            splitLine: {
              show: true,
              lineStyle: {
                color: "#e4e4e4"
              }
            }
          });
        }
        series.push(
          {
            name: this.dataArr[i].name,
            type: "bar",
            animation: false,
            stack: "two" + i,
            itemStyle: {
              normal: {
                show: true,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: this.theme2[i]
                  },
                  {
                    offset: 1,
                    color: this.theme[i]
                  }
                ]),
                barBorderRadius: 50,
                borderWidth: 0
              }
            },
            zlevel: 2,
            barWidth: 10,
            data: this.dataArr[i].data
          },
          {
            type: "bar",
            zlevel: 1,
            stack: "two" + i,
            tooltip: {
              show: false
            },
            name: this.dataArr[i].name,
            animation: false,
            itemStyle: {
              normal: {
                color: "#f0f0f0",
                borderWidth: 0,
                barBorderRadius: [50, 50, 0, 0],
                shadowBlur: {
                  shadowColor: "rgba(255,255,255,0.31)",
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowOffsetY: 2
                }
              },
              emphasis: {
                color: "#f0f0f0",
                borderWidth: 0,
                barBorderRadius: 50,
                shadowBlur: {
                  shadowColor: "rgba(255,255,255,0.31)",
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowOffsetY: 2
                }
              }
            },
            barWidth: 10,
            data: maxArr
          }
        );
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
          left: 0,
          right: 5,
          top: this.title ? 60 : 50,
          bottom: 20,
          containLabel: true
        },
        dataZoom: {
          show: true,
          type: "inside"
        },
        tooltip: {
          trigger: "axis",
          show: true,
          formatter: data => {
            var html =
              '<div class="toolTips"><span>' + data[0].axisValue + "</span>";
            for (var i = 0; i < data.length; i++) {
              html +=
                '<div><span style="font-size: 16px;font-family:DINOT;">' +
                data[i].seriesName +
                ":" +
                data[i].value +
                this.unit[i];
              ("</span></div>");
            }
            html += "</div>";
            return html;
          },
          axisPointer: {
            lineStyle: {
              color: "rgba(0,192,255,0.57)"
            }
          }
        },
        legend: {
          // show: legend.length > 1 ? true : false,
          show: false,
          data: legend,
          textStyle: {
            color: "#333"
          },
          type: "plain",
          itemHeight: 2,
          itemWidth: 8,
          right: 50,
          top: 0
        },
        xAxis: [
          {
            type: "category",
            data: this.axisData,
            axisLabel: {
              color: "#666666",
              // fontSize:14,
              fontSize: this.rotate && this.axisData.length > 5 ? 12 : 14
              // rotate:this.rotate&&this.axisData.length>5?60:0
              // interval:1
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#e4e4e4"
              }
            },
            avoidLabelOverlap: true,
            axisTick: false
          }
        ],

        yAxis: yAxis,
        series: series
      };
      if (this.rotate) {
        option.xAxis[0].axisLabel.interval = 0;
      }
      this.mychart.setOption(option);
      let _this = this;
      this.mychart.on("click", function(params) {
        _this.$emit(
          "clickBack",
          params.name,
          params.seriesName,
          _this.dataArr[0].path,
          _this.dataArr[0].dataName
        );
      });
    }
  }
};
</script>
<style scoped>
.barHeight {
  height: 100%;
  min-height: 220px;
  width: 100%;
  margin-top: 20px;
}
</style>
