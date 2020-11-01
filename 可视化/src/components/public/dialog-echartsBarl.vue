<template>
  <el-dialog
          title="当日运行功率"
          :visible.sync="dialogVisible"
          @close="Close"
          append-to-body
          fullscreen=true
          class="dialogBj"
          :show-close="showclose"
  >

      <div :id="ids"></div>


  </el-dialog>
</template>

<script>
  export default{
    props:{
      ids:{
        type:String,
        default:"echartlineREF"
      },
      title:{
        default:""
      },
      subText:{
        default:""
      },
      yAxis:{
        default:function () {
          return ['MW']
        }
      },
      data:{
        default:function () {
          return {
            series: [
              {
                symbol: 'none',
                symbolSize: 0,
                yAxisIndex: 0,
                name: "",

                data: [3,0,2,5,8,36,65,385,648,354,321,287,468,596,477,315,121,56,86,33,14,21,11,12],
                type: 'line',
                smooth: true
              },{
                symbol: 'none',
                symbolSize: 0,

                name: "",
                data: [13,10,122,35,8,336,265,385,148,354,321,287,468,596,477,315,121,56,86,33,14,21,11,12],
                type: 'line',
                smooth: true
              }
            ],
            dataAxis: ['1点','2点','3点','4点','5点','6点','7点', '8点', '9点','10点','11点','12点','13点','14点','15点','16点','17点','18点','19点','20点', '21点','22点','23点','24点'],
            unit: ''
          }
        }
      }

    },
    data(){
      return{
        dialogVisible: true,
        showclose:false,
          dalogEcharts:{}
      }
    },
      created() {
        let barDatas=localStorage.getItem('dalogEcharts');
        this.dalogEcharts=JSON.parse(barDatas);
      },
      mounted(){
          this.$nextTick(()=>{
              this.resizeWorldMapContainer()
            this.setEcharts(this.dalogEcharts.data.series,this.dalogEcharts.data.dataAxis,this.dalogEcharts.data.unit);
            // this.data.series = this.dalogEcharts.data.series;
            // this.data.dataAxis =  this.dalogEcharts.data.dataAxis;
            //
            // this.data.unit = "MW"
          })


          // debugger
      },
    methods:{
      setEcharts( series, dataAxis,unit) {

              var option = {
                  title: {
                      text: this.title,
                      top: 0,
                      textStyle: {
                          color: "#01cfee",
                          fontSize: "14",
                          fontWeight: 'normal'
                      },
                      // subtext: "标题",
                      subtextStyle: {
                          align: "right",
                          color: '#01cfee',
                          fontFamily: "PingFang SC",
                          fontSize: "14",
                      },
                  },
                  color: ['#02e4ff', '#02ff38', 'rgba(0,192,255,1)', 'rgb(225,86,87)', 'rgb(223,125,37)', 'rgb(158,178,255)', 'rgb(151,147,255)'],
                  tooltip: {
                      trigger: 'axis',
                      formatter: function (data) {
                          var html = '<div class="toolTips"><span>' + data[0].axisValue + '</span>';
                          for (var i = 0; i < data.length; i++) {
                              html += '<div><span style="font-size: 18px;font-family:DINOT;">' + data[i].seriesName + ':' + data[i].value + '</span><small style="font-size: 12px;color:#ffffff60;padding-left: 5px">'+unit+'</small></div>'
                          }
                          html += '</div>'
                          return html

                      },
                      axisPointer: {
                          lineStyle: {
                              color: 'rgba(0,192,255,0.57)'
                          }
                      },

                  },
                  // dataZoom: [
                  //     {
                  //         type: 'inside'
                  //     }
                  // ],
                  legend: {
                      top: 0,
                      right: "8%",
                      itemWidth: 12,
                      itemHeight:6,
                      type: "scroll",
                      show: true,
                      // selected:this.dalogEcharts.legendSelect,
                      textStyle: {
                          color: "#82c2eb",
                          fontSize: 14
                      }
                  },
                  xAxis: {
                      type: 'category',
                      data: this.dalogEcharts.data.dataAxis,
                      boundaryGap: false,
                      axisTick: {
                          show: false
                      },
                      splitLine: {
                          show: false,
                          lineStyle: {
                              color: "rgba(0, 131, 199, 0.2)"
                          }
                      },
                      axisLine: {
                          lineStyle: {
                              color: "rgba(0, 131, 199, 0.2)"
                          }
                      },
                      axisLabel: {
                          color: '#82c2eb',
                          fontSize: 14
                      }
                  },
                  yAxis: {
                      type: "value",
                      name: this.yAxis ,
                      splitNumber: 3,
                      nameTextStyle: {
                          color: "#82c2eb",
                          fontSize: 14
                      },
                      scale: false,
                      axisLabel: {
                        // show: true,
                        textStyle:{
                          color: "#82c2eb",
                          fontSize: 14
                        }
                      },
                      // max:this.max?this.max:null,
                      axisTick: {
                          show: false
                      },

                      axisLine: {
                          show: true,
                          lineStyle: {
                              color: "rgba(0, 131, 199, 0.4)"
                          }
                      },
                      splitLine: {
                          show: false,
                      }
                  },
                  grid: {
                      left: 10,
                      right: "8%",
                      top: 50,//this.subText?(this.title?70:50):(this.title?50:30),
                      bottom: 4,
                      containLabel: true
                  },
                  series: series
              };
            
          let myChart=this.$echarts.init(document.getElementById((this.ids)));

          let echarts=this.$echarts;
              var dataShadow = [];
              var legend=[];
              let yaxisData=[];
              // this.yAxis.forEach(item=>{
              //   yaxisData.push({
              //     type: "value",
              //     name:item,
              //     splitNumber:3,
              //     nameTextStyle: {
              //       color: "#82c2eb",
              //       fontSize: 14
              //     },
              //     scale:false,
              //     axisLabel:{
              //       color: "#82c2eb",
              //       fontSize: 14
              //     },
              //     max:this.max?this.max:null,
              //     axisTick: {
              //       show: false
              //     },
              //
              //     axisLine: {
              //       show:true,
              //       lineStyle:{
              //         color: "rgba(0, 131, 199, 0.4)"
              //       }
              //     },
              //     splitLine: {
              //       show:false,
              //     }
              //   })
              // })

              let legendSelect={};
              series.forEach(item=>{
                legend.push({
                  name:item.name
                })
                if(typeof item.selected=='undefined'){

                  legendSelect[item.name]=true
                }else{
                  legendSelect[item.name]=item.selected
                }
              })


              myChart.setOption(option);
              let _this = this;
              window.addEventListener("resize", function(){
                  _this.resizeWorldMapContainer()
                  myChart.resize();
              });
      },
        resizeWorldMapContainer(){
            // document.getElementById(this.ids).style.width = window.innerWidth+'px';
            document.getElementById(this.ids).style.height = window.innerHeight-160+'px';

        },
      Close(){
        this.$parent.dialogName=null;
      }
    },
    watch:{

    },


    destoryed(){

    }
  }
</script>

<style lang="scss">
  .dialogBj{
    .el-dialog__header{
      text-align: center;
    }
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
          height: 100%;
      }
      .full {
          width: 100%;
          height: 100%;
          position: relative;
          z-index: 9;
      }
  }

</style>
