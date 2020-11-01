<template>
  <div class="power-and-economic">
    <MtHeader backPagePathName="stationBase"></MtHeader>
    <div class="viewWrap">
      <div class="benefit-box">
        <div>
          <img src="./../../../assets/img/co2_backg1.png" width="90%" />
          <div class="pic">
            <img src="./../../../assets/img/co2_pic1.png" />
          </div>
          <div class="content">
            <label>相当于累计植树</label>
            <p>
              <big>{{co2Data.tree||0}}</big>
              <span>万棵</span>
            </p>
          </div>
        </div>
        <div>
          <img src="./../../../assets/img/co2_backg2.png" width="90%" />
          <div class="pic" style="top: 0.3rem;">
            <img src="./../../../assets/img/co2_pic2.png" />
          </div>
          <div class="secondContent">
            <div>
              <label>减排二氧化碳</label>
              <span>
                <big>{{co2Data.co2||0}}</big>
                <span>万吨</span>
              </span>
            </div>
            <div>
              <label>减排氮化物</label>
              <span>
                <big>{{co2Data.nitride||0}}</big>
                <span>万吨</span>
              </span>
            </div>
            <div>
              <label>减排硫化物</label>
              <span>
                <big>{{co2Data.sulfide||0}}</big>
                <span>万吨</span>
              </span>
            </div>
          </div>
        </div>
        <div>
          <img src="./../../../assets/img/co2_backg3.png" width="90%" />
          <div class="pic">
            <img src="./../../../assets/img/co2_pic3.png" />
          </div>
          <div class="content">
            <label>节约标准煤</label>
            <p>
              <big>{{co2Data.coal||0}}</big>
              <span>万吨</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import { Datetime, Group, Cell, PopupPicker } from "vux";
import MtHeader from "@/components/public/MtHeader";
import StationBar from "@/components/public/EchartsDoubleBar";
export default {
  components: {
    Datetime,
    Group,
    Cell,
    PopupPicker,
    MtHeader,
    StationBar
  },

  data() {
    return {
      co2Data: {}
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$fetch("/AppApi/Base/GetEvaluation").then(res => {
        this.co2Data = res.data;
      });
    }
  }
};
</script>
<style lang="less" scoped>
.power-and-economic {
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
  .benefit-box {
    margin: 0.2rem;
    width: 100%;
    > div {
      position: relative;
      margin-bottom: 0.2rem;
      display: flex;
      align-items: center;
    }
  }
}
.pic {
  display: inline-block;
  position: absolute;
  top: 0.1rem;
  left: 0.3rem;
  img {
    width: 0.86rem;
  }
}
.content {
  display: inline-block;
  position: absolute;
  top: 0.2rem;
  left: 1.4rem;
  color: #fff;
  p {
    margin-top: 0.1rem;
    position: relative;
    big {
      font-size: 0.32rem;
    }
    span {
      margin-left: 0.1rem;
      font-size: 0.13rem;
    }
  }
}
.secondContent {
  display: inline-block;
  position: absolute;
  top: 0.3rem;
  left: 1.4rem;
  color: #fff;
  div {
    margin-bottom: 0.2rem;
    display: flex;
    align-items: baseline;
      justify-content: space-between;
    // label {
    //   font-size: 0.14rem;
    // }
    &>span {
      display: flex;
      align-items: baseline;
      display: inline-block;
      margin-left: 0.1rem;
      span {
        font-size: 0.13rem;
      }
    }
  }
}
</style>


