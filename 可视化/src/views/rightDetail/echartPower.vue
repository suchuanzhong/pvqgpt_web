<template>
  <div class="arrs">
    <div
      class="left-btn"
      @click="toggleLeft"
      :class="{hideRight:(hideRight||!showRightBtn)}"
      v-show="showlegend"
    ></div>
    <div class="right-btn" @click="toggleRight" v-if="showRightBtn" :class="{hideRight:hideRight}"></div>
    <div class="legend" :class="{hideRight:(hideRight||!showRightBtn)}" v-show="showlegend"></div>
    <div class="right-box">
      <div class="right-bg">
        <div class="seation">
          <Title title="资源分析"></Title>
          <div>
            <echartsresources
                    ids="resources"
                    ref="sourses"
                  
                    style="height:200px" 
                    :barWidth="8"

            ></echartsresources>
          </div>
        </div>
        <div class="seation">
          <Title title="投资分析"></Title>
            <div  style="padding-right: 15px;">
                <echartsBarl
                        style="height: 210px;"  :barWidth="8"
                        ids="myBarEchartS"
                        :subText="['(总价)']"
                        ref="target"
                        :dataAxis="allDataBar"
                        :yearsDats="djBar"
                ></echartsBarl>
            </div>

        </div>
        <div class="seations">
          <Title title="LCOE分析"></Title>
          <div >
            <MyechartsAnalysis
                    style="height: 300px;"
                    
            ></MyechartsAnalysis>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Title from "@/components/public/TitleName";
import echartsyear from "@/components/public/echartsyear";
import echartsresources from "@/components/public/echarts/echartsresources";
import echartsBarl from "@/components/public/echartsBarl";
import MyechartsAnalysis from "@/components/public/echarts/echartsAnalysis";
export default {
  name: "Overview",
  components: {
    Title,
    echartsyear ,
    echartsresources,
    echartsBarl,
    MyechartsAnalysis
  },
  data() {
    return {
      totalTreeCount:0,
      data1: [],
      years:[],

      dataone: [],
      datatwo: [],
      hideLeft: false,
      hideRight: false,
      showRightBtn: true,
      showlegend: false,
      actTab: true,
      actTabs: false,
      refresh: true,
      active: "",
      allDataBar:[],
      djBar:[],
    };
  },
  watch: {
    $route(route) {
      this.hideLeft = false;
      this.hideRight = false;
      this.showRightBtn = true;
    }
  },
  mounted() {
    this.SocialResults();
    this.Environmental();
    this.subsidies();
  },
  methods: {
    //资源分析
    subsidies() {
      this.$axios.post("ComprehensiveAnalysis/GetResourceAnalysis").then(res => {
        // debugger
        if (res.code == 1) {
          this.data1=[];
          if (res.data && res.data.length>0) {
            let targetData = res.data;
           let serData=[
             {
               name: "发电量",
               type: "bar",
               yAxisIndex: 0,
               data: []
             },
             {
               name: "利用小时数",
               type: "bar",
               xAxisIndex: 1,
               data: []
             },
             {
               name: "辐射量",
               type: "line",
               yAxisIndex: 1,
               data:[]
             }
           ] ;

           for (let item of targetData){
             this.years.push(item.araeTypeName);
             serData[0].data.push(item.radiation);
             serData[1].data.push(item.powerGeneration);
             serData[2].data.push(item.hourNumber);

           }
            this.data1=serData;
            // console.log('shuju',this.data1)
            // this.$refs.sourses.drawChart();

          }



        }
      });
     

    },
    //投资分析
    SocialResults() {
      this.$axios.post("ComprehensiveAnalysis/GetInvestmentAnalysis").then(res => {

        if (res.code == 1) {
          if (res.data ) {
           this.allDataBar=res.data.yearArray;
           this.djBar=res.data.costArray;
          }
          this.$refs.target.setEcharts(this.allDataBar,this.djBar);
        }

      });
    },
    //LCOE分析
    Environmental() {
      this.$axios.post("ComprehensiveAnalysis/GetLCOEanalysis").then(res => {
        if (res.code == 1) {
          if (res.data ) {
             this.dataone=[];
            let recieveData= res.data;
            let seriesDatas=[
              {
                name: "初始投资",
                type: "bar",
                yAxisIndex: 0,
                data:[]
              },
              {
                name: "1800h",
                type: "line",
                yAxisIndex: 1,
                data: []
              },
              {
                name: "1500h",
                type: "line",
                data: []
              } ,
              {
                name: "1200h",
                type: "line",
                data: []
              } ,
              {
                name: "1000h",
                type: "line",
                data: []
              },

            ];
               this.datatwo=recieveData.yaerArray;
               // seriesDatas[0].data=recieveData.typeArray
               seriesDatas[0].data=recieveData.initialInvestment
               seriesDatas[1].data=recieveData.arrar1800h
               seriesDatas[2].data=recieveData.arrar1500h
               seriesDatas[3].data=recieveData.arrar1200h
               seriesDatas[4].data=recieveData.arrar1000h
             this.dataone=seriesDatas
            
          }

        }
        // this.$refs.analysis.drawChart(this.dataone,this.datatwo);
      });
    },
    actTabTo(type) {
      this.actTab = !this.actTab;
      // this.actTabs=true;
      this.refresh = false;

      this.$nextTick(_ => {
        this.refresh = true;
      });
    },

    toggleLeft() {
      this.hideLeft = !this.hideLeft;
      $(".left-box").toggleClass("hideContentLeft");
    },
    toggleRight() {
      this.hideRight = !this.hideRight;
      $(".right-box").toggleClass("hideContentRight");
    },
    showlegends(show) {
      this.showlegend = show;
    },
    changeposition(text) {
      this.position = text;
    }
  }
};
</script>
<style scoped lang="scss">

