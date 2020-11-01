<template>
  <div class="arrs">
    <div class="left-btn" @click="toggleLeft" :class="{hideRight:(hideRight||!showRightBtn)}" v-show="showlegend"></div>
    <div class="right-btn" @click="toggleRight" v-if="showRightBtn" :class="{hideRight:is_showJDGK}"></div>
    <div class="legend" :class="{hideRight:(hideRight||!showRightBtn)}" v-show="showlegend"></div>
    <div class="right-shadow" :class="{hideContentRight:is_showJDGK}">
    <div class="right-box">
      <div class="right-bg">
        <div class="seation">
          <Title title="发展历程" @click.native="OpenSwitchSpecialMap('open')" @dblclick.native="CloseSwitchSpecialMap" class="infoCursor"></Title>
          <div style="padding-right: 15px;height:210px;">
            <MyechartsBarA style="width:100%;" ids="myBarEchart1" v-if="adds.length>0" :dataArr="adds" :axisData="year" :unit="['万kW','%']" :highlight="isShowHighLight" :checkYear="checkYear" ref="targetsA"></MyechartsBarA>
          </div>
        </div>
        <div class="seations" style="height:338px;width:100%;">
          <Title title="产业发展"></Title>
          <div class="tabs pat-title">
            <span v-for="(item,index) in tabsarr" :key="index" class="my-icon-blue" :class="{active:item.bol}" @click="tabsval(item.name)">{{item.name}}</span>
          </div>
          <div style="padding-right: 0px;">
            <MyechartsBarB ids="myBarEchart2" style="height:240px;" v-if="addsB.length>0&&refresh" :dataArr="addsB" :axisData="yearB" :unit="developtUnit" ref="targetsB" :highlight="isShowHighLight" :checkYear="checkYear"></MyechartsBarB>
          </div>
        </div>
        <div class="seation" style="height:279px;background-size: 100% 100%;">
          <Title title="光伏电价"></Title>
          <div style="height:261px;width:100%;">
            <echartsubsidies ids="myscaleDatas" ref="marks" :databortwo="databortwo" :databottom="databottom" :databorone="databorone" :databorthree="databorthree" :databorfrou="databorfrou" :highlight="isShowHighLight" :checkYear="checkYear"></echartsubsidies>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
