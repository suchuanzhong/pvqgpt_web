<template>
  <div class="zui-info-detail">
    <div class="zui-info-breads">
      <i class="zui-icon-back" @click="back"></i>
      <i class="bold-text">厂家详情</i>
    </div>
    <div class="zui-info-article">
      <div class="zui-article-title">{{ articleData.fullname }}</div>
    </div>
    <!--        <div class="zui-article-content" v-html="articleData.content"></div>       -->
    <p class="zui-article-content" >
      <span>公司概况</span>
      <i class="my-icon-line"></i>
    </p>
    <el-row style="padding-top: 40px;padding-bottom: 56px">
      <el-col :span="4" >
        <img :src="articleData.logo" alt=""  class="zui-article-img" >
      </el-col>
      <el-col :span="10" >
        <div class="zui-list" style="margin-right: 30px">
          <div class="zui-card">
            <div class="zui-baseInformation"><span>公司类型</span></div>
            <div class="zui-Information"><span>{{articleData.enterpriseType}}</span></div>
          </div>
          <div class="zui-card">
            <div class="zui-baseInformation"><span>建设电站（座）</span></div>
            <div class="zui-Information"><span>{{articleData.powerStations}}</span></div>
          </div>
          <div class="zui-card">
            <div class="zui-baseInformation"><span>成立时间</span></div>
            <div class="zui-Information"><span>{{articleData.setupTime| dateFilter}}</span></div>
          </div>
        </div>

      </el-col>
      <el-col :span="10">
        <div class="zui-list" >
          <div class="zui-card">
            <div class="zui-baseInformation"><span>装机规模（MW）</span></div>
            <div class="zui-Information"><span>{{articleData.capacity}}</span></div>
          </div>
          <div class="zui-card">
            <div class="zui-baseInformation"><span>总部地点</span></div>
            <div class="zui-Information"><span>{{articleData.headquarters}}</span></div>
          </div>
          <div class="zui-card">
            <div class="zui-baseInformation"><span>总投资（亿）</span></div>
            <div class="zui-Information"><span>{{articleData.investment}}</span></div>
          </div>
        </div>
      </el-col>
    </el-row>
    <p class="zui-article-content" >
      <span>公司概况</span>
      <i class="my-icon-line"></i>
    </p>

    <el-row style="padding-top: 40px;padding-bottom: 56px">
      <el-col :span="12" style="padding-right: 50px">
        <div class="zui-article-Bybase">
          <div class="zui-article-by">按基地划分</div>
        </div>
        <EchartScatter
                style="height: 393px;"
                ids="scatRef"
                :data="dataAxis"
                ref="echartspowers"
        ></EchartScatter>
      </el-col>
      <el-col :span="12" >
        <div class="zui-article-Bybase">
          <div class="zui-article-by">按批次划分</div>

        </div>
        <LeadingPower
                style="height: 393px;"
                ids="barCom"
                ref="compan"
                :data1="data1"
                :dataone="dataone"
                :datatwo="datatwo"
                :datatime="bacth"
                :subText="['(MW)','(%)']"
        ></LeadingPower>
      </el-col>

    </el-row>
    <div class="table-box">
      <el-table
              :data="tableList"
              stripe
              :header-cell-style="tableHeaderCellStyle"
              style="width: 100%;font-size: 14px;
                    font-family: Microsoft YaHei;color: #666666;">
        <el-table-column
                prop="batchName"
                label="批次"
        >
        </el-table-column>
        <el-table-column
                prop="basename"
                label="基地"
        >
        </el-table-column>
        <el-table-column
                prop="stationname"
                label="电站">
        </el-table-column>
        <el-table-column
                prop="buildTime"
                label="建设时间"
        >
        </el-table-column>
        <el-table-column
                prop="netTime"
                label="并网时间"
        >
        </el-table-column>
        <el-table-column
                prop="stationscale"
                label="装机规模（MW）">
        </el-table-column>
      </el-table>

    </div>
  </div>
