<template>
  <div>
    <el-form v-model="contrastForm" inline>
      <el-form-item class="clearTop">
        <el-select
          v-model="contrastForm.FirstBaseId"
          clearable
          class="contrast-input"
        >
          <span slot="prefix" class="select-prefix"
            ><img src="../../../assets/img/base.png" alt="" />基地1</span
          >
          <el-option
            :label="item.name"
            :value="item.id"
            v-for="item in baseOption"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="clearTop">
        <el-select
          v-model="contrastForm.SecondBaseId"
          clearable
          class="contrast-input"
        >
          <span slot="prefix" class="select-prefix"
            ><img src="../../../assets/img/base.png" alt="" />基地2</span
          >
          <el-option
            :label="item.name"
            :value="item.id"
            v-for="item in baseOption"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          class="contrast-input contrast-date"
          v-model="contrastForm.date"
          type="year"
          prefix-icon="zui-icon-date zui-icon-date-year"
          placeholder="选择年"
          value-format="yyyy"
          width="200"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="active" @click="getBaseDeviceData()"
          >对&nbsp;&nbsp;标</el-button
        >
      </el-form-item>
    </el-form>
    <el-row :gutter="30">
      <el-col :span="12" v-for="item in deviceData" :key="item.baseId">
        <div style="height:380px;">
          <el-image
            :src="item.picture"
            style="height:330px;width:100%;"
          ></el-image>
          <div class="equipName">
            {{ item.basename }}
          </div>
        </div>
      </el-col>
    </el-row>
    <SubTitle
      style="margin:60px 0 30px 0"
      text="基本信息"
      en="Basic information"
      class="inlineBlock"
    ></SubTitle>
    <el-table
      :data="baseTableData"
      stripe
      style="width: 100%"
      :showHeader="false"
      class="vertical-table"
    >
      <el-table-column prop="name" label="类别" width="230"> </el-table-column>
      <el-table-column prop="base0" label="电站1"> </el-table-column>
      <el-table-column prop="base1" label="电站2"> </el-table-column>
    </el-table>
    <SubTitle
      style="margin:60px 0 30px 0"
      text="设备信息"
      en="device information"
      class="inlineBlock"
    ></SubTitle>
    <el-table
      :data="deviceTableData"
      stripe
      style="width: 100%"
      :showHeader="false"
      class="vertical-table"
    >
      <el-table-column prop="name" label="类别" width="230"> </el-table-column>
      <el-table-column prop="base0" label="电站1">
        <template slot-scope="scope">
          <el-tag
            style="margin:5px"
            v-for="item in scope.row.base0"
            :key="item"
            type="info"
            size="small"
            effect="plain"
          >
            {{ item }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="base1" label="电站2">
        <template slot-scope="scope">
          <el-tag
            style="margin:5px"
            v-for="item in scope.row.base1"
            :key="item"
            type="info"
            size="small"
            effect="plain"
          >
            {{ item }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
    <SubTitle
      style="margin:60px 0 30px 0"
      text="监测指标信息"
      en="Monitoring index information"
      class="inlineBlock"
    ></SubTitle>
    <el-table
      :data="basicTableData"
      stripe
      style="width: 100%"
      :showHeader="false"
      class="vertical-table"
    >
      <el-table-column prop="name" label="类别" width="230"> </el-table-column>
      <el-table-column prop="base0" label="电站1"> </el-table-column>
      <el-table-column prop="base1" label="电站2"> </el-table-column>
    </el-table>
    <SubTitle
      style="margin:60px 0 30px 0"
      text="综合效益"
      en="Comprehensive benefits"
      class="inlineBlock"
    ></SubTitle>
    <el-table
      :data="compTableData"
      stripe
      style="width: 100%"
      :showHeader="false"
      class="vertical-table"
    >
      <el-table-column prop="name" label="类别" width="230"> </el-table-column>
      <el-table-column prop="base0" label="电站1"> </el-table-column>
      <el-table-column prop="base1" label="电站2"> </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getFormatDate } from "@/utils/auth.js";
export default {
  components: {
    SubTitle: resolve => {
      require(["@/components/public/subTitle.vue"], resolve);
    }
  },
  data() {
    return {
      contrastForm: {
        FirstBaseId: "",
        SecondBaseId: "",
        date: "",
        Year: "",
        Month: "",
        Standard: true
      },
      baseTableData: [
        { name: "装机容量(MW)" },
        { name: "并网时间" },
        { name: "上网电价(元/kW.h)" }
      ],
      deviceTableData: [{ name: "组件" }, { name: "逆变器" }],
      basicTableData: [
        { name: "当年斜面辐射量(kWh/m²)" },
        { name: "当年发电量(万kW.h)" },
        { name: "当年利用小时数(h)" },
        { name: "当年能效比(%)" }
      ],
      compTableData: [
        { name: "当年产值(万元)" },
        { name: "相当于累计植树(万棵)" },
        { name: "累计减排二氧化碳(万吨)" },
        { name: "累计节约标准煤(万吨)" }
      ],
      baseOption: [],
      deviceData: [],
      showTableData: true,
      err: null
    };
  },
  methods: {
    getBaseList() {
      this.$fetch("/MtrBase/GetBaseList").then(res => {
        this.baseOption = res.data;
      });
    },
    getBaseDeviceData() {
      let _this = this;
      this.contrastForm.Year = this.contrastForm.date || "";
      this.$fetch("/LtrDevice/GetBaseDevice", this.contrastForm).then(res => {
        let dataArr = [];
        res.data.map(item=>{
          if(item.baseId == _this.contrastForm.FirstBaseId){
            dataArr[0] = item
          }else{
            dataArr[1] =item
          }
        })
        this.deviceData = dataArr;
        this.baseTableData = [
          { name: "装机容量(MW)" },
          { name: "并网时间" },
          { name: "上网电价(元/kW.h)" }
        ];
        this.deviceTableData = [{ name: "组件" }, { name: "逆变器" }];
        this.basicTableData = [
          { name: "当年斜面辐射量(kWh/m²)" },
          { name: "当年发电量(万kW.h)" },
          { name: "当年利用小时数(h)" },
          { name: "当年能效比(%)" }
        ];
        this.compTableData = [
          { name: "当年产值(万元)" },
          { name: "相当于累计植树(万棵)" },
          { name: "累计减排二氧化碳(万吨)" },
          { name: "累计节约标准煤(万吨)" }
        ];
        this.deviceData.forEach((item, idx) => {
          _this.baseTableData[0]["base" + idx] = item.scale; //装机容量  --不确定是不是这个
          _this.baseTableData[1]["base" + idx] = getFormatDate("yyyy-MM-dd hh:mm:ss", item.gridtime); //并网时间 --没有格式化
          _this.baseTableData[2]["base" + idx] = item.price; //上网电价

          _this.deviceTableData[0]["base" + idx] = item.componentName; //组件 --没有
          _this.deviceTableData[1]["base" + idx] = item.inverterName; //逆变器 --没有

          _this.basicTableData[0]["base" + idx] = item.measurements.radiation; //斜面辐射量
          _this.basicTableData[1]["base" + idx] = item.measurements.powerGeneration; //发电量
          _this.basicTableData[2]["base" + idx] = item.measurements.usingHour; //利用小时数
          _this.basicTableData[3]["base" + idx] = item.measurements.effectComparing; //能效比

          _this.compTableData[0]["base" + idx] = item.comprehensive.outputValue; //产值
          _this.compTableData[1]["base" + idx] = item.comprehensive.allTree; //相当于植树
          _this.compTableData[2]["base" + idx] = item.comprehensive.allCo2; //减排CO2
          _this.compTableData[3]["base" + idx] = item.comprehensive.allCoal; //标准煤
        });
      });
    }
  },
  mounted() {},
  created() {
    this.getBaseList();
  }
};
</script>
<style lang="scss">
.clearTop .el-select>.el-input {
    top: 0px!important;
}
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
</style>
