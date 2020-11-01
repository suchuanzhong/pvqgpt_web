<template>
  <div :id="ids" class="pres">
    <div v-if="dataArr.length == 0 || !dataArr" class="no-data">暂无数据</div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    ids: {
      default: "echartsBar"
    },
    showTimeLine: {
      default: false
    },
    theme: {
      default: function() {
        return ["#00a8f6", "#12c9fe"];
      }
    },
    yAxisName: {
      default: function() {
        return ["电站1", "电站2", "电站3"];
      }
    },
    unit: {
      default: "(亿元)"
    },
    name: {
      default: ""
    },
    dataArr: {
      default: function() {
        return [
          {
            year: "2015",
            data: [10, 20, 15],
            nameList: ["电站1", "电站2", "电站3"]
          },
          {
            year: "2016",
            data: [130, 20, 15],
            nameList: ["电站1", "电站2", "电站3"]
          },
          {
            year: "2017",
            data: [10, 23, 35],
            nameList: ["电站1", "电站2", "电站3"]
          },
          {
            year: "2018",
            data: [10, 50, 45],
            nameList: ["电站1", "电站2", "电站3"]
          }
        ];
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      // debugger
      if (this.dataArr.length == 0 || !this.dataArr) {
        return false;
      } else {
        this.initEcharts(this.dataArr);
      }
    });
  },
  methods: {
    initEcharts() {
      let mychart = this.$echarts.init(document.getElementById(this.ids));
      let echarts = this.$echarts;

      let timeOption = [];
      let timeArr = [];

      for (var i = 0; i < this.dataArr.length; i++) {
        var max = Math.max.apply(null, this.dataArr[i].data);
        timeArr.push(this.dataArr[i].year);
        var maxArr = this.dataArr[i].data.map(value => {
          return value < max ? max : value;
        });
        var option = {
          legend: {
            show: false
          },
          grid: {
            left: "6%",
            right: "6%",
            bottom: "34%",
            top: "3%",
            containLabel: true
          },

          tooltip: {
            trigger: "item"
          },
          yAxis: {
            type: "category",
            nameGap: 6,
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#e4e4e4"
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "#e4e4e4 "
              }
            },
            axisLabel: {
              textStyle: {
                color: "#666666",
                fontWeight: "normal",
                fontSize: "14"
              }
            },
            data: this.dataArr[i].nameList
          },
          xAxis: [
            {
              type: "value",
              position: "top",
              name: this.unit,
              nameLocation: "start",
              nameTextStyle: {
                color: "#000000",
                fontSize: 14,
                padding: [-10, 0, 0, 0]
              },
              axisTick: {
                show: false
              },
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
                inside: false,
                textStyle: {
                  color: "#666666",
                  fontWeight: "normal",
                  fontSize: "14"
                }
              }
            },
            {
              type: "value",
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                show: false
              },
              splitArea: {
                show: false
              },
              splitLine: {
                show: false
              }
            }
          ],
          series: [
            {
              name: this.name,
              type: "bar",
              itemStyle: {
                normal: {
                  show: true,
                  color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                    {
                      offset: 0,
                      color: this.theme[0]
                    },
                    {
                      offset: 1,
                      color: this.theme[1]
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
              tooltip: {
                show: false
              },
              barGap: "-100%",
              itemStyle: {
                normal: {
                  color: "#f0f0f0",
                  borderWidth: 0,
                  barBorderRadius: 50,
                  shadowBlur: {
                    shadowColor: "rgba(255,255,255,0.31)",
                    shadowBlur: 10,
                    shadowOffsetX: 2,
                    shadowOffsetY: 0
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
          ]
        };

        timeOption.push(option);
      }

      mychart.setOption({
        baseOption: {
          timeline: {
            show: this.showTimeLine,
            tooltip: false,
            autoPlay: this.showTimeLine,
            playInterval: 5000,
            data: timeArr,
            lineStyle: {
              color: "#dadada",
              width: 1
            },
            left: "10%",
            right: "10%",
            symbolSize: 6,
            label: {
              color: "#666666",
              fontSize: 14,
              formatter: function(value) {
                var date = new Date(value);
                var texts = date.getFullYear();
                return texts;
              }
            },
            itemStyle: {
              color: "#Fff",
              borderColor: "#666",
              shadowBlur: 10,
              shadowColor: "#fff",
              borderWidth: 0.5
            },
            checkpointStyle: {
              symbolSize: 15,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#1da63b"
                },
                {
                  offset: 1,
                  color: "#19b197"
                }
              ]),
              borderWidth: 5,
              borderColor: {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [
                  {
                    offset: 0,
                    color: "#25c182" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#fff" // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            },
            controlStyle: {
              color: "#aaaaaa",
              borderColor: "#aaaaaa"
            },
            emphasis: {
              label: {
                color: "#19b197",
                fontSize: 14
              },
              itemStyle: {
                color: "#19b197"
              },
              controlStyle: {
                color: "#19b197",
                borderColor: "#19b197",
                borderWidth: 1
              }
            }
          }
        },
        options: timeOption
      });
    }
  }
};
</script>
