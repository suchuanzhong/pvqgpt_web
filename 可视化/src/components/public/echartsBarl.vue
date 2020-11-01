<template>
  <div style="height:100%;" :id="ids">

  </div>
</template>

<script>
  export default{
    props:{
      ids:{
        type:String,
        default:"echartlines"
      },
      title:{
        default:""
      },
      subText:{
        default:""
      },
      unit: {
        default: function() {
          return ["MW"];
        }
      },
      dataAxis:{
        default:function () {
          return ['2016','2017','2018']
        }
      },
      yearsDats:{
        default:function(){
          return  [451, 352, 303, 534, 95, 236, 231, 192, 453, 524, ]
        }
      }
    },
    // dataTitle: {
    //   default: function() {
    //     return [''];
    //   }
    // },
    data(){
      return{

      }
    },
    mounted(){
      this.$nextTick(()=>{
        this.setEcharts(this.dataAxis,this.yearsDats);
      })

    },
    methods:{
      setEcharts( seriesData,xAxisData) {
        
        let echarts=this.$echarts;
        var dataShadow = [];
        // var legend=[];
        // for(var item in series){
        //   legend.push(item.name)
        // }
        let myChart=this.$echarts.init(document.getElementById(this.ids));

        var option = {
          title: {
            text: this.title,
            top: 0,
            textStyle: {
              color: '#01cfee',
              fontFamily:"PingFang SC",
              fontSize:14
            },
            subtext:this.subText,
            subtextStyle: {
              width:'100%',
              color: '#82c2eb',
              fontFamily:"PingFang SC",
              fontSize:14
            },
          },
          color:['#02e4ff','#02ff38','rgba(0,192,56,1)','rgb(225,86,87)','rgb(223,125,37)','rgb(158,178,255)','rgb(151,147,255)'],
          tooltip : {
            trigger: 'axis',
            axisPointer:{
              lineStyle:{
                color:'#82c2eb'
              }
            },

          },
          dataZoom: [
            {
              type: 'inside'
            }
          ],
          legend:{
             data:[
               {
                 name: "总计",
                 // icon: "circle"
               },
             ],
            right:6,
            width:240,
            itemWidth:10,
            itemHeight:6,
            show:false,
            textStyle:{
              color:"#023f66"
            }
          },
          xAxis: {
            type: 'category',
            data: seriesData,
            boundaryGap: false,
            axisTick: {
              show: false
            },
            splitLine: {
              show: false,
              // show:true,
              // lineStyle:{
              //   color:'#82c2eb',
              //   	opacity:0.5
              // }
            },
            axisLine: {
              lineStyle:{
                color:'#023f66'
              }
            },
            axisLabel:{
              color:'#82c2eb',
              fontSize:14
            }
          },
          yAxis: {
            type: 'value',
            name: this.unit[0],
            splitNumber: 3,
            nameTextStyle: {
              color: "#82c2eb",
              fontSize: 14
            },


            // minInterval: 1,
            //     splitNumber:3,
            //     nameGap:30,
            //     min: function(value) {
            //     return (value.min - 100)>0?value.min - 100:0;
            // },
            axisTick: {
              show: false
            },
            splitLine:{
              show:false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#023f66",
                width: 1.5,
                type: "solid"
              },
              // show: true,
              // lineStyle: {
              //   color: "#023f66" ,
              //
              // }
            },
            axisLabel:{
              color:'#82c2eb',
              fontSize:14,
              // align:'cen',
              showMinLabel:false
            }
          },
          grid: {
            left: "4%",
            right:"6%",
             top:'20%',
            // top: this.subText?(this.title?70:50):(this.title?50:30),
            bottom: "4%",
            containLabel:true
          },
          series: [{
            symbol: 'circle',
            symbolSize: 6,
            name: "",
            data:xAxisData,
            type: 'line',
            // label: {
            //   normal: {
            //     show: true,
            //     position: 'top',
            //     color: '#82c2eb',
            //   }
            // },
            areaStyle: {
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 1,
                  x2: 0,
                  y2: 0,
                  colorStops: [{
                    offset: 0,
                    color: 'rgba(3,92,255,.2)' // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: 'rgba(2,228,255,0.2)' // 100% 处的颜色
                  }],
                  globalCoord: false // 缺省为 false
                }
              }
            },

            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [{
                  offset: 0,
                  color: '#035cff' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: '#02e4ff' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              }
            },
            smooth: true
          }
          ],
        };
        myChart.setOption(option);

      }
    },
    watch:{

    },
    created(){

    },

    destoryed(){

    }
  }
</script>

<style>
</style>
