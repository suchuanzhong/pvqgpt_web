<template>
  <div :id="ids" style="height: 100%;"></div>
</template>

<script>
import echarts from "echarts";
export default {
  props: {
    ids: {
      default: "echartsPolar"
    },
    data1: {
      //中心饼图数据
      default: function() {
        return [
          {
            name: "自主培育上市\n公司",
            value: 22
          },
          {
            name: "总创空间",
            value: 37
          }
        ];
      }
    },
    data2: {
      //圆环数据
      default: function() {
        return [
          { value: 310, name: "邮件营销" },
          { value: 135, name: "视频广告" }
        ];
      }
    }
  },
  watch:{
	  	data1(newVal){
			  this.data1 = newVal;
		},
		data2(newVal2){
			  this.data2 = newVal2;
		}
  },
  mounted() {
      this.initEcharts();
  },
  methods: {
    initEcharts() {
      const option = {
        tooltip: {
          trigger: "item",
          formatter: "{b} : {d}%  ({c})"
        },
        legend: {
          orient: "horizontal",
          icon: "circle",
          bottom: 20,
          x: "center",
          textStyle: {
            color: "#fff"
          },
          show: false
        },
        series: [
          {
            //扇形
            name: "访问来源",
            type: "pie",
            radius: "46%",
            center: ["50%", "50%"],
            color: [
              new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#2edaff" },
                { offset: 0.5, color: "#17a6ff" },
                { offset: 1, color: "#0072ff" }
              ]),
              new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#26ead1" },
                { offset: 0.5, color: "#2ad4a1" },
                { offset: 1, color: "#2dc076" }
              ]),
              new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#b6caf5" },
                { offset: 1, color: "#7487ae" }
              ]),
              new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#ff8400" },
                { offset: 1, color: "#fb5e00" }
              ]),
              new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#d466f9" },
                { offset: 1, color: "#74a7ff" }
              ])
            ],
            data: this.data1,
            label: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                borderWidth: 5,
                borderColor: "#fff"
              },
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          },
          {
            //圆环
            type: "pie",
            radius: ["50%", "58%"],
            center: ["50%", "50%"],
            color: ["#4cac0e", "#4cac0e", "#4cac0e", "#4cac0e", "#4cac0e"],
            data: this.data2,
            labelLine: {
              normal: {
                show: true,
                length: 2,
                length2: 8,
                smooth:true,
                lineStyle: {
                  color: "#aaaaaa",
                  width: 1
                }
              }
            },
            label: {
              normal: {
                formatter: "{d|{c}} {a|万元}\n{hr|}\n{c|{b}}",
                rich: {
                  hr: {
                    backgroundColor: "#aaaaaa",
                    width: "100%",
                    height: 1
                  },
                  a: {
                    color: "#999999",
                    fontSize:12
                  },
                  d: {
                    color: "#7bd566",
                    fontSize: 22,
                    align: "left",
                    padding: 4,
                    lineHeight: 24,
                    fontFamily: "DIN OT"
                  },
                  c: {
                    fontSize: 14,
                    color: "#333333",
                    align: "left",
                    padding: 4
                  }
                }
              }
            },
            itemStyle: {
              normal: {
                borderWidth: 5,
                borderColor: "#fff"
              },
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(255, 255, 255, 0.5)"
              }
            }
          }
        ]
      };

      let myChart = echarts.init(document.getElementById(this.ids));
      myChart.setOption(option);
    }
  }
};
</script>
<style>
</style>
