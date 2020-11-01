<template>
  <el-dialog
    title="领跑电价"
    :visible.sync="dialogVisible"
    @close="dialogClose"
    append-to-body
    fullscreen=true
    :show-close="showclose"
    class="dialogBj"
  >
  <div class="barHeight">
    <div :id="ids" class="full"></div>
    <div :id="ids+'bg'" class="full full-bg"></div>
  </div>
</el-dialog>  
</template>
<script>
  export default {
    props:{
      ids:{
        default:'myParityDate'
      },

      averagePrice:{
        default:function(){
          return [0.15, 0.25, 0.15, 0.5, 1]
        }
	    },
	  
      benchmarkPrice:{
        default:function(){
            return [0.25, 0.5, 0.15, 0.5, 1]
          }  
      },
      reduction:{
        default:function(){
            return [0.25, 0.5, 0.15, 0.5, 1]
          }  
      },
      datatime:{
      default:function(){
            return ['2016','2017','2018','2019']
          }  
      },
      timebol:{
		    default:false
		  },
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
        showclose:false,
        dialogVisible: true,
        electrovalence:{}
        // timedata:''
      };
    },
    created() {
    let barDatas=localStorage.getItem('electrovalence');
    this.electrovalence=JSON.parse(barDatas);
    },
    mounted() {
      
      this.$nextTick(()=>{
         this.resizeWorldMapContainer()
         this.drawChart()
        
      })
     
    },
    methods: {
      drawChart(series) {
        // let echarts = this.$echarts;
        // console.log(this.title)
        let mychart = this.$echarts.init(document.getElementById(this.ids));
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
          data: ['入选主体平均电价', '标杆电价','降幅'],
          icon:"circle",
          // align: 'left',
          right:'25%',
          top:'0%',
          textStyle: {
            color: "#82c2eb"
          },
          itemWidth: 6,
          itemHeight: 6,
          itemGap: 6
        },
        grid: {
          top:'10%',
          left: '1%',
          right: '1%',
          bottom: '6%',
          containLabel: true
        },
        
        xAxis: [{
          type: 'category',
          data: this.electrovalence.datatime,
          axisLine: {
            show: true,
            lineStyle: {
              color: "#0083c7",
              opacity:0.4,
              width: 1,
              type: "solid"
            }
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            interval: 0,
            color: "#82c2eb",
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
            lineStyle: {
            color: "#0083c7",
            opacity:0.4,
            }
          },
          axisLabel: {
              color: "#82c2eb",
              fontSize: 16,
              // fontStyle:"italic"
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
            show: false,
            lineStyle: {
            color: "#0083c7",
            opacity:0.4,
            }
          },
          axisLabel: {
              color: "#82c2eb",
              fontSize: 16,
              // fontStyle:"italic"
            },
        }],
        dataZoom:[
          // {
          //   "show": true,
          //   "height": 12,
          //   "xAxisIndex": [0],
          //   bottom:0,
          //   handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
          //   handleSize: '110%',
          //   handleStyle:{
          //     color:"#d3dee5",
          //   },
          //   textStyle:{ color:"#fff"},
          //   borderColor:"#90979c"
          // },
          {
          type:'inside'
        }],
        series: [
          {
            name: '入选主体平均电价',
            type: 'bar',
            data: this.electrovalence.averagePrice,
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
            name: '标杆电价',
            type: 'bar',
            data: this.electrovalence.benchmarkPrice,
            barWidth: 12,
            // barGap: 1,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#0066ff'
                }, {
                  offset: 1,
                  color: '#0066ff'
                }]),
                opacity: 1,
              }
            }
          },
          {
            name: '降幅',
            type: 'line',
            data:this.electrovalence.reduction ,
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
      
        mychart.setOption(option);
        let _this = this;
    
      
        this.initBg(option);
        window.addEventListener("resize", function(){
          _this.resizeWorldMapContainer()
          mychart.resize();
        });
      },
      resizeWorldMapContainer(){
        // document.getElementById(this.ids).style.width = window.innerWidth+'px';
        document.getElementById(this.ids).style.height = window.innerHeight-100+'px';
        document.getElementById(this.ids+ "bg").style.height = window.innerHeight-100+'px';
      },

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
          legend: {
            show: false
          },
          grid: {
            top:'10%',
            left: '1%',
            right: '1%',
            bottom: '6%',
            containLabel: true
          },
          xAxis: [
            {
              type: "category",
              data: this.electrovalence.datatime,
              axisLine: {
                show: false,
                lineStyle: {
                  color: "#023f66",
                  // width: 1,
                  // type: "solid"
                }
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                show: true,
                textStyle: {
                  fontSize:16,
                  color: "rgba(130,194,235,0)"
                }
              }
            }
          ],
          yAxis: [
            {
              type: "value",
              name: "",
              splitNumber: 3,
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
            },
            {
              type: "value",
              name: "",
              splitNumber: 3,
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
          dataZoom:[
          //   {
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
          // },
          {
          type:'inside'
        }],
        };
        let  maxData= this.getMaxSeriseData(option.series);
        let maxDatas=this.electrovalence.datatime.map(value=>{
          return maxData[0]
          // return Math.ceil(maxData[0])
        })
        let  maxData2= option.series[2].data.reduce((prev,cur)=>{
          return Math.max(prev,cur)
        });
        let maxDatas2=this.electrovalence.datatime.map(value=>{
          return maxData2
        })
        let mychartBg = echarts.init(document.getElementById(this.ids + "bg"));
        optionBg.series = [
          {
            name: "",
            type: "bar",
            color: "#00BFFF",
            tooltip: {
              show: false
            },
            barWidth: 6 * option.series.length + 16,
            itemStyle: {
              normal: {
                color:"rgba(18, 117, 179,.3)"
              }
            },
            data: maxDatas
          },
          {
            name: "",
            type: "line",
            symbol:'none',
            yAxisIndex:1,
            itemStyle: {
                color:"rgba(18, 117, 179,0)"
            },
            data: maxDatas2
          }
        ];
        mychartBg.setOption(optionBg);
        window.addEventListener("resize", function(){
          
          mychartBg.resize();
        });
      },
      dialogClose() {
        this.$parent.dialogTypeName = null;
      },
    }
  };
</script>
<style lang="scss">
.dialogBj{

  .el-dialog__title{
    color: #fff;
  }
  .el-dialog{
    background-color: rgba(0,0,0,0.1);
     background: url(../../assets/img/bg1_03.png) no-repeat;
    background-size: 100% 100%;
  }
  .barHeight {
    width: 100%;
    // height: 600px;
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
    top: 84px;
    width: 100%;
    // height: 600px;
    padding: 0 20px ;
    left: 0;
  }
}
</style>

