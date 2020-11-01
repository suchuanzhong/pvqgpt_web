<template>
  <transition name="el-zoom-in-center">
    <div class="systemMonitor2 comMsg" style=" width:100%;height:100%;position: relative">
      <canvas id="flowarrow" style="position:absolute"></canvas>
      <el-row>
        <el-row class="top">
          <el-col :span="12" style="width: 825px;height: 200px;">
            <table style="width:420px;height: 200px;margin-left: 405px;margin-top:-10px;">
              <tr class="firstTr">
                <th colspan="2">
                  <span class="title">逆变器信息</span>
                  <!-- <span class="titleSpell">GRID-CONNECTED INVERTER INFORMATION</span> -->
                </th>
              </tr>
              <tr class="secondTr">
                <td colspan="2">
                  <span class="szTitle">逆变器数量</span>
                  <span class="sz">
                    <span class="num allnum">{{dataNBQ2.total}}&nbsp;</span>台
                  </span>
                </td>
              </tr>
              <tr class="thirdTr">
                <td style="border-right:1px solid #8dd5b5;">
                  <span class="jtszTitle">并网</span>
                  <span class="jtsz">
                    <span class="num">{{dataNBQ2.bwnum}}&nbsp;</span>台
                  </span>
                </td>
                <td>
                  <span class="jtszTitle">正常待机</span>
                  <span class="jtsz">
                    <span class="num">{{dataNBQ2.standbynum}}&nbsp;</span>台
                  </span>
                </td>
              </tr>
              <tr class="fourthTr">
                <td style="border-right:1px solid #8dd5b5;">
                  <span class="jtszTitle">关机</span>
                  <span class="jtsz">
                    <span class="num">{{dataNBQ2.shutdownnum}}&nbsp;</span>台
                  </span>
                </td>
                <td>
                  <span class="jtszTitle">故障</span>
                  <span class="jtsz">
                    <span class="num">{{dataNBQ2.faultnum}}&nbsp;</span>台
                  </span>
                </td>
              </tr>
              <tr class="lastRowTr">
                <td style="border-right:1px solid #8dd5b5;">
                  <span class="jtszTitle">通讯中断</span>
                  <span class="jtsz">
                    <span class="num">{{dataNBQ2.commnum}}&nbsp;</span>台
                  </span>
                </td>
                <td>
                  <span class="jtszTitle">数据中断</span>
                  <span class="jtsz">
                    <span class="num">{{dataInterrupt2}}&nbsp;</span>台
                  </span>
                </td>
              </tr>
              <!-- <tr>
                <td style="border-right:1px solid #8dd5b5;">
                  <span class="jtszTitle">通讯中断</span>
                  <span class="jtsz"><span :endVal="dataNBQ.commnum" class="num">&nbsp;</span>台</span>
                </td>
              </tr>-->
            </table>
          </el-col>
          <el-col
            :span="12"
            style="width: calc(100% - 825px);height: 200px;margin-left:-50px;margin-top:21px"
          >
            <table style="width:540px;height: 200px;margin-left: 220px;margin-top: -22px;">
              <tr class="firstTr">
                <th colspan="2">
                  <span class="title">开关站/升压站信息</span>
                  <!-- <span class="titleSpell">SWITCH/BOOSTER STATION INFORMATION</span> -->
                </th>
              </tr>
              <tr class="secondTr">
                <td style="border-right:1px solid #8dd5b5;">
                  <span class="jtszTitle" style="float:left;margin-top: 4px;">正向有功电量</span>
                  <span class="jtsz" style="float:right;width: 150px;">
                    <span class="num">{{dataKGZ.firstpactelec}}&nbsp;</span>万kW.h
                  </span>
                </td>
                <td>
                  <span class="jtszTitle" style="float:left;margin-top: 4px;">反向有功电量</span>
                  <span class="jtsz" style="float:right;width: 150px;">
                    <span class="num">{{dataKGZ.firstractelec}}&nbsp;</span>万kW.h
                  </span>
                </td>
              </tr>
              <tr class="thirdTr">
                <td style="border-right:1px solid #8dd5b5;">
                  <span class="jtszTitle" style="float:left;margin-top: 4px;">正向无功电量</span>
                  <span class="jtsz" style="float:right;width: 150px;">
                    <span class="num">{{dataKGZ.firstpreactelec}}&nbsp;</span>万kvarh
                  </span>
                </td>
                <td>
                  <span class="jtszTitle" style="float:left;margin-top: 4px;">反向无功电量</span>
                  <span class="jtsz" style="float:right;width: 150px;">
                    <span class="num">{{dataKGZ.firstrreactelec}}&nbsp;</span>万kvarh
                  </span>
                </td>
              </tr>
              <tr class="fourthTr">
                <td style="border-right:1px solid #8dd5b5;"></td>
                <td></td>
              </tr>
            </table>
          </el-col>
        </el-row>
        <el-row class="center">
          <el-row class="first">
            <el-row class="second">
              <div class="line" style="width:1190px">
                <canvas id="top" width="580" height="10" style="position: absolute;"></canvas>
              </div>
            </el-row>
            <el-row class="third">
              <el-col :span="7" class="centerFirst_span">
                <img class="centerFirst_img" :src="zjURL" />
              </el-col>
              <el-col :span="5" class="centerFirst_span" style="margin-left:120px;">
                <img class="centerFirst_img" :src="nbqURL" />
              </el-col>
              <el-col :span="5" class="centerFirst_span" style="margin-left: 160px;">
                <img class="centerFirst_img" :src="xbURL" />
              </el-col>
              <el-col
                :span="7"
                class="centerFirst_span"
                style="width:calc(100% - 1250px);margin-left:-80px"
              >
                <img class="centerFirst_img" :src="kgzURL" />
              </el-col>
            </el-row>
            <el-row class="fourth">
              <div class="circle">
                <el-col :span="12" style="height;width:425px;">
                  <div style="height:120px;width:120px;text-align: center;margin-left: 300px;">
                    <span class="circleTitle circleNum">
                      <span>{{dealPower(dataNBQ2.dcpwr)}}</span>万kW
                    </span>
                    <span class="circleImg0"></span>
                    <span class="circleTitle">直流有功</span>
                  </div>
                </el-col>
                <el-col :span="12" style="height;width:calc(100% - 425px);">
                  <div style="height:120px;width:120px;text-align: center;margin-left: 360px;">
                    <span class="circleTitle circleNum">
                      <span>{{dealPower(dataNBQ2.acpwr)}}</span>万kW
                    </span>
                    <span class="circleImg1"></span>
                    <span class="circleTitle">交流有功</span>
                  </div>
                </el-col>
              </div>
            </el-row>
            <el-row class="fifth">
              <el-row class="fifth_top">
                <el-col :span="5" class="zj_2">
                  <span style="display: inline-block;margin-top: 70px">组件</span>
                </el-col>

                <el-col :span="7" class="nbq_2" style="margin-top: -7px">
                  <span>
                    <img :src="xbLineURL"  />
                  </span>
                </el-col>
                <el-col :span="7" class="xb_2">
                  <span style="display: inline-block;margin-top: 70px;">箱变</span>
                </el-col>
                <el-col :span="5" class="kgz_2">
                  <span style="display: inline-block;margin-left: 32px;margin-top:2px;">
                    <img :src="xbLineURL"  />
                  </span>
                </el-col>
              </el-row>
              <el-row class="fifth_center"></el-row>
              <el-row class="fifth_bottom">
                <el-col :span="5" class="zj_2">
                  <span style="display: inline-block">
                    <img :src="xbLineURL" style="transform: rotate(180deg);"/>
                  </span>
                </el-col>

                <el-col :span="7" class="nbq_2">
                  <span style="display: inline-block;">逆变器</span>
                </el-col>
                <el-col :span="7" class="xb_2">
                  <span style="display: inline-block;">
                    <img :src="xbLineURL" style="transform: rotate(180deg);"/>
                  </span>
                </el-col>
                <el-col :span="5" class="kgz_2">
                  <span style="display: inline-block;margin-left:-30px;">开关站/升压站</span>
                </el-col>
              </el-row>
            </el-row>
          </el-row>
        </el-row>
        <el-row class="bottom">
          <el-col :span="12" style="width: 825px;height: 200px;">
            <table style="width:580px;height: 100px;border-bottom: 0px;">
              <tr class="firstTr">
                <th colspan="2">
                  <span class="title">组件信息</span>
                  <!-- <span class="titleSpell">PV MODULE INFORMATION</span> -->
                </th>
              </tr>
              <tr class="colorTr">
                <td colspan="2">
                  <span class="szTitle">组件数量</span>
                  <span class="sz">
                    <span class="num allnum">{{dataZJ.pvnum}}&nbsp;</span>块
                  </span>
                </td>
              </tr>
            </table>
            <div
              class="zjTable"
              style="width:580px;max-height: 100px;overflow-y: auto;overflow-x: hidden"
            >
              <table style="width:580px;border-top: 0px;overflow-y: scroll;border-bottom:0px;">
                <tr v-for="(item,index) in dataZJ.pvstring" class="colorTr" :key="index">
                  <td style="border-right:1px solid #8dd5b5;" v-if="item.col1">
                    <span class="jtszTitle_zj">
                      {{item.col1.factor}}({{item.col1.batterytype}})
                      <br />
                      <span class="jtszTitle_zjcode">{{item.col1.model }}</span>
                    </span>
                    <span class="jtsz_zj">
                      <span class="num">{{item.col1.num}}&nbsp;</span>块
                    </span>
                  </td>
                  <td style="border-right:1px solid #8dd5b5;" v-if="item.col2">
                    <span class="jtszTitle_zj">
                      {{item.col2.factor}}({{item.col2.batterytype}})
                      <br />
                      <span class="jtszTitle_zjcode">{{item.col2.model }}</span>
                    </span>
                    <span class="jtsz_zj">
                      <span class="num">{{item.col2.num}}&nbsp;</span>块
                    </span>
                  </td>
                </tr>
              </table>
            </div>
          </el-col>
          <el-col :span="12" style="width: calc(100% - 825px);height: 200px;">
            <table style="width:420px;height: 200px;">
              <tr class="firstTr">
                <th colspan="2">
                  <span class="title">箱变信息</span>
                  <!-- <span class="titleSpell">BOX TRANSFORMER INFORMATION</span> -->
                </th>
              </tr>
              <tr class="secondTr">
                <td colspan="2">
                  <!-- <a class="szTitle" :href='suburl'>方阵数量</a> -->
                  <router-link class="szTitle" :to="{ name: '方阵数量', query:{pro1:valuepc,pro2:valuejd,pro3:valuedz} }">方阵数量</router-link>
                  <span class="sz">
                    <span class="num allnum">{{dataXB.totalnum}}&nbsp;</span>个
                  </span>
                </td>
              </tr>
              <tr class="thirdTr">
                <td style="border-right:1px solid #8dd5b5;">
                  <span class="jtszTitle">箱变数量</span>
                  <span class="jtsz">
                    <span class="num">{{dataXB.totalnum}}&nbsp;</span>台
                  </span>
                </td>
                <td>
                  <span class="jtszTitle">正常运行</span>
                  <span class="jtsz">
                    <span class="num">{{dataXB.normalnum}}&nbsp;</span>台
                  </span>
                </td>
              </tr>
              <tr class="fourthTr">
                <td style="border-right:1px solid #8dd5b5;">
                  <span class="jtszTitle">通讯中断</span>
                  <span class="jtsz">
                    <span class="num">{{dataXB.neterrornum}}&nbsp;</span>台
                  </span>
                </td>
                <td>
                  <span class="jtszTitle">故障运行</span>
                  <span class="jtsz">
                    <span class="num">{{dataXB.failnum}}&nbsp;</span>台
                  </span>
                </td>
              </tr>
            </table>
          </el-col>
        </el-row>
      </el-row>
    </div>
  </transition>
