<template>
  <div class="construction_process">
    <el-row>
      <el-col
        :offset="index ? 3 : 5"
        :span="8"
        :class="classList[index]"
        v-for="(item, index) in data"
        :key="index"
      >
        <div v-if="!(index % 2)" class="const_msg">{{ item.des }}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col
        :offset="index ? 3 : 5"
        :span="8"
        :class="classList[index]"
        v-for="(item, index) in data"
        :key="index"
      >
        <div v-if="!(index % 2)">
          <p>{{ item.name }}</p>
          <div class="base_icon"></div>
          <span class="year">{{ item.year }}</span>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="5" :span="19" class="split_line">
        <div class="big_blue_icon base_icon">
          <p>光伏领跑建设历程</p>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="10" :span="8" class="f_orange">
        <span class="year">{{ data[1].year }}</span>
        <div class="base_icon"></div>
        <p>{{ data[1].name }}</p>
        <div class="const_msg">{{ data[1].des }}</div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props: ["data"],
  mounted() {},
  data() {
    return {
      classList: ["f_green_t", "f_orange", "f_blue_n"]
    };
  }
};
</script>
<style lang="scss" scoped>
@-webkit-keyframes rotate {
  0% {
    -webkit-transform: rotate(0deg);
  }
  25% {
    -webkit-transform: rotate(90deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
  }
  75% {
    -webkit-transform: rotate(270deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(90deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(270deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.const_msg {
  line-height: 24px;
  font-size: 14px;
  padding: 10px;
  max-height: 118px;
  overflow: auto;
}
.base_icon {
  width: 100px;
  height: 100px;
  position: relative;
  margin: 0 auto 70px;
  &::before {
    display: inline-block;
    content: "";
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    -webkit-animation: rotate 8s linear infinite;
    animation: rotate 8s linear infinite;
  }
  &::after {
    display: inline-block;
    content: "";
    width: 2px;
    height: 80px;
    background: url("/img/index/const_line_blue.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    left: 50%;
    bottom: -80px;
  }
}
.year {
  font-style: italic;
  font-weight: 600;
  position: absolute;
  bottom: -45px;
  left: 50%;
  transform: translate(-50%);
  font-size: 18px;
}

.construction_process {
  padding: 38px 0 0 36px;
  box-sizing: border-box;
  flex: 1;
  .el-col {
    position: relative;
  }
  p {
    text-align: center;
    font-style: italic;
    font-size: 16px;
    margin: 10px 0 20px;
  }

  .f_green_t {
    .const_msg {
      color: rgba(#8dd5b5, 1);
      border: solid 1px rgba(#8dd5b5, 0.5);
      background-color: rgba(#8dd5b5, 0.05);
    }
    .base_icon {
      background: url("/img/index/const_bg_green.png") no-repeat center;
      &::before {
        background: url("/img/index/const_circle_green.png") no-repeat;
      }
      &::after {
        background: url("/img/index/const_line_green.png") no-repeat;
      }
    }
  }
  .f_blue_n {
    .const_msg {
      color: rgba(#00baff, 1);
      border: solid 1px rgba(#00baff, 0.5);
      background-color: rgba(#00baff, 0.05);
    }
    .base_icon {
      background: url("/img/index/const_bg_blue.png") no-repeat center;
      &::before {
        background: url("/img/index/const_circle_blue.png") no-repeat;
      }
    }
  }
  .f_orange {
    .year {
      top: -45px;
    }
    .const_msg {
      color: rgba(#ff7e00, 1);
      border: solid 1px rgba(#ff7e00, 0.5);
      background-color: rgba(#ff7e00, 0.05);
    }
    .base_icon {
      margin: 70px auto 0;
      background: url("/img/index/const_bg_orange.png") no-repeat center;
      &::before {
        background: url("/img/index/const_circle_orange.png") no-repeat;
      }
      &::after {
        top: -80px;
        background: url("/img/index/const_line_orange.png") no-repeat;
      }
    }
  }
  .split_line {
    height: 20px;
    background: url("/img/index/const_line.png") no-repeat;
    background-size: 100% 100%;
    position: relative;
    .big_blue_icon {
      width: 150px;
      height: 150px;
      background: url("/img/index/const_bg_blue_big.png") no-repeat center;
      position: absolute;
      top: -70px;
      left: -150px;

      &::before {
        background: url("/img/index/const_circle_blue_big.png") no-repeat;
      }
      &::after {
        display: none;
      }
      p {
        color: #00baff;
        font-size: 18px;
      }
    }
  }
}
</style>
