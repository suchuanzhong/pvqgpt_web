<template>
  <div>
    <div>
      <SubTitle
        style="margin:0px 0 30px 0"
        text="组件转换效率"
        en="component conversion efficiency"
        class="inlineBlock"
      ></SubTitle>
      <el-form v-model="componentForm" inline>
        <el-form-item>
          <el-radio-group
            v-model="componentForm.timeType"
            @change="getComponents"
          >
            <el-radio-button label="year">年</el-radio-button>
            <el-radio-button label="month">月</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            class="contrast-input contrast-date"
            @change="getComponents"
            v-model="componentForm.date"
            :type="componentForm.timeType"
            :prefix-icon="
              'zui-icon-date zui-icon-date-' + componentForm.timeType
            "
            :placeholder="
              '选择' + (componentForm.timeType == 'year' ? '年份' : '月份')
            "
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="componentForm.Type"
            @change="getComponents"
            placeholder="请选择名义类型"
          >
            <el-option label="实证名义" value="0"></el-option>
            <el-option label="监测名义" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="relative">
        <h4>
          光伏领跑者组件运行{{
            componentForm.Type == "1" ? "监测名义" : "实证名义"
          }}转换效率
        </h4>
        <echartsBar
          style="height:410px;"
          :unit="['%', '%']"
          ids="powerQuery"
          :dataArr="[comBarData.dataArr]"
          :axisData="comBarData.axisData"
          :showTimeLine="false"
          ref="comBar"
          title="(组件名称)"
        ></echartsBar>
      </div>
    </div>
    <div>
      <SubTitle
        style="margin:60px 0 30px 0"
        text="组件衰减率"
        en="component attenuation rate"
        class="inlineBlock"
      ></SubTitle>
      <el-form v-model="contrastForm" inline>
        <el-form-item>
          <el-radio-group
            v-model="contrastForm.timeType"
            @change="getAttenuationData"
          >
            <el-radio-button label="year">年</el-radio-button>
            <el-radio-button label="month">月</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            class="contrast-input contrast-date"
            v-model="contrastForm.date"
            :type="contrastForm.timeType"
            @change="getAttenuationData"
            :prefix-icon="
              'zui-icon-date zui-icon-date-' + contrastForm.timeType
            "
            :placeholder="
              '选择' + (contrastForm.timeType == 'year' ? '年份' : '月份')
            "
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-select v-model="contrastForm.Type" @change="getAttenuationData">
            <el-option label="实证名义" value="0"></el-option>
            <el-option label="监测名义" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="relative">
        <h4>
          光伏领跑者组件运行{{
            contrastForm.Type == "1" ? "监测名义" : "实证名义"
          }}衰减率
        </h4>
        <echartsBar
          :unit="['%', '%']"
          ids="attrBar"
          style="height:410px;"
          :dataArr="[attBarData.dataArr]"
          :axisData="attBarData.axisData"
          :showTimeLine="false"
          ref="attBar"
          title="(组件名称)"
        ></echartsBar>
      </div>
    </div>
    <div>
      <SubTitle
        style="margin:60px 0 30px 0"
        text="逆变器转换效率"
        en="inverter conversion efficiency"
        class="inlineBlock"
      ></SubTitle>
      <el-form v-model="InverterForm" inline>
        <el-form-item>
          <el-radio-group
            v-model="InverterForm.timeType"
            @change="getInverData"
          >
            <el-radio-button label="year">年</el-radio-button>
            <el-radio-button label="month">月</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            class="contrast-input contrast-date"
            @change="getInverData"
            v-model="InverterForm.date"
            :type="InverterForm.timeType"
            :prefix-icon="
              'zui-icon-date zui-icon-date-' + InverterForm.timeType
            "
            :placeholder="
              '选择' + (InverterForm.timeType == 'year' ? '年份' : '月份')
            "
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="InverterForm.Type"
            clearable
            @change="getInverData"
            placeholder="请选择名义类型"
          >
            <el-option label="实证名义" value="0"></el-option>
            <el-option label="监测名义" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="relative">
        <h4>
          光伏领跑者逆变器运行{{
            InverterForm.Type == "1" ? "监测名义" : "实证名义"
          }}转换效率
        </h4>
        <el-table
          class="table-header"
          :data="tableData"
          stripe
          style="width: 100%"
        >
          <el-table-column prop="factor" label="逆变器厂家" width="230">
          </el-table-column>
          <el-table-column prop="code" label="型号"> </el-table-column>
          <el-table-column prop="inverterType" label="逆变器类型">
          </el-table-column>
          <el-table-column prop="maxefficency" label="最高转换效率">
          </el-table-column>
        </el-table>
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
      require(["@/components/public/echarts/echartBarHoriz.vue"], resolve);
    }
  },
  data() {
    return {
      tableData: [],
      componentForm: {
        Month: "",
        Year: "",
        date: new Date(),
        Type: "0",
        timeType: "year"
      },
      InverterForm: {
        Month: "",
        Year: "",
        date: new Date(),
        Type: "0",
        timeType: "year"
      },
      contrastForm: {
        Month: "",
        Year: "",
        date: new Date(),
        Type: "0",
        timeType: "year"
      },
      comBarData: {},
      attBarData: {},
      err: null
    };
  },
  methods: {
    getComponents() {
      if (this.componentForm.date) {
        var date = new Date(this.componentForm.date);
        this.componentForm.Year = date.getFullYear();
        if (this.componentForm.timeType == "month") {
          this.componentForm.Month = date.getMonth() + 1;
        } else {
          this.componentForm.Month = "";
        }
      } else {
        this.componentForm.Year = "";
        this.componentForm.Month = "";
      }

      this.$fetch("/LtrDevice/GetComponent", this.componentForm).then(res => {
        let barData = {
          dataArr: {
            name: "组件转换效率",
            type: "bar",
            data: []
          },
          axisData: []
        };
        try {
          res.data.data.forEach(item => {
            barData.axisData.push(item.code);
            barData.dataArr.data.push(item.dataValue || 0);
          });
        } catch (e) {
          this.err = e;
        }
        this.comBarData = barData;
        this.$nextTick(() => {
          this.$refs.comBar.drawChart();
        });
      });
    },
    getInverData() {
         if (this.InverterForm.date) {
        var date = new Date(this.InverterForm.date);
        this.InverterForm.Year = date.getFullYear();
        if (this.InverterForm.timeType == "month") {
          this.InverterForm.Month = date.getMonth() + 1;
        } else {
          this.InverterForm.Month = "";
        }
      } else {
        this.InverterForm.Year = "";
        this.InverterForm.Month = "";
      }
      this.$fetch("/LtrDevice/GetInverter", this.InverterForm).then(res => {
        this.tableData = res.data.data;
      });
    },

    getAttenuationData() {
      if (this.contrastForm.date) {
        var date = new Date(this.contrastForm.date);
        this.contrastForm.Year = date.getFullYear();
        if (this.contrastForm.timeType == "month") {
          this.contrastForm.Month = date.getMonth() + 1;
        } else {
          this.contrastForm.Month = "";
        }
      } else {
        this.contrastForm.Year = "";
        this.contrastForm.Month = "";
      }

      this.$fetch("/LtrDevice/GetComponentConversion", this.contrastForm).then(
        res => {
          let barData = {
            dataArr: {
              name: "组件衰减率",
              type: "bar",
              data: []
            },
            axisData: []
          };
          try {
            res.data.data.forEach(item => {
              barData.axisData.push(item.code);
              barData.dataArr.data.push(item.dataValue || 0);
            });
          } catch (e) {
            this.err = e;
          }
          this.attBarData = barData;
          this.$nextTick(() => {
            this.$refs.attBar.drawChart();
          });
        }
      );
    }
  },
  mounted() {
    this.getComponents();
    this.getInverData();
    this.getAttenuationData();
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
  h4 {
    font-size: 20px;
    color: #333333;
    line-height: 3em;
    text-align: center;
  }
}
</style>
