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
            name: "省级以上技术",
            value: 169
          },
          {
            name: "高新技术企业",
            value: 852
          },
          {
            name: "自主培育上市公司",
            value: 22
          },
          {
            name: "加速器",
            value: 8
          },
          {
            name: "总创空间",
            value: 37
          }
        ];
      }
    }
  },
  data() {
    return {
      colorList: [
        "#0068d3",
        "#0068d3",
        "#007fd3",
        "#00c2e0",
        "#00dfe4",
        "#00aa36"
      ]
    };
  },
  mounted() {
    this.initEcharts();
  },
  methods: {
    initEcharts() {
      // var echarts=this.$echarts;
      var data = JSON.parse(JSON.stringify(this.data));

      var imgurl =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4BpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjOTY2NGEyYy1kYWY1LTlmNGItYTUzNi1mYmFlOGE5NWYxY2EiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjQzNDRBODhCMDNEMTFFQTgyREJCQjFBQUE2RDA1NUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjQzNDRBODdCMDNEMTFFQTgyREJCQjFBQUE2RDA1NUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3NDgwNjM0Yy1lZWYyLTgwNGYtOGFkOS1kZjMxMjBjODQ2NjgiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo2YTliNGNjNC1kZWFhLTExZTktYjFjYS1lMzg4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";

      var option = {
        tooltip: {
          trigger: "item",
          formatter: "{b} : {d}% ({c}MW)"
        },
        graphic: {
          elements: [
            {
              type: "image",
              style: {
                image: imgurl,
                width: 150,
                height: 150
              },
              left: "center",
              top: "center"
            }
          ]
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
        grid: {
          top: 0,
          bottom: "5%"
        },
        series: [
          {
            type: "pie",
            radius: ["55%", "63%"],
            center: ["50%", "50%"],
            color: [
              new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#2edaff" },
                { offset: 0.5, color: "#17a6ff" },
                { offset: 1, color: "#0072ff" }
              ]),
              new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#26ead1" },
                { offset: 0.5, color: "#2ad4a1" },
                { offset: 1, color: "#2dc076" }
              ]),
              new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#b6caf5" },
                { offset: 1, color: "#7487ae" }
              ]),
              new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#ff8400" },
                { offset: 1, color: "#fb5e00" }
              ]),
              new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#d466f9" },
                { offset: 1, color: "#74a7ff" }
              ])
            ],
            data: data,
            labelLine: {
              normal: {
                show: true,
                length: 20,
                length2: 10,
                lineStyle: {
                  color: "rgba(208,208,208,.2)",
                  width: 1
                }
              }
            },
            label: {
              normal: {
                formatter: "{d|{c}MW}\n{hr|}\n{c|{b}}",
                rich: {
                  hr: {
                    backgroundColor: "rgba(208,208,208,.2)",
                    width: "100%",
                    height: 1
                  },
                  d: {
                    color: "#129aff",
                    fontSize: 20,
                    align: "left",
                    padding: 4,
                    lineHeight: 24,
                    fontFamily: "euro_regular"
                    // fontFamily: 'DINOT'
                  },
                  c: {
                    fontSize: 16,
                    color: "#666",
                    align: "left",
                    padding: 4
                  }
                }
              }
            },
            itemStyle: {
              normal: {
                borderWidth: 3,
                borderColor: "#fff"
              },
              emphasis: {
                borderWidth: 0,
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
  }
};
</script>
<style></style>
