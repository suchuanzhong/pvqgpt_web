<template>
  <transition name="el-zoom-in-center">
    <div class="systemMonitor1" style=" width:100%;height:100%;position: relative;overflow-y:auto">
      <canvas id="flowarrow" style="position:absolute"></canvas>
      <el-row class="full">
        <el-row class="top">
          <el-col :span="6" style="width: 420px;height: 200px;margin-right: 40px;">
            <table>
              <tr class="firstTr">
                <th colspan="2">
                  <span class="title">支路电流</span>
                  <!-- <span class="titleSpell">BRANCH CURRENT</span> -->
                </th>
              </tr>
              <tr class="secondTr">
                <td colspan="2">
                  <span class="szTitle">支路总数</span>
                  <span class="sz">
                    <span class="num allnum">{{dataHLX.totalzlnum}}&nbsp;</span>条
                  </span>
                </td>
              </tr>
              <tr class="thirdTr">
                <td style="border-right:1px solid #8dd5b5;">
                  <span class="jtszTitle">正常支路</span>
                  <span class="jtsz">
                    <span class="num">{{dataHLX.zczlnum}}&nbsp;</span>条
                  </span>
                </td>
                <td>
                  <span class="jtszTitle">电流偏低支路</span>
                  <span class="jtsz">
                    <span class="num">{{dataHLX.lowzlnum}}&nbsp;</span>条
                  </span>
                </td>
              </tr>
              <tr class="fourthTr">
                <td style="border-right:1px solid #8dd5b5;">
                  <span class="jtszTitle">电流为零支路</span>
                  <span class="jtsz">
                    <span class="num">{{dataHLX.ozlnum}}&nbsp;</span>条
                  </span>
                </td>
                <td></td>
              </tr>
            </table>
          </el-col>
          <el-col :span="7" style="width: 420px;height: 200px;margin-right: 80px;">
            <table>
              <tr class="firstTr">
                <th colspan="2">
                  <span class="title">汇流箱信息</span>
                  <!-- <span class="titleSpell">COMBINING MANIFOLDS INFORMATION</span> -->
                </th>
              </tr>
              <tr class="secondTr">
                <td colspan="2">
                  <span class="szTitle">汇流箱数量</span>
                  <span class="sz">
                    <span class="num allnum">{{dataHLX.totalnum}}&nbsp;</span>台
                  </span>
                </td>
              </tr>
              <tr class="thirdTr">
                <td style="border-right:1px solid #8dd5b5;">
                  <span class="jtszTitle">正常运行</span>
                  <span class="jtsz">
                    <span class="num">{{dataHLX.zcnum}}&nbsp;</span>台
                  </span>
                </td>
                <td>
                  <span class="jtszTitle">故障</span>
                  <span class="jtsz">
                    <span class="num">{{dataHLX.faultnum}}&nbsp;</span>台
                  </span>
                </td>
              </tr>
              <tr class="fourthTr">
                <td style="border-right:1px solid #8dd5b5;">
                  <span class="jtszTitle">待机</span>
                  <span class="jtsz">
                    <span class="num">{{dataHLX.standbynum}}&nbsp;</span>台
                  </span>
                </td>
                <td>
                  <span class="jtszTitle">停机</span>
                  <span class="jtsz">
                    <span class="num">{{dataHLX.shutdownnum}}&nbsp;</span>台
                  </span>
                </td>
                <!-- <td>
                  <span class="jtszTitle">含零支路</span>
                  <span class="jtsz"><span :endVal="dataHLX.onum" class="num">&nbsp;</span>台</span>
                </td>-->
              </tr>
            </table>
          </el-col>
          <el-col :span="11" style="width: calc(100% - 960px);height: 200px;">
            <table style="width:420px;height: 200px;">
              <tr class="firstTr">
                <th colspan="2">
                  <span class="title">箱变信息</span>
                  <!-- <span class="titleSpell">BOX TRANSFORMER INFORMATION</span> -->
                </th>
              </tr>
              <tr class="secondTr">
                <td colspan="2">
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

        <el-row class="center">
          <el-row class="first">
            <el-row class="second">
              <div class="line"></div>
            </el-row>
            <el-row class="third">
              <el-col :span="6" class="centerFirst_span">
                <img class="centerFirst_img" :src="zjURL" style="margin-top:10px" />
              </el-col>
              <el-col :span="4" class="centerFirst_span">
                <img class="centerFirst_img" :src="hlxURL" style="margin-top:30px;" />
              </el-col>
              <el-col :span="4" class="centerFirst_span">
                <img class="centerFirst_img" :src="nbqURL" style="margin-top:30px;margin-left:20px" />
              </el-col>
              <el-col :span="4" class="centerFirst_span">
                <img class="centerFirst_img" :src="xbURL" style="margin-top:30px;" />
              </el-col>
              <el-col :span="6" class="centerFirst_span" style="width:calc(100% - 1300px)">
                <img
                  class="centerFirst_img"
                  :src="kgzURL"
                  style="margin-top: 50px;margin-left:-20px"
                />
              </el-col>
            </el-row>
            <el-row class="fourth">
              <div class="circle">
                <el-col :span="12" style="height;width:925px;">
                  <div style="height:120px;width:120px;text-align: center;margin-left: 580px;">
                    <span class="circleTitle circleNum">
                      <span>{{dealPower(dataNBQ1.dcpwr)}}</span>万kW
                    </span>
                    <span class="circleImg0"></span>
                    <span class="circleTitle">直流有功</span>
                  </div>
                </el-col>
                <el-col :span="12" style="height;width:calc(100% - 925px);">
                  <div style="height:120px;width:120px;text-align: center;margin-right: 580px;">
                    <span class="circleTitle circleNum">
                      <span>{{dealPower(dataNBQ1.acpwr)}}</span>万kW
                    </span>
                    <span class="circleImg1"></span>
                    <span class="circleTitle">交流有功</span>
                  </div>
                </el-col>
              </div>
            </el-row>
            <el-row class="fifth">
              <el-row class="fifth_top">
                <el-col :span="4" class="zj">
                  <span style="display: inline-block;margin-top: 70px;margin-left: 50px;">组件</span>
                </el-col>
                <el-col :span="6" class="hlx">
                  <span>
                    <img :src="hlxLineURL" style="margin-top:3px"/>
                  </span>
                </el-col>
                <el-col :span="6" class="nbq">
                  <span style="display: inline-block;margin-top: 70px;">逆变器</span>
                </el-col>
                <el-col :span="4" class="xb">
                  <span>
                    <img :src="xbLineURL"  style="margin-top:3px;margin-right:80px;"/>
                  </span>
                </el-col>
                <el-col :span="4" class="kgz">
                  <span style="display: inline-block;margin-top: 70px;margin-left: 60px;">开关站/升压站</span>
                </el-col>
              </el-row>
              <el-row class="fifth_center"></el-row>
              <el-row class="fifth_bottom">
                <el-col :span="4" class="zj">
                  <span style="display: inline-block;">
                    <img :src="xbLineURL" style="transform: rotate(180deg);"/>
                  </span>
                </el-col>
                <el-col :span="6" class="hlx">
                  <span style="display: inline-block;margin-left: 75px;margin-top:10px;">汇流箱</span>
                </el-col>
                <el-col :span="6" class="nbq">
                  <img :src="xbLineURL" style="transform: rotate(180deg);"/>
                </el-col>
                <el-col :span="4" class="xb">
                  <span style="margin-top:10px;display:inline-block;">箱变</span>
                </el-col>
                <el-col :span="4" class="kgz">
                  <span style="display: inline-block;margin-left: 110px;">
                    <img :src="xbLineURL" style="transform: rotate(180deg);"/>
                  </span>
                </el-col>
              </el-row>
            </el-row>
          </el-row>
        </el-row>

        <el-row class="bottom">
          <el-col :span="9" style="width: 580px;height: 200px;margin-right: 40px;">
            <table style="height: 100px;border-bottom: 0px;">
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
              style="max-height: 100px;overflow-y: auto;overflow-x: hidden;width:580px"
            >
              <table style="border-top: 0px;border-bottom: 0px;">
                <tr v-for="(item, index) in dataZJ.pvstring" class="colorTr" :key="index">
                  <td style="border-right:1px solid #8dd5b5;" v-if="item.col1">
                    <div>
                      <span class="jtszTitle_zj">
                        {{ item.col1.factor }}({{ item.col1.batterytype }})
                        <br />
                        <span class="jtszTitle_zjcode">{{ item.col1.model }}</span>
                      </span>
                      <span class="jtsz_zj">
                        <span class="num ">{{item.col1.num}}&nbsp;</span>块
                      </span>
                    </div>
                  </td>
                  <td style="border-right:1px solid #8dd5b5;" v-if="item.col2">
                    <div>
                      <span class="jtszTitle_zj">
                        {{ item.col2.factor }}({{ item.col2.batterytype }})
                        <br />
                        <span class="jtszTitle_zjcode">{{ item.col2.model }}</span>
                      </span>
                      <span class="jtsz_zj">
                        <span class="num">{{item.col2.num}}&nbsp;</span>块
                      </span>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </el-col>
          <el-col :span="7" style="width: 320px;height: 200px;margin-right: 110px;">
            <table>
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
                    <span class="num allnum">{{dataNBQ1.total}}&nbsp;</span>台
                  </span>
                </td>
              </tr>
              <tr class="thirdTr">
                <td style="border-right:1px solid #8dd5b5;">
                  <span class="jtszTitle">并网</span>
                  <span class="jtsz" style="width:48px">
                    <span class="num">{{dataNBQ1.bwnum}}&nbsp;</span>台
                  </span>
                </td>
                <td>
                  <span class="jtszTitle">正常待机</span>
                  <span class="jtsz" style="width:48px">
                    <span class="num">{{dataNBQ1.standbynum}}&nbsp;</span>条
                  </span>
                </td>
              </tr>
              <tr class="fourthTr">
                <td style="border-right:1px solid #8dd5b5;">
                  <span class="jtszTitle">关机</span>
                  <span class="jtsz" style="width:48px">
                    <span class="num">{{dataNBQ1.shutdownnum}}&nbsp;</span>台
                  </span>
                </td>
                <td>
                  <span class="jtszTitle">故障</span>
                  <span class="jtsz" style="width:48px">
                    <span class="num">{{errornum1}}&nbsp;</span>台
                  </span>
                </td>
              </tr>
              <tr class="lastRowTr">
                <td style="border-right:1px solid #8dd5b5;">
                  <span class="jtszTitle">通讯中断</span>
                  <span class="jtsz" style="width:48px">
                    <span class="num">{{dataNBQ1.commnum}}&nbsp;</span>台
                  </span>
                </td>
                <td>
                  <span class="jtszTitle">数据中断</span>
                  <span class="jtsz" style="width:48px">
                    <span class="num">{{dataInterrupt1}}&nbsp;</span>台
                  </span>
                </td>
              </tr>
              <!-- <tr>
                <td style="border-right:1px solid #2e709a;">
                  <span class="jtszTitle">通讯中断</span>
                  <span class="jtsz" style="width:48px"><span :endVal="dataNBQ1.commnum" class="num">&nbsp;</span>台</span>
                </td>
              </tr>-->
            </table>
          </el-col>
          <el-col :span="8" style=" margin-left: -62px">
            <table style="width:540px;height: 200px;">
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
      </el-row>
    </div>
  </transition>
