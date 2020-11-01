<template>
  <div class="view-container runAnalysis">
    <div class="titleWrap">
      <Title class="head-title"></Title>
    </div>
    <div class="view-box">
      <span>
        <img slot="icon" src="./../../../assets/img/rili.png" width="20" height="auto" />
        <span class="timeChange">
          <p
            v-for="(item,index) in timeList"
            :key="index"
            @click="changeTime(item,index)"
          >
            <span>{{item.title}}</span>
          </p>
        </span>
      </span>
      <!-- <group class="groupWrap timeChangeSel" v-if="storeTimeName=='month'">
        <datetime v-model="selYear1" format="YYYY-MM" @on-change="onChangeYear1"></datetime>
      </group> -->
      <group class="groupWrap timeChangeSel" v-if="storeTimeName=='year'">
        <datetime v-model="selYear2" format="YYYY" @on-change="onChangeYear2"></datetime>
      </group>
    </div>
    <div class="indexBox">
      <group v-for="(item,index) in indexType" :key="index">
        <cell is-link @click.native="indexView(index)">
          <span slot="title" class="soltTitle">
            <img slot="icon" :src="'static/img/'+item.icon" width="20" height="auto" />
            <i>{{item.title}}</i>
            <span>{{item.unit}}</span>
          </span>
          <span title="value" class="value">
            <i>{{item.value}}</i>
            <!-- <span>{{item.unit}}</span> -->
          </span>
        </cell>
      </group>
    </div>
  </div>
