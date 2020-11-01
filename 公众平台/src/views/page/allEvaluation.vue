<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    class="abow_dialog"
    @close="close"
    width="1020px"
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
        :data="propsData"
        v-if="isShow"
      ></component>
    </div>
  </el-dialog>
</template>

<script>
import frameText from "@/components/homeModule/frameText";
import stationText from "@/components/homeModule/stationText";
import echartsPie from "@/components/charts/echartsPie";
import doublePie from "@/components/charts/doublePie";
import singleTitle from "@/components/homeModule/singleTitle";
import Construction from "@/components/allEvaluationModule/Construction";
import Economic from "@/components/allEvaluationModule/Economic";
import Social from "@/components/allEvaluationModule/Social";
import Technical from "@/components/allEvaluationModule/Technical";

export default {
  props: {
    title: {
      default: "综合评价"
    }
  },
  components: {
    frameText,
    stationText,
    echartsPie,
    doublePie,
    singleTitle,
    Construction,
    Economic,
    Social,
    Technical
  },
  data() {
    return {
      changeComponent: Construction, //切换的子组件
      evalData: [],
      propsData: null, //传递给不同子组件的数据
      dialogVisible: true,
      sourcename: "",
      currentNavName: "建设历程",
      evaluationNavList: [
        //左侧导航
        {
          key: "build",
          navIcon: "construction_icon",
          navName: "建设历程",
          components: Construction
        },
        {
          key: "rate",
          navIcon: "technical_icon",
          navName: "技术达标",
          components: Technical
        },
        {
          key: "economics",
          navIcon: "economic_icon",
          navName: "经济效益",
          components: Economic
        },
        {
          key: "society",
          navIcon: "social_icon",
          navName: "社会效益",
          components: Social
        }
      ],
      isShow: false
    };
  },
  mounted() {
    this.getEvaluation();
  },
  methods: {
    getEvaluation() {
      var _this = this;
      this.$fetch("/MtrBaseChildPages/GetEvaluation").then(res => {
        // console.log(res)
        _this.evalData = res.data;
        // _this.evalData = evaldata.data;
        _this.propsData = _this.evalData.build;
        _this.isShow = true;
        _this.sourcename = _this.evalData.sourceName;
        localStorage.setItem("dataSource", JSON.stringify(_this.sourcename));
      });
    },
    // 切换综合评价的左侧导航
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