</template>

<script>
// import Vue from "vue";
import { CreateFlowline } from "@/utils/flowArrowWithPath";
export default {
  props: ["valuepc","valuejd","valuedz", "dataXB", "dataKGZ", "dataNBQ1", "dataHLX", "dataZJ"],
  components: {
    // CreateFlowline
  },
  data() {
    return {
      zjURL: "/images/组件图标.png",
      hlxURL: "/images/汇流箱图标.png",
      nbqURL: "/images/逆变器图标.png",
      xbURL: "/images/箱变图标.png",
      kgzURL: "/images/开关站图标.png",
      suburl: "../equipmentMonitor/index.html",
      hlxLineURL: "/images/线条2.png",
      xbLineURL: "/images/线条1.png"
    };
  },
  mounted() {
    this.CreateFlowline();
  },
  methods: {
    CreateFlowline() {
      var path = "M175,375l1275,0";
      var res = new CreateFlowline(path, "flowarrow", {
        canvas_w: "1400",
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
    errornum1() {
      return this.dataNBQ1.commnum + this.dataNBQ1.faultnum;
    },
    dataInterrupt1() {
      return (
        this.dataNBQ1.total -
        (this.dataNBQ1.bwnum +
          this.dataNBQ1.commnum +
          this.dataNBQ1.faultnum +
          this.dataNBQ1.shutdownnum +
          this.dataNBQ1.standbynum)
      );
    }
  }
};
</script>

<style lang="css">
</style>
