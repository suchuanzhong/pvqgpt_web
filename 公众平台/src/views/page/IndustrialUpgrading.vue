<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    class="abow_dialog"
    @close="close"
    width="1400px"
    id="allEvaluation"
    top="7vh"
  >
    <div class="all_evaluation_box">
      <!-- 左侧导航 -->
      <div class="evaluation_nav">
        <div
          class="per_evaluation_nav"
          :class="{ isActive_evaluation_nav: item.navName == currentNavName }"
          @click="changeCurrentNav(item)"
          v-for="(item, index) in evaluationNavList"
          :key="index"
        >
          <i class="nav_icon" :class="item.navIcon"></i>
          <p>{{ item.navName }}</p>
        </div>
      </div>
      <!-- 竖线 -->
      <img src="img/index/eval_linebetween.png" alt="" />
      <!-- 右侧内容 -->
      <component
        :is="changeComponent"
        :dataArr="dataArr"
        :axisData="axisData"
        :data="data"
        :year="year"
        ref="lines"
        ids="dayBarMonit"
        :data1="data1"
        :dataone="dataone"
        :datatime="datatime"
        :datatwo="datatwo"
      ></component>
    </div>
  </el-dialog>
</template>

<script>
// import frameText from "@/components/homeModule/frameText";
// import stationText from "@/components/homeModule/stationText";
// import echartsPie from "@/components/charts/echartsPie";
// import doublePie from "@/components/charts/doublePie";
// import singleTitle from "@/components/homeModule/singleTitle";
import ComponentTechnology from "@/components/upgradingModule/Component-Technology";
import LeadingPower from "@/components/upgradingModule/Leading-Power";
import Costs from "@/components/upgradingModule/Costs";

export default {
  props: {
    title: {
      default: "产业升级"
    }
  },
  components: {
    // frameText,
    // stationText,
    // echartsPie,
    // doublePie,
    // singleTitle,
    ComponentTechnology,
    LeadingPower,
    Costs
  },
  data() {
    return {
      datatwo:[],
      dataone:[],
      datatime:[],
      data1:[],
      data:[],
      dataArr:[],
      year:[],
      axisData:[],
      changeComponent: Costs, //切换的子组件
      evalData: [],
      propsData: null, //传递给不同子组件的数据
      dialogVisible: true,
      sourcename: "",
      currentNavName: "组件技术",
      evaluationNavList: [
        //左侧导航
        {
          key: "build",
          navIcon: "construction_icon",
          navName: "组件技术",
          components: Costs
        },
        {
          key: "rate",
          navIcon: "technical_icon",
          navName: "组件成本",
          components:ComponentTechnology,// Costs
        },
        {
          key: "economics",
          navIcon: "economic_icon",
          navName: "领跑电价",
          components: LeadingPower
        },
        // {
        //   key: "society",
        //   navIcon: "social_icon",
        //   navName: "社会效益",
        //   components: Social
        // }
      ],
      isShow: false
    };
  },
  mounted() {
  this.$nextTick(()=>{
    this.getComponentCostsChange();
    this.getEvaluation();
    this.GetLeadingPower();
  })
  },
  methods: {
    //领跑电价
    GetLeadingPower(){
      this.$fetch("/DigitalPv/GetLeadingPower").then(res => {
        if (res.code == 1) {
          let recieveData = res.data;
          for (let item of recieveData) {
            this.data1.push(item.benchmarkPrice);
            this.dataone.push(item.mainBodyPrice);
            this.datatwo.push(item.reduction);

            this.datatime.push(item.baseName);
          }
        }
      })
    },
    //组件成本
    getEvaluation(){

      this.$fetch("/DigitalPv/GetComponentCosts").then(res => {
        if (res.code == 1) {
      
          let costsData = res.data;
          let seDataList = [
            {
              name: "组件成本",
              type: "line",
              symbol: 'triangle',
              yAxisIndex: 0,
              data: []
            },
            {
              name: "系统成本",
              type: "line",
              symbol: 'diamond',
              data:[]
            },
          ];
          this.year=costsData.years
          seDataList[0].data=costsData.componentCost
          seDataList[1].data=costsData.systemCost
          this.data=seDataList
          // this.$nextTick(()=>{
          //   this.$refs.lines.drawChart(this.data,this.year);
          // })

        }
      })
    },
    // 组件技术
    getComponentCostsChange() {

      this.$fetch("/DigitalPv/GetTransformation").then(res => {
        if (res.code == 1) {
          let Data = res.data;
          let seDatas = [
            {
              name: "多晶电池片",
              type: "line",
              symbol: 'triangle',
              yAxisIndex: 0,
              data: []
            },
            {
              name: "单晶电池片",
              type: "line",
              symbol: 'diamond',
              data:[]
            },
            {
              name: "黑硅多晶",
              type: "line",
              symbol: 'triangle',
              data: []
            },
            {
              name: "PERC单晶",
              type: "line",
              symbol: 'diamond',
              data: []
            }
          ];
          // for(let item of Data){
          //       debugger
          this.axisData=Data.years
              for (let i = 0; i < Data.moreCrystal.length; i++) {
              if(Data.moreCrystal[i] <=0){
                seDatas[0].data.push('')
              }
            else seDatas[0].data.push(Data.moreCrystal[i])
          }
          for (let i = 0; i < Data.blackSilicon.length; i++) {
            if(Data.blackSilicon[i] <=0){
              seDatas[1].data.push('')
            }
            else seDatas[1].data.push(Data.blackSilicon[i])
          }
          for (let i = 0; i < Data.singleCrystal.length; i++) {
            if(Data.singleCrystal[i] <=0){
              seDatas[2].data.push('')
            }
            else seDatas[2].data.push(Data.singleCrystal[i])
          }
          for (let i = 0; i < Data.perc.length; i++) {
            if(Data.perc[i] <=0){
              seDatas[3].data.push('')
            }
            else seDatas[3].data.push(Data.perc[i])
          }

            // seDatas[0].data=Data.moreCrystal
            // seDatas[1].data=Data.blackSilicon
            // seDatas[2].data=Data.blackSilicon
            // seDatas[3].data=Data.perc== 0?null :seDatas[3].data=Data.perc
          // }
          this.dataArr = seDatas;
          this.$nextTick(()=>{
            this.$refs.lines.drawCharts(this.dataArr,this.axisData);
          })
          }
      });
    },
    //切换综合评价的左侧导航
    changeCurrentNav(val) {
      // console.log(val.navName)
      this.currentNavName = val.navName;
      this.changeComponent = val.components;
      this.propsData = this.evalData[val.key];
      this.isShow = false;
      this.$nextTick(() => {
        this.isShow = true;
      });
    },
    close() {
      this.$parent.dialogName = null;
    }
  }
};
</script>
<style lang="scss">
.abow_dialog {
  .el-dialog__body {
    max-height: 780px;
    // overflow-y: auto;
  }
}
#allEvaluation {
  .el-dialog {
    background-color: #fff !important;
    .el-dialog__header .el-dialog__title {
      color: #303133;
    }
  }
  .el-dialog__body {
    padding: 0 !important;
  }
}
</style>

