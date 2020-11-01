<template>
  <div class="arr" style="height: 990px;">
    <!-- <div class="left-btn" @click="toggleLeft" :class="{hideRight:(hideRight||!showRightBtn)}" v-show="showlegend"></div>
    <div class="right-btn" @click="toggleRight" v-if="showRightBtn" :class="{hideRight:hideRight}"></div> -->
    <div class="left-btn" @click="toggleLeft" :class="{hideLeft:is_showJDGK}"></div>
    <div class="right-btn" @click="toggleRight" v-if="showRightBtn" :class="{hideRight:hideRight}"></div>
    <div class="legend" :class="{hideRight:(hideRight||!showRightBtn)}" v-show="showlegend">
    </div>
    <div class="left-shadow" :class="{hideContentLeft:is_showJDGK}">
   
    <div class="left-box">
      <div class="left-bg">
        <div class="seations">
          <Title title="领跑基地" @click.native="OpenRunMap('open')" @dblclick.native="CloseRunMap" class="infoCursor"></Title>
          <div class="rep">
            <div>
              <span class="icon-rep icon-rep1"></span>
              <span class="title">批复容量</span>
            </div>
            <div>
              <span class="allrep">{{capacitydata[0].scale}}</span>
              <span class="repd">MW</span>
            </div>
          </div>
          <div class="repmain">
            <div class="repmainl">
              <div class="tabs pat-title">
                <span v-for="(item,index) in lptabArr" :key="index" class="my-icon-blue" :class="{active:item.bol}" @click="repTabs(item.code)">{{item.name}}</span>
              </div>
              <echartsGallery style="height:210px;margin-top:37px" ids="resources" ref="doublePieRefes" subText="['电站数量（个）']" :galleryData="rightDatas" :legendData="lplegenddata"></echartsGallery>
          
            </div>

            <ul class="repmainr">
              <li>
                <p class="title">累计并网容量</p>
                <div>
                  <span class=" icon-rep icon-rep2"></span>
                  <span class="allrep">{{capacitydata[0].gridscale}}</span>
                  <span class="repd">MW</span>
                </div>
              </li>
              <li>
                <p class="title">在建容量</p>
                <div>
                  <span class=" icon-rep icon-rep3"></span>
                  <span class="allrep">{{capacitydata[0].buildscale}}</span>
                  <span class="repd">MW</span>
                </div>
              </li>
              <li>
                <p class="title">未开工容量</p>
                <div>
                  <span class=" icon-rep icon-rep4"></span>
                  <span class="allrep">{{capacitydata[0].nbuildscale}}</span>
                  <span class="repd">MW</span>
                </div>
              </li>
            </ul>

          </div>

        </div>
        <div class="seation" style="height:260px">
          <Title title="领跑技术"></Title>
          <div class="tabs pat-title">
            <span v-for="(item,index) in technologyTab" :key="index" class="my-icon-blue" :class="{active:item.bol}" @click="technologyTabs(item.name)">{{item.name}}</span>
          </div>
          <div style="padding-right:10px;">
           <EchartsBarsC style="height:210px;width:100%;" ref="technologyBar" ids="myBarEchart1" v-if="lpjsData.length>0" :dataArr="lpjsData" :axisData="lpjsyear" title="基地转换效率技术标准" :unit="['%','']" :highlight="isShowHighLight" :checkYear="checkYear" ></EchartsBarsC>
          </div>
        </div>
        <div class="seation">
          <div style="cursor:pointer" @click="show720(videoData[0].url)"> 
             <Title title="领跑电价"></Title>
          </div>
          <div class="tabs pat-title">
            <span style="width:74px;margin-left:5px" v-for="(item,index) in tabsarr" :key="index" class="my-icon-blue" :class="{active:item.bol}" @click="tabsval(index+1)">{{item.name}}</span>
          </div>
          <div>
            <EchartsParityA style="height:200px;"  ref="BarRef" :data1="data1" :dataone="dataone" :datatwo="datatwo" :datatime="datatime" ids="myParitys" :subText="['元/kW.h','%']"></EchartsParityA>
          </div>
        </div>
      </div>
    </div>
    <component :is="dialogTypeName" :averagePrice="data1" :benchmarkPrice="dataone" :reduction="datatwo" :datatime="datatime" ids="televt"/>

    </div>
  </div>
