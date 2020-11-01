<template>
  <div>
    <div>
      <SubTitle
        style="margin:0px 0 30px 0"
        text="发电量查询"
        en="Power generation query"
        class="inlineBlock"
      ></SubTitle>
      <el-form v-model="powerForm" inline>
        <el-form-item>
          <el-date-picker
            class="contrast-input contrast-date"
            v-model="powerForm.ComparedYear"
            type="year"
            value-format="yyyy"
            prefix-icon="zui-icon-date zui-icon-date-year"
            placeholder="选中同比年份"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="active" @click="getPowerData(powerForm.ComparedYear)"
            >同&nbsp;&nbsp;比</el-button
          >
        </el-form-item>
      </el-form>
      <div class="relative">
        <div class="db-info">
          <h4>
            {{ powerInfo.title }}
          </h4>
          <template v-if="!childpowerBarData">
            <div
              class="db-info-li"
              v-for="(item, idx) in powerBarData"
              :key="idx"
            >
              <small>{{ item.name }}</small>
              <p>
                <span>总发电量</span><big>{{ item.total }}</big
                ><i>亿kW.h</i>
              </p>
            </div>
          </template>
        </div>
        <div style="height:410px;margin-top:60px;">
          <i
            class="zui-icon-back"
            v-if="childpowerBarData"
            style="position:absolute;right:0;top:0;z-index:99"
            @click="getPowerData(powerForm.ComparedYear)"
          ></i>
          <echartsBar
            :dataArr="powerBarData"
            :unit="['万kW.h', '万kW.h']"
            ids="powerQuery"
            :showTimeLine="false"
            @clickBack="barClickBack"
            v-if="powerBarData.length > 0"
            :axisData="powerBarData[0].labelData"
            ref="powerBarData"
          ></echartsBar>
        </div>
      </div>
    </div>
    <div>
      <SubTitle
        style="margin:60px 0 30px 0"
        text="利用小时数查询"
        en="query using hours"
        class="inlineBlock"
      ></SubTitle>
      <el-form v-model="hoursForm" inline>
        <el-form-item>
          <el-date-picker
            class="contrast-input contrast-date"
            v-model="hoursForm.ComparedYear"
            type="year"
            value-format="yyyy"
            prefix-icon="zui-icon-date zui-icon-date-year"
            placeholder="选中同比年份"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="active" @click="getHoursData(hoursForm.ComparedYear)"
            >同&nbsp;&nbsp;比</el-button
          >
        </el-form-item>
      </el-form>
      <div class="relative">
        <div class="db-info">
          <h4>
            {{ hoursInfo.title }}
          </h4>
          <template v-if="!childhoursBarData">
            <div
              class="db-info-li"
              v-for="(item, idx) in hoursBarData"
              :key="idx"
            >
              <small>{{ item.name }}</small>
              <p>
                <span>总利用小时</span><big>{{ item.total }}</big
                ><i>h</i>
              </p>
            </div>
          </template>
        </div>
        <div style="height:410px;margin-top:60px;">
          <i
            class="zui-icon-back"
            v-if="childhoursBarData"
            style="position:absolute;right:0;top:0;z-index:99"
            @click="getHoursData(hoursForm.ComparedYear)"
          ></i>
          <echartsBar
            :dataArr="hoursBarData"
            :unit="['h', 'h']"
            ids="powerQuery1"
            :showTimeLine="false"
            @clickBack="barClickBack"
            v-if="hoursBarData.length > 0"
            :theme="['#19b197', '#00a8f6']"
            :theme2="['#1da63b', '#12c9fe']"
            :axisData="hoursBarData[0].labelData"
            ref="hoursBarData"
          ></echartsBar>
        </div>
      </div>
    </div>
    <div>
      <SubTitle
        style="margin:60px 0 30px 0"
        text="辐射量查询"
        en="radiation query"
        class="inlineBlock"
      ></SubTitle>
      <el-form v-model="radiationForm" inline>
        <el-form-item>
          <el-date-picker
            class="contrast-input contrast-date"
            v-model="radiationForm.ComparedYear"
            type="year"
            value-format="yyyy"
            prefix-icon="zui-icon-date zui-icon-date-year"
            placeholder="选中同比年份"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            type="active"
            @click="getRadiationData(radiationForm.ComparedYear)"
            >同&nbsp;&nbsp;比</el-button
          >
        </el-form-item>
      </el-form>
      <div class="relative">
        <div class="db-info">
          <h4>
            {{ radiationInfo.title }}
          </h4>
          <template v-if="!childradiationBarData">
            <div
              class="db-info-li"
              v-for="(item, idx) in radiationBarData"
              :key="idx"
            >
              <small>{{ item.name }}</small>
              <p>
                <span>总辐射量</span><big>{{ item.total }}</big
                ><i>kWh/m²</i>
              </p>
            </div>
          </template>
        </div>
        <div style="height:410px;margin-top:60px;">
          <i
            class="zui-icon-back"
            v-if="childradiationBarData"
            style="position:absolute;right:0;top:0;z-index:99"
            @click="getRadiationData(radiationForm.ComparedYear)"
          ></i>
          <echartsBar
            :dataArr="radiationBarData"
            :unit="['kWh/m²', 'kWh/m²']"
            ids="powerQuery2"
            :showTimeLine="false"
            @clickBack="barClickBack"
            :theme="['#62915a', '#9fa603']"
            :theme2="['#9ee596', '#f2ff06']"
            v-if="radiationBarData.length > 0"
            :axisData="radiationBarData[0].labelData"
            ref="radiationBarData"
          ></echartsBar>
        </div>
      </div>
    </div>
    <div>
      <SubTitle
        style="margin:60px 0 30px 0"
        text="能效比查询"
        en="energy efficiency radio query"
        class="inlineBlock"
      ></SubTitle>
      <el-form v-model="efficForm" inline>
        <el-form-item>
          <el-date-picker
            class="contrast-input contrast-date"
            v-model="efficForm.ComparedYear"
            type="year"
            value-format="yyyy"
            prefix-icon="zui-icon-date zui-icon-date-year"
            placeholder="选中同比年份"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="active" @click="getEfficData(efficForm.ComparedYear)"
            >同&nbsp;&nbsp;比</el-button
          >
        </el-form-item>
      </el-form>
      <div class="relative">
        <div class="db-info">
          <h4>
            {{ efficInfo.title }}
          </h4>
          <template v-if="!childefficBarData">
            <div
              class="db-info-li"
              v-for="(item, idx) in efficBarData"
              :key="idx"
            >
              <small>{{ item.name }}</small>
              <p>
                <span>总能效比</span><big>{{ item.total }}</big
                ><i>%</i>
              </p>
            </div>
          </template>
        </div>
        <div style="height:410px;margin-top:60px;">
          <i
            class="zui-icon-back"
            v-if="childefficBarData"
            style="position:absolute;right:0;top:0;z-index:99"
            @click="getEfficData(efficForm.ComparedYear)"
          ></i>
          <echartsBar
            :dataArr="efficBarData"
            :unit="['%', '%']"
            ids="powerQuery3"
            :showTimeLine="false"
            @clickBack="barClickBack"
            v-if="efficBarData.length > 0"
            :theme="['#ad6800', '#006d75']"
            :theme2="['#fff1b8', '#5cdbd3']"
            :axisData="efficBarData[0].labelData"
            ref="efficBarData"
          ></echartsBar>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    SubTitle: resolve => {
      require(["@/components/public/subTitle.vue"], resolve);
    },
    echartsBar: resolve => {
      require(["@/components/public/echarts/echartsBar2.vue"], resolve);
    }
  },
  data() {
    return {
      powerForm: {
        ComparedYear: "",
        year: ""
      },
      hoursForm: {
        ComparedYear: "",
        year: ""
      },
      efficForm: {
        ComparedYear: "",
        year: ""
      },
      radiationForm: {
        ComparedYear: "",
        year: ""
      },
      powerBarData: [],
      powerInfo: {},
      hoursBarData: [],
      hoursInfo: {},
      efficBarData: [],
      efficInfo: {},
      radiationBarData: [],
      radiationInfo: {},
      childpowerBarData: false,
      childhoursBarData: false,
      childefficBarData: false,
      childradiationBarData: false
    };
  },
  methods: {
    getPowerData(year) {
      //发电量
      if (!year) {
        year = "";
      }
      this.powerBarData = [];
      let _this = this;
      this.$fetch("/Powerdata/GetRadiationTree", {
        Yearnum: new Date().getFullYear(),
        ComparedYear: year,
        Standard: year ? true : false
      }).then(res => {
        _this.powerInfo = {
          title: res.data[0].name
        };
        res.data.sort(function(a,b){
          return b.year-a.year
        })
        _this.initData(
          res.data,
          "powerBarData",
          "/Powerdata/GetMonthRadiationTree"
        );
      });
    },
    getRadiationData(year) {
      //辐射
      if (!year) {
        year = new Date().getFullYear();
      }
      this.radiationBarData = [];
      let _this = this;
      this.$fetch("/Resourcedata/GetYearRadiationTree", {
        Yearnum: new Date().getFullYear(),
        Standard: year ? true : false,
        ComparedYear: year
      }).then(res => {
        _this.radiationInfo = {
          title: res.data[0].name
        };
        res.data.sort(function(a,b){
         
          return b.year-a.year
        })
        _this.initData(
          res.data,
          "radiationBarData",
          "/Resourcedata/GetRadiationTree"
        );
      });
    },
    getEfficData(year) {
      //能效比
      if (!year) {
        year = new Date().getFullYear();
      }
      this.efficBarData = [];
      let _this = this;
      this.$fetch("/Powerdata/GetEfficiencyTree", {
        Yearnum: new Date().getFullYear(),
        Standard: year ? true : false,
        ComparedYear: year
      }).then(res => {
        _this.efficInfo = {
          title: res.data[0].name
        };
        res.data.sort(function(a,b){
          return b.year-a.year
        })
        _this.initData(
          res.data,
          "efficBarData",
          "/Powerdata/GetMonthEfficiencyTree"
        );
      });
    },
    getHoursData(year) {
      //利用小时
      if (!year) {
        year = new Date().getFullYear();
      }
      this.hoursBarData = [];
      let _this = this;
      this.$fetch("/Powerdata/GetYearNumberHoursTree", {
        Yearnum: new Date().getFullYear(),
        Standard: year ? true : false,
        ComparedYear: year
      }).then(res => {
        _this.hoursInfo = {
          title: res.data[0].name
        };
        res.data.sort(function(a,b){
          return b.year-a.year
        })
        _this.initData(
          res.data,
          "hoursBarData",
          "/Powerdata/GetNumberHoursTree"
        );
      });
    },
    initData(result, name, path) {
      console.log(result)
      let _this = this;
      this["child" + name] = false;

      result.forEach(data => {
        let powerData = {
          name: data.year + "年",
          type: "bar",
          total: data.total,
          data: [],
          labelData: [],
          dataName: name,
          path: path
        };
        let valueData = [];
        let labelData = [];
        data.childTreeNode.forEach(item => {
          valueData.push(item.dataValue || 0);
          labelData.push(item.month || "");
        });
        powerData.data = valueData;
        powerData.labelData = labelData;
        _this[name].push(powerData);
      });

      this.$nextTick(() => {
        if (_this.$refs[name]) {
          _this.$refs[name].drawChart();
        }
      });
    },
    getAllYearNowData() {
      this.getPowerData();
      this.getRadiationData();
      this.getEfficData();
      this.getHoursData();
    },
    barClickBack(name, year, path, dataName) {
      var val = parseInt(name);
      if (isNaN(val)) {
        return false;
      } else {
        this[dataName] = [];
        this["child" + dataName] = true;
        let _this = this;
        this.$fetch(path, {
          Monthnum: val,
          Yearnum: parseInt(year)
        }).then(res => {
          let powerData = {
            name: val + "月",
            type: "bar",
            data: [],
            labelData: []
          };
          let valueData = [];
          let labelData = [];
          if (res.data.length > 0) {
            res.data[0].childTreeNode.forEach(item => {
              valueData.push(item.dataValue || 0);
              labelData.push(item.baseName || "");
            });
            powerData.data = valueData;
            powerData.labelData = labelData;
            _this[dataName] = [powerData];
            _this.$nextTick(() => {
              if (_this.$refs.powerBar) {
                _this.$refs[dataName].drawChart();
              }
            });
          }
        });
      }
    }
  },
  mounted() {
    this.getAllYearNowData();
  }
};
</script>
<style lang="scss">
.vertical-table {
  tr {
    background: #f6f8f9;
  }
  td {
    text-align: center;
  }
  &.el-table td,
  &.el-table th.is-leaf {
    border-bottom-color: #ebebeb;
  }
  &.el-table--striped .el-table__body tr.el-table__row--striped td {
    background: #fff;
  }
  .el-table__row {
    &:first-of-type td {
      border-top: 1px solid #ebebeb;
    }
    td:first-of-type {
      background: #eaeff1 !important;
      border-bottom: 1px solid #d6d6d6;
    }
  }
}
</style>
<style lang="scss" scope="scope">
.equipName {
  height: 42px;
  line-height: 42px;
  margin-top: -4px;
  text-align: center;
  background: #f5f5f5;
  color: #666666;
}
.equip-list {
  min-height: 308px;
  .el-col {
    margin-bottom: 30px;
  }
  img {
    margin: 0;
    border: 1px solid #e4e4e4;
  }
}
.relative {
  position: relative;
}
.db-info {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -70px);
  text-align: center;
  white-space: nowrap;
  h4 {
    font-size: 20px;
    color: #333333;
    line-height: 1em !important;
    padding-bottom: 1em;
  }
}
.db-info-li {
  display: inline-block;
  min-width: 210px;
  height: 50px;
  position: relative;
  margin: 0 10px;
  background: url(../../../assets/img/synthe-db.png) no-repeat;
  border: 1px solid #1da746;
  padding: 20px 15px 0;
  border-radius: 2px;
  small {
    color: #fff;
    line-height: 16px;
    width: 70px;
    position: absolute;
    left: 0;
    top: 0;
    text-align: center;
  }
  p {
    white-space: nowrap;
    display: flex;
    line-height: 20px;
    span{
      color: #666666;
    }
    big {
      font-family: "euro_regular";
      text-align: center;
      color: #1bac6b;
      font-size: 18px;
      padding: 0 10px;
    }
    i {
      font-style: normal;
      font-size: 12px;
      color: #999999;
    }
  }
}
</style>
