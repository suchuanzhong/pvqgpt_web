<template>
  <div class="barHeight">
    <div :id="ids" class="full"></div>
    <div :id="ids+'bg'" class="full full-bg"></div>
  </div>
</template>
<script>
  //   import EchartOption from "@/utils/initEcharts";
  export default {
    props:{
      ids:{
        default:'myParityDate'
      },

      data1:{
        default:function(){
          return [0.15, 0.25, 0.15, 0.5, 1]
        }
      },

      dataone:{
        default:function(){
          return [0.25, 0.5, 0.15, 0.5, 1]
        }
      },
      datatwo:{
        default:function(){
          return [0, 0.25, 0.75, 0.5, 1]
        }
      },
      datatime:{
        default:function(){
          return ['第一批次','第二批次','第三批次']
        }
      },
      // timebol:{
      //   default:false
      // },
      subText:{
        default:function(){
          return ['元/kW.h','%']
        }
      },
      title:{
        default:""
      },
    },
    data() {
      return {
        timedata:'',
        maxDatas:[]
      };
    },
    mounted() {

      this.drawChart();
    },
    computed: {

    },
    methods: {
      drawChart(series) {
        this.maxDatas = []
        let echarts = this.$echarts;
        this.mychart = this.$echarts.init(document.getElementById(this.ids));
        let option = {
          title: {
            text: this.title,
            left:0,
            top: 0,
            textStyle: {
              color: '#737373',
              fontFamily:"PingFang-SC",
              fontSize:16
            },
            // subtext:this.subText,
            subtextStyle: {
              width:'100%',
              align:"center",
              color: '#737373',
              fontFamily:"PingFang-SC",
              fontSize:14
            },
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['总装机', '企业装机','占比'],
            // align: 'left',
            // right:'5%',
            top:'0%',
            textStyle: {
              color: "#737373"
            },
            itemWidth: 16,
            itemHeight: 10,
            itemGap: 20
          },
          grid: {
            left: '2%',
            right: '0%',
            bottom: '0',
            containLabel: true
          },

          xAxis: [{
            type: 'category',
            data:this.datatime,
            axisLabel: {
              color: "#737373",
              fontSize:14,
              // fontSize: this.rotate && this.axisData.length > 5 ? 12 : 14
              // rotate:this.rotate&&this.axisData.length>5?60:0
              // interval:1
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(0, 131, 199, 0.2)"
              }
            },
            avoidLabelOverlap: true,
            axisTick: false
          }],
          yAxis: [{
            name:this.subText[0],
            type: 'value',
            splitNumber: 3,
            nameTextStyle: {
              color: "#737373",
              fontSize:16
            },
            scale: false,
            axisLabel: {
              color: "#737373",
              fontSize:16,
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
            },


          },{
            name:this.subText[1],
            type: 'value',
            splitNumber: 3,
            nameTextStyle: {
              color: "#737373",
              fontSize:16
            },
            scale: false,
            axisLabel: {
              color: "#737373",
              fontSize:16
            },
            max: this.max ? this.max : null,
            axisLine: false,
            splitLine: false ,
          }
          ],

          series: [
            {
              name: '总装机',
              type: 'bar',
              data: this.data1,
              barWidth: 12, //柱子宽度
              // barGap: 1, //柱子之间间距
              showBackground: true,
              backgroundStyle: {
                barBorderRadius: 10,
                color: 'rgba(220, 220, 220, 0.8)'
              },
              itemStyle: {
                normal: {
                  barBorderRadius: 10,
                  // show: true,
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#00a8f6'
                  }, {
                    offset: 1,
                    color: '#12c9fe'
                  }]),
                }
              },
            },

            {
              name: '企业装机',
              type: 'bar',
              data: this.dataone,
              barWidth: 12, //柱子宽度
              // barGap: 1, //柱子之间间距
              showBackground: true,
              backgroundStyle: {
                barBorderRadius: 10,
                color: 'rgba(220, 220, 220, 0.8)'
              },
              itemStyle: {
                normal: {
                  barBorderRadius: 10,
                  show: true,
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: .0,
                    color: '#1da63b'
                  }, {
                    offset: 1,
                    color: '#19b197'
                  }]),
                }
              }
            },
            {
              name: '占比',
              type: 'line',
              data:this.datatwo,
              yAxisIndex:1,
              itemStyle: {
                normal: {
                  borderWidth: 6,
                  color: 'rgba(33, 174, 204, 1)',
                }
              },
              areaStyle: {
                normal: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 1,
                    x2: 0,
                    y2: 0,
                    colorStops: [
                      {
                        offset: 0,
                        color: "rgba(31,101,217,.3)" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "rgba(36,255,189,0.1)" // 100% 处的颜色
                      }
                    ],
                    globalCoord: false // 缺省为 false
                  }
                }
              },
              lineStyle: {
                normal: {
                  width:4,
                  color: {
                    type: 'linear',

                    colorStops: [{
                      offset: 0,
                      color: 'rgba(31, 101, 217, 0.2)' // 0% 处的颜色
                    }, {
                      offset: 0.4,
                      color: 'rgba(31, 101, 217, .5)' // 100% 处的颜色
                    }, {
                      offset: 1,
                      color: 'rgba(36,255,189,1)' // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false
                  },
                  shadowBlur: 10,
                  shadowOffsetY: 7
                }
              }
            }
          ]
        };
        this.mychart.setOption(option);

      },

    }
  };
</script>
<style scoped>
  .barHeight {
    width: 100%;
    position: relative;
  }
  .full {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 9;
  }
  .full-bg {
    position: absolute;
    z-index: 0;
    top: 0;
    width: 100%;
    height: 100%;
    left: 0;
  }
</style>

