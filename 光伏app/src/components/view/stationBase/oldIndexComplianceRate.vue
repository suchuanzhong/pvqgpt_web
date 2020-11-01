<template>
  <div class="power-and-economic">
    <MtHeader backPagePathName="stationBase"></MtHeader>
    <div class="viewWrap">
      <div class="view-box">
        <span>
          <img slot="icon" src="./../../../assets/img/rili.png" width="20" height="auto" />
          <span class="timeChange">
            <p
              v-for="(item,index) in timeList"
              :key="index"
              @click="changeTime(item,index)"
              :class="{isSelTime:currentIndex == index}"
            >
              <span>{{item.title}}</span>
            </p>
          </span>
        </span>
        <group class="groupWrap timeChangeSel" v-if="currentIndex==0">
          <datetime v-model="selYear1" format="YYYY-MM" @on-change="onChangeYear1"></datetime>
        </group>
        <group class="groupWrap timeChangeSel" v-if="currentIndex==1">
          <datetime v-model="selYear2" format="YYYY" @on-change="onChangeYear2"></datetime>
        </group>
      </div>
      <div class="indexBox">
        <div class="module">
          <div class="title">
            <span>
              <img slot="icon" src="./../../../assets/img/dbl_nxb.png" width="20" height="auto" />
              <span>能效比</span>
            </span>
          </div>
          <div class="circle">
            <div>
              <div>
                <img slot="icon" src="./../../../assets/img/dbl_dbl.png" width="124" height="auto" />
                <big>{{((targetData.xtxl==((""||null)))?'':targetData.xtxl)}}</big>
                <small>{{(targetData.xtxl==((""||null)))?'':'%'}}</small>
              </div>
              <div>
                <span>运行监测能效比</span>
              </div>
            </div>
            <div class="centerHolder">
              <img slot="icon" src="./../../../assets/img/dbl_yqz.png" width="142" height="auto" />
              <span>
                <label>要求值:</label>
                <span>{{targetData.xtxlyq}}%</span>
              </span>
            </div>
            <div>
              <div>
                <img slot="icon" src="./../../../assets/img/dbl_zhxl.png" width="124" height="auto" />
                <big>{{(targetData.xtxl==(""||null))?'':((targetData.xtxlrate==(""||null))?'':targetData.xtxlrate)}}</big>
                <small>{{(targetData.xtxl==(""||null))?'':((targetData.xtxlrate==(""||null))?'':'%')}}</small>
              </div>
              <div>
                <span style="margin-right: 0.15rem;">达标率</span>
              </div>
            </div>
          </div>
        </div>
        <div class="module">
          <div class="title">
            <span>
              <img slot="icon" src="./../../../assets/img/dbl_zjxl.png" width="20" height="auto" />
              <span>单晶组件转换效率</span>
            </span>
          </div>
          <div class="circle">
            <div>
              <div>
                <img slot="icon" src="./../../../assets/img/dbl_dbl.png" width="124" height="auto" />
                <big>{{(targetData.danjinzjxl==(""||null))?'':(targetData.danjinzjxl)}}</big>
                <small>{{(targetData.danjinzjxl==(""||null))?'':'%'}}</small>
              </div>
              <div>
                <span>运行监测组件转换效率</span>
              </div>
            </div>
            <div class="centerHolder">
              <img slot="icon" src="./../../../assets/img/dbl_yqz.png" width="142" height="auto" />
              <span>
                <label>要求值:</label>
                <span>{{(targetData.danjinzjxlyq==(""||null))?'':(targetData.danjinzjxlyq)}}%</span>
              </span>
            </div>
            <div>
              <div>
                <img slot="icon" src="./../../../assets/img/dbl_zhxl.png" width="124" height="auto" />
                <big>{{(targetData.danjinzjxl==(""||null))?'':((targetData.danjinzjxlrate==(""||null))?'':(targetData.danjinzjxlrate))}}</big>
                <small>{{(targetData.danjinzjxl==(""||null))?'':((targetData.danjinzjxlrate==(""||null))?'':'%')}}</small>
              </div>
              <div>
                <span style="margin-right: 0.15rem;">达标率</span>
              </div>
            </div>
          </div>
        </div>
        <div class="module" v-if="targetData.duojinzjxlyq">
          <div class="title">
            <span>
              <img slot="icon" src="./../../../assets/img/dbl_zjxl.png" width="20" height="auto" />
              <span>多晶组件转换效率</span>
            </span>
          </div>
          <div class="circle">
            <div>
              <div>
                <img slot="icon" src="./../../../assets/img/dbl_dbl.png" width="124" height="auto" />
                <big>{{(targetData.duojinzjxl==(""||null))?'':(targetData.duojinzjxl)}}</big>
                <small>{{(targetData.duojinzjxl==(""||null))?'':'%'}}</small>
              </div>
              <div>
                <span>运行监测组件转换效率</span>
              </div>
            </div>
            <div class="centerHolder">
              <img slot="icon" src="./../../../assets/img/dbl_yqz.png" width="142" height="auto" />
              <span>
                <label>要求值:</label>
                <span>{{(targetData.duojinzjxlyq==(""||null))?'':(targetData.duojinzjxlyq)}}%</span>
              </span>
            </div>
            <div>
              <div>
                <img slot="icon" src="./../../../assets/img/dbl_zhxl.png" width="124" height="auto" />
                <big>{{(targetData.duojinzjxl==(""||null))?'':((targetData.duojinzjxlrate==(""||null))?'':(targetData.duojinzjxlrate))}}</big>
                <small>{{(targetData.duojinzjxl==(""||null))?'':(targetData.duojinzjxlrate==(""||null))?'':'%'}}</small>
              </div>
              <div>
                <span style="margin-right: 0.15rem;">达标率</span>
              </div>
            </div>
          </div>
        </div>
        <div class="module">
          <div class="title">
            <span>
              <img slot="icon" src="./../../../assets/img/dbl_nbqxl.png" width="20" height="auto" />
              <span>逆变器最高转换效率</span>
            </span>
          </div>
          <div class="circle">
            <div>
              <div>
                <img slot="icon" src="./../../../assets/img/dbl_dbl.png" width="124" height="auto" />
                <big>{{(targetData.nbqxl==(""||null))?'':(targetData.nbqxl)}}</big>
                <small>{{(targetData.nbqxl==(""||null))?'':'%'}}</small>
              </div>
              <div>
                <span>运行监测逆变器转换效率</span>
              </div>
            </div>
            <div class="centerHolder">
              <img slot="icon" src="./../../../assets/img/dbl_yqz.png" width="142" height="auto" />
              <span>
                <label>要求值:</label>
                <span>{{(targetData.nbqxlyq==(""||null))?'':(targetData.nbqxlyq)}}%</span>
              </span>
            </div>
            <div>
              <div>
                <img slot="icon" src="./../../../assets/img/dbl_zhxl.png" width="124" height="auto" />
                <big>{{(targetData.nbqxl==(""||null))?'':((targetData.nbqxlrate==(""||null))?'':(targetData.nbqxlrate))}}</big>
                <small>{{(targetData.nbqxl==(""||null))?'':'%'}}</small>
              </div>
              <div>
                <span style="margin-right: 0.15rem;">达标率</span>
              </div>
            </div>
          </div>
        </div>
        <div class="data-source">数据来源：{{targetData.name}}</div>
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
    let time = new Date();
    let years = time.getFullYear();
    let months = time.getMonth() < 10 ? "0" + time.getMonth() : time.getMonth();
    return {
      zeroData: "00.00",
      showTimeControl: true,
      selYear1: years + "-" + months,
      selYear2: String(years - 1),
      nowMonth: "",
      targetData: {},
      currentIndex: 0,
      timeList: [{ title: "月", type: "month" }, { title: "年", type: "year" }],
      storeTimeName: "month",
      timeType: null //1--年，2--月
    };
  },
  mounted() {
    if (this.currentIndex == 0) this.timeType = 2;
    else this.timeType = 1;
    this.getTechStandardData(
      "/AppApi/Base/GetRate",
      this.timeType,
      this.selYear1 + "-01"
    );
  },
  methods: {
    // 获取指标达标率的数据
    getTechStandardData(url, dateType, dateTime) {
      this.$fetch(url, { type: dateType, time: dateTime }).then(res => {
        if (res.data.length > 0) {
          res.data.map(t => {
            this.targetData = t;
          });
        }
      });
    },
    // 年份改变时切换的数据
    onChangeYear1(year) {
      this.getTechStandardData(
        "/AppApi/Base/GetRate",
        this.timeType,
        year + "-01"
      );
    },
    onChangeYear2(year) {
      this.getTechStandardData(
        "/AppApi/Base/GetRate",
        this.timeType,
        year + "-01-01"
      );
    },
    changeTime(val, index) {
      let time = new Date();
      let years = time.getFullYear();
      let months =
        time.getMonth() < 10 ? "0" + time.getMonth() : time.getMonth();
      this.currentIndex = index;
      this.$nextTick(() => {
        if (index == "0") {
          this.selYear1 = years + "-" + months;
          this.timeType = 2;
          this.getTechStandardData(
            "/AppApi/Base/GetRate",
            this.timeType,
            this.selYear1 + "-01"
          );
        } else {
          this.selYear2 = String(years - 1);
          this.timeType = 1;
          this.getTechStandardData(
            "/AppApi/Base/GetRate",
            this.timeType,
            this.selYear2 + "-01-01"
          );
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.module {
  background: #fff;
  margin-top: 0.1rem;
}
.centerHolder {
  position: relative;
  margin: 0 -0.18rem 0.15rem -0.25rem;
  > span {
    position: absolute;
    // top: 0.3rem;
    // left: 0.2rem;
    // width: 1.1rem;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    white-space: nowrap;
    text-align: center;
    color: #4bac0d;
    font-weight: 600;
  }
}
.title {
  margin-top: 0.1rem;
  border-bottom: 0.01rem solid #e4e4e4;
  background: #fff;
  align-items: center;
  > span {
    display: flex;
    align-items: center;
    padding: 0.06rem 0.15rem;
    > span {
      margin-left: 0.1rem;
    }
  }
}
.circle {
  display: flex;
  align-items: center;
  background: #fff;
  padding: 0.2rem 0.1rem;
  > div {
    display: inline-block;
    position: relative;
    div:first-child {
      position: relative;
      display: inline-block;
      > big {
        position: absolute;
        width: 100%;
        text-align: center;
        left: 0;
        top: 0.5rem;
        font-weight: 800;
      }
      > small {
        position: absolute;
        width: 100%;
        text-align: center;
        left: 0;
        top: 0.7rem;
        font-size: 0.12rem;
      }
    }
    div:nth-child(2) {
      display: inline-block;
      width: 1.32rem;
      text-align: center;
      font-size: 0.12rem;
    }
  }
}
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
}
.soltTitle {
  display: flex !important;
  align-items: center !important;
  color: #999;
  img {
    margin-right: 0.1rem;
  }
}
.per-station-chart {
  margin-top: 0.1rem;
  background: #fff;
}
.station-title {
  display: flex;
  margin-top: 0.1rem;
  font-size: 0.16rem;
  padding: 0.1rem 0.2rem;
  box-sizing: border-box;
  border-bottom: 1px solid #e4e4e4;
  background: #fff;
  color: #333333;
  img {
    margin-right: 0.05rem;
  }
}
.indexBox {
  flex: 1;
  overflow-x: hidden;
}
.data-source{
   font-size: 0.12rem;
   color: #333333;
   padding: 0 0 0.1rem 0.1rem;
   background: #fff;
   font-style: italic;
}
</style>

