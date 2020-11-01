<template>
  <div class="time-picker-wrap myDatePicker">
    <label class="pick-label">
      <img src="/img/icon01.png" alt="" style="margin-right:5px" />
      <!-- <span>{{ label }}</span> -->
    </label>
    <!-- <el-date-picker v-model="value" :type="type" placeholder="请选择" @change="timeChange" :format="format" :value-format="valueFormat"> </el-date-picker> -->
    <el-date-picker
      v-model="value"
      :type="type"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      range-separator="至"
      :format="format"
      :value-format="valueFormat"
      @change="timeChange"
    >
    </el-date-picker>
  </div>
</template>
<script>
export default {
  props: {
    defaultVal: {
      default: ""
    },
    defaultTime: {
      default: function() {
        return ["", ""];
      },
      type: Array
    },
    type: {
      default: "date",
      type: String
    },
    // label: {
    //     default: "时间选择"
    // },
    emitState: {
      //是否分发默认数据
      default: false,
      type: Boolean
    },
    format: {
      default: "yyyy-MM-dd HH:mm",
      type: String
    },
    valueFormat: {
      default: "yyyy-MM-dd HH:mm",
      type: String
    }
  },
  data() {
    return {
      value: null
    };
  },
  created() {
    Date.prototype.Format = function(fmt) {
      var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        S: this.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          (this.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
      return fmt;
    };
    // if(this.defaultVal!=''){

    // var formateDate=new Date(this.defaultVal).Format(this.valueFormat);
    //   if(this.emitState){
    //       this.$emit('timeChange',formateDate);
    //   }
    this.value = this.defaultTime;

    // }
  },
  watch: {},
  methods: {
    timeChange(val) {
      this.$emit("timeChange", val);
    }
  }
};
</script>
<style lang="scss">
.el-picker-panel__footer {
  background: #1c3352 !important;
  border-color: #3261a6 !important;
}
.el-date-range-picker__time-header {
  border-color: #3261a6 !important;
}
.el-date-range-picker__content.is-left {
  border-color: #3261a6 !important;
}
.el-date-range-picker .el-button--text {
  color: #fff !important;
}
.el-time-panel {
  background: #1c3352 !important;
  border-color: #3261a6 !important;
  box-shadow: 0 2px 12px 0 rgba(45, 81, 130, 0.7);
}
.el-date-range-picker {
  box-shadow: 0 2px 12px 0 rgba(45, 81, 130, 0.7);
}
.el-time-spinner__item:hover:not(.disabled):not(.active) {
  color: #7486a3 !important;
  background: rgba(49, 90, 151, 0) !important;
}
.el-time-panel__btn.confirm {
  color: #fff !important;
  background: #1c4072 !important;
}
.el-time-panel__btn {
  color: #fff;
}
.el-time-panel__footer {
  border-color: #3261a6 !important;
}
.el-time-spinner__item.active:not(.disabled) {
  color: #3261a6 !important;
}
.myDatePicker .el-date-editor .el-range__icon {
  font-size: 0px !important;
}
.myDatePicker.time-picker-wrap {
  position: relative !important;
  display: flex;
  align-items: center;
  .pick-label {
    position: absolute;
    z-index: 10;
    left: 10px;
  }
  .el-date-picker {
    position: absolute;
    z-index: 999;
  }
  .el-input--prefix .el-input__inner {
    padding-left: 110px;
  }
  .el-input__prefix {
    display: none;
  }
  .el-date-editor .el-input__inner {
    color: #00ebfb;
  }
}
</style>
