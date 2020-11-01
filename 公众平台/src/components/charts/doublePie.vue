<template>
  <div :id="ids" style="height: 100%;"></div>
</template>

<script>
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
  methods: {
    initEcharts() {
      // var echarts = this.$echarts;
      var option = {
        tooltip: {
          trigger: "item",
          formatter: "{b} :<br /> {d}%  ({c})",
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
            radius: "66%",
            center: ["50%", "50%"],
            color: [
              new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#26ead1" },
                { offset: 0.5, color: "#2ad4a1" },
                { offset: 1, color: "#2dc076" }
              ]),
              new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#2edaff" },
                { offset: 0.5, color: "#17a6ff" },
                { offset: 1, color: "#0072ff" }
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
                // borderColor: "#1f395b"
              },
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
                // shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          },
          {
            //圆环
            type: "pie",
            radius: ["74%", "88%"],
            center: ["50%", "50%"],
            color: [
              new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#00efff" },
                { offset: 1, color: "#00c8ff" }
              ]),
              new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#ff8400" },
                { offset: 1, color: "#fb5e00" }
              ])
            ],
            data: this.data2,
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
          }
        ]
      };

      let myChart = this.$echarts.init(document.getElementById(this.ids));
      myChart.setOption(option);
    }
  },
  mounted() {
    this.initEcharts();
  }
};
</script>
<style></style>
