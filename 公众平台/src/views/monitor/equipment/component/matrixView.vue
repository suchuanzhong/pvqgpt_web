<template >
  <el-row class="matrixView">
    <el-scrollbar class="full">
      <div class="full">
        <el-col :span="8" class="matrixViewItem" v-for="(child,i) in dataList" :key="i">
          <div>
            <h3 style="cursor:pointer" @click="viewInfo(child,nodedata)">
              <div class="inverter-box">
                <span>{{child.name}}</span>
                <span
                  :style="child.status | currentPowerState"
                  style="display:inline-block;height:18px;font-size:10px;border-radius: 4px;"
                >{{ child.status | filterState}}</span>
              </div>
              <span>
                <img src="/img/enter_icon.png" alt height="20" width="20" />
              </span>
            </h3>
            <div class="power">
              <div>
                <img src="/img/inverter.png" v-if="child.type==1||child.type==2" alt />
                <img src="/img/ZCSNBQ.png" v-else alt />
              </div>
              <div class="item">
                <p>
                  <span>直流功率</span>
                  <span>
                    <i>{{child.zlpwr}}</i>kW
                  </span>
                </p>
                <p>
                  <span>交流功率</span>
                  <span>
                    <i>{{child.jlpwr}}</i>kW
                  </span>
                </p>
                <p>
                  <span>日发电量</span>
                  <span>
                    <i>{{child.fdl}}</i>kW.h
                  </span>
                </p>
                <p style=" border-bottom:none">
                  <span>转换效率</span>
                  <span>
                    <i>{{child.xl}}</i>%
                  </span>
                </p>
              </div>
            </div>
            <div class="in_equState">
              <div
                @click="viewInfo(child,nodedata)"
                class="interEqu"
                :class="{nameLength:(child.type == 1 || child.type == 2)}"
              >{{child.type | filterName}}</div>
              <div>
                <ul>
                  <li
                    v-for="(item,index) in child.zls.slice(0,Math.ceil(child.zls.length/2))"
                    :key="index"
                  >
                    <span :style="item.zt|colorfilter"></span>
                    <span
                      style="color:#666;margin-top:5px;font-size:10px;text-align:center"
                    >{{item.zlnum|idFIleter}}</span>
                  </li>
                </ul>
                <ul>
                  <li
                    v-for="(item,index) in child.zls.slice(Math.ceil(child.zls.length/2))"
                    :key="index"
                  >
                    <span :style="item.zt|colorfilter"></span>
                    <span
                      style="color:#666;margin-top:5px;font-size:10px;text-align:center"
                    >{{item.zlnum|idFIleter}}</span>
                  </li>
                </ul>
              </div>
              <div class="flex-column" style="justify-content:center">
                <ul>
                  <li>
                    <span style="background:url('/img/green.png') center center no-repeat"></span>
                    <span>正常运行</span>
                  </li>
                  <li>
                    <span style="background:url('/img/huise.png') center center no-repeat"></span>
                    <span>通信中断</span>
                  </li>
                  <li>
                    <span style="background:url('/img/hongse.png') center center no-repeat"></span>
                    <span>含零支路</span>
                  </li>
                  <li>
                    <span style="background:url('/img/huangse.png') center center no-repeat"></span>
                    <span>电源偏低</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </el-col>
      </div>
    </el-scrollbar>
  </el-row>
</template>

<script>
export default {
  props: ["dataList", "nodedata"],
  data() {
    return {};
  },
  mounted() {},
  methods: {
    // 根据当前逆变器的状态
    powerState() {},
    viewInfo(row, nodedata) {
      //    向外传递事件，跳转页面
      this.$emit("viewnbqinfo", row, nodedata);
    }
  },
  filters: {
    colorfilter(val) {
      let color;
      switch (val) {
        case "zc":
          color = "background:#00ffb4";
          break; //正常运行
        case "zd":
          color = "background:#bbbbbb";
          break; //通信中断
        case "h0":
          color = "background:#ff4b44";
          break; //含零支路
        // case 3: color = 'background:#ffbf00'; break;//电流偏低/故障运行
      }
      return color;
    },
    idFIleter(val) {
      if (val < 10) {
        return "0" + val;
      } else {
        return val;
      }
    },
    currentPowerState(val) {
      // if (val == "invt_grid") return "color:#00ffb4";
      if (val == "invt_grid") return "color:#fff;border:1px solid #fff";
      else if (val == "invt_standby") return "color:#00deff;border:1px solid #00deff";
      else if (val == "invt_shutdown") return "color:#bbbbbb;border:1px solid #bbb";
      else if (val == "invt_fault") return "color:#ff4b44;border:1px solid #ff4b44";
      else if (val == "invt_comm") return "color:#EDE18B;border:1px solid #EDE18B";
      else return "color:#bbb;border:1px solid #bbb";
    },
    filterState(val) {
      if (val == "invt_grid") return "并网";
      else if (val == "invt_standby") return "待机";
      else if (val == "invt_shutdown") return "关机";
      else if (val == "invt_fault") return "故障";
      else if (val == "invt_comm") return "通讯中断";
      else return "数据中断";
    },
    filterName(val) {
      if (val == 1 || val == 2) return "汇流箱";
      else return "接入支路";
    }
  }
};
</script>
<style lang="scss">
.matrixView .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
<style lang="scss" scoped>
.power .item p {
  font-size: 14px !important;
}
.power .item p > span:first-child {
  margin-top: 4px;
}

.matrixView {
  .in_equState div:first-child.nameLength {
    padding-top: 11px;
  }
}
.inverter-box {
  display: flex;
  & > span:first-of-type {
    display: inline-block;
    padding-right: 8px;
    align-items: baseline;
  }
}
</style>

