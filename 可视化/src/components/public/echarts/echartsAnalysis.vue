<template>
  <div class="full relative">
    <div class="full echartsDiv" :id="ids">

    </div>
    <div class="pie-legend">
      <ul>
        <li v-for="(item,index) in data" :key="index"><p>{{item.name}}</p>
          <div class="legend-text">
            <big>{{item.value||0}}</big><small>{{item.unit}}</small>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      'ids':{
        default:"pies"
      },
      "data":{
        default:function(){
          return [{name:'并网',value:0,unit:'台'},{name:'正常待机',value:0,unit:'台'},{name:'通讯中断',value:0,unit:'台'},{name:'关机',value:0,unit:'台'},{name:'故障',value:0,unit:'台'}]
        }
      },
      "totalName":{
        default:"逆变器数量"
      },
      "unit":{
        default:"台"
      },
      "total":{
        default:0
      }
    },
    mounted(){
      this.initEcharts();
    },
    methods:{
      initEcharts(){
        var scaleData = this.data;
        var data = [];
        var colorList=['#00ffb2','#00deff','#9eadb5','#fe4c45','#746be8','#f58b24'];
        for (var i = 0; i < scaleData.length; i++) {
          data.push({
            value: scaleData[i].value||0,
            name: scaleData[i].name,
            itemStyle: {
              normal: {
                borderWidth: 5,
                shadowBlur: 50,
                borderColor: colorList[i],
                shadowColor:'rgba(36,255,189,.3)'
              }
            }
          });
        }
        var seriesObj = [{
          name: '',
          type: 'pie',
          clockWise: false,
          center:['30%','50%'],
          // radius: [96, 100],
          radius: ['55%', '57%'],
          hoverAnimation: false,
          itemStyle: {
            normal: {
              label: {
                show: false,
              },
              labelLine: {
                show: false
              }
            }
          },
          data: data
        },{
          name: '',
          type: 'pie',
          clockWise: false,
          radius: ['57%', '72%'],
          center:['30%','50%'],
          hoverAnimation: false,
          tooltip:{
            show:false
          },
          itemStyle: {
            normal: {
              label: {
                show: true,
                position:'center',
                formatter: [
                  '{a|'+this.totalName+'}',
                  '{b|'+this.total+'}{x|'+this.unit+'}'
                ].join('\n'),

                rich: {
                  a: {
                    color: '#cbd3de',
                    fontSize:14,
                    lineHeight: 40
                  },
                  b: {
                    color:'#ffffff',
                    fontSize:36,
                    height: 40,
                    fontFamily:"DINOT"
                  },
                  x: {
                    fontSize: 12,
                    padding:[0,0,0,10],
                    color: '#cbd3de'
                  },
                }

              },
              labelLine: {
                show: false
              }
            },
            emphasis:{

            }
          },
          data:[{
            value: 100,
            name: '10',
            itemStyle: {
              normal: {
                borderWidth: 0,
                shadowBlur: 0,
                color: new this.$echarts.graphic.LinearGradient(1, 1, 0, 0, [{
                  offset: 0,
                  color: 'rgba(255,66,66,.1)'
                },{
                  offset: 0.25,
                  color: 'rgba(22,100,230,.1)'
                },{
                  offset: 0.5,
                  color: 'rgba(15,240,110,.1)'
                },{
                  offset: 0.75,
                  color: 'rgba(245,220,64,.1)'
                },{
                  offset: 1,
                  color: 'rgba(116,107,232,.1)'
                }])
              }
            },
          }]
        }];
        var option = {
          tooltip: {
            show: true
          },
          legend: {
            show: false
          },
          toolbox: {
            show: false
          },
          color:colorList,
          series: seriesObj
        }
        var myChart=this.$echarts.init(document.getElementById(this.ids))
        myChart.setOption(option);
      }

    }
  }
</script>

<style scoped="scoped" lang="scss">
  .relative{
    position: relative;
  }
  .pie-legend{
    display: flex;
    align-items: center;
    width: 160px;
    height: 100%;
    top: 5px;
    position: absolute;
    right: 20px;
    ul{padding: 0;}
    li{
      position: relative;
      margin-bottom: 14px;
      list-style: none;
      display: flex;
      align-items: flex-end;
    }
    li::before{
      width: 8px;
      height: 8px;
      content: "";
      background: #fff;
      display: inline-block;
      border-radius: 10px;
      position: absolute;
      left: -15px;
      top: 18px;
      box-shadow: 0 0 10px rgba(255,255,255,.5);
    }
    // ['#00ffb2','#9eadb5','#fe4c45','#00deff'];
    li:nth-of-type(1){
      &::before{
        background: #00ffb2;
        box-shadow: 0 0 10px #00ffb2;
      }
    }
    li:nth-of-type(2){
      &::before{
        background: #00deff;
        box-shadow: 0 0 10px #00deff;
      }
    }
    li:nth-of-type(3){
      &::before{
        background: #9eadb5;
        box-shadow: 0 0 10px #9eadb5;
      }
    }
    li:nth-of-type(4){
      &::before{
        background: #fe4c45;
        box-shadow: 0 0 10px #fe4c45;
      }
    }
    li:nth-of-type(5){
      &::before{
        background: #746be8;
        box-shadow: 0 0 10px #746be8;
      }
    }
    li:nth-of-type(6){
      &::before{
        background: #f58b24;
        box-shadow: 0 0 10px #f58b24;
      }
    }
    p{
      color:#cbd3de;
      font-size: 14px;
      margin-right: 16px;
      width: 4em;
    }
    big{
      font-size:24px;
      color:#fff;
      width: 2.5em;
      display: inline-block;
      text-shadow:1px 0px 1px #0e5bdd,0px 1px 1px #0e5bdd,0px 1px 1px #0e5bdd;
    }
    small{
      color:#8e9cb1;
      font-size: 12px;
    }
  }

</style>
