<template>
  <div class="view-container">
    <div
      class="bg home-base"
      :class="{bg0:currentWeather == '3',bg1:currentWeather == '2',bg2:currentWeather == '1',bg3:currentWeather == '4'}"
    >
      <Title
        class="head-title"
        isShow="true"
        :currentTemp="currentTemp"
        :currentWeather="currentWeather"
      ></Title>
      <div class="home-top-nav">
        <div class="swipper-nav">
          <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide v-for="(keypoint,key) in swipperList" :key="key">
              <div class="swipper-bg">
                <div
                  class="swipper-cont"
                  :class="item.classbg"
                  v-for="(item,index) in keypoint"
                  :key="index"
                >
                  <p class="yearbj">{{item.years}}年</p>
                  <p class="proTypeNum">{{item.installed}}<span>MW</span></p>
                  <p class="proTypeNum proTypeNum2"><span>{{item.batchName}}基地</span>{{item.numberOf}}<span>个</span> </p>
                  
                  <!-- <i :class="{isIncludeIncline:item.unit.indexOf('/')<0}">{{item.unit}}</i> -->
                </div>
              </div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>
        <div class="nav-box">
          <div class="nav-cont">
            <div class="nav-indicator">
              <div class="per-indicator" v-for="subitem in navIndicatorList" :key="subitem.title">
                <i class="indicator-icon" :class="subitem.indicatoricon"></i>
                <div class="indicator-cont">
                  <label>{{subitem.label}}</label>
                  <i>{{subitem.unit}}</i>
                  <p>{{subitem.title}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <img src="static/img/waves.png" alt class="home-wave" /> -->
      <div class="comprehensive-eval" v-if="roleType != 1">
        <div class="compre-header">
          <i class="compre-title"></i>
          <p>产业升级</p>
        </div>
        <div class="compre-nav">
          <div
            class="per-compre-nav"
            v-for="(compre,index) in compreEvalList"
            :key="index"
            @click="enterToView(index)"
          >
            <div class="left-cont">
              <img :src="'static/img/'+compre.icon" alt width="22" height="auto" />
              <span>
                <span>{{compre.label}}</span>
                
              </span>
            </div>
            <div class="right-cont">
              <img :src="'static/img/'+compre.changeIcon" alt width="28" height="auto" />
              <span :style="compre.changeValue=='逐年升高'?'':'color:#ffaa0d'">{{compre.changeValue}}</span>
              <!-- <span>{{proType[compre.value]}}</span> -->
              <img src="static/img/rightarrow.png" alt width="8" height="auto" />
            </div>
          </div>
        </div>
      </div>
      <div class="charts">
        <div>
          <div>
            <img slot="icon" src="./../../../assets/img/yfdl.png" alt width="20" height="auto" />
            <span>发电量排名</span>
          </div>
          <div class="timeChange">
            <p
              v-for="(item,index) in timeList"
              :key="index"
              @click="changeTime(item,index)"
              :class="{isSelTime:currentIndex == index}"
            >
              <span>{{item.title}}</span>
            </p>
          </div>
        </div>
        <div class="totalPower">
          <Echartshome
            ids="homeChartBar"
            :triggerEvent="true"
            :xAxisData="xAxisData"
            :seriesData="seriesData"
            ref="homeChartBar"
            
            :clickCount="clickCount"
            :roleType="roleType"
          ></Echartshome>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import Title from "@/components/public/HeadTitle";
import { setTimeout } from "timers";
import Echartshome from "@/components/public/Echartshome.vue";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  components: {
    Title,
    Echartshome,
    swiper,
    swiperSlide
  },
  computed: {},
  data() {
    return {
      roleType: null,
      swiperOption: {
        autoplay: true,
        pagination: {
          el: ".swiper-pagination"
        }
      },
      swipperList: [
        //导航banner列表
        {
          slideArr: [
            {
              title: "dayfdl",
              label: "当日发电量",
              unit: "万kWh",
              classbg: "swipper0"
            },
            {
              title: "monthfdl",
              label: "当月发电量",
              unit: "万kWh",
              classbg: "swipper1"
            }
          ]
        },
        {
          slideArr: [
            {
              title: "yearfdl",
              label: "当年发电量",
              unit: "/亿kWh",
              classbg: "swipper2"
            },
            {
              title: "totalfdl",
              label: "累计发电量",
              unit: "/亿kWh",
              classbg: "swipper3"
            }
          ]
        }
      ],
      navIndicatorList: [
        //导航指标列表
        {
          indicatoricon: "icon0",
          label: "",
          unit: "个",
          title: "光伏领跑基地"
        },
        {
          indicatoricon: "icon1",
          label: "",
          unit: "MW",
          title: "总装机容量"
        }
      ],
      compreEvalList: [
        //综合评价列表
        {
          label: "组件技术",
          value: "",
          unit: "",
          icon: "componentTechnology.png",
          changeIcon:"up.png",
          changeValue:'逐年升高'
        },
        {
          label: "组件成本",
          value: "",
          unit: "",
          icon: "componentCost.png",
          changeIcon:"down.png",
          changeValue:'逐年降低'
        },
        {
          label: "领跑电价",
          value: "",
          unit: "",
          icon: "leadingElectricity.png",
          changeIcon:"down.png",
          changeValue:'逐年降低'
        }
      ],
      currentTemp: "", //当前温度
      currentWeather: "", //当前天气
      flag: true,
      currentIndex: 0,
      timeList: [
        { title: "月", type: "1" },
        { title: "年", type: "2" },
        { title: "累计", type: "3" },
      ],
      proType: {},
      clickCount: "1",
      xAxisData: [], //图表的横轴
      seriesData: [], //图表的series数据
      storeDateChange: "1" //存储切换日月年，当前的时间维度
    };
  },
  computed: {},
  mounted() {
    this.roleType = localStorage.getItem("currentRoleType");
    this.getBaseData(); //查询首页数据
    this.getTimePowerGeneration("/AppApi/Base/GetPowerGeneration", "1"); //获取各个时间段发电量的数据
    this.getCurrentWeather(); //获取当前天气的数据
  },
  methods: {
    // 跟随时间切换维度进行切换主题
    titleTips(val) {
      if (val == 0) return "月度发电量";
      else if (val == 1) return "年度发电量";
      else return "累计发电量";
    },
    // 切换时间维度获取对应的发电量
    changeTime(val, i) {
      this.storeDateChange = val.type;
      this.currentIndex = i;
      this.getTimePowerGeneration("/AppApi/Base/GetPowerGeneration", val.type);
    },
    // 查询首页数据
    getBaseData() {
    
      this.$fetch("/AppApi/Base/StatisticalList").then(res => {
       
        let swipperdata = res.data.ilist
        let list = []
        for(let i=0;i<swipperdata.length;i++){
          if (swipperdata[i + 1] !== undefined) {
            swipperdata[i].classbg = 'swipper' +i
            swipperdata[i + 1].classbg = 'swipper' +(i + 1)
              list.push([
                  swipperdata[i], swipperdata[i + 1]
              ])
              i++
          }else {
            swipperdata[i].classbg = 'swipper' +i
            list.push([swipperdata[i]])
          }
        }
        this.navIndicatorList[0].label = res.data.number
        this.navIndicatorList[1].label = res.data.installed
        this.swipperList = list
      });
    },
    // 获取当前天气的数据
    getCurrentWeather() {
      this.$fetch("/AppApi/Base/GetWeather").then(temp => {
        if (temp.data.length > 0) {
          temp.data.map(t => {
            let tempNum = String(t.airtemp);
            this.currentTemp =
              tempNum.indexOf("°") < 0
                ? tempNum + "°"
                : tempNum.substring(0, tempNum.length - 1);
            if (t.weatherstatus.indexOf("雨") > -1) {
              this.currentWeather = "3";
            } else if (t.weatherstatus.indexOf("晴") > -1) {
              this.currentWeather = "1";
            } else if (t.weatherstatus.indexOf("雪") > -1) {
              this.currentWeather = "4";
            } else {
              this.currentWeather = "2";
            }
          });
        }
      });
    },
    // 点击综合评价的指标，跳转到相应的页面
    enterToView(val) {
      switch (val) {
        case 0:
          this.$router.push({ name: "indexComplianceRate" });
          break;
        case 1:
          this.$router.push({ name: "economicBenefit" });
          break;
        case 2:
          this.$router.push({ name: "reduceCo2" });
          break;
      }
    },
    // 下钻事件
    enterStationPage(val) {
      this.$router.push({
        path: "/homePowEcon",
        query: {
          dateType: this.storeDateChange,
          dateTime: val
        }
      });
      this.clickCount = "0";
    },
    // 获取各个时间段发电量的数据
    getTimePowerGeneration(url, currentTime) {
      let that = this;
      that.xAxisData =[]
      that.$fetch(url, { type: currentTime }).then(res => {
        let batchdata= res.data
        let seriesData =[{
          name:"发电量",
          type: "bar",
          barMaxWidth: 14,
          data:[]
        }]
        batchdata.map(item=>{
          that.xAxisData.push(item.baseName)
          seriesData[0].data.push(item.powerValue)
        })
        that.seriesData = seriesData
        that.$nextTick(() => {
          that.$refs.homeChartBar.initEchartsBar(that.seriesData);
        });
      
        
      });
    },
    // 计算每个月的天数
    getDay(year, month) {
      var d = new Date(year, month, 0);
      return d.getDate();
    },
    // 对数组对象升序
    obgSort(prop) {
      return function(obj1, obj2) {
        var val1 = obj1[prop];
        var val2 = obj2[prop];
        if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
          val1 = Number(val1);
          val2 = Number(val2);
        }
        if (val1 < val2) {
          return -1;
        } else if (val1 > val2) {
          return 1;
        } else {
          return 0;
        }
      };
    }
  }
};
</script>
<style lang="less">
.home-base {
  .swiper-pagination-bullet {
    width: 0.2rem;
    border-radius: 0.04rem;
    background-color: #68bc32;
    opacity: 0.5;
  }
  .swiper-pagination-bullet.swiper-pagination-bullet-active {
    width: 0.3rem;
    opacity: 1;
    border-radius: 0.04rem;
    background-color: #4cac0e;
  }
  .swiper-pagination {
    position: static;
  }
  .swiper-container-horizontal > .swiper-pagination-bullets {
    bottom: 0;
  }
}
</style>
<style lang="less" scoped>
  .swiper-pagination {
    margin: 0.09rem 0;
  }
