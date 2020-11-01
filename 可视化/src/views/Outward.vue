<template>
  <div class="home">
    <div class="left-box">
      <div class="left-bg">
        <div class="seation">
      <Title title="外送概况" en="Outgoing survey" @click.native="showAbsorptiveLine"></Title>
      <el-row :gutter="10" style="margin-bottom: 20px">
        <el-col :span="12">
          <MyCard value="132.08" unit="亿kWh" title="年发电量"></MyCard>
        </el-col>
        <el-col :span="12">
          <MyCard value="123.38" unit="亿kWh" title="外送电量"></MyCard>
        </el-col>
      </el-row>
        </div>
     <div class="seations">
        <Title title="外送电力" en="Outgoing power"></Title>
        <EchartsLine title="逐年全国外送电量情况" :data="dataLine" subText="（单位：亿kwh）" style="height:300px"></EchartsLine>
        <EchartsBars :barWidth="15" style="height: 270px;" unit="亿KW" subText="（单位：亿kwh）" :dataArr="dataArr" :showLabel="false" ids="leftData" :theme="['#00eaff','#00717d']" title="基地年外送电量"></EchartsBars>
        </div>
      </div>
    </div>
    <div class="right-box">
       <div class="right-bg">
      <Title title="消纳地区" en="Accommodation area"></Title>
      <el-row :gutter="10">
        <el-col :span="12">
          <MyCard value="147749.89" unit="km²" title="覆盖总面积"></MyCard>
        </el-col>
        <el-col :span="12">
          <MyCard value="2145.36" unit="万人" title="覆盖总人口"></MyCard>
        </el-col>
      </el-row>
      <Title title="各基地消纳明细表" en="Digest table" ></Title>
      <!-- <Title title="各基地消纳明细表" en="each base"></Title> -->
      <MyTable :thead="thead" :tableData="tableData"></MyTable>

    </div>
    </div>
  </div>
</template>

<script>
  import MyTable from '@/components/public/MyTable'
  import Title from '@/components/public/TitleName'
  import MyCard from '@/components/public/MyCard'
  import EchartsLine from '@/components/public/echartLine'
  import EchartsBars from '@/components/public/echarts/echartsBar'

  export default {
    name: 'OutWard',
    components: {
      Title,MyTable,MyCard,EchartsLine,EchartsBars
    },
    data(){
      return{
        dataLine:{
          series: [{
            symbol: 'none',
            symbolSize: 0,
            name: "",
            data: [40.98,62.58,123.38],
            type: 'line',
            areaStyle: {
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0,
                    color: 'rgba(1,211,151,0.3)' // 0% 处的颜色
                  }, {
                    offset: 0.7,
                    color: 'rgba(0,120,141,0.3)' // 100% 处的颜色
                  }, {
                    offset: 1,
                    color: 'rgba(0,120,141,0)' // 100% 处的颜色
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
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: 'rgb(1,211,151)' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: 'rgb(0,120,141)' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              }
            },
            smooth: true
          }
          ],
          dataAxis: ['2017','2018','2019'],
          unit: 'W/㎡'
        },
        dataArr:[{
          "name": "大同",
          "value": "6.33"
        }, {
          "name": "寿阳",
          "value": "5.92"
        }, {
          "name": "渭南",
          "value": "6.18"
        }, {
          "name": "海兴",
          "value": "5.74"
        }, {
          "name": "白城",
          "value": "5.18"
        }, {
          "name": "泗洪",
          "value": "5.56"
        }, {
          "name": "格尔木",
          "value": "6.01"
        }, {
          "name": "达拉特",
          "value": "6.14"
        }, {
          "name": "德令哈",
          "value": "5.9"
        }, {
          "name": "宝应",
          "value": "5.33"
        }, {
          "name": "上饶",
          "value": "5.66"
        }, {
          "name": "长治",
          "value": "5.78"
        }, {
          "name": "铜川",
          "value": "5.94"
        }],
        thead:[
          {
            name:"序号",
            unit:"",
            prop:'index',
            width:'33.33%'
          },{
            name:"基地名称",
            unit:"",
            prop:'label',
            width:'33.33%'
          },{
            name:"消纳",
            unit:"万kWh",
            prop:'value',
            width:'33.33%'
          }],
        tableData:[{
          "label": "大同",
          "value": 6.33
        }, {
          "label": "寿阳",
          "value": 6.36
        }, {
          "label": "渭南",
          "value": 6.48
        }, {
          "label": "海兴",
          "value": 6.24
        }, {
          "label": "白城",
          "value": 5.88
        }, {
          "label": "泗洪",
          "value": 6.12
        }, {
          "label": "格尔木",
          "value": 6.72
        }, {
          "label": "达拉特",
          "value": 6.84
        }, {
          "label": "德令哈",
          "value": 6.6
        }, {
          "label": "宝应",
          "value": 6
        }, {
          "label": "上饶",
          "value": 6.24
        }, {
          "label": "长治",
          "value": 6.36
        }, {
          "label": "铜川",
          "value": 6.48
        }]
      }
    },
    mounted () {
      this.showAbsorptiveLine();
    },
    methods:{
      showAbsorptiveLine() {
        if (this.$parent.$refs.map && this.$parent.$refs.map.getViewer) {
          var viewer= this.$parent.$refs.map.getViewer();
          if(viewer)
          addBasePoint(this, viewer,showPC3);
          viewer.scene.camera.flyTo({"destination":{"x":-3136468.0722605786,"y":9251379.858558854,"z":1831681.7220455525},
          "orientation":{"pitch":-1.0376298356851716,"heading":0.0015511897912245942,"roll":6.283185307179586}});
        };
        if (this.$parent.$refs.map && this.$parent.$refs.map.addAbsorptiveLine) {
            this.$parent.$refs.map.addAbsorptiveLine();
        };
          
      }
    },
    beforeDestroy () {
      //清除基地的图标和柱状图
      if (this.$parent.$refs.map && this.$parent.$refs.map.getViewer) {
        // this.$parent.$refs.map.showBaseInfo=false;
        var viewer= this.$parent.$refs.map.getViewer();
        if(viewer)
        clearDataSourcees(["base", "absorptiveLine"],viewer);                  
      };
    }
  }
</script>
<style lang="scss" >

</style>
