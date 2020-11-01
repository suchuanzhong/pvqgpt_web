<template>
  <div :id="ids" style="width:100%;height:100%;"></div>
</template>
<script>
export default {
  name: "echartsPie",
  props: {
    ids: {
      default: "echartsInnerPie"
    },
    seriesData: {
      default:function(){
        return {
          name:"标题",
          value:0.3
        }
      }
    },
    innerColor: {
      default: function() {
        return ["#ff8c37", "#ffdcc3"];
      }
    },
    radiusData: {
      default: function() {
        return [60, 70];
      }
    },
    textFontSize: {
      default: 14
    },
    innerTextFS:{
      default:14
    },
    textTop:{
      default:"86%"
    }
  },
  data() {
    return {};
  },
  mounted() {
    this.$nextTick(() => {
      this.initEcharts(
        this.seriesData,
        this.innerColor,
        this.radiusData,
        this.textFontSize,
        this.innerTextFS,
        this.textTop
      );
    });
  },
  methods: {
    initEcharts(seriesData,  radiusData, textFS,innerFS,textTop) {
      let myOption = this.$echarts.init(document.getElementById(this.ids));
      let option = {
        title: {
          text: seriesData.name,
          left: "50%",
          top: textTop,
          textAlign: "center",
          textStyle: {
            fontWeight: "normal",
            fontSize: textFS,
            color: colorList[0],
            textAlign: "center"
          }
        },
        series: {
          name: "",
          type: "liquidFill",
          clockWise: false,
          radius: radiusData,
          itemStyle: {
            normal: {
              color: colorList[0],
              shadowColor: colorList[0],
              shadowBlur: 0,
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
            }
          },
          hoverAnimation: false,
          center: ["50%", "50%"],
          data: [
            {
              value: seriesData.value,
              label: {
                normal: {
                  formatter: function(params) {
                    return params.value + "%";
                  },
                  position: "center",
                  show: true,
                  textStyle: {
                    fontSize: innerFS,
                    fontWeight: "bold",
                    color: colorList[0]
                  }
                }
              }
            },
            {
              // value: 100 - 50,
              value:100 - seriesData.value,
              name: "invisible",
              itemStyle: {
                normal: {
                  color: colorList[1]
                },
                emphasis: {
                  color: colorList[1]
                }
              }
            }
          ]
        }
      };

      myOption.setOption(option);
    }
  }
};
</script>