.information{
    padding: 24px 10px 0 10px;
    .nav{
        margin-bottom: 26px;
    }
     .my-iocn-electricity{
            width:53px;
            height: 64px;
            display: inline-block;
            background: url("/img/electricity.png") no-repeat;
        }
        .my-iocn-output{
            width:53px;
            height: 64px;
            display: inline-block;
            background: url("/img/output.png") no-repeat;
        }
         .my-iocn-employment{
            width:53px;
            height: 64px;
            display: inline-block;
            background: url("/img/employment.png") no-repeat;
        }
         .my-iocn-tax{
            width:53px;
            height: 64px;
            display: inline-block;
            background: url("/img/tax.png") no-repeat;
        }
        .power-list{
         margin-bottom: 6px;
            width: 123px;
            height: 26px;
            background: rgba(0, 88, 134, 0.4);
           
            span{
            text-align: center;
            color: #82c2eb;
            font-size: 16px;
            line-height: 24px;
              margin-left: 8px;
            }
        }
        .power{
             width: 123px;
            height: 34px;
            background: rgba(0, 88, 134, 0.4);
           display: inline-block;

        }
        .power-left{
           color: #dcf4ff;
            font-family: DINOT;
            font-size: 20px;
            line-height: 32px;
            float: left;
            margin-left: 8px;
            // color: #dcf4ff;
        }
        .power-kw{
            float: right;
            font-family: PingFang-SC-Medium;
            font-size: 14px;
            line-height: 32px;
            color: #82c2eb;
            margin-right: 6px;
        }
    .mation-title{
       display: inline-block;
       vertical-align: text-bottom;
       margin-left:4px;
        
       
    }
     
}
.protection{
  margin-top: 20px;
  padding-left: 33px;
  h4{
    font-family: PingFang-SC-Medium;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 40px;
      letter-spacing: 0px;
      color: #82c2eb;
      padding-left: 20px;
      padding-bottom: 8px;
  }
  img{
    // padding-left: 33px;
    padding-bottom: 8px;
  }
  .prote-time{
      text-align: center;
    	
      .prote-number{
    font-family: DINOT;
      font-size: 30px;
      line-height: 36px;
      letter-spacing: 0px;
      color: #ff9d00;
      }
      .prote-tree{
        font-family: PingFang-SC-Medium;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 36px;
        letter-spacing: 0px;
        color: #82c2eb;
        opacity: 0.5;
      }
  }
}
.benefit{
  padding-top: 24px;
  // padding-left: 30px;
  .benk{
    width: 158px;
    height: 49px;
    display: inline-block;
    background: url('/img/Environmentalbg.png') no-repeat;
   
  }
   .benk-title{
     position: relative;
      top: -11px;
     text-align: center;
      font-family: PingFang-SC-Medium;
      font-size: 16px;
      line-height: 24px;
      font-weight: normal;
      color: #82c2eb;
    }
    .car{
        vertical-align: top;
        padding-left: 8px;
        margin-top: -7px;
        .my-icon-caon{
          width: 26px;
          height: 19px;
           margin-right: 8px;
          display: inline-block;
          background-image: url('/img/Carbondioxide.png');
        }
        .my-icon-nitrogen{
          width: 26px;
          height: 27px;
          display: inline-block;
          margin-top: -2px;
          background-image: url('/img/nitrogen.png');
        }
        .my-icon-Sulfurdioxide{
          width: 26px;
          height: 26px;
          display: inline-block;
          background-image: url('/img/Sulfurdioxide.png');
        }
        .my-icon-coal{
          width: 26px;
          height: 25px;
          display: inline-block;
          background-image: url('/img/coal.png');
        }
      .benk-number{
        vertical-align: top;
     
        font-family: DINOT;
        font-size: 18px;
        line-height: 24px;
        letter-spacing: 0px;
        color: #dcf4ff;
      }
      .wan{
        vertical-align: top;
        float: right;
          margin-right: 4px;
        font-family: PingFang-SC-Regular;
        font-size: 14px;
        line-height: 24px;
        letter-spacing: 0px;
        color: #82c2eb;
        opacity: 0.5;
      }
    }
    
}
</style>


  
