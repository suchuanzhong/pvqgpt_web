<template>
  <div style="width:100%;height:100%;position:relative">
    <div class="echarts-text">
      <big>{{ dataObj.value }}</big>
      <small>{{ dataObj.unit }}</small>
      <p>{{ dataObj.name }}</p>
    </div>
    <div :id="ids" style="width:100%;height:100%"></div>
  </div>
</template>
<script>
export default {
  props: {
    ids: {
      default: "pie"
    },
    dataObj: {
      default: function() {
        return {
          value: 80,
          unit: "%",
          name: "电站"
        };
      }
    }
  },
  mounted() {
    this.initEcharts();
  },
  methods: {
    initEcharts() {
      let mychart = this.$echarts.init(document.getElementById(this.ids));
      // let echarts = this.$echarts;
      let option = {
        title: {
          show: false,
          x: "center",
          y: "center"
        },
        backgroundColor: "#fff",
        color: ["#f0f0f0"],
        legend: {
          show: false,
          itemGap: 12,
          data: ["01", "02"]
        },

        series: [
          {
            name: "Line 1",
            type: "pie",
            clockWise: true,
            radius: ["80%", "100%"],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            hoverAnimation: false,
            data: [
              {
                value: this.dataObj.value,
                name: "01",
                itemStyle: {
                  normal: {
                    color: {
                      // 完成的圆环的颜色
                      colorStops: [
                        {
                          offset: 1,
                          color: "#e26a0a" // 0% 处的颜色
                        },
                        {
                          offset: 0,
                          color: "#ffe400" // 100% 处的颜色
                        }
                      ]
                    },
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  }
                }
              },
              {
                name: "02",
                value: 100 - this.dataObj.value,
                itemStyle: {
                  emphasis: {
                    color: "#f0f0f0"
                  }
                }
              }
            ]
          }
        ]
      };
      mychart.setOption(option);
    }
  }
};
</script>
<style lang="scss">
.echarts-text {
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  z-index: 99;
  transform: translate(-50%, -50%);
  text-align: center;
  small {
    color: #ff7301;
    font-size: 16px;
  }
  big {
    font-family: "";
    font-size: 24px;
    color: #ff7301;
  }
  p {
    position: absolute;
    top: 200%;
    width: 100%;
    margin-top: 20px;
    color: #666666;
    font-size: 16px;
  }
}
</style>
