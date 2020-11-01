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
          return ['2016','2017','2018','2019']
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
          left:18,
          top: 0,
          textStyle: {
          color: '#82c2eb',
          fontFamily:"PingFang-SC",
          fontSize:16
        },
        // subtext:this.subText,
        subtextStyle: {
          width:'100%',
          align:"center",
          color: '#82c2eb',
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
        data: ['入选主体平均电价', '降幅'],
        icon:"circle",
        // align: 'left',
        // right:'5%',
        top:'15%',
        textStyle: {
          color: "#82c2eb"
        },
        itemWidth: 6,
        itemHeight: 6,
        itemGap: 6
      },
      grid: {
        left: '6%',
        right: '6%',
        bottom: '0',
        containLabel: true
      },
      
      xAxis: [{
        type: 'category',
        data:JSON.parse(JSON.stringify(this.datatime)).splice(0,6),
         
        axisLine: {
          show: true,
          lineStyle: {
          color: "#0083c7",
          // opacity:0.4,
          // width: 1,
          // type: "solid"
          }
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: "#82c2eb",
           interval:0,
          fontSize:16
        },
      }],
      yAxis: [{
        name:this.subText[0],
        type: 'value',
        nameTextStyle: {
          color: "#82c2eb",
          fontSize: 14
        },
        axisTick: {
          show: false,
        },
        splitNumber: 3,
        axisLine: {
          show: true,
          lineStyle: {
            color: "#82c2eb",
            width: 1,
            type: "solid",
            fontFamily:"PingFang-SC-Regular",
            fontSize:16,
            opacity:0.4,
          },
        },
        splitLine: {
          lineStyle: {
          color: "#0083c7",
          opacity:0.4,
          }
        },
        axisLabel: {
          color: "#82c2eb",
          fontSize: 16,
        },
        },{
          name:this.subText[1],
          type: 'value',
          nameTextStyle: {
            color: "#82c2eb",
            fontSize: 14
          },
          axisTick: {
            show: false,
          },
          splitNumber: 3,
          axisLine: {
            show: false,
            lineStyle: {
              color: "#82c2eb",
              width: 1,
              type: "solid",
              fontFamily:"PingFang-SC-Regular",
              fontSize:16,
              opacity:0.4,
            },
          },
          splitLine: {
            show:false,
            lineStyle: {
            color: "#0083c7",
            opacity:0.4,
            }
          },
          axisLabel: {
            
            color: "#82c2eb",
            fontSize: 16,
          },
        }
      ],
      // dataZoom:[{
      //     "show": true,
      //     "height": 12,
      //     "xAxisIndex": [
      //       0
      //     ],
      //     bottom:0,
      //     handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
      //     handleSize: '110%',
      //     handleStyle:{
      //       color:"#d3dee5",

      //     },
      //     textStyle:{ color:"#fff"},
      //     borderColor:"#90979c"
      //   },{
      //   type:'inside'
      // }],
      series: [
        {
          name: '入选主体平均电价',
          type: 'bar',
          data: JSON.parse(JSON.stringify(this.data1)).splice(0,6),
          barWidth: 12, //柱子宽度
          // barGap: 1, //柱子之间间距
          itemStyle: {
            normal: {
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#51a4ff'
            }, {
              offset: 1,
              color: '#51a4ff'
            }]),
            opacity: 1,
            }
          }
        },
      {
            name: '降幅',
            type: 'line',
            data:JSON.parse(JSON.stringify(this.datatwo)).splice(0,6) ,
            yAxisIndex:1,
           itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#17e0be'
                }, {
                  offset: 1,
                  color: '#17e0be'
                }]),
              }
            },
           lineStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#17e0be'
                }, {
                  offset: 1,
                  color: '#17e0be'
                }]),
              }
            }
          }
        ]
      };
      this.mychart.setOption(option);
      // this.timedata = option.series[0].data.length
      // if(!this.timebol){
        //  this.actionfuc(option);
      // }
     
      this.initBg(option);
    },
    //自动高亮
    // actionfuc(option){
    //   let mychart = this.$echarts.init(document.getElementById(this.ids))
    //   let times ='';
    //   let app = {
    //     currentIndex: -1,
    //   };
    //   var dataLen = option.series[0].data.length;
    //   var _this = this
    //     times = setInterval(function () {
    //       // 取消之前高亮的图形
    //       mychart.dispatchAction({
    //         type: 'downplay',
    //         seriesIndex: 0,
    //         dataIndex: app.currentIndex
    //       });
    //       app.currentIndex = (app.currentIndex + 1) % _this.timedata ;
    //       // app.currentIndex = (app.currentIndex + 1) % dataLen;
    //       // console.log(app.currentIndex);
    //       // 高亮当前图形
    //       mychart.dispatchAction({
    //         type: 'highlight',
    //         seriesIndex: 0,
    //         dataIndex: app.currentIndex,
    //       });
    //       // 显示 tooltip
    //       mychart.dispatchAction({
    //         type: 'showTip',
    //         seriesIndex: 0,
    //         dataIndex: app.currentIndex
    //       });


    //     }, 1000);
    //   // }
      
    // },
	  getMaxArr(arr) {
      let max = Math.max(...arr);
      let maxArr = arr.map(num => {
        return max;
      });
      return maxArr;
    },
    getMaxSeriseData(data) {
      let newArr = data.map(item => {
        if(item.type=="bar"){
          let dataArr = this.getMaxArr(item.data);
          return dataArr.length > 0 ? dataArr[0] : 0;
        }else{
          return false
        }

      });
      let maxArr=[];
      newArr.forEach(item=>{
        if(item!==false){
          maxArr.push(item);
        }
      })
      return this.getMaxArr(maxArr);
    },
    initBg(option) {
      let echarts = this.$echarts;
      let optionBg = {
        title: {
          show: false
        },

        // title: EchartOption.title(this.title),
        legend: {
          show: false
        },
        grid: {
          left: '6%',
          right: '6%',
          bottom: '0',
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: JSON.parse(JSON.stringify(this.datatime)).splice(0,6),
            axisLine: {
              lineStyle: {
                color: "rgba(0,0,0,0)",
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              interval:0,
              textStyle: {
                color: "rgba(0,0,0,0)"
              }
            }
          }
        ],
       yAxis: [
          {
            type: "value",
            name: "",
            // splitNumber: 3,
            axisLabel: {
              show:true,
              fontSize:16,
              color:   "rgba(130,194,235,0)"
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#023f66",
                // type: "solid"
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "#023f66",
              }
            }
          },
          {
            type: "value",
            name: "",
            // splitNumber: 3,
            axisLabel: {
              show:true,
              fontSize:16,
              color:   "rgba(130,194,235,0)"
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#023f66",
                type: "solid"
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "#023f66",
              }
            }
          }
        ],
        // dataZoom:[{
        //   "show": false,
        //   "height": 12,
        //   "xAxisIndex": [
        //     0
        //   ],
        //   bottom:0,
        //   handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
        //   handleSize: '110%',
        //   handleStyle:{
        //     color:"#d3dee5",

        //   },
        //   textStyle:{
        //     color:"#fff"},
        //   borderColor:"#90979c"
        // },{
        //   type:'inside'
        // }],
      };
      let  maxData= this.getMaxSeriseData(option.series);
      let maxDatas=JSON.parse(JSON.stringify(this.datatime)).splice(0,6).map(value=>{
        return Math.ceil(maxData[0])
      })
      this.maxDatas = maxDatas
      let mychartBg = echarts.init(document.getElementById(this.ids + "bg"));
      optionBg.series = [
        {
          name: "",
          type: "bar",
          color: "#00BFFF",
          tooltip: {
            show: false
          },
          barWidth: 20,
          // barWidth: 6 * option.series.length,
          itemStyle: {
            normal: {
              color:"rgba(18, 117, 179,.3)"
            }
          },
          data: this.maxDatas
        },
        {
            name: "",
            type: "line",
            symbol:'none',
            yAxisIndex:1,
            itemStyle: {
                color:"rgba(18, 117, 179,0)"
            },
            data: JSON.parse(JSON.stringify(this.datatwo)).splice(0,6)
          }
      ];
      mychartBg.setOption(optionBg);
    }
    }
  };
</script>
<style scoped>
  .barHeight {
    height: 240px;
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

