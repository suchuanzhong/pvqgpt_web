<template>
  <div :id="ids" style="height:100%;width:100%;"></div>
</template>
<script>
import echarts from "echarts";
export default {
  props: {
    ids: {
      default: "runanalysisBar"
    },
    xAxisData: {
      default: function() {
        return ["1月", "2月", "3月"];
      }
    },
    seriesData: {
      default: function() {
        return [
          {
            data: [12, 34, 32],
            type: "bar",
            barMaxWidth: 14,
            name: "发电量"
          },
          {
            data: [56, 23, 52],
            type: "bar",
            barMaxWidth: 14,
            name: "经济效益"
          }
        ];
      }
    },
    yNamel: {
      default: "发电量 (万kWh)"
    },
    legendOrient: {
      default: "horizontal"
    }
  },
  watch: {
    seriesData(newVal, oldVal) {
      this.seriesData = newVal;
    }
  },
  mounted() {
      this.initEchartsBar(this.seriesData);
  },
  methods: {
    initEchartsBar(seriesdata) {
      let legendData = [];
      if (seriesdata.length > 0) {
        for (let i in seriesdata) {
          legendData.push(seriesdata[i].name);
        }
      }
      let color = "#999999";
      let option = {
        tooltip: {
          show: true,
          trigger: "axis",
          position: function(point, params, dom, rect, size) {
            // 鼠标坐标和提示框位置的参考系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
            // 提示框位置
            var x = 0; //x轴
            var y = 0; //y轴
            // 当前鼠标位置
            var pointX = point[0];
            var pointY = point[1];
            // 提示框大小
            var boxWidth = size.contentSize[0];
            var boxHeight = size.contentSize[1];
            // boxWidth > pointX 说明鼠标左边放不下提示框
            if (boxWidth > pointX) {
              x = 5;
            } else {
              //左边放的下
              x = pointX - boxWidth;
            }
            // boxHeight > pointY说明鼠标上边放不下提示框
            if (boxHeight > pointY) {
              y = 5;
            } else {
              //上边放得下
              y = pointY - boxHeight;
            }
            return [x, y];
          }
        },
        dataZoom: [{ type: "inside" }],
        legend: {
          data: legendData,
          right: "16px",
          top: "2px",
          itemWidth: 20,
          itemHeight: 8,
          textStyle: {
            fontSize: 10,
            color: "#999999"
          },
          icon: "circle",
          orient: this.legendOrient
        },
        color: [
          new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#65be24" },
            { offset: 1, color: "#47a63d" }
          ]),
          new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#ffc410" },
            { offset: 1, color: "#ff8f0b" }
          ]),
          new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#00c6ff" },
            { offset: 1, color: "#00c6ff" }
          ])
        ],
        grid: {
          left: "30px",
          bottom: "5px",
          right: "30px",
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: this.xAxisData,
          axisLine: {
            lineStyle:{
              color:"#e4e4e4"
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: color
          },
          nameTextStyle: {
            color: color
          }
        },
        yAxis: [
          {
            name: this.yNamel,
            type: "value",
            axisLine: {
              show: false
            },
            nameTextStyle: {
              color: color,
              padding: [0, 0, 0, 35]
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: color,
              fontSize: 14
            },
            splitLine: {
              lineStyle:{
                color:"#e4e4e4"
              }
            }
          }
        ],
        series: seriesdata
      };
      let myChart = echarts.init(document.getElementById(this.ids));
      myChart.setOption(option);
    }
  }
};
</script>
<style lang="less"></style>