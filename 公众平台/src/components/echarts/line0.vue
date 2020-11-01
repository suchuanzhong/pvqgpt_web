<template>
  <div :id="ids" style="width：100%;height:100%;" class="echartsDiv">

  </div>
</template>

<script>
  // import {setTimeout} from 'timers';

  export default {
    data() {
      return {
        myChart: null
      }
    },
    props: {
      'ids': {
        default: 'myId'
      },
      'title': {
        default: ''
      },
      'showLegend': {
        default: function () {
          return false;
        }
      },
      'showMaxMin': {
        default: function () {
          return false;
        }
      },
      'showAverage': {
        default: function () {
          return false;
        }
      },
      data: {
        default: function () {
          return [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
        }
      },
      legend: {
        default: function () {
          return []
        }
      },
      xAxis: {
        default: function () {
          return ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        }
      },
      yName: {
        default: '辐射(W/㎡)'
      },
      unit: {
        default: 'kWh/㎡'
      }
    },
    mounted() {
      this.myChart = this.$echarts.init(document.getElementById(this.ids));
      this.initEcharts();
    },
    methods: {
      initEcharts() {
        var series = [];
        var color = ['rgba(31,101,217,1)', 'rgba(255,79,2,1)'];
        var lineColors = [
          [{offset: 0, color: 'rgba(31,101,217,1)'}, {offset: 1, color: 'rgba(36,255,189,1)'}],
          [{offset: 0, color: 'rgba(255,79,2,1)'}, {offset: 1, color: 'rgba(255,235,13,1)'}]
        ]
        var areaColors = [
          [{offset: 0, color: 'rgba(31,101,217,.2)'}, {offset: 1, color: 'rgba(36,255,189,.2)'}],
          [{
            offset: 0, color: 'rgba(255,79,2,.2)' // 0% 处的颜色
          }, {
            offset: 1, color: 'rgba(255,235,13,.2)' // 100% 处的颜色
          }]
        ]
        var myseries = {}
        this.legend.forEach((item, index) => {
          myseries = {
            name: item,
            symbol: 'none',
            symbolSize: 0,
            data: this.data[index],
            type: 'line',
            lineStyle: {
              normal: {
                width: 3,
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 1,
                  y2: 0,
                  colorStops: lineColors[index],
                  globalCoord: false // 缺省为 false
                },
                shadowColor: 'rgba(0,0,0,0.1)',
                shadowBlur: 1,
                shadowOffsetY: 10
              }
            },
            areaStyle: {
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 1,
                  y2: 0,
                  colorStops: areaColors[index],
                  globalCoord: false // 缺省为 false
                }
              }
            },
            smooth: true
          }
          if (this.showMaxMin) {
            myseries.markPoint = {
              data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
              ]
            }
          }
          if (this.showAverage) {
            myseries.markLine = {
              data: [
                {type: 'average', name: '平均值'}
              ]
            }
          }
          series.push(myseries)
        })
        var option = {
          color: color,
          title: {
            text: this.title,
            textStyle: {
              fontWeight: 'normal',
              fontSize: 16,
              color: '#F1F1F3'
            },
            x: 'center',
            top: 15
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              lineStyle: {
                color: '#57617B'
              }
            },
            formatter: (params) => {
              var result = params[0].name
              for (var i = 0; i < params.length; i++) {
                result += '<br><i class="legend-dot" style="background:' + params[i].color + '"></i>' + params[i].seriesName + '：' + params[i].data + " " + (this.unit || "")
              }
              return result
            }
          },
          legend: {
            icon: 'rect',
            itemWidth: 5,
            itemHeight: 5,

            itemGap: 13,
            top: 10,
            data: this.legend,

            right: '4%',
            textStyle: {
              fontSize: 12,
              color: '#F1F1F3'
            }

          },
          grid: {
            left: 60,
            right: 30,
            bottom: 40
          },
          xAxis: {
            type: 'category',
            data: this.xAxis,
            // boundaryGap: false,

            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            boundaryGap: false,
            axisLabel: {
              show: true,
              color: '#8e9cb1',
              fontSize: 14,
              // interval:0
            }
          },
          yAxis: {
            type: 'value',
            name: this.yName,
            nameTextStyle: {
              padding: [0, 0, 0, 40],
              color: '#8e9cb1',
              fontSize: '12px'
            },
            splitLine: {
              lineStyle: {
                color: ['#495971'],
                type: 'dashed'
              }
            },
            // max:100,
            axisLabel: {
              show: true,
              color: '#8e9cb1',
              fontSize: 14,
              interval: 2
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            }
          },
          series: series
        };
        // if(this.showLegend){
        //   option.legend.show=true
        // }else{
        //   option.legend.show=false
        // }
        // 当legend的长度大于2时才显示
        if (this.legend.length > 2 || this.legend.length == 2) {
          option.legend.show = true
        } else {
          option.legend.show = false
        }


        this.myChart.clear();
        this.myChart.setOption(option);

      }
    }
    }
</script>
