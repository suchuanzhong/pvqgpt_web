<template>
  <div class="technical_box">
    <div class="scroll-wrapper">
      <el-radio-group
        v-model="radiogroupval"
        style="position: relative;bottom: 1px"
      >
        <el-radio-button label="批次"></el-radio-button>
      </el-radio-group>
      <el-select
        v-model="batch"
        placeholder="请选择"
        @change="changePC"
        :style="{ width: '200px', margin: '0 0 10px 10px' }"
      >
        <el-option
          v-for="(item, idx) in basePcOption"
          :label="item.batchName"
          :value="item.batchName"
          :key="idx"
        ></el-option>
      </el-select>
      <div
        class="per_technical_box"
        v-for="(item, index) in technicalList"
        :key="index"
        v-show="item.show"
      >
        <div class="technical_title">
          <p class="title_name">{{ item.title }}</p>
          <p class="title_cont">
            <i class="title_icon"></i>
          </p>
        </div>
        <!-- 内容 -->
        <div class="technical_cont">
          <div class="single_box">
            <div class="per_technical_cont">
              <div class="center_text">{{ item.firstRowRate }}</div>
            </div>
            <p>{{ item.firstRowName }}</p>
          </div>
          <div class="center_cont">
            <p>要求值：{{ item.comprehensiveRate }}%</p>
          </div>
          <div class="single_box">
            <div class="per_technical_cont">
              <div class="center_text">{{ item.lastRowRate }}</div>
            </div>
            <p>{{ item.lastRowName }}</p>
          </div>
        </div>
        <div class="sourceMark" v-if="index + 1 == technicalList.length">
          数据来源：{{ source }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["data"],
  data() {
    return {
      technicalList: [
        {
          title: "能效比",
          firstRowRate: "",
          firstRowName: "运行监测能效比",
          comprehensiveRate: "",
          lastRowRate: "",
          lastRowName: "达标率",
          show: true
        },
        {
          title: "单晶组件转换效率",
          firstRowRate: "",
          firstRowName: "运行监测组件转换效率",
          comprehensiveRate: "",
          lastRowRate: "",
          lastRowName: "达标率",
          show: true
        },
        {
          title: "多晶组件转换效率",
          firstRowRate: "",
          firstRowName: "运行监测组件转换效率",
          comprehensiveRate: "",
          lastRowRate: "",
          lastRowName: "达标率",
          show: true
        },
        {
          title: "逆变器最高转换效率",
          firstRowRate: "",
          firstRowName: "运行监测逆变器转换效率",
          comprehensiveRate: "",
          lastRowRate: "",
          lastRowName: "达标率",
          show: true
        }
      ],
      batch: '',
      basePcOption: [],
      source: "", //数据来源
      dateParam: 2,
      detailDate: "",
      pickerType: "month",
      radiogroupval: "批次"
    };
  },
  mounted() {
    this.getselectinfo();
    this.initTechData();
  },
  methods: {
    getselectinfo() {
      this.$fetch("/DigitalPv/GetBatch").then(res => {
        if (res.data) {
          this.basePcOption = res.data.data;
          this.batch = res.data.data[0].batchName;
          this.initTechData(res.data.data[0].batchName);
        }
      });
      //数据来源
      this.$fetch("/MtrBaseChildPages/GetReportName").then(res => {
        this.source = res.data;
      });
    },
    initTechData(batchName) {
      this.$fetch("/MtrBaseChildPages/GetRate?batchname=" + batchName).then(
        res => {
          if (res === null) return;
          res.data.map(item => {
            this.technicalList[0].firstRowRate =
              item.xtxl === "" || item.xtxl == null ? "" : item.xtxl + "%";
            this.technicalList[0].comprehensiveRate =
              item.xtxlyq === "" || item.xtxlyq == null ? "" : item.xtxlyq;
            this.technicalList[0].lastRowRate =
              item.xtxlrate === "" || item.xtxlrate == null
                ? ""
                : item.xtxlrate + "%";

            this.technicalList[1].firstRowRate =
              item.danjinzjxl === "" || item.danjinzjxl == null
                ? ""
                : item.danjinzjxl + "%";
            this.technicalList[1].comprehensiveRate =
              item.danjinzjxlyq === "" || item.danjinzjxlyq == null
                ? ""
                : item.danjinzjxlyq;
            // this.technicalList[1].show = !(
            //   item.danjinzjxlyq === "" || item.danjinzjxlyq == null
            // );
            this.technicalList[1].lastRowRate =
              item.danjinzjxlrate === "" || item.danjinzjxlrate == null
                ? ""
                : item.danjinzjxlrate + "%";

            this.technicalList[2].firstRowRate =
              item.duojinzjxl === "" || item.duojinzjxl == null
                ? ""
                : item.duojinzjxl + "%";
            this.technicalList[2].comprehensiveRate =
              item.duojinzjxlyq === "" || item.duojinzjxlyq == null
                ? ""
                : item.duojinzjxlyq;
            // this.technicalList[2].show = !(
            //   item.duojinzjxlyq === "" || item.duojinzjxlyq == null
            // );
            this.technicalList[2].lastRowRate =
              item.duojinzjxlrate === "" || item.duojinzjxlrate == null
                ? ""
                : item.duojinzjxlrate + "%";

            this.technicalList[3].firstRowRate =
              item.nbqxl === "" || item.nbqxl == null ? "" : item.nbqxl + "%";
            this.technicalList[3].comprehensiveRate =
              item.nbqxlyq === "" || item.nbqxlyq == null ? "" : item.nbqxlyq;
            this.technicalList[3].lastRowRate =
              item.nbqxlrate === "" || item.nbqxlrate === null
                ? ""
                : item.nbqxlrate + "%";
          });
        }
      );
    },
    changePC(data) {
     
      this.batch = data
      this.initTechData(this.batch);
    }
  }
};
</script>
<style scoped>
.sourceMark {
  font-size: 12px;
  font-style: italic;
  color: #b7b7b7;
}
</style>
<style lang="scss">
.technical_box {
  padding: 10px 0 0 70px;
  box-sizing: border-box;
  .el-select {
        // width: 100%;
        .el-input{
            display: inline-block !important;
            top: 0 !important;
        }
    }
  .scroll-wrapper {
    height: 740px;
    overflow-y: auto;
    overflow-x: hidden;
    .date-change {
      padding-bottom: 14px;
    }

    .per_technical_box {
      .technical_title {
        width: 548px;
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        box-sizing: border-box;

        .title_name {
          margin-right: 5px;
          color: #000;
        }

        .title_cont {
          display: flex;
          flex: 1;

          .title_icon {
            width: 66px;
            height: 16px;
            background: url("/img/index/tech_icon.png") center center no-repeat;
          }
        }

        .title_cont::after {
          content: "";
          height: 1px;
          border-bottom: 1px solid #4ccf8d;
          width: 100%;
          margin-top: 16px;
          margin-left: -12px;
        }
      }

      // 内容
      .technical_cont {
        display: flex;
        padding: 0 0 0 34px;
        box-sizing: border-box;
        color: #666;
        .single_box {
          text-align: center;

          .per_technical_cont {
            width: 180px;
            height: 150px;
            position: relative;
            background: url("/img/index/tech_ball.png") center no-repeat;
            margin: 12px 0;

            &::before {
              width: 150px;
              height: 150px;
              display: inline-block;
              content: "";
              background: url("/img/index/tech_rotate.png") center no-repeat;
              animation: rotation 12s linear infinite;
              -moz-animation: rotation 12s linear infinite;
              -webkit-animation: rotate 12s linear infinite;
              -o-animation: rotation 12s linear infinite;
            }

            &::after {
              width: 97px;
              height: 97px;
              display: inline-block;
              content: "";
              background: url("/img/index/tech_circle.png") no-repeat;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }

            .center_text {
              color: #fffffd;
              font-size: 22px;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              font-family: "DINOT";
            }
          }
        }

        .center_cont {
          width: 196px;
          height: 196px;
          background: url("/img/index/tech_path.png") 50% 40% no-repeat;

          p {
            font-size: 16px;
            color: #4ccf8d;
            // padding: 12px auto;
            padding: 76px 0 0 50px;
          }
        }
      }
    }

    .per_technical_box:not(:last-of-type) {
      margin-bottom: 5px;
    }
  }
  // /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  // .scroll-wrapper::-webkit-scrollbar {
  //   width: 6px; /*滚动条宽度*/
  //   height: 3px; /*滚动条高度*/
  //   // background-color: white;
  // }

  // /*定义滑块 内阴影+圆角*/
  // .scroll-wrapper::-webkit-scrollbar-thumb {
  //   -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  //   background-color: rgb(221, 222, 224); /*滚动条的背景颜色*/
  // }
}

@-webkit-keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
</style>
