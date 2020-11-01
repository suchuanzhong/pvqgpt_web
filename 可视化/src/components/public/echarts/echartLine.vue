<template>
  <div style="height:100%;" :id="ids"></div>
</template>

<script>
  export default{
    props:{
      ids:{
        type:String,
        default:"echartline"
      },
      title:{
        default:""
      },
      subText:{
        default:""
      },
      yAxis:{
        default:function () {
          return ['MW','W/㎡']
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

      }
    },
    methods:{
      setEcharts( series, dataAxis,unit) {
        let echarts=this.$echarts;
        var dataShadow = [];
        var legend=[];
        let yaxisData=[];
        this.yAxis.forEach(item=>{
          yaxisData.push({
            type: "value",
            name:item,
            splitNumber:3,
            nameTextStyle: {
              color: "#82c2eb",
              fontSize: 14
            },
            scale:false,
            axisLabel:{
              color: "#82c2eb",
              fontSize: 14
            },
            max:this.max?this.max:null,
            axisTick: {
              show: false
            },

            axisLine: {
              show:true,
              lineStyle:{
                color: "rgba(0, 131, 199, 0.4)"
              }
            },
            splitLine: {
              show:false,
            }
          })
        })
     
        let legendSelect={};
        // series.forEach(item=>{
        //   legend.push({
        //     name:item.name
        //   })
        //   // if(typeof item.selected=='undefined'){
        //   //
        //   //   legendSelect[item.name]=true
        //   // }else{
        //   //   legendSelect[item.name]=item.selected
        //   // }
        // })
     

        let myChart=this.$echarts.init(document.getElementById(this.ids));

        var option = {

          title: {
            text: this.title,
            top: 0,
            textStyle: {
              color: "#01cfee",
              fontSize:"14",
              fontWeight:'normal'
            },
            subtext:this.subText,
            subtextStyle: {
              align:"right",
              color: '#01cfee',
              fontFamily:"PingFang SC",
              fontSize:"14",
            },
          },
          color:['#02e4ff','#02ff38','rgba(0,192,255,1)','rgb(225,86,87)','rgb(223,125,37)','rgb(158,178,255)','rgb(151,147,255)'],
          tooltip : {
            trigger: 'axis',
            formatter:function (data) {
              console.log(data)
              var html='<div class="toolTips"><span>'+data[0].axisValue+'</span>';
              for(var i=0;i<data.length;i++){
                html+='<div><span style="font-size: 18px;font-family:DINOT;">'+data[i].seriesName+':'+data[i].value+'</span><small style="font-size: 12px;color:#ffffff60;padding-left: 5px">'+unit+'</small></div>'
              }
              html+='</div>'
              return html

            },
            axisPointer:{
              lineStyle:{
                color:'rgba(0,192,255,0.57)'
              }
            },

          },
          // dataZoom: [
          //   {
          //     type: 'inside'
          //   }
          // ],
          legend:{
            top:0,
            right: "10%",
            itemWidth:12,
            itemHeight:5,
            type:"scroll",
            show:true,
            // selected:legendSelect,
            textStyle:{
              color:"#82c2eb",
              fontSize:14
            }
          },
          xAxis: {
            type: 'category',
            data: dataAxis,
            boundaryGap: false,
            axisTick: {
              show: false
            },
            splitLine: {
              show:false,
              lineStyle:{
                color: "rgba(0, 131, 199, 0.2)"
              }
            },
            axisLine: {
              lineStyle:{
                color: "rgba(0, 131, 199, 0.2)"
              }
            },
            axisLabel:{
              color:'#82c2eb',
              fontSize:14
            }
          },
          yAxis:yaxisData,
          grid: {
            left: 10,
            right:"8%",
            top:50,//this.subText?(this.title?70:50):(this.title?50:30),
            bottom: 4,
            containLabel:true
          },
          series: series
        };
        myChart.setOption(option);

      }
    },
    watch:{

    },
    created(){

    },
    mounted(){
      this.setEcharts(this.data.series,this.data.dataAxis,this.data.unit);
    },
    destoryed(){

    }
  }
</script>

<style>
</style>
