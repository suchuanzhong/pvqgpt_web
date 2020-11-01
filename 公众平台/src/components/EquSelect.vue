<template>
  <div>
    <div class="equSelect">
      <span>
        <img src="/img/icon06.png" alt="" style="cursor:pointer" />
        <span>设备:</span>
      </span>
      <el-select v-model="equipid" @change="change">
        <el-option
          :value="item[defaultKey.value]"
          :label="item[defaultKey.label]"
          v-for="(item, index) in equipData"
          :key="index"
        ></el-option>
      </el-select>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    url: {
      default: "/StatisticsApi/EquipDataQuery/GetEquipList",
      type: String
    },
    defaultKey: {
      default: function() {
        return {
          value: "code",
          label: "name"
        };
      }
    },
    emitState: {
      //是否分发默认数据
      default: false,
      type: Boolean
    },
    defaulState: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      equipData: [],
      equipid: "",
      equipname: ""
    };
  },
  mounted() {
    this.getJson();
  },
  methods: {
    change(val) {
      for (let i of this.equipData) {
        if (val == i.code) {
          this.equipname = i.name;
          break;
        }
      }
      this.$emit("selectedEquip", this.equipid, this.equipname);
    },
    getJson() {
      this.$ajax({ url: this.url }).then(res => {
        this.equipData = res.data;
        if (this.defaulState) {
          this.equipid = this.equipData[0][this.defaultKey.value];
          this.equipname = this.equipData[0][this.defaultKey.label];
          // 是否选中默认值后分发到父组件

          if (this.emitState) {
            this.$emit("selectedEquip", this.equipid, this.equipname);
          }
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.equSelect {
  position: relative;
}

.equSelect > span {
  position: absolute;
  top: 25%;
  left: 10px;
  z-index: 20;
  display: flex;
  align-items: center;
}

.equSelect > span img {
  margin-right: 10px;
}

.equSelect > span span {
  color: #d4e7ff;
}

.equSelect .el-select {
  width: 100%;
}
// .equSelect .el-select .el-input__inner {
//     padding-left:120px;}
</style>
<style lang="scss">
.equSelect .el-select .el-input__inner {
  padding-left: 90px;
  background: transparent;
  height: 40px !important;
  border-radius: 0;
  border-color: rgb(50, 97, 166);
  color: rgb(0, 235, 251);
  font-size: 16px;
}
</style>