</template>
<script>
import Title from "@/components/public/TitleName";
import MyCard from "@/components/public/MyCardCopy";
import echartsGallery from "@/components/public/echartsGallery";
import myBar from "@/components/public/echartLine";
import EchartsBarsC from "@/components/public/echarts/echartsBarC";
import EchartsParityA from "@/components/public/echartsParityA";
import DialogElectrovalence from "@/components/public/dialogElectrovalence";
import MyechartsBar from "@/components/public/echarts/echartsBar";
// import MyechartsBarA from "@/components/public/echarts/echartsBarA";
import MyProgress from "@/components/MyProgress";

let time = null;
export default {
  name: "Overview",
  components: {
    Title,
    MyCard,
    echartsGallery,
    myBar,
    EchartsParityA,
    DialogElectrovalence,
    MyechartsBar,
    EchartsBarsC,
    // MyechartsBarA,
    MyProgress
  },
  data() {
    return {
      dialogTypeName:'',
      effctData: [],
      isShowHighLight: false,
      checkYear: null,
      data1: [],
      datatime: [],
      dataone: [],
      datatwo: [],
      dataArr: [],
      hideLeft: false,
      hideRight: false,
      showRightBtn: true,
      showlegend: false,
      actTab: true,
      actTabs: false,
      lptabArr: [
        { name: "全部", code: "all", bol: true },
      ],
      lplegenddata:[],
      tabsarr: [
        { name: "一类资源区", bol: true },
        { name: "二类资源区", bol: false },
        { name: "三类资源区", bol: false }
      ],
      // timebol: false,
      technologyTab:[
        { name: "组件", code: "", bol: true },
        { name: "逆变器", code: "", bol: false },
      ],
      lpjsData: [],
      lpjsyear: [],
      refresh: true,
      refredshd: true,
      active: "",
      allDataBar: [],
      djBar: [],
      lpdjBar: [],
      lpjBar: [],
      capacitydata: [
        {
          gridscale: 100,
          buildscale: 0,
          nbuildscale: 0,
          scale: 100
        }
      ],
      rightDatas: [],
      LeftDatas: [],
      statistic: "",
      videoData:[],
      titleData:[],
      is_showJDGK:JSON.parse(localStorage.getItem('is_showJDGK'))
    };
  },
  watch: {
    $route(route) {
      console.log(route)
      this.hideLeft = false;
      this.hideRight = false;
      this.showRightBtn = true;
    }
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
    this.leadqy("",this.checkYear);
    this.leadjs("",this.checkYear);
    this.Internet("",this.checkYear);
    this.getJson();
   
  },
  methods: {
    //获取弹窗数据源
     getJson(){
                $.ajax({
                    url: 'json/data.json',
                    success: (res => {
                        this.videoData = res.videoData;
                          console.log(this.videoData);
                    })
                })

            },
    //设置弹窗信息
    show720(dataObj)
            {
              console.log(dataObj);
                var data=[dataObj];
                try{
                    RESAFETY.callService(data)
                }catch (e) {
                    console.log('连接失败，cfg_system.run')
                }
            },
    //领跑基地切换
    repTabs(name) {
      this.lptabArr.map(item => {
        if (item.code == name) {
          item.bol = true;
        } else {
          item.bol = false;
        }
      });

      this.$nextTick(_ => {
        this.rightDatas = [];
        this.lplegenddata =[];
        if (name !== "all") {
          this.leadqy(name,"");
        } else {
          this.leadqy(" ","");
        }
        this.$refs.doublePieRefes.drawChart();
      });
    },
    //领跑基地
    leadqy(leadbatchval,year) {

      let leadbatch = leadbatchval || " ";
      let yearnum = year ||"";
      this.$axios.post("Comprehensive/GetLeadingBase?batch=" + leadbatch+"&time="+yearnum).then(res => {
          if (res.code == 1) {
            if (res.data) {
              let leadData = res.data.baseBatchOutPuts;
              this.titleData = res.data.baseBatchOutPuts
              this.getJDnumber();
              let leadjd = res.data.baseCapacityOutPut;
              this.capacitydata = [];
              for (let item of leadData) {
                this.lplegenddata.push(item.name)
                this.rightDatas.push({
                  name: item.name,
                  value: item.capacity
                });
              }
              if(this.lptabArr.length==1){
                this.lplegenddata.map(item=>{
                  this.lptabArr.push({
                    name:item,
                    code:item,
                    bol:false
                  })
                })
              }
              this.capacitydata.push(leadjd);
              this.$refs.doublePieRefes.drawChart();
            }
          }
        });
    },
    //领跑技术切换
    technologyTabs(name){
      this.lpjsData= []
      this.lpjsyear= []
      this.technologyTab.map(item => {
        if (item.name == name) {
          item.bol = true;
        } else {
          item.bol = false;
        }
      });
      this.leadjs(name,this.checkYear)
      this.$refs.technologyBar.drawChart();
      
    },
    //领跑技术
    leadjs(value,year) {
      let technologyVal= value || "组件";
      let yearnum = year ||"";
      let seriesDatas = []
      if(technologyVal == "组件"){
        seriesDatas = [
          {
            name: "单晶",
            type: "bar",
            data: []
          },
          {
            name: "多晶",
            type: "bar",
            data: []
          }
        ];
      }else if(technologyVal == "逆变器"){
        seriesDatas = [
          {
            name: "逆变器",
            type: "bar",
            data: []
          }
        ];
      }
      this.$axios.get("Comprehensive/GetTechnology?time="+yearnum).then(res => {
          if (res.code == 1) {
            if (res.data && res.data.length > 0) {
              let datas = res.data;
              for (let item of datas) {
                if(technologyVal == "组件"){
                  seriesDatas[0].data.push(item.s_devicevale == null ? 0 : item.s_devicevale);
                  seriesDatas[1].data.push(item.m_devicevale == null ? 0 : item.m_devicevale);
                }else if(technologyVal == "逆变器"){
                  seriesDatas[0].data.push(item.i_devicevale == null ? 0 : item.i_devicevale);
                }
                this.lpjsyear.push(item.batch !== null? item.batch : '');
              }
              this.lpjsData = seriesDatas;
            }
          }
        
      });
    },
    //领跑电价切换
    tabsval(val) {
      this.tabsarr.map((item, idx) => {
        if (idx + 1 == val) {
          item.bol = true;
        } else {
          item.bol = false;
        }
      });
      this.data1 = [];
      this.dataone = [];
      this.datatwo = [];
      this.datatime = [];
      this.$nextTick(_ => {
        this.Internet(val,this.checkYear);
      });
    },
    // 领跑电价
    Internet(lpdj,year) {
      let batchval = lpdj || "1";
      let yearnum = year ||"";
      this.$axios.post("Comprehensive/GetLeadingPower?sourcearea=" + batchval + "&time="+yearnum).then(res => {
          if (res.code == 1) {
            if (res.data && res.data.length > 0) {
              let recieveData = res.data;
              for (let item of recieveData) {
                this.data1.push(item.powerOutPut.price);
                this.dataone.push(item.powerOutPut.benchmarkPrice);
                this.datatwo.push(item.powerOutPut.reduction);
                this.datatime.push(item.baseName);
              }
              let electrovalence={averagePrice:this.data1,benchmarkPrice:this.dataone,reduction:this.datatwo,datatime:this.datatime,ids:"televt"};
              localStorage.setItem("electrovalence", JSON.stringify(electrovalence));
              this.$refs.BarRef.drawChart();
            }
          }
        });
    },

    toggleLeft() {
      this.is_showJDGK = !this.is_showJDGK
      localStorage.setItem("is_showJDGK", this.is_showJDGK)
      this.hideLeft = !this.hideLeft;
      $(".left-shadow").toggleClass("hideContentLeft");
    },
    toggleRight() {
      this.hideRight = !this.hideRight;
      $(".right-shadow").toggleClass("hideContentRight");
    },
    showlegends(show) {
      this.showlegend = show;
    },
    changeposition(text) {
      this.position = text;
    },
    initTitleData(jdnum){
      let that = this
      let capacity = 0
      new Array(this.titleData.length).fill("").map((item,index)=>{
        capacity+=that.titleData[index].capacity
      })
      let obj = {
        is_shownum:true,
        titleText:`全国光伏领跑基地专题图`,
        indexOneText:`基地(个)`,
        indexOneValue:`${jdnum}`,
        indexTwoText:`装机容量(MW)`,
        indexTwoValue:`${capacity}`,
      }
      localStorage.setItem("titledata",JSON.stringify(obj))
    },
    getJDnumber(cls){

      if(!this.lptabArr[0].bol) return
      if(localStorage.getItem("titledata")==null){
        localStorage.setItem("titledata",JSON.stringify({is_shownum: false,titleText: "全国光伏专题图"}))
        return
      }else if(cls!='open'&&JSON.parse(localStorage.getItem("titledata")).titleText.includes("全国光伏专题图")){
        return
      }else if(cls!='open'&&JSON.parse(localStorage.getItem("titledata")).titleText.includes("全国装机容量")){
        return
      }else{
        let that =this
        let jdnum = 0 
        let yearnum = this.checkYear;
        let promiseArr = new Array( this.titleData.length).fill("").map((item,index)=>{
          return that.$axios.post("Comprehensive/GetLeadingBase?batch=" + this.titleData[index].name+"&time="+yearnum)
        })
        Promise.all(promiseArr).then(res=>{
          res.map(item =>{
            jdnum+=item.data.baseBatchOutPuts.length
          })
          that.initTitleData(jdnum)
        })
      }
      
    },
    OpenRunMap(cls) {
      this.is_showJDGK = !this.is_showJDGK
      localStorage.setItem("is_showJDGK", this.is_showJDGK)
       this.hideLeft = !this.hideLeft;
      //执行事件
      this.getJDnumber(cls)
      clearTimeout(time);
       console.log("基地概况右侧"+this.checkYear+"1")
      time = setTimeout(() => {
        this.CloseYearRunmap()
        this.oprationMapServer([{service_id: "cfg_system.stop",name: "全国平台-发展历程" + this.checkYear}]);
        this.oprationMapServer([{ service_id: "cfg_system.stop",name: "全国平台-省份颜色" + this.checkYear}]);
        // util3D.closeyemian("顶部标题");
       
        util3D.closeyemian("基地概况右侧"+this.checkYear+"1");
        util3D.opHtmlBatch(parseInt("20"+this.checkYear+"1"),"基地概况右侧"+this.checkYear+"1");
        util3D.opHtmlBatch(parseInt(202008151551),"顶部标题")
        util3D.opHtmlBatchSend();
        this.OpenYearRunmap()
        
        
      }, 300);
    },
    CloseRunMap() {
      clearTimeout(time);
      //执行事件
      // this.oprationMapServer(this.effctData.产业升级.关闭各基地信息);
      // this.oprationMapServer(this.effctData.产业升级.关闭飞线效果);
      // this.oprationMapServer(this.effctData.产业升级.关闭省份名称);
      this.CloseYearRunmap()
    },
    OpenYearRunmap(){
      let year =this.checkYear;
      if(parseInt(year) == 2015){
        this.oprationMapServer(this.effctData.产业升级.调用全国平台第一批基地);
      }else if(parseInt(year) == 2016){
        this.oprationMapServer(this.effctData.产业升级.调用全国平台第二批基地);
      }else{
        this.oprationMapServer(this.effctData.产业升级.调用各基地信息);
        this.oprationMapServer(this.effctData.产业升级.调用飞线效果);
        this.oprationMapServer(this.effctData.产业升级.调用省份名称);
      }
    },
    CloseYearRunmap(){
         util3D.closeyemian("顶部标题");
        this.oprationMapServer(this.effctData.产业升级.关闭全国平台第一批基地);
        this.oprationMapServer(this.effctData.产业升级.关闭全国平台第二批基地);
        this.oprationMapServer(this.effctData.产业升级.关闭各基地信息);
        this.oprationMapServer(this.effctData.产业升级.关闭飞线效果);
        this.oprationMapServer(this.effctData.产业升级.关闭省份名称);
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
.rep {
  width: 100%;
  height: 36px;
  padding: 0 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: url("../../assets/img/rep5.png") no-repeat center;
  margin-top: 20px;
  div {
    display: flex;
    align-items: center;
  }
}
.icon-rep {
  display: inline-block;
  width: 22px;
  height: 22px;
  margin-right: 10px;
  background: url("../../assets/img/rep1.png") no-repeat;
}
.icon-rep1 {
  background: url("../../assets/img/rep1.png") no-repeat;
}
.icon-rep2 {
  background: url("../../assets/img/rep2.png") no-repeat;
}
.icon-rep3 {
  background: url("../../assets/img/rep3.png") no-repeat;
}
.icon-rep4 {
  background: url("../../assets/img/rep4.png") no-repeat;
}

.title {
  color: #71aad1;
  font-size: 16px;
}
.allrep {
  font-size: 20px;
  color: #ff9d00;
}
.repd {
  text-align: end;
  font-size: 14px;
  color: #3a5d7a;
  margin-left: 10px;
}
.reptabs {
  cursor: pointer;
  display: flex;
  justify-content: space-around;
  color: #fff;
  font-size: 12px;
  i {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }
  & span:nth-child(1) i {
    background-color: #e8386f;
  }
  & span:nth-child(2) i {
    background-color: #0061f3;
  }
  & span:nth-child(3) i {
    background-color: #4d9eff;
  }
}
.repmain {
  display: flex;
  justify-content: space-between;
  overflow: hidden;
}
.repmainl {
  width: 234px;
}
.repmainr {
  padding-top: 50px;
  padding-right: 8px;
}
.repmainr li {
  width: 158px;
  height: 64px;
  padding: 0 15px;
  margin-bottom: 20px;
  background: url("../../assets/img/rep0.png") no-repeat bottom;
  // background-position-y:bottom;
  .title {
    line-height: 32px;
    text-align: center;
    margin-top: -16px;
  }
  .allrep {
    color: #fff;
  }
}

// ...
.tabs {
  height: 20px;
  font-size: 12px;
  color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  span {
    line-height: 20px;
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
  font-size: 16px;
  color: #ff9d00;
  line-height: 26px;
  text-align: center;
}
.boxnav-title {
  width: 200px;
  height: 28px;
  display: inline-block;
  background: url("/img/orange-bg.png") no-repeat;
  vertical-align: bottom;
  margin-top: 14px;
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
    padding-left: 40px;
  }
  .scla-ti {
    padding-left: 10px;
  }
}
.tar-bg {
  margin-left: 19px;
  width: 274px;
  height: 14px;
  display: inline-block;
  background: url("/img/line-segment.png") no-repeat;
}
.wan {
  display: flex;
  font-family: DINOT;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0px;
  color: #ff9d00;
  margin-left: 16px;
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
  margin-left: 16px;
  margin-top: 10px;
  position: absolute;
  z-index: 99;
  .my-icon-red {
    cursor: pointer;
    text-align: center;
    width: 57px;
    height: 24px;
    display: inline-block;
    font-size: 14px;
    line-height: 23px;
    color: #ff2066;
    margin-left: 10px;
    background: url("../../assets/img/title-lines.png") no-repeat;
    background-size: 100% 100%;
  }

  .my-icon-red.active {
    text-align: center;
    font-size: 14px;
    line-height: 23px;
    color: #82c2eb;
    text-align: center;
    width: 57px;
    height: 24px;
    margin-left: 10px;
    display: inline-block;
    background: url("../../assets/img/title-blue.png") no-repeat;
    background-size: 100% 100%;
  }

  .my-icon-blue.active {
    cursor: pointer;
    font-size: 14px;
    line-height: 23px;
    color: #ff2066;
    text-align: center;
    width: 57px;
    height: 24px;
    margin-left: 10px;
    display: inline-block;
    background: url("../../assets/img/title-lines.png") no-repeat;
    background-size: 100% 100%;
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
    background-size: 100% 100%;
  }
}
.market {
  margin-left: 16px;
  margin-top: 25px;
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
    vertical-align: middle;
    background: url("/img/InstalledCapacity-blue.png") no-repeat;
  }
  .my-icon-two {
    width: 24px;
    height: 24px;
    vertical-align: middle;
    display: inline-block;
    background: url("/img/InstalledCapacity-green.png") no-repeat;
  }
  .my-icon-three {
    width: 24px;
    height: 24px;
    vertical-align: middle;
    display: inline-block;
    background: url("/img/InstalledCapacity-orange.png") no-repeat;
  }
}
.italic {
  font-style: italic;
}
.my-icons {
  display: inline-block;
  margin-left: 18px;
  vertical-align: middle;
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
  vertical-align: middle;
  width: 100px;
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
  margin-left: 20px;
  vertical-align: middle;
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
  color: rgba(130, 194, 235, 0.5);
  margin-left: 18px;
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
.infoCursor {
  cursor: pointer;
}
</style>