<template>
  <div class="Analysis">
    <MtHeader backPagePathName="stationBase"></MtHeader>
    <div class="viewWrap">
      <div class="indexBox">
        <div class="net-pie-box">
          <div id="Power">
            <EchartsBarLine
              ids="economicBarBox"
              ref="economicBarBox"
              :xAxisData="economicXAxis"
               :seriesData="economicSeries"
            ></EchartsBarLine>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";

import MtHeader from "@/components/public/MtHeader";
import EchartsBarLine from "@/components/public/EchartsBarLine.vue";
export default {
  components: {
    MtHeader,
    EchartsBarLine
  },
  data() {
    return {
      economicXAxis: [],
      economicSeries: []
    };
  },
  mounted() {
  
    this.getTimePowerGeneration("/AppApi/Base/GetLeadingPower");    
        
  },
  methods: {
    getTimePowerGeneration(url) {
        let that = this;
        that.economicXAxis =[]
        that.$fetch(url).then(res => {
            let batchdata= res.data
            let seriesData =[
                {
                    name:"标杆电价",
                    type: "bar",
                    barMaxWidth: 14,
                    data:[]
                },
                {
                    name:"入选主体平均电价",
                    type: "bar",
                    barMaxWidth: 14,
                    data:[]
                },
                {
                    name:"降幅",
                    type: "line",
                    data:[],
                    yAxisIndex: 1
                },
            ]
            batchdata.map(item=>{
                that.economicXAxis.push(item.baseName)
                seriesData[0].data.push(item.benchmarkPrice)
                seriesData[1].data.push(item.mainBodyPrice)
                seriesData[2].data.push(item.reduction)
            })
            that.economicSeries = seriesData
            that.$nextTick(() => {
                that.$refs.economicBarBox.initEchartsBar(that.economicSeries);
            });
            
        });
    }
    
  }
};
</script>
<style lang="less" scoped>
.Analysis {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.viewWrap {
  flex: 1;
  overflow-x: hidden;
  box-sizing: border-box;
  padding-bottom: 0.1rem;
  display: flex;
  flex-direction: column;
}
.soltTitle {
  display: flex !important;
  align-items: center !important;
  color: #999;
  img {
    margin-right: 0.1rem;
  }
}
.indexBox {
  flex: 1;
  overflow-x: hidden;
}
.netfdl-box {
  display: flex;
  margin: 0.1rem 0.15rem;
  flex: 1;
  .per-net {
    background: url("../../../../static/img/economicborder.png") no-repeat;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    padding: 0.05rem;
    box-sizing: border-box;
    width: calc(100% / 2 - 0.06rem / 2);
    .fdl-icon {
      width: 0.4rem;
      height: 0.4rem;
    }
    .fdl0 {
      background: url("../../../../static/img/economicyear.png") no-repeat;
      background-size: 100% 100%;
    }
    .fdl1 {
      background: url("../../../../static/img/economicnet.png") no-repeat;
      background-size: 100% 100%;
    }
    div {
      padding-left: 0.02rem;
      box-sizing: border-box;
      display: flex;
      flex: 1;
      flex-direction: column;
      p {
        font-family: "DIN OT";
        font-size: 0.28rem;
        color: #fff;
        margin-bottom: 0.05rem;
      }
      span {
        font-size: 0.12rem;
        color: #fff;
        opacity: 0.7;
        white-space: nowrap;
        font-family: "pingfang-regular";
        i {
          opacity: 0.5;
        }
      }
    }
  }
  .per-net:not(:nth-of-type(2n)) {
    margin-right: 0.06rem;
  }
}
.net-pie-box {
  background: #fff;
  & > span {
    padding: 0.1rem 0.15rem;
    box-sizing: border-box;
    font-size: 0.16rem;
    border-bottom: 1px solid #e4e4e4;
    background: #fff;
    color: #333333;
    display: flex;
    align-items: center;
    img {
      margin-right: 0.1rem;
    }
  }
  .actual-design-box {
    margin-top: 0.05rem;
  }
  #Power,
  #actualDesignBar {
    height: 300px;
  }
  .station-title {
    display: flex;
    margin-top: 0.1rem;
    font-size: 0.16rem;
    padding: 0.1rem 0.16rem;
    box-sizing: border-box;
    border-bottom: 1px solid #e4e4e4;
    background: #fff;
    color: #922b2b;
    img {
      margin-right: 0.05rem;
    }
  }
  .no-data {
    margin: 0 auto;
    font-size: 0.16rem;
    color: #333;
  }
  .station-box {
    padding: 0.1rem 0.16rem;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    background: #fff;
    .staion-per {
      background: url("../../../../static/img/stationborder.png") no-repeat;
      background-size: 100% 100%;
      width: calc(100% / 3 - 0.2rem / 3);
      height: 0.7rem;
      margin-bottom: 0.1rem;
      p {
        background: url("../../../../static/img/stationbg.png") left no-repeat;
        background-size: 70% 100%;
        font-size: 0.14rem;
        color: #ffffff;
        padding: 0.05rem 0 0.05rem 0.05rem;
        box-sizing: border-box;
      }
      div {
        padding: 0.1rem 0 0.1rem 0.1rem;
        box-sizing: border-box;
        span {
          font-size: 0.24rem;
          font-family: "DIN OT";
          color: #4cac0e;
        }
        label {
          color: #666666;
          font-size: 0.13rem;
        }
      }
    }
    .staion-per:not(:nth-of-type(3n)),
    .staion-per:first-child {
      margin-right: 0.1rem;
    }
  }
  .pie-legend-box {
    padding: 0.1rem;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    .legend-container {
      padding: 0.05rem;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      .legend-color {
        width: 0.18rem;
        height: 0.08rem;
        margin-bottom: 0.3rem;
        border-radius: 2px;
      }
      .legendColor0 {
        background-image: linear-gradient(
          90deg,
          #0072ff 0%,
          #17a6ff 55%,
          #2edaff 100%
        );
      }
      .legendColor1 {
        background-image: linear-gradient(
          90deg,
          #2dc076 0%,
          #2ad4a1 50%,
          #26ead1 100%
        );
      }
      .legendColor2 {
        background-image: linear-gradient(90deg, #7487ae 0%, #b6caf5 100%);
      }
      .legendColor3 {
        background-image: linear-gradient(90deg, #fb5e00 0%, #ff8400 100%);
      }
      .legendColor4 {
        background-image: linear-gradient(90deg, #d466f9 0%, #74a7ff 100%);
      }
      .per-legend {
        padding: 0 0.05rem 0.3rem 0.06rem;
        box-sizing: border-box;
        & > p {
          display: flex;
          flex-direction: column;
          label {
            font-size: 0.14rem;
            color: #333333;
            span {
              color: #4bac0d;
            }
          }
          & > span {
            font-family: "DIN OT";
            font-size: 0.2rem;
            color: #4cac0e;
            padding-top: 0.08rem;
            i {
              font-size: 0.12rem;
              color: #999;
            }
          }
        }
      }
    }
    .legend-container:not(:nth-of-type(2n)),
    .legend-container:nth-of-type(1) {
      border-right: 1px solid rgba(230, 230, 230, 0.685);
    }
  }
  .noteTips {
    padding: 0.2rem;
    text-align: right;
    color: #aaaaaa;
    font-size: 0.12rem;
  }
}
</style>