</template>
<script>
import Title from "@/components/public/HeadTitle";
import { Datetime, Group, Cell } from "vux";
import getJson from "@/components/methods/runAnalysis/Index";
export default {
  components: {
    Title,
    Datetime,
    Group,
    Cell
  },
  data() {
    let time = new Date();
    let years = time.getFullYear();
    let months =
      time.getMonth() + 1 < 10
        ? "0" + (time.getMonth() + 1)
        : time.getMonth() + 1;
    return {
      roleType: null,
      currentIndex: 1,
      selYear1: years + "-01", //当前显示的年份
      selYear2: String(years), //当前显示的年份
      timeList: [{ title: "年份", type: "year" }],
      storeTimeName: "year",
      stationList: [], //电站所有信息
      indexType: [
        {title: "发电量", value: "0", unit: "亿kWh", icon: "fdldb.png"},
        { title: "利用小时数", value: "0", unit: "h", icon: "lyxss.png"},
        { title: "能效比", value: "0", unit: "%", icon: "zhfdxl.png" },
        { title: "斜面辐射", value: "0", unit: "kWh/m²", icon: "tynzy.png"},
        { title: "组件转换效率", value: "", unit: "", icon: "zhl.png" },
        { title: "组件衰减率", value: "", unit: "", icon: "sjl.png" },
        { title: "逆变器转换效率", value: "", unit: "", icon: "nbqzgxl.png"},
        { title: "指标对标分析", value: "", unit: "", icon: "zbzh.png" }
      ]
    };
  },
  mounted() {
    this.roleType = localStorage.getItem("currentRoleType");
    this.getRoleTypeMsg();
    this.getRunAnalysisData(
      "/AppApi/Base/GetRunAnalysis",
      this.storeTimeName,
      this.selYear1 + "-01"
    );
    this.getAllStationData();
  },
  methods: {
    // 根据当前角色类型，展示列表（1--项目类型，其他--基地类型）
    getRoleTypeMsg() {
      if (this.roleType == 1) {
        return this.indexType.splice(4);
      } else {
        return this.indexType;
      }
    },
    // 切换日月年触发的事件
    changeTime(val, i) {
      // debugger
      let time = new Date();
      let years = time.getFullYear();
      let months =
        time.getMonth() + 1 < 10
          ? "0" + (time.getMonth() + 1)
          : time.getMonth() + 1;
      this.storeTimeName = "";
      this.currentIndex = i;

      this.$nextTick(() => {
        this.storeTimeName = val.type;
        if (i == 0) {
          this.selYear1 = String(years + "-" + months);
          this.getRunAnalysisData(
            "/AppApi/Base/GetRunAnalysis",
            val.type,
            this.selYear1 + "-01"
          );
        } else {
          this.selYear2 = String(years);
          this.getRunAnalysisData(
            "/AppApi/Base/GetRunAnalysis",
            val.type,
            this.selYear2 + "-01-01"
          );
        }
      });
    },
    // 根据年份触发总计发电量的数据
    onChangeYear1(year) {
      this.indexType.map(item => {
        if (
          item.title === "指标对标分析" ||
          "组件转换效率" ||
          "组件衰减率" ||
          "逆变器转换效率"
        )
          item.value = null;
        else item.value = 0;
      });
      this.getRunAnalysisData(
        "/AppApi/Base/GetRunAnalysis",
        this.storeTimeName,
        year + "-01"
      );
    },
    onChangeYear2(year) {
      // debugger
      this.indexType.map(item => {
        if (
          item.title === "指标对标分析" ||
          "组件转换效率" ||
          "组件衰减率" ||
          "逆变器转换效率"
        )
          item.value = null;
        else item.value = 0;
      });
      this.getRunAnalysisData(
        "/AppApi/Base/GetRunAnalysis",
        this.storeTimeName,
        year + "-01-01"
      );
    },
    // 获取运行分析页面的数据
    getRunAnalysisData(url, dateType, curentYear) {
      this.$fetch(url, { datatype: dateType, datetime: curentYear }).then(
        run => {
          this.indexType[0].value = 0;
          this.indexType[1].value = 0;
          this.indexType[2].value = 0;
          this.indexType[3].value = 0;
          let compareTime = "",
            compareStandard = [],
            compareFlag = "";
          if (dateType == "month") {
            compareFlag = "monthNum";
            compareTime = curentYear.split("-")[1];
          } else {
            compareFlag = "yearNum";
            compareTime = curentYear.split("-")[0];
          }
          if (run.data && run.data.length > 0) {
            run.data.map(q => {
              compareStandard.push(q[compareFlag]);
            });
            compareStandard = [...new Set(compareStandard.sort())];
            run.data.forEach(a => {
              compareStandard.map(t => {
                if (
                  compareTime == t &&
                  a[compareFlag] == t &&
                  a.indexCode === "yearfdl"
                ) {
                  this.indexType[0].value = a.dataValue
                    ? a.dataValue.toFixed(2)
                    : 0;
                }
              });
              compareStandard.map(t => {
                if (
                  compareTime == t &&
                  a[compareFlag] == t &&
                  a.indexCode === "yearlyxss"
                ) {
                  this.indexType[1].value = a.dataValue
                    ? a.dataValue.toFixed(2)
                    : 0;
                }
              });
              compareStandard.map(t => {
                if (
                  compareTime == t &&
                  a[compareFlag] == t &&
                  a.indexCode === "nxb"
                ) {
                  this.indexType[2].value = a.dataValue
                    ? a.dataValue.toFixed(2)
                    : 0;
                }
              });
              compareStandard.map(t => {
                if (compareTime == t &&a[compareFlag] == t 
                    &&a.indexCode === "zfs") {
                  this.indexType[3].value = a.dataValue
                    ? a.dataValue.toFixed(2)
                    : 0;
                }
              });
            });
          }
        }
      );
    },
    // 获取所有电站信息数据
    getAllStationData() {
      this.$fetch("/AppApi/Base/GetProList").then(station => {
        if (station.data && station.data.length > 0) {
          station.data.forEach(s => {
            this.stationList.push({
              projectCode: s.baseId,
              projectName: s.baseName
            });
          });
          if (this.roleType != 1) {
            this.stationList.unshift({
              projectCode: "",
              projectName: "全部"
            });
          }
          localStorage.setItem(
            "storeStationMsg",
            JSON.stringify(this.stationList)
          ); //将电站列表信息存储起来，以便后边调用
        }
      });
    },
    // 点击跳转到对应的子页面
    indexView(index) {
      switch (index) {
        case 0:
          this.$router.push({ name: "powerComp" });
          break;
        case 1:
          this.$router.push({ name: "useHours" });
          break;
        case 2:
          this.$router.push({ name: "powerEffectency" });
          break;
        case 3:
          this.$router.push({ name: "sunRes" });
          break;
        case 4:
          this.$router.push({ name: "convertEfficiency" });
          break;
        case 5:
          this.$router.push({ name: "attenuationRate" });
          break;
        case 6:
          this.$router.push({ name: "inverter" });
          break;
        case 7:
          this.$router.push({ name: "analysis" });
          break;
        default:
          return;
      }
    }
  },
  filters: {}
};
</script>
<style lang="less" scoped>
.runAnalysis {
  display: flex;
  flex-direction: column;
  .indexBox {
    flex: 1;
    overflow-x: hidden;
  }
}
.titleWrap {
  background: linear-gradient(to right, #65be24 0%, #48a73c 50%, #65be24 100%);
  height: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.head-title {
  padding-top: 0 !important;
}
.soltTitle {
  display: flex;
  align-items: center;
  color: #333;
  font-size: 0.16rem;
  span{
    font-size: 0.14rem;
    color: #999;
    line-height: 1;
    margin: 0.02rem 0 0 0.05rem;
  }
  img {
    margin-right: 0.1rem;
  }
}
</style>
<style lang="less">
.runAnalysis .indexBox {
  .weui-cell {
    padding: 0.12rem 0.15rem;
  }
  margin: 0 0.15rem;
  .weui-cells.vux-no-group-title {
    margin-top: 0.1rem !important;
    border-radius: 4px;
    // border: 1px solid #d9d9d9;
    box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.05);
    border: none;
    .vux-cell-bd.vux-cell-primary p {
      display: flex;
      align-items: center;
    }
  }
  .value {
    margin-right: 0.05rem;
    i {
      color: #4cac0e;
      font-size: 0.28rem;
      font-family: "number";
      margin-right: 0.05rem;
    }
    span {
      font-size: 0.14rem;
    }
  }
  .weui-cells:after,
  .weui-cells:before {
    border: none;
  }
}
</style>
