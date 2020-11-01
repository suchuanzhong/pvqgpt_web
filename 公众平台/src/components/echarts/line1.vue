<template>
  <div :id="ids" style="width：100%;height:80%;" class="echartsDiv"></div>
</template>

<script>
// import { setTimeout } from 'timers';
export default {
  data() {
    return {
      myChart: null,
      xAxisdata: [],
      newlegend: []
    };
  },
  props: {
    ids: {
      default: "myId"
    },
    title: {
      default: ""
    },
    showLegend: {
      default: function() {
        return true;
      }
    },
    showMaxMin: {
      default: function() {
        return false;
      }
    },
    showAverage: {
      default: function() {
        return false;
      }
    },
    legend: {
      default: function() {
        return ["理论发电量", "理论发电量"];
      }
    },
    data: {
      default: function() {
        return [
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
      }
    },
    xAxis: {
      default: function() {
        return [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月"
        ];
      }
    },
    yName: {
      default: ""
    },
    unit: {
      default: ""
    },
    max: {
      default: function() {
        return 3;
      }
    }
  },
  created() {},
  mounted() {
    this.myChart = this.$echarts.init(document.getElementById(this.ids));
    this.initEcharts();
  },
  watch: {
    //  xAxis(newval,oldval){console.log(newval,oldval)}
  },
  computed: {
    tooltipObj() {
      // let type = this.currentTimeType;
      // let date = this.currentTime;
      return {
        trigger: "axis",
        axisPointer: {
          type: "line",
          lineStyle: {
            opacity: 0
          }
        },
        formatter: function(params) {
          var result = "";
          result = params[0].axisValue + "<br/>";
          params.forEach(function(item) {
            result +=
              '<span style="background:' +
              item.color +
              ';display:inline-block;margin-right:5px;-webkit-border-radius: 10px;-moz-border-radius: 10px;border-radius:10px;width:10px;height:10px;"></span>' +
              item.seriesName +
              " : " +
              (item.data == null ? "--" : item.data) +
              "<br/>";
          });
          return result;
        }
      };
    }
  },
  methods: {
    initEcharts() {
      this.xAxisdata = [
        ...this.xAxis.map(i => this.$moment(i).format("YYYY-MM-DD HH:mm"))
      ];
      // this.legend = [...this.legend.map(i=>'设备编号'+ i)];
      // console.log(this.newlegend)
      var series = [];
      var color = [
        "rgba(31,101,217,1)",
        "rgba(36,255,189,1)",
        "rgba(255,79,2,1)",
        "rgba(255,235,13,1)",
        "#8000FF"
      ];
      var lineColors = [
        "rgba(31,101,217,1)",
        "rgba(36,255,189,1)",
        "rgba(255,79,2,1)",
        "rgba(255,235,13,1)",
        "#8000FF"
      ];

      // var areaColors=[
      //   [{offset: 0, color: 'rgba(31,101,217,.2)' }, {offset: 1, color: 'rgba(36,255,189,.2)'}],
      //   [{
      //     offset: 0, color: 'rgba(255,79,2,.2)' // 0% 处的颜色
      //   }, {
      //     offset: 1, color: 'rgba(255,235,13,.2)' // 100% 处的颜色
      //   }]
      // ]
      var myseries = {};
      this.legend.forEach((item, index) => {
        myseries = {
          name: item,
          symbol: "none",
          symbolSize: 0,
          data: this.data[index],
          type: "line",
          lineStyle: {
            normal: {
              width: 3,
              color: lineColors[index]
              // {
              //   type: 'linear',
              //   x: 0,
              //   y: 0,
              //   x2: 1,
              //   y2: 0,
              //   // colorStops: lineColors[index],
              //   colorStops: 'red',
              //   globalCoord: false // 缺省为 false
              // },
              // shadowColor: 'rgba(0,0,0,0.1)',
              // shadowBlur: 1,
              // shadowOffsetY: 10
            }
          },
          // areaStyle:{
          //   normal:{
          //     color: {
          //       type: 'linear',
          //       x: 0,
          //       y: 0,
          //       x2: 1,
          //       y2: 0,
          //       colorStops:areaColors[index],
          //       globalCoord: false // 缺省为 false
          //     }
          //   }
          // },
          smooth: true
        };
        // if(this.showMaxMin){
        //   myseries.markPoint={
        //         data: [
        //             {type: 'max', name: '最大值'},
        //             {type: 'min', name: '最小值'}
        //         ]
        //     }
        // }
        // if(this.showAverage){
        //   myseries.markLine={
        //       data: [
        //           {type: 'average', name: '平均值'}
        //       ]
        //   }
        // }
        series.push(myseries);
      });
      var option = {
        color: color,
        title: {
          text: this.title,
          textStyle: {
            fontWeight: "normal",
            fontSize: 16,
            color: "#F1F1F3"
          },
          x: "center",
          top: 15
        },
        tooltip: this.tooltipObj,
        // {
        //   trigger: 'axis',
        //   axisPointer: {
        //     lineStyle: {
        //       color: '#57617B'
        //     }
        //   },
        // formatter:(params,ticket,callback)=>{
        //   var result=params[0].name
        //   for(var i=0;i<params.length;i++){
        //     result+='<br><i class="legend-dot" style="background:'+params[i].color+'"></i>'+params[i].seriesName+'：'+
        //     (params[i].data==null?'--':params[i].data)+
        //     " "+(this.unit||"")
        //   }
        //   return result
        // }

        // },
        legend: {
          icon: "rect",
          itemWidth: 10,
          itemHeight: 10,

          itemGap: 13,
          top: 10,
          data: this.legend,
          show: true,
          right: "4%",
          textStyle: {
            fontSize: 12,
            color: "#F1F1F3"
          }
        },
        grid: {
          left: 60,
          right: 30,
          bottom: 60
        },
        dataZoom: [
          {
            type: "slider",
            xAxisIndex: 0,
            filterMode: "empty",
            textStyle: {
              color: "#8e9cb1"
            }
          }
          // {
          //     type: 'slider',
          //     yAxisIndex: 0,
          //     filterMode: 'empty'
          // },
          // {
          //     type: 'inside',
          //     xAxisIndex: 0,
          //     filterMode: 'empty'
          // },
          // {
          //     type: 'inside',
          //     yAxisIndex: 0,
          //     filterMode: 'empty'
          // }
        ],
        xAxis: {
          type: "category",
          data: this.xAxisdata,
          // boundaryGap: false,

          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#495971"
            }
          },
          boundaryGap: false,
          axisLabel: {
            show: true,
            color: "#8e9cb1",
            fontSize: 14,
            // interval:59,
            minInterval: 1,
            maxInterval: 3600 * 24 * 1000
          }
        },
        yAxis: {
          type: "value",
          name: this.yName,
          nameTextStyle: {
            padding: [0, 0, 0, 100],
            color: "#8e9cb1",
            fontSize: 16
          },
          splitNumber: 5,
          splitLine: {
            lineStyle: {
              color: ["#495971"],
              type: "dashed"
            }
          },
          // max:100,
          // splitNumber:2,
          axisLabel: {
            show: true,
            color: "#8e9cb1",
            fontSize: 14
            // interval:5
          },
          // axisTick: {
          //   show: false
          // },
          axisLine: {
            lineStyle: {
              color: "#495971"
            }
          }
        },
        series: series
      };
      // if (!app.inNode) {
      //     setTimeout(function () {
      //         // Add shadow circles (which is not visible) to enable drag.
      //         this.myChart.setOption({
      //             graphic: echarts.util.map(data, function (item, dataIndex) {
      //                 return {
      //                     type: 'circle',
      //                     position: this.myChart.convertToPixel('grid', item),
      //                     shape: {
      //                         cx: 0,
      //                         cy: 0,
      //                         r: symbolSize / 2
      //                     },
      //                     invisible: true,
      //                     draggable: true,
      //                     ondrag: echarts.util.curry(onPointDragging, dataIndex),
      //                     z: 100
      //                 };
      //             })
      //         });
      //     }, 0);

      //     window.addEventListener('resize', updatePosition);
      // }

      // this.myChart.on('dataZoom', updatePosition);

      // function updatePosition() {
      //     this.myChart.setOption({
      //         graphic: echarts.util.map(data, function (item, dataIndex) {
      //             return {
      //                 position: this.myChart.convertToPixel('grid', item)
      //             };
      //         })
      //     });
      // }

      // function onPointDragging(dataIndex, dx, dy) {
      //     data[dataIndex] = this.myChart.convertFromPixel('grid', this.position);

      //     // Update data
      //     this.myChart.setOption({
      //         series: [{
      //             id: 'a',
      //             data: data
      //         }]
      //     });
      // }

      this.myChart.clear();
      this.myChart.setOption(option);
      //  console.log(option);
    }
  }
};
</script>