</template>
<script>

  import { getFormatDate } from "@/utils/auth";
  export default {
    props: {
      articleData: {
        default: function() {
          return {};
        }
      },
      showList: {
        default: false
      }
    },
    filters: {
      dateFormat(date) {
        return getFormatDate("yyyy-MM-dd hh:mm:ss", date);
      }
    },
    components:{
      LeadingPower: resolve => {
        require(["@/components/upgradingModule/Leading-Power1.vue"], resolve);
      },
      EchartScatter: resolve => {
        require(["@/components/public/echarts/echartScatter.vue"], resolve);
      },
    },
    data(){
      return{
        dataAxis:[],
        tableList:[],
        data1:[],
        dataone:[],
        datatwo:[],
        bacth:['第一批次','第二批次','第三批次'],

      }
    },
    mounted() {
      this.$nextTick(()=>{
        this.LtrStationCahange();
        this.GetEnterpStationChange()
      })
    },
    methods: {
      tableHeaderCellStyle () {
        return ' color: #333;background-color:#EAEFF1;font-weight:bold;font-size:13px'
      },
      //表单
      LtrStationCahange(){
        let data = localStorage.getItem("Id")
        // console.log('6',data)
        this.$fetch("/LtrStation/Query",{
          enterpriseid:data
        }).then(res => {
          if (res.code == 1) {
            if(res.data&&res.data.length>0){
              this.tableList = res.data;
              console.log('2',this.tableList)
            }
          }
        })
      },

      // 图数据集
      GetEnterpStationChange(){
        let data = localStorage.getItem("Id")
        // console.log('6',data)
        this.$fetch("/LtrStation/GetEnterpStation",{
          enterpriseid:data
        }).then(res => {
          if (res.code == 1) {

            let recieveData = res.data;
            this.data1=recieveData.enterpBatch.totalCapacityData;
            this.dataone=recieveData.enterpBatch.enterpCapacityData;
            this.datatwo=recieveData.enterpBatch.capacityRateData;
            this.$nextTick(()=>{
              this.$refs.compan.drawChart()
            })
            
          let ionData = recieveData.enterpBase;
            this.dataAxis={
              series: [{
                type: 'graph',
                layout: 'force',
                force: {
                  repulsion: 500,
                  edgeLength: 10
                },
                roam: true,
                label: {
                  normal: {
                    show: true
                  }
                },
                data:[]
              }],
              color: ['#fff', '#fff', '#fff'],
              name: ionData[0].name,
              animationDurationUpdate: function(idx) {
                // 越往后的数据延迟越大
                return idx * 100;
              },
              animationEasingUpdate: 'bounceIn',

            };

            this.$nextTick(()=>{
              this.intSeriseChange(ionData,this.dataAxis.series)
              this.$refs.echartspowers.initEcharts(this.dataAxis.series)
            })
          }
        })
      },
      intSeriseChange(ionData,series) {
        if (!ionData || ionData.length == 0) {
          return;
        }
        var colorList = [[
          '#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed',
          '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0',
          '#1e90ff', '#ff6347', '#7b68ee', '#d0648a', '#ffd700',
          '#6b8e23', '#4ea397', '#3cb371', '#b8860b', '#7bd9a5'
        ],
          [
            '#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed',
            '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0',
            '#1e90ff', '#ff6347', '#7b68ee', '#00fa9a', '#ffd700',
            '#6b8e23', '#ff00ff', '#3cb371', '#b8860b', '#30e0e0'
          ],
          [
            '#929fff', '#9de0ff', '#ffa897', '#af87fe', '#7dc3fe',
            '#bb60b2', '#433e7c', '#f47a75', '#009db2', '#024b51',
            '#0780cf', '#765005', '#e75840', '#26ccd8', '#3685fe',
            '#9977ef', '#f5616f', '#f7b13f', '#f9e264', '#50c48f'
          ]][2];
        let num=0;
        ionData.forEach(item => {
          num++ ;
          // let symbolSize= parseInt(item.value||0)/15;//  parseInt(item.value||0)>110?100:parseInt(item.value||0)   ;
          series[0].data.push(
                  {
                    // symbol: 'none',
                    // symbolSize: 0,
                    name: item.name,
                    value:parseInt(item.value||0) ,
                    "itemStyle": {
                      "normal": {
                        "shadowBlur": 100,
                        "shadowColor":colorList[num],
                        "color":colorList[num],
                      }
                    }     ,
                    "symbolSize":70,// ,
                    "draggable": true,
                    // type: 'graph',
                    // smooth: true,
                  }
          )
        });

      },
      back() {
        this.$emit("update:showList", true);
      }
    }
  };
</script>
<style lang="scss" scoped>
  .bold-text {
    font-weight: bold;
    font-size: 18px;
    padding-left: 50px;
    color: #666666;
  }
  .zui-info-breads {
    background: #efefef;
    padding: 16px 20px;
    i {
      vertical-align: middle;
    }
  }
  .zui-info-article {
    padding: 54px 0px 42px 0px;
    text-align: center;
  }
  .zui-article-info {
    display: flex;
    padding: 15px 0;
    span {
      flex: 1;
      white-space: nowrap;
      text-align: center;
      color: #999999;
      font-size: 14px;
    }
  }
  .zui-article-title {
    font-size: 24px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #333333;
    line-height: 24px;
    background: linear-gradient(0deg, #1DA63B 0%, #19B197 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .zui-article-content {
    width: 100%;
    height: 100%;
    display: flex;
    span{

      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #000000;
      width: 88px;
      line-height: 12px;
    }
    .my-icon-line{
      width: 100%;
      height: 15px;
      background-size: 100% 100%;
      display: inline-block;
      background: url("../../../assets/img/index/title-line.png")no-repeat;
    }
  }


  .zui-article-img{
    width: 198px;
    margin-right: 30px;
    border: 1px solid rgba(27, 172, 107, 0.6);
    overflow: hidden;
    height:198px;

  }
  .zui-baseInformation{
    text-align: right;
    margin-right: 10px;
    width:190px;
    height: 46px;
    background-image: linear-gradient(
                    rgba(25,177,151,0.1) 0%,
                    rgba(29,166,59,0.1) 100%),
    linear-gradient(
                    rgba(228,228,228,0.1),
                    rgba(228,228,228,0.1));
    span{
      color: #666666;
      font-size: 16px;
      line-height: 40px;
      padding-right: 20px;
    }
  }
  .zui-Information{
    width: 370px;
    height: 46px;
    background-image: linear-gradient(90deg,
            rgba(25, 177, 151, 0.2) 0%,
            rgba(29, 166, 59, 0.2) 100%);
    border: solid 1px rgba(27, 172, 107, 0.6);
    span{
      font-family: MicrosoftYaHei-Bold;
      font-size: 16px;
      color: #1bac6b;
      line-height: 40px;
      padding-left: 20px;
    }
  }
  .zui-card{
    display: flex;
    margin-bottom: 20px;
  }
  .zui-icon-back {
    cursor: pointer;
  }
  .zui-article-Bybase{
    margin-bottom: 24px;
    border-bottom: 2px solid #eeeeee;
    padding-bottom: 16px;
    .zui-article-by{
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #010101;
    }
  }
</style>
