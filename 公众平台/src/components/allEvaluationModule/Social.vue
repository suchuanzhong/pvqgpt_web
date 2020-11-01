<template>
  <div class="social_benefits">
    <div class="social_left_box">
      <img
        src="../../../public/img/index/tree.png"
        alt=""
        class="planting_tree_img"
      />
      <div class="planting_tree_cont">
        <div>累计植树</div>
        <p>
          <span class="numroll_DINOT">{{ data.allTreeValue | saveTwoNum }}</span
          >万棵
        </p>
      </div>
    </div>
    <div class="social_right_box">
      <div class="environment_box">
        <img
          src="../../../public/img/index/environment.png"
          alt=""
          class="environment_img"
        />
        <div class="environment_cont">
          <div
            class="per_cont"
            v-for="(emission, k) in reduceEmissionList"
            :key="k"
          >
            <div>{{ emission.emissionCont }}</div>
            <p>
              <span class="numroll_DINOT">{{
                emission.emissionVal | saveTwoNum
              }}</span
              >{{ emission.emissionUnit }}
            </p>
          </div>
        </div>
      </div>
      <div class="coal_box">
        <img src="../../../public/img/index/coal.png" alt="" class="coal_img" />
        <div class="coal_cont">
          <div>节约标准煤</div>
          <p>
            <span class="numroll_DINOT">{{
              data.allCoalValue | saveTwoNum
            }}</span
            >万吨
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["data"],
  components: {},
  data() {
    return {
      reduceEmissionList: [
        {
          emissionCont: "减排二氧化碳",
          emissionVal: 67.19,
          emissionUnit: "万吨"
        },
        {
          emissionCont: "减排氮化物",
          emissionVal: 34.91,
          emissionUnit: "万吨"
        },
        { emissionCont: "减排硫化物", emissionVal: 58.65, emissionUnit: "万吨" }
      ],
      datas: {}
    };
  },
  mounted() {
    this.initSocial();
  },
  methods: {
    initSocial() {
      this.$fetch("/MtrBaseChildPages/GetSocialBenefits").then(res => {
        if (res.data) {
          this.data = res.data;
          this.reduceEmissionList[0].emissionVal = this.data.allCo2Value / 1000;
          this.reduceEmissionList[1].emissionVal =
            this.data.allNitrideValue / 1000;
          this.reduceEmissionList[2].emissionVal =
            this.data.allSulfideValue / 1000;
        }
      });
    }
  },
  filters: {
    saveTwoNum(val) {
      if (isNaN(val)) return val;
      else return val.toFixed(2);
    }
  }
};
</script>
<style lang="scss">
.social_benefits {
  padding: 70px 0 86px 46px;
  box-sizing: border-box;
  display: flex;
  .social_left_box {
    height: 556px;
    width: 316px;
    border: 1px solid #8dd5b5;
    background-color: #eff9f4;
    margin-right: 28px;
    .planting_tree_img {
      // width: 170px;
      margin: 117px 58px 0;
    }
    .planting_tree_cont {
      margin: 26px 0 0 115px;
      div {
        font-size: 18px;
        color: #666;
        margin-bottom: 24px;
      }
      p {
        font-size: 18px;
        color: #000;
        span {
          font-family: "DINOT";
          color: #2ec3a8;
          font-size: 28px;
          margin-right: 10px;
        }
      }
    }
  }
  .social_right_box {
    .environment_box {
      width: 320px;
      height: 334px;
      border: 1px solid #8dd5b5;
      background-color: #eff9f4;
      box-sizing: border-box;
      margin-bottom: 30px;
      .environment_img {
        // width: 106px;
        margin: 22px 80px 0px;
      }
      .environment_cont {
        padding: 0 0 0 40px;
        box-sizing: border-box;
        .per_cont {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          width: 246px;
          div {
            color: #666;
            font-size: 16px;
          }
          p {
            font-size: 14px;
            color: #000;
            span {
              color: #2ec3a8;
              font-size: 28px;
              margin-right: 9px;
            }
          }
        }
        .per_cont:not(:last-of-type) {
          margin-bottom: 20px;
        }
      }
    }
    .coal_box {
      width: 320px;
      height: 190px;
      border: 1px solid #8dd5b5;
      background-color: #eff9f4;
      box-sizing: border-box;
      display: flex;
      padding: 40px 0 0 0;
      box-sizing: border-box;
      .coal_img {
        // width: 95px;
        height: 124px;
        margin: 0 0 0 30px;
      }
      .coal_cont {
        padding: 20px 0 0;
        box-sizing: border-box;
        div {
          font-size: 16px;
          color: #666;
          margin-bottom: 14px;
        }
        p {
          font-size: 14px;
          color: #000;
          span {
            color: #2ec3a8;
            font-size: 28px;
            margin-right: 10px;
          }
        }
      }
    }
  }
}
</style>
