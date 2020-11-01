<template>
  <div class="resources">
    <div class="left-box">
      <div class="left-bg">
        <div class="seations">
          <Title title="领跑基地"></Title>
          <MyTable :thead="thead" :tableData="tableData"></MyTable>
          </div>
          <div class="seation">
            <Title title="领跑企业" ></Title>
           <echartlp :barWidth="20"  style="height: 240px;" ids="leftData" 
           ></echartlp>
            
          </div>
           <div class="seation">
            <Title title="领跑设备" ></Title>
            <div class="st-tlit">
              <span class="lest">
                <i class="my-icon-left"></i>
                  <span class="stat-name">组件</span>
                  <i class="my-icon-right"></i>
              </span>
                <span class="rest">
                    <i class="my-icon-left"></i>
                      <span class="stat-name">逆变器</span>
                      <i class="my-icon-right"></i>
                </span>
            </div>
             <div style="height:180px;width:100%;">
             <!-- <EchartsPie style="height: 240px;"></EchartsPie> -->
             <echartsBarls ids="resource"  subText="（单位：小时）" ></echartsBarls>
             </div>
          </div>
      </div>
    </div>
    <div class="right-box">
       <div class="right-bg">
          <div class="seation">
            <Title title="经济效益" ></Title>
            <div >
              <echartjq  style="height: 240px;"   subText="（单位：W/㎡）"></echartjq>
            </div>
          
          </div>
          <div class="seation">
             <Title title="消纳外送" ></Title>
             <EchartsPie style="height: 220px;" ids="echartsPies" ></EchartsPie>
         
          </div>
          <div class="seations">
             <Title title="光伏+" ></Title>
               <div class="seku"><span class="se-name">渔光互补</span></div>
              <div class="list">
                 <el-carousel :interval="5000" arrow="always">
                  <el-carousel-item v-for="item in 3" :key="item">
                    <h3>{{ item }}</h3>
                  </el-carousel-item>
                </el-carousel>
              </div>
               <!-- <i class="my-icon-tup"></i> -->
              <!-- <echartsParity ids="resourceYear" style="height:180px" subText="电价(元/kWh)"></echartsParity> -->
          </div>
       </div>
    </div>
  </div>
</template>
<style scoped>
  .click{
    cursor: pointer;
  }
</style>
<script>
import echartsParity from '@/components/public/echartsParity'
  import Title from '@/components/public/TitleName'
    import echartlp from '@/components/public/echartlp'
  import echartjq from '@/components/public/echartjq'
  import echartsBarls from '@/components/public/echartsBarls'
  import MyTable from '@/components/public/MyTable'
  import EchartsPie from '@/components/public/echarts/echartsPie'
  export default {
    name:"Resources",
    data(){
      return{

        dataArr1:[//各类光资源区总装机数据
          {
          "name": "渭南基地",
          "value": 4000
        },{
          "name": "渭南基地",
          "value": 6000
        },{
          "name": "渭南基地",
          "value": 500
        },{
          "name": "渭南基地",
          "value": 0
        },{
          "name": "渭南基地",
          "value": 0
        }],
        thead:[
          {
            name:"基地名称",
            prop:'label',
            width:'14%'
          },
          {
            name:"省份",
            prop:'data1',
            width:'23%'
          },{
            name:"规模(MW)",
            prop:'data2',
            width:'23%'
          },{
            name:"电价(元/kWh)",
            prop:'data3',
            width:'40%'
          }
          ],
          professionRoseData: [{
                    name: "外送",
                    value: "355",
                     unit:'kWh',
                },{
                    name: "消纳",
                    value: "1670",
                    unit:'kWh',
                    
                },
                
            ],
        tableData:[
                {
          "label": "渭南基地",
          "data1": '陕西省',
          "data2": 500,
          "data3": 0.5
        },{
          "label": "渭南基地",
          "data1": '陕西省',
          "data2": 500,
          "data3": 0.5
        },{
          "label": "渭南基地",
          "data1": '陕西省',
          "data2": 500,
          "data3": 0.5
        },{
          "label": "渭南基地",
          "data1": '陕西省',
          "data2": 500,
          "data3": 0.5
        },{
          "label": "渭南基地",
          "data1": '陕西省',
          "data2": 500,
          "data3": 0.5
        }],

        showlayer:false
      }
    },
    components:{
      Title,echartsBarls,echartjq,MyTable,EchartsPie,echartsParity,echartlp
    },
    mounted() {
      //this.showResourceLayer();
    },
    beforeDestroy () {
      this.showlayer=true;
      //移除资源图层
      this.showResourceLayer();
      // this.$parent.$refs.map.showBaseInfo=false;
      //移除基地分布
      if (this.$parent.$refs.map && this.$parent.$refs.map.getViewer) {
            var viewer= this.$parent.$refs.map.getViewer();
            if(viewer){
              clearDataSourcees(["base"],viewer);
            }
      };
    },
    methods: {
      showResourceLayer() {
        this.showlayer=!this.showlayer;
        if(this.$parent.$refs.map&&this.$parent.$refs.map.showResourceLayer){
          this.$parent.$refs.map.showResourceLayer(this.showlayer);
        };
        if (this.$parent.$refs.map && this.$parent.$refs.map.getViewer) {
          var viewer= this.$parent.$refs.map.getViewer();
          if(viewer)
          addBasePoint(this, viewer);
          if(this.showlayer)
          viewer.scene.camera.flyTo({"destination":{"x":-3719914.7214529333,"y":9923008.103096997,"z":2961333.5440157317},
                            "orientation":{"pitch":-1.210401948634264,"heading":6.202436309227091,"roll":6.283185307179586}});
        };
      }
    },
  }
</script>
<style lang="scss" scoped>
.st-tlit{
  margin-left: 42px;
  margin-top: 20px;
}
.lest{
  text-align: left;
     .my-icon-left{
         width: 32px;
         height: 6px;
         display: inline-block;
         background: url('/img/left-line.png')no-repeat;
     }
      .stat-name{
         font-family: PingFang-SC-Medium;
        font-size: 16px;
        line-height: 24px;
        color: #dcf4ff;
        padding: 0 10px;
     }
     .my-icon-right{
         width: 32px;
         height: 6px;
         display: inline-block;
         background: url('/img/right-line.png')no-repeat;
         
     }
}
.rest{
  margin-left: 32px;
  text-align: right;
   .my-icon-left{
         width: 32px;
         height: 6px;
         display: inline-block;
         background: url('/img/left-line.png')no-repeat;
     }
      .stat-name{
         font-family: PingFang-SC-Medium;
        font-size: 16px;
        line-height: 24px;
        color: #dcf4ff;
        padding: 0 10px;
     }
     .my-icon-right{
         width: 32px;
         height: 6px;
         display: inline-block;
         background: url('/img/right-line.png')no-repeat;
         
     }
}
.seku{
  text-align: center;
  margin: 20px 0 8px 16px;
  width: 358px;
	height: 36px;
	background-color: #005886;
	border: solid 1px #0083c7;
	opacity: 0.5;
}
.se-name{
  font-family: PingFang-SC-Bold;
	font-size: 16px;
	font-weight: normal;
	font-style: italic;
	font-stretch: normal;
	line-height: 32px;
	letter-spacing: 0px;
	color: #82c2eb;
}

.list{
    z-index: 9999;
    width: 358px;
    height: 212px;
      margin-left: 16px;
}

.el-carousel__item h3 {
    width: 358px;
    height: 212px;
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    
  }
  .el-carousel__item:nth-child(2n) {
    background: url('/img/banner1.png')no-repeat;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background: url('/img/banner3.png')no-repeat;
  }

</style>