import Title from "@/components/public/TitleName";
import MyCard from "@/components/public/MyCardCopy";
import myBar from "@/components/public/echartLine";
import echartsParity from "@/components/public/echartsParity";
import MyechartsBar from "@/components/public/echarts/echartsBar";
import MyechartsBarA from "@/components/public/echarts/echartsBarA";
import MyechartsBarB from "@/components/public/echarts/echartsBarB";
import echartsubsidies from "@/components/public/echartsubsidies";
let time = null;
export default {
  name: "Overview",
  components: {
    Title,
    MyCard,
    echartsParity,
    MyechartsBar,
    MyechartsBarA,
    MyechartsBarB,
    echartsubsidies,
    myBar
  },
  data() {
    return {
      effctData: [],
      isShowHighLight: false,
      checkYear: null,
      hideLeft: false,
      hideRight: false,
      showRightBtn: true,
      showlegend: false,
      //  actTabs:'gj',
      actTab: "",
      seriesDatas: [],
      xAxisData: [],
      navData: [],
      refresh: true,
      active: "",

      year: [],
      yearB: [],
      adds: [],
      addsB: [],
      developtUnit:["%",''],
      dataList: [],
      Cumulative: [],
      tabsarr: [
        { name: "组件", bol: true },
        { name: "多晶硅", bol: false },
        { name: "硅片", bol: false },
        { name: "电池片", bol: false }        
      ],
      databortwo: [],
      databottom: [],
      databorone: [],
      databorthree: [],
      databorfrou: [],
      titleData:[],
      is_showJDGK:JSON.parse(localStorage.getItem('is_showJDGK'))
    };
  },
  mounted() {
    let yearNum = this.$route.query.yearnum;
    //通过url检查是否传值
    if (yearNum != null && yearNum != "") {
      this.isShowHighLight = true;
      this.checkYear = yearNum;
    }
    if(localStorage.getItem('is_showJDGK')==null){
      localStorage.setItem('is_showJDGK',false)
    }
    this.is_showJDGK = JSON.parse(localStorage.getItem('is_showJDGK'))
    this.getEffctData();
    this.target();
    this.targetB();
    this.subsidies();
   
    // this.suns();
  },
  watch: {
    $route(route) {
      this.hideLeft = false;
      this.hideRight = false;
      this.showRightBtn = true;
    }
  },
  methods: {
    //发展历程
    target() {
      let paramsData = {};
      this.$axios.post("Comprehensive/DevelopmentCourse", paramsData).then(res => {
          if (res.code == 1) {
            this.adds = [];
            if (res.data && res.data.length > 0) {
              let seriesDatas = [
                {
                  name: "新增装机容量",
                  type: "bar",
                  data: []
                },
                {
                  name: "累计装机容量",
                  type: "bar",
                  data: []
                },
                {
                  name: "年装机增长率",
                  type: "line",
                  yAxisIndex: 1,
                  data: []
                }
              ];
              let datas = res.data;
              this.titleData = res.data
              this.initTitleData()
              for (let item of datas) {
                seriesDatas[0].data.push(
                  item.theoryInstalledValue == null ? 0 : item.theoryInstalledValue
                );
                this.year.push(item.year == null ? 0 : item.year);
                seriesDatas[1].data.push(
                  item.installedValue == null ? 0 : item.installedValue
                );
                seriesDatas[2].data.push(
                  item.newRate == null ? 0 : item.newRate
                );
              }
              this.adds = seriesDatas;
            }
          }
        });
    },
    //产业发展切换
    tabsval(val) {
      this.tabsarr.map(item => {
        if (item.name == val) {
          item.bol = true;
        } else {
          item.bol = false;
        }
      });

      this.$nextTick(_ => {
        this.addsB = [];
        this.yearB = [];
        this.targetB(val)
      });
    },
    //产业发展
    targetB(val) {
      let developval = val || "组件";
      let seriesDatas = []
      this.developtUnit = developval == "组件"?["万吨",'元']:['万吨','%']
        seriesDatas = [
          {
            name: "产量",
            type: "bar",
            data: []
          },
          {
            name: developval == "组件"?"价格":"增速",
            type: "line",
            yAxisIndex: 1,
            data: []
          }
        ];
      this.$axios.post("Comprehensive/GetDevelopment?Type=" + developval).then(res => {
          if (res.code == 1) {
            if (res.data && res.data.length > 0) {
              let datas = res.data;
              for (let item of datas) {
                seriesDatas[0].data.push(item.production);
                this.yearB.push(item.year);
                if(developval !== "组件"){
                  seriesDatas[1].data.push(item.growth);
                }else{
                  seriesDatas[1].data.push(item.price);
                }
              }
              this.addsB = seriesDatas;
            }
          }
          this.$refs.marks.setEcharts();
        });
    },
    //光伏电价
    subsidies() {
      this.$axios.post("Comprehensive/GetPhotovoltaic").then(res => {
        if (res.code == 1) {
          if (res.data && res.data.length > 0) {
            for (let item of res.data) {
              this.databottom.push(item.year);
              this.databorone.push(item.plan_Region1);
              this.databortwo.push(item.plan_Region2);
              this.databorthree.push(item.plan_Region3);
              this.databorfrou.push(item.price);
            }
          }
        }
        this.$refs.marks.setEcharts();
      });
    },
    toggleLeft() {
      this.hideLeft = !this.hideLeft;
      $(".left-shadow").toggleClass("hideContentLeft");
    },
    toggleRight() {
      this.is_showJDGK = !this.is_showJDGK
      localStorage.setItem("is_showJDGK", this.is_showJDGK)
      this.hideRight = !this.hideRight;
      $(".right-shadow").toggleClass("hideContentRight");
    },
    showlegends(show) {
      this.showlegend = show;
    },
    changeposition(text) {
      this.position = text;
    },
    initTitleData(cls){
      if(localStorage.getItem("titledata")==null){
        localStorage.setItem("titledata",JSON.stringify({is_shownum: false,titleText: "全国光伏专题图"}))
        return
      }else if(cls!='open'&&JSON.parse(localStorage.getItem("titledata")).titleText.includes("全国光伏专题图")){
        return
      }else if(cls!="open"&&JSON.parse(localStorage.getItem("titledata")).titleText.includes("领跑基地")){
        return
      }else{
        let that = this
        let nowyear = this.titleData.filter(item=>{
          return item.year == that.checkYear
        })
        
        let obj = {
          is_shownum:true,
          titleText:`${that.checkYear}年全国装机容量专题图`,
          indexOneText:`累计装机容量(万kW)`,
          indexOneValue:`${nowyear[0].installedValue}`,
          indexTwoText:`新增装机容量(万kW)`,
          indexTwoValue:`${nowyear[0].theoryInstalledValue}`,
        }
        localStorage.setItem("titledata",JSON.stringify(obj))
        }
      
    },
    SwitchSpecialMap() {
      ///根据选择的年份更新专题图数据
      //01 检查是否获取到年份
      if (this.checkYear != null && this.checkYear != "") {
        var _this = this;
        let dataRequest = {
          yearNum: parseInt(_this.checkYear)
        };
      }
      console.log("基地概况左侧"+this.checkYear)
      this.CloseYearRunmap()
      //03调用刷新地图JS方法，刷新专题图
      this.oprationMapServer([{ service_id: "cfg_system.run",name: "全国平台-发展历程" + this.checkYear}]);
      this.oprationMapServer([{service_id: "cfg_system.run", name: "全国平台-省份颜色" + this.checkYear}]);
      util3D.closeyemian("基地概况左侧"+this.checkYear);
      util3D.opHtmlBatch(parseInt("20"+this.checkYear),"基地概况左侧"+this.checkYear);
      util3D.opHtmlBatch(parseInt(202008151551),"顶部标题")
      util3D.opHtmlBatchSend();
    },
    CloseYearRunmap(){
        util3D.closeyemian("顶部标题");
        this.oprationMapServer(this.effctData.产业升级.关闭全国平台第一批基地);
        this.oprationMapServer(this.effctData.产业升级.关闭全国平台第二批基地);
        this.oprationMapServer(this.effctData.产业升级.关闭各基地信息);
        this.oprationMapServer(this.effctData.产业升级.关闭飞线效果);
        this.oprationMapServer(this.effctData.产业升级.关闭省份名称);
    },
    OpenSwitchSpecialMap(cls) {
      this.is_showJDGK = !this.is_showJDGK
      localStorage.setItem("is_showJDGK", this.is_showJDGK)
      this.hideRight = !this.hideRight;
      this.initTitleData(cls)
      //执行事件
      clearTimeout(time);
      time = setTimeout(() => {
        this.SwitchSpecialMap();
      }, 300);
    },
    CloseSwitchSpecialMap() {
      clearTimeout(time);
      //执行事件
      this.oprationMapServer([ {service_id: "cfg_system.stop", name: "全国平台-发展历程" + this.checkYear}]);
      this.oprationMapServer([ {service_id: "cfg_system.stop",name: "全国平台-省份颜色" + this.checkYear}]);
    },
    oprationMapServer(data) {
      console.log(data)
      try {
        RESAFETY.callService(data);
      } catch (e) {
        console.log(e);
      }
    },
    getEffctData() {
      $.ajax({
        url: "json/3D_effect.json",
        async: false,
        type: "get",
        dataType: "json",
        success: res => {
          this.effctData = res;
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
.tabs {
  height: 50px;
  color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  span {
    line-height: 50px;
  }
}
.lis {
  display: inline-block;
  font-family: PingFang-SC-Regular;
  font-size: 14px;
  font-style: italic;
  line-height: 24px;
  color: #82c2eb;
}
.box-nav {
  width: 16px;
  height: 22px;
  display: inline-block;
  background: url("/img/Location-orange.png") no-repeat;
  margin: 0px 0px 0 16px;
}
.nav-name {
  font-size: 15px;
  color: #ff9d00;
  line-height: 26px;
  text-align: center;
}
.boxnav-title {
  height: 28px;
  display: inline-block;
  background: url(/img/orange-bg.png) no-repeat center;
  background-size: 100% 100%;
  vertical-align: bottom;
  margin-top: 14px;
  padding: 0 15px;
  margin-left: 5px;
}
.dingwei {
  margin: 8px 0 0 16px;
}
.miaoshu {
  font-family: PingFang-SC-Regular;
  font-size: 14px;
  font-style: italic;
  color: #82c2eb;
}
.target {
  margin-left: 16px;
  margin-top: 12px;

  .tar-title {
    font-family: PingFang-SC-Medium;
    font-size: 16px;
    line-height: 26px;
    color: #dcf4ff;
    text-align: left;
    padding-right: 27px;
  }
  .tar-number {
    font-family: DINCond-Bold;
    font-size: 36px;
    font-style: italic;
    line-height: 26px;
    color: #ff2066;
    text-align: center;
  }
  .tar-ction {
    padding-left: 6px;
    font-family: PingFang-SC-Medium;
    font-size: 14px;
    line-height: 26px;
    color: #82c2eb;
    opacity: 0.5;
  }
}

.scla {
  margin-left: 16px;
  margin-top: 12px;
  .scla-title {
    font-family: PingFang-SC-Medium;
    font-size: 16px;
    line-height: 24px;
    color: #dcf4ff;
  }
  .scla-number {
    font-family: DINCond-Bold;
    font-size: 36px;
    font-weight: normal;
    font-style: italic;
    font-stretch: normal;
    line-height: 24px;
    color: #ff2066;
    width: 2em;
    text-align: right;
    display: inline-block;
  }
  .scla-ti {
    padding-left: 10px;
    color: #31526c;
  }
}
.tar-bg {
  // margin-left: 19px;
  // width: 274px;
  margin-left: 20px;
  width: calc(100% - 40px);
  height: 14px;
  display: block;
  background: url("/img/line-segment.png") no-repeat;
}
.wan {
  font-family: DINOT;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0px;
  color: #ff9d00;
  padding-left: 16px;
}

.kws {
  font-family: PingFang-SC-Medium;
  font-size: 14px;
  line-height: 24px;
  color: #82c2eb;
  opacity: 0.5;
}
.ws {
  padding-left: 58px;
}
.wls {
  padding-left: 48px;
}
.bg-ms {
  display: flex;
  margin-left: 16px;
  font-family: PingFang-SC-Regular;
  font-size: 16px;
  line-height: 24px;
  color: #82c2eb;
  margin-top: -8px;
  margin-bottom: 8px;
}
.gfz {
  padding-left: 58px;
}
.gr {
  padding-left: 68px;
}
.stations {
  text-align: center;
  .my-icon-left {
    width: 32px;
    height: 6px;
    display: inline-block;
    background: url("../../assets/img/left-line.png") no-repeat;
  }
  .stat-name {
    font-family: PingFang-SC-Medium;
    font-size: 16px;
    line-height: 24px;
    color: #dcf4ff;
    padding: 0 10px;
  }
  .my-icon-right {
    width: 32px;
    height: 6px;
    display: inline-block;
    background: url("../../assets/img/right-line.png") no-repeat;
  }
}
.pat-title {
  margin-right: 16px;
  // margin-top: 10px;
  .my-icon-red {
    cursor: pointer;
    text-align: center;
    width: 57px;
    height: 24px;
    display: inline-block;
    font-size: 14px;
    line-height: 23px;
    color: #ff2066;
    background: url("../../assets/img/title-lines.png") no-repeat;
  }

  .my-icon-red:active {
    -webkit-text-fill-color: #82c2eb;
    text-align: center;
    font-size: 14px;
    line-height: 23px;
    color: #82c2eb;
    text-align: center;
    width: 57px;
    height: 24px;
    display: inline-block;
    background: url("../../assets/img/title-blue.png") no-repeat;
  }
  .my-icon-blue {
    cursor: pointer;
    text-align: center;
    color: #82c2eb;
    font-size: 14px;
    line-height: 23px;
    margin-left: 10px;
    width: 57px;
    height: 24px;
    display: inline-block;
    background: url("../../assets/img/title-blue.png") no-repeat;
  }
  .active {
    -webkit-text-fill-color: #ff2066;
    cursor: pointer;
    font-size: 14px;
    line-height: 23px;
    color: #ff2066;
    text-align: center;
    margin-left: 10px;
    width: 57px;
    height: 24px;
    display: inline-block;
    background: url("../../assets/img/title-lines.png") no-repeat;
  }
}
.market {
  margin-left: 16px;
  margin-top: 18px;
  width: 385px;
  height: 69px;
  background: url("/img/First-batch.png") no-repeat;
  .my-icon {
    position: relative;
    left: 52px;
    top: -8px;
    font-size: 16px;
    color: #ff6600;
  }
  .my-icon-one {
    width: 24px;
    height: 24px;
    display: inline-block;
    vertical-align: top;
    background: url("/img/InstalledCapacity-blue.png") no-repeat;
  }
  .my-icon-two {
    width: 24px;
    height: 24px;
    vertical-align: top;
    display: inline-block;
    background: url("/img/InstalledCapacity-green.png") no-repeat;
  }
  .my-icon-three {
    width: 24px;
    height: 24px;
    vertical-align: top;
    display: inline-block;
    background: url("/img/InstalledCapacity-orange.png") no-repeat;
  }
}
.my-icons {
  display: inline-block;
  margin-left: 18px;
}
.my-icon0 {
  color: #2197cc !important;
}
.my-icon1 {
  color: #62a514 !important;
}
.my-icon2 {
  color: #ff6600 !important;
}
.mars-pl {
  display: inline-block;
  vertical-align: top;
}
.mar-palys {
  // margin-left: 12px;
  font-size: 16px;
  color: #82c2eb;
}
.mar-paly {
  margin-left: 12px;
  font-size: 16px;
  color: #82c2eb;
}
.mars-qg {
  display: inline-block;
  margin-left: 16px;
}
.mar-six {
  margin-left: 12px;
  font-size: 16px;
  vertical-align: middle;
  color: #dcf4ff;
}
.mar-mw {
  vertical-align: bottom;
  font-size: 14px;
  color: #82c2eb;
  opacity: 0.5;
  margin-left: 23px;
}
.mar-iocn-tus {
  //  margin-left: 16px;
}
.mar-iocn-tu {
  width: 138px;
  height: 6px;
  display: inline-block;
  background: url("/img/one.png") no-repeat;
}
.mar-iocn-tu2 {
  width: 138px;
  height: 6px;
  display: inline-block;
  background: url("/img/two.png") no-repeat;
}
.mar-iocn-tu3 {
  width: 138px;
  height: 6px;
  display: inline-block;
  background: url("/img/threes.png") no-repeat;
}
.mars-pls {
  display: inline-block;
  margin: 15px 0 0 16px;
}

.mar-qg {
  font-family: PingFang-SC-Medium;
  font-size: 16px;
  line-height: 24px;
  color: #82c2eb;
}
.mar-bf {
  font-family: DINOT;
  font-size: 20px;
  line-height: 24px;
  color: #ff2066;
}
.active {
  cursor: pointer;
  color: #fff;
  background: linear-gradient(to bottom, #ff9600, #ff9800);
  -webkit-background-clip: text;
  font-weight: bolder;
  color: transparent;
  -webkit-text-fill-color: transparent;
  text-fill-color: transparent;
  text-shadow: 0 0 20px rgba(5, 215, 236, 0.9);
}
.active1 {
  cursor: pointer;
  color: #fff;
  background: linear-gradient(to bottom, #00d8ff, #01d6eb);

  -webkit-background-clip: text;
  font-weight: bolder;
  color: transparent;
  -webkit-text-fill-color: transparent;
  text-fill-color: transparent;
  text-shadow: 0 0 20px rgba(5, 215, 236, 0.9);
}
.active2 {
  cursor: pointer;
  color: #fff;
  background: linear-gradient(to bottom, #13f511, #00ff12);
  -webkit-background-clip: text;
  font-weight: bolder;
  color: transparent;
  -webkit-text-fill-color: transparent;
  text-fill-color: transparent;
  text-shadow: 0 0 20px rgba(5, 215, 236, 0.9);
}
.infoCursor {
  cursor: pointer;
}
</style>