i {
  font-style: normal;
}
.view-container {
  overflow-x: hidden;
  height: 100%;
}
.bg {
  height: 100%;
  position: relative;
  // background: url("./../../../../static/img/homebg.png") top center no-repeat;
  // background-size: 100% 30%;
  display: flex;
  flex-direction: column;
}
.bg0 {
  background: url("./../../../../static/img/raintop.png") top center no-repeat;
  background-size: 100% 30%;
}
.bg1 {
  background: url("./../../../../static/img/cloudytop.png") top center no-repeat;
  background-size: 100% 30%;
}
.bg2 {
  background: url("./../../../../static/img/sunnytop.png") top center no-repeat;
  background-size: 100% 30%;
}
.bg3 {
  background: url("./../../../../static/img/snowtop.png") top center no-repeat;
  background-size: 100% 30%;
}
.swipper-nav {
  margin: -0.4rem 0.15rem 0;
  .swipper-bg {
    background: #fff;
    width: 100%;
    border-radius: 0.04rem;
    padding: 0.2rem 0 0.2rem 0;
    box-sizing: border-box;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: space-between;
    .swipper-cont {
      font-size: 0;
      width: calc(100% / 2 - 0.02rem / 2);
      .proTypeNum {
        font-family: "DIN OT";
        font-weight: normal;
        color: #4cac0e;
        padding: 0.1rem 0 0 0;
        box-sizing: border-box;
        font-size: 0.4rem;
        // line-height: 0.4rem;
        text-align: center;
      }
      .proTypeNum2{
        padding: 0.09rem 0 0;
        color: #ffaa0e;
      }
      span,i {
        font-family: PingFang-SC-Regular;
        font-size: 0.14rem;
        color: #333333;
      }
      .yearbj{
        margin-top: -0.2rem;
        font-size: 0.12rem;
        line-height: 0.15rem;
        font-family: PingFang-SC-Regular;
        background: url(../../../../static/img/stationbg.png) no-repeat;
        background-size: 40% 100%;
        color: #fff;
      }
      .isIncludeIncline {
        display: inline-block;
        padding-left: 0.1rem;
      }
    }
    .swipper0 {
      background: url("../../../../static/img/totalbg.png") 95% no-repeat ;
      background-size: 0.9rem;
    }
    .swipper1 {
      background: url("../../../../static/img/totalbg.png") 95% no-repeat;
      background-size: 0.9rem;
    }
    .swipper2 {
      background: url("../../../../static/img/totalbg.png") 95% no-repeat;
      background-size: 0.9rem;
    }
    .swipper3 {
      background: url("../../../../static/img/totalbg.png") 95% no-repeat;
      background-size: 0.9rem;
    }
    .swipper-cont:nth-of-type(2n + 1) {
      border-right: 0.02rem solid #f2f2f2;
    }
    // .swipper-cont:nth-of-type(2n + 2) {
    //   p,
    //   span {
    //     padding: 0.2rem 0 0.2rem 0.2rem;
    //     box-sizing: border-box;
    //   }
    // }
  }
  .swipper-bg:not(:last-child) {
    margin-right: 0.1rem;
  }
}
.nav-box {
  margin-bottom: 0.5rem;
  width: 100%;
  .nav-cont {
    .nav-indicator {
      margin: 0 0.15rem;
      box-sizing: border-box;
      // margin-top: 0.09rem;
      display: flex;
      flex: 1;
      justify-content: space-between;
      .per-indicator {
        width: calc(100% / 2 - 0.1rem);
        padding: 0.06rem 0.1rem 0.15rem 0.1rem;
        box-sizing: border-box;
        background: url("../../../../static/img/indicatorborder.png") no-repeat;
        background-size: 100%;
        display: flex;
        justify-content:flex-start;
        align-items: center;
        .indicator-icon {
          width: 0.4rem;
          height: 0.4rem;
          padding-right: 0.02rem;
        }
        .icon0 {
          background: url("../../../../static/img/base.png") no-repeat;
          background-size: 100%;
        }
        .icon1 {
          background: url("../../../../static/img/rep.png") no-repeat;
          background-size: 100%;
        }
        .indicator-cont {
          label {
            font-family: "DIN OT";
            font-size: 0.28rem;
            color: #ffffff;
            font-weight: normal;
            padding-bottom: 0.02rem;
            display: inline-block;
          }
          i,
          p {
            font-family: PingFang-SC-Regular;
            font-size: 0.13rem;
            color: #ffffff;
            opacity: 0.5;
          }
          p {
            opacity: 0.7;
          }
        }
      }
      .per-indicator:not(:nth-of-type(2n)) {
        margin-right: 0.1rem;
      }
    }
  }
}
.home-wave {
  width: 100%;
  height: 0.8rem;
  // margin-top: 0.1rem;
}
.comprehensive-eval {
  margin-top: 0.1rem;
  background: #fff;
  .compre-header {
    display: flex;
    padding: 0.1rem 0.2rem;
    box-sizing: border-box;
    align-items: center;
    border-bottom: 1px solid #e4e4e4;
    .compre-title {
      width: 0.2rem;
      height: 0.2rem;
      background: url("../../../../static/img/Industrial.png") no-repeat;
      background-size: 100%;
    }
    p {
      font-family: "PingFang-SC-Regular";
      font-weight: normal;
      font-size: 0.16rem;
      color: #333333;
      padding-left: 0.2rem;
    }
  }
  .compre-nav {
    .per-compre-nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 0 0 0.5rem;
      padding: 0.12rem 0.12rem 0.12rem 0;
      box-sizing: border-box;
      .left-cont {
        display: flex;
        align-items: center;
        font-family: PingFang-SC-Regular;
        img {
          margin-right: 0.1rem;
        }
        span {
          display: flex;
          align-items: baseline;
          color: #333333;
          font-size: 0.16rem;
          label {
            font-size: 0.12rem;
            display: inline-block;
            margin-left: 0.1rem;
            color: #aaaaaa;
          }
        }
      }
      .right-cont {
        margin-right: 0.05rem;
        span {
          color: #4cac0e;
          font-size: 0.16rem;
          display: inline-block;
          margin-right: 0.05rem;
              font-family: PingFang-SC-Regular;
        }
      }
    }
    .per-compre-nav:not(:last-child) {
      border-bottom: 1px solid #e4e4e4;
    }
  }
}
.indexBox {
  margin: 0 0.15rem;
  box-sizing: border-box;
  background: #f7f7f7;
  border-radius: 0.04rem;
  margin-top: 0.1rem;
  & > div {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    box-shadow: -10px 10px 12px 2px rgba(0, 0, 0, 0.05);
    p {
      width: 50%;
      background: #fff;
      box-sizing: border-box;
      border-bottom: 2px solid #f7f7f7;
      padding: 0.1rem;

      label {
        display: inline-block;
        width: 100%;
        color: #333;
        font-size: 0.16rem;
        line-height: 0.2rem;
        height: 0.2rem;
      }
      span {
        height: 0.3rem;
        line-height: 0.3rem;
        font-size: 0.28rem;
        font-family: "number";
      }
      .fontColor {
        color: #68bc32;
      }
      .differColor {
        color: #ff9810;
      }
      i {
        font-size: 0.14rem;
        margin-left: 0.08rem;
        color: #666;
      }
    }
    p:nth-child(2n-1) {
      border-right: 2px solid #f7f7f7;
    }
    p:nth-child(2n) {
      border-right: 2px solid #fff;
    }
    p:nth-child(1) {
      border-top-left-radius: 4px;
    }
    p:nth-child(2) {
      border-top-right-radius: 4px;
    }
    p:nth-child(5) {
      border-bottom-left-radius: 4px;
    }
    p:nth-child(6) {
      border-bottom-right-radius: 4px;
    }
  }
}
.charts {
  // height: calc(100% - 4rem);
  & > div:first-child {
    padding: 0.1rem 0.2rem;
    font-size: 0.16rem;
    margin-top: 0.1rem;
    border-bottom: 1px solid #e4e4e4;
    background: #fff;
    color: #333333;
    display: flex;
    justify-content: space-between;
    img {
      margin-right: 0.05rem;
    }
    .timeChange {
      display: flex;
      p {
        font-size: 0;
        span {
          color: #333;
          display: inline-block;
          font-size: 0.16rem;
          padding: 0.01rem 0.12rem;
          box-sizing: border-box;
        }
      }
      .isSelTime {
        border: 0.01rem solid #4cac0e;
        border-radius: 30px;
        // background: url("../../../../static/img/border.png") no-repeat;
        // background-size: 0.4rem 0.174rem;
        span {
          color: #68bc32;
        }
      }
    }
  }
}
.totalPower {
  width: 100%;
  height: 200px;
  // flex: 1;
  background: #fff;
}
.home-top-nav {
  background: url("../../../../static/img/navindicator.png") no-repeat;
  background-size: 100% 100%;
  margin-top: 1.4rem;
}
</style>