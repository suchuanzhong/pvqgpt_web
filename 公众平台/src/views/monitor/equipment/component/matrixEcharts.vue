/* 方阵功率 */
<template>
  <div class="containter2" id="containter2" style="height:250px;"></div>
</template>

<script>
export default {
  props: ["transData", "nodedata"],
  data() {
    return {
      powerEcharts: null,
      series_pwr: [],
      xaxisData:[],
      legendData:["交流有功功率","直流有功功率","斜面辐射",],
      newData:null
    };
  },
  mounted() {
    this.initChart();
  },
  watch: {
    transData(newVal) {
      function add0(m){return m<10?'0'+m:m };
      // let startTime=new Date(localStorage.startTime);
      // let endTime=new Date(localStorage.endTime);
      console.log('登录需修改')
      let startTime=new Date('2019-06-12T05:00:00');
      let endTime=new Date("2019-06-12T19:00:00");
   
      let date1=new Date('2016/03/1 '+startTime.getHours()+":"+startTime.getMinutes());
      let date2=new Date('2016/03/1 '+endTime.getHours()+":"+endTime.getMinutes());
      this.xaxisData=[];
      for(var i=date1;i<=date2;i.setMinutes(i.getMinutes()+5)){
        this.xaxisData.push(add0(i.getHours())+":"+add0(i.getMinutes()));
      }
      this.newData = newVal;
      // this.series_pwr=this.xaxisData.map((n,i)=>{
      //   if(newVal[i]){
      //     let da=(newVal[i]).filter(item=>item.timestamp.length==19&&item.timestamp.substr(-8,5)==n);
      //     if(da.length>0){
      //       return da[0].datavalue
      //     }
      //     return null;
      //   }
      // });
      this.initChart();
    }
  },
  methods: {
    initChart() {
      var echarts = this.$echarts;
      this.powerEcharts = echarts.init(document.getElementById("containter2"));
      var seriesData =[];
      var lineColors = [
            new this.$echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [{offset: 0, color: 'rgba(2,253,73,1)'}, {offset: 1, color: 'rgba(29,241,184,1)'}]
            ),
            new this.$echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [{offset: 0, color: 'rgba(255,121,15,1)'}, {offset: 1, color: 'rgba(255,234,46,1)'}]
            ),
            new this.$echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [{offset: 0, color: 'rgba(255,83,135,1)'}, {offset: 1, color: 'rgba(255,83,135,1)'}]
            )  
        ]
        var newlegendData= []
      this.legendData.forEach((sub,index) => {
        seriesData.push({
            name: sub,
            type: "line",
            smooth: true,
            data: this.xaxisData.map(t => {
              let dataCol = this.newData[index].filter(item =>item.timestamp.length==19&&item.timestamp.substr(-8,5)==t );
              if(dataCol && dataCol.length>0) return dataCol[0].datavalue
              else return null
            }),
           lineStyle: {
                normal: {
                    width: 3,
                    color: lineColors[index],
                }
            },
            yAxisIndex: index==0?0:1,
            // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(255,193,26,0.1)" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(255,193,26,0.01)" // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              }
            },
            showSymbol: true,
            symbolSize: 1, //设定实心点的大小
            animation: true
        });
        newlegendData.push({
          name:sub,
          textStyle:{
            color: lineColors[index]
          }
        })
        
      })
      var option = {
        // color: ["rgb(255,193,26)", "rgb(15,231,230)", "rgb(255,83,102)"],
        color:lineColors,
        title: {
          text: (this.nodedata.name ? this.nodedata.name : "") + "功率",
          left: "center",
          top: 0,
          textStyle: {
            color: "#666"
          }
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: newlegendData,
          // data: this.legendData,
          icon: "circle",
          itemHeight: 8,
          top: "25px",
          right: "140px",
          // textStyle: {
          //   color: "#666"
          // }
        },
        grid: {
          left: "5%",
          right: "4%",
          bottom: "15px",
          top: "50px",
          containLabel: true,
          show: false,
          borderWidth: 1,
          // borderColor: "rgb(46, 85, 138)"
        },
        dataZoom: [
          // {
          //     type: 'slider',
          //     show: true,
          //     start: 94,
          //     end: 100,
          //     handleSize: 8
          // },
          {
            type: "inside",
            start: 0,
            end: 100
          }
          // {
          //     type: 'slider',
          //     show: true,
          //     yAxisIndex: 0,
          //     filterMode: 'empty',
          //     width: 12,
          //     height: '70%',
          //     handleSize: 8,
          //     showDataShadow: false,
          //     left: '93%'
          // }
        ],
        xAxis: {
          type: "category",
          boundaryGap: true,
          //   name: "时间(h)",
          data: this.xaxisData,
          nameLocation: "end",
          nameTextStyle: {
            color: "#666",
            fontSize: 14,
            padding: [30, -30, 0, 0]
          },
          splitLine: {
            // 分隔线
            show: true,
            lineStyle: {
              color: "rgb(202,215,204)"
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(46,85,138,0)"
            }
          },
          axisLabel: {
            color: "#666",
            // formatter: function(value, index) {
            //   // 格式化成月/日，只在第一个刻度显示年份
            //   function add0(m) {
            //     return m < 10 ? "0" + m : m;
            //   }
            //   let time = new Date(value),
            //     h = time.getHours(),
            //     mm = time.getMinutes();
            //   return add0(h) + ":" + add0(mm);
            // }
          },
          axisTick: {
            show: false
          },
          axisPointer: {
            type: "line",
            lineStyle: {
              width: 40,
              color: "rgba(135,206,250,0.05)"
            }
          }
        },
        yAxis: [
          {
            type: "value",
            name: "功率(kW)",
            nameTextStyle: {
              color: "#666",
              fontSize: 12
            },
            splitLine: {
              // 分隔线
              lineStyle: {
                type: "dashed",
                color: "rgb(202,215,204)"
              }
            },
            axisLine: {
              lineStyle: {
                color: "rgba(46,85,138,0)"
              }
            },
            axisLabel: {
              color: "#adadad"
            },
            axisTick: {
              show: false
            }
          },{
            type: "value",
            name: "辐射强度(W/㎡)",
            nameTextStyle: {
              color: "#666",
              fontSize: 12
            },
            splitLine: {
              // 分隔线
              lineStyle: {
                show: false,
                type: "dashed",
                color: "rgb(202,215,204)"
              }
            },
            axisLine: {
              lineStyle: {
                color: "rgba(46,85,138,0)"
              }
            },
            axisLabel: {
              color: "#adadad"
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: seriesData
      };
      this.powerEcharts.setOption(option);
    }
  }
};
</script>