<style lang="scss" scoped>
#allEvaluation {
  .all_evaluation_box {
    padding: 22px 38px 40px 26px;
    box-sizing: border-box;
    display: flex;
    .evaluation_nav {
      padding: 18px 42px 0 0;
      box-sizing: border-box;
      border-right: 1px solid #ccc;
      cursor: pointer;
      .per_evaluation_nav {
        width: 180px;
        height: 56px;
        background: url("../../../public/img/index/eval_box_blue.png") no-repeat;
        display: flex;
        padding: 15px 30px;
        box-sizing: border-box;
        .nav_icon {
          width: 30px;
          height: 23px;
        }
        .construction_icon {
          background: url("../../../public/img/index/dia_eval_1_2.png") center
            center no-repeat;
        }
        .technical_icon {
          background: url("../../../public/img/index/dia_eval_2.png") center
            center no-repeat;
        }
        .economic_icon {
          background: url("../../../public/img/index/dia_eval_3.png") center
            center no-repeat;
        }
        .social_icon {
          background: url("../../../public/img/index/dia_eval_4.png") center
            center no-repeat;
        }
        p {
          padding: 0 0 0 9px;
          box-sizing: border-box;
          color: #02a0ff;
        }
      }
      .per_evaluation_nav:not(:last-of-type) {
        margin-bottom: 30px;
      }
      .isActive_evaluation_nav {
        background: url("../../../public/img/index/eval_box_green.png")
          no-repeat;
        .construction_icon {
          background: url("../../../public/img/index/dia_eval_1.png") center
            center no-repeat;
        }
        .technical_icon {
          background: url("../../../public/img/index/dia_eval_2_2.png") center
            center no-repeat;
        }
        .economic_icon {
          background: url("../../../public/img/index/dia_eval_3_2.png") center
            center no-repeat;
        }
        .social_icon {
          background: url("../../../public/img/index/dia_eval_4_2.png") center
            center no-repeat;
        }
        p {
          color: #1bac6b;
        }
      }
    }
  }
}
</style>