</template>

<script>
import { CreateFlowline } from "@/utils/flowArrowWithPath";
export default {
  props: ["valuepc","valuejd","valuedz", "dataXB", "dataKGZ", "dataNBQ2", "dataZJ"],
  components: {
    // CreateFlowline
  },
  data() {
    return {
      zjURL: "/images/组件图标.png",
      nbqURL: "/images/ZCSNBQ.png",
      xbURL: "/images/箱变图标.png",
      kgzURL: "/images/开关站图标.png",

      hlxLineURL: "/images/线条2.png",
      xbLineURL: "/images/线条1.png",
      suburl: "../equipmentMonitor/index.html"
    };
  },
  mounted() {
    this.CreateFlowline();
  },
  methods: {
    CreateFlowline() {
      var path = "M175,375l1100,0";
      var res = new CreateFlowline(path, "flowarrow", {
        canvas_w: "1200",
        canvas_h: "500",
        color: "#ff8800", //颜色
        time: 200,
        jiange: 22,
        changdu: 8
      });
      res.begin();
    },
    dealPower(val) {
      return (val / 10000).toFixed(2);
    }
  },
  computed: {
    errornum2() {
      return this.dataNBQ2.commnum + this.dataNBQ2.faultnum;
    },
    dataInterrupt2() {
      return (
        this.dataNBQ2.total -
        (this.dataNBQ2.bwnum +
          this.dataNBQ2.commnum +
          this.dataNBQ2.faultnum +
          this.dataNBQ2.shutdownnum +
          this.dataNBQ2.standbynum)
      );
    }
  }
};
</script>
<style lang="scss">
// .comMsg {
//   .zjTable {
//     border-bottom: 2px solid #5d9dc6;
//     border-right: 2px solid #5d9dc6;
//   }
// }
</style>
