<template>
  <div>
    <div class="IndicatorSelect">
      <span>
        <img src="/img/icon07.png" alt="" style="cursor:pointer" />
        <span>指标:</span>
      </span>
      <!-- <el-select v-model="stationid" @change="$emit('selectedStation',stationid)" style="width:300px"> -->
      <el-select v-model="stationid" @change="change">
        <el-option
          :value="item.code"
          :label="item.name"
          v-for="(item, id) in stationData"
          :key="id"
        ></el-option>
      </el-select>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    url: {
      default: "/StatisticsApi/EquipDataQuery/GetIndexList",
      type: String
    },
    emitState: {
      //是否分发默认数据
      default: false,
      type: Boolean
    },
    defaulState: {
      default: false,
      type: Boolean
    },
    timeType: {
      default: 2,
      type: Number
    }
  },
  data() {
    return {
      stationData: [],
      stationid: "",
      unit: "",
      inName: "",
      resCopy: []
    };
  },
  mounted() {
    this.getdata();
  },
  watch: {
    timeType(newVal) {
      this.methodTypeData(newVal);
    }
  },
  methods: {
    change(val) {
      for (let i of this.stationData) {
        if (i.code === val) {
          this.unit = i.unit;
          this.inName = i.name;
          break;
        }
      }
      this.$emit("selectedEquip", this.stationid, this.unit, this.inName);
    },
    getdata() {
      this.$ajax({
        url: this.url
      }).then(res => {
        this.resCopy = JSON.parse(JSON.stringify(res.data));
        this.stationData = this.resCopy;
        //设置默认状态年
        this.methodTypeData(this.timeType);
      });
    },
    methodTypeData(type) {
      if (this.resCopy.length > 0) {
        this.stationData = this.resCopy.filter(i => i.methodType == type);
        if (this.defaulState) {
          this.stationid = this.stationData[0].code;
          this.unit = this.stationData[0].unit;
          this.inName = this.stationData[0].name;

          this.$emit("initialData", this.stationid, this.unit, this.inName);
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.IndicatorSelect {
  position: relative;
}

.IndicatorSelect > span {
  position: absolute;
  top: 25%;
  left: 20px;
  z-index: 20;
  display: flex;
  align-items: center;
}

.IndicatorSelect > span img {
  margin-right: 10px;
}

.IndicatorSelect > span span {
  color: #d4e7ff;
}

.IndicatorSelect .el-select {
  width: 100%;
}
</style>
<style lang="scss">
.IndicatorSelect .el-select .el-input__inner {
  padding-left: 95px;
  background: transparent;
  height: 42px;
  border-radius: 0;
  border-color: rgb(50, 97, 166);
  color: rgb(0, 235, 251);
  font-size: 16px;
}
</style>
