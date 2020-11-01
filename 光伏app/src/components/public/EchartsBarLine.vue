<template>
  <div :id="ids" style="height:100%;width:100%;"></div>
</template>
<script>
import echarts from "echarts";
export default {
  props: {
    ids: {
      default: "echartsbar"
    },
    xAxisData: {
      default: function() {
        return ["1月", "2月", "5月"];
      }
    },
    seriesData: {
      default: function() {
        return [
          {
            
            name: "标杆电价",
            type: "bar",
            barMaxWidth: 14,
            data: [12, 34, 32]
          },
          {
            
            name: "入选主题电价",
            type: "bar",
            barMaxWidth: 14,
            data: [56, 23, 52]
          },
          {
            
            name: "降幅",
            type: "line",
            data: [56, 23, 52],
            yAxisIndex: 1
          }
        ];
      }
    },
    triggerEvent: {
      default: "false"
    },
    yName: {
      default:function(){
        return ['元/kW.h','%']
    }  
    },
    clickEvent: {
      default: function() {}
    },
    clickCount: {
      default: "0"
    },
    roleType:{
      default:"1"
    }
  },
  watch: {
    // seriesData(newVal, oldVal) {
    //   this.seriesData = newVal;
    // }
  },
  mounted() {
      this.initEchartsBar(this.seriesData);
      
  },
  methods: {
    initEchartsBar(seriesdata) {
       
      let legendData = [];
      if (seriesdata.length > 0) {
        for (let i = 0; i < seriesdata.length; i++) {
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
          top: "5px",
          itemWidth: 20,
          itemHeight: 8,
          textStyle: {
            fontSize: 10,
            color: "#999999"
          },
          icon: "circle"
        },
        color: [
          new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#65be24" },
            { offset: 1, color: "#47a63d" }
          ]),
          new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#ffc410" },
            { offset: 1, color: "#ff8f0b" }
          ])
        ],
        grid: {
          left: "10px",
          bottom: "10px",
          right: "10px",
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
            // interval:0
          },
          nameTextStyle: {
            color: color
          },
          triggerEvent: this.triggerEvent
        },
        yAxis: [
          {
            name: this.yName[0],
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
          },
          {
            name: this.yName[1],
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
              show: false
            }
          }
        ],
        series: seriesdata
      };
      let myChart = echarts.init(document.getElementById(this.ids));
      let _this = this;
      myChart.setOption(option);
    }
  }
};
</script>
<style lang="less"></style>