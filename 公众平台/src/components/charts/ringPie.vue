<template>
  <div :id="ids" style="height: 100%;"></div>
</template>

<script>
export default {
  props: {
    ids: {
      default: "echartsPolar"
    },
    data: {
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
    }
  },
  methods: {
    initEcharts() {
      // var echarts=this.$echarts;
      var data = JSON.parse(JSON.stringify(this.data));
      var option = {
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
            type: "pie",
            radius: ["70%", "87%"],
            center: ["50%", "50%"],
            color: [
              new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#ff8400" },
                { offset: 1, color: "#fb5e00" }
              ]),
              new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#26ead1" },
                { offset: 0.5, color: "#2ad4a1" },
                { offset: 1, color: "#2dc076" }
              ]),
              new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#d466f9" },
                { offset: 1, color: "#74a7ff" }
              ])
            ],
            data: data,
            label: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                borderWidth: 5,
                borderColor: "#1f395b"
              },
              emphasis: {
                // borderWidth :0,
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
