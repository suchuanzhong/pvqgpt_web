<template>
  <transition name="el-zoom-in-center">
    <el-row class="systemMonitor3" style="width:100%;height:100%;min-width: 960px">
      <el-scrollbar class="full" id="moScroller">
        <el-row class="first">
          <el-row class="second">
            <el-row class="row1">
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
                  </tr>
                </table>
              </el-col>
              <el-col :span="11" style="width: calc(100% - 960px);height: 200px;">
                <table style="width:420px;height: 200px;margin-top:-8px;">
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
                      <span class="jtsz">
                        <span class="num">{{dataNBQ1.bwnum}}&nbsp;</span>台
                      </span>
                    </td>
                    <td>
                      <span class="jtszTitle">正常待机</span>
                      <span class="jtsz">
                        <span class="num">{{dataNBQ1.standbynum}}&nbsp;</span>台
                      </span>
                    </td>
                  </tr>
                  <tr class="fourthTr">
                    <td style="border-right:1px solid #8dd5b5;">
                      <span class="jtszTitle">关机</span>
                      <span class="jtsz">
                        <span class="num">{{dataNBQ1.shutdownnum}}&nbsp;</span>台
                      </span>
                    </td>
                    <td>
                      <span class="jtszTitle">故障</span>
                      <span class="jtsz">
                        <span class="num">{{errornum1}}&nbsp;</span>台
                      </span>
                    </td>
                  </tr>
                  <tr class="lastRowTr">
                    <td style="border-right:1px solid #8dd5b5;">
                      <span class="jtszTitle">通讯中断</span>
                      <span class="jtsz">
                        <span class="num">{{dataNBQ1.commnum}}&nbsp;</span>台
                      </span>
                    </td>
                    <td>
                      <span class="jtszTitle">数据中断</span>
                      <span class="jtsz">
                        <span class="num">{{dataInterrupt1}}&nbsp;</span>台
                      </span>
                    </td>
                  </tr>
                </table>
              </el-col>
            </el-row>
            <el-row class="row2">
              <el-col :span="4" style="width:315px;height:100%">
                <span
                  class="line_right"
                  style="margin-top: 265px;margin-left: 170px;width: calc(100% - 170px);"
                >
                  <canvas id="right1" width="580" height="10" style="position: absolute;"></canvas>
                </span>
              </el-col>
              <el-col :span="18" style="width:1110px;height:100%">
                <el-row
                  style="width:100%;height: calc(100% - 265px);margin-top: 163px;margin-bottom: 102px;"
                >
                  <el-col :span="1" style="width:10px;height:100%">
                    <span class="line_top">
                      <canvas id="top1" class="top1 rotate270" height="10"></canvas>
                    </span>
                    <span class="line_bottom1">
                      <canvas id="bottom1" class="bottom1 rotate90" height="10"></canvas>
                    </span>
                  </el-col>
                  <el-col :span="22" style="width:1090px;height:100%">
                    <el-row style="width:100%;height:10px;">
                      <span class="line_right" style="margin-bottom:10px">
                        <canvas id="right2" height="10" style="position: absolute;"></canvas>
                      </span>
                    </el-row>
                    <el-row style="width:100%;height:calc(100% - 10px);">
                      <span class="line_right" style="margin-top: 195px;">
                        <canvas id="right3" height="10" style="position: absolute;"></canvas>
                      </span>
                    </el-row>
                  </el-col>
                  <el-col :span="1" style="width:10px;height:100%">
                    <span
                      class="line_bottom1"
                      style="border-bottom-left-radius: 0px;border-top-right-radius: 5px;"
                    >
                      <canvas id="bottom2" class="bottom2 rotate90" height="10"></canvas>
                    </span>
                    <span
                      class="line_top"
                      style="border-top-left-radius: 0px;border-bottom-right-radius: 5px;"
                    >
                      <canvas id="top2" class="top2 rotate270" height="10"></canvas>
                    </span>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="1" style="width:100px;height:100%">
                <span
                  class="line_right"
                  style="margin-top: 265px;width: 32px;position: absolute;right: 83px;top: 0;"
                ></span>
              </el-col>
              <el-col :span="1" style="width:calc(100% - 1498px);height:100%;">
                <span class="line_bottom" style="border-top-right-radius: 5px;top:265px;right:73px"></span>
              </el-col>
            </el-row>
            <el-row class="row3">
              <el-col :span="8" style="width: 500px;height: 250px;margin-right: 180px;"></el-col>
              <el-col :span="8" style="width: 420px;height: 200px;">
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
                        <span class="num">{{errornum2}}&nbsp;</span>台
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
                </table>
              </el-col>
              <el-col :span="8" style="height:100%;width:calc(100% - 1498px);">
                <span class="line_bottom" style="right:73px"></span>
              </el-col>
            </el-row>
            <el-row class="row4">
              <el-col :span="23" style="height:100%;width:1450px;">
                <span
                  class="line_left"
                  style="margin-top:167px;margin-left: 600px;width: calc(100% - 593px);"
                >
                  <canvas
                    id="left1"
                    class="left1 rotate180"
                    height="10"
                    style="position: absolute;"
                  ></canvas>
                </span>
              </el-col>
              <el-col :span="1" style="height:100%;width:calc(100% - 1450px);">
                <span
                  class="line_bottom"
                  style="height:177px;border-bottom-right-radius: 5px;right:73px"
                >
                  <canvas id="bottom5" class="bottom5 rotate90" height="10"></canvas>
                </span>
              </el-col>
            </el-row>
          </el-row>

          <el-row class="third">
            <el-row class="row1"></el-row>
            <el-row class="row2">
              <el-col :span="6" class="zjIMG">
                <img class="centerFirst_img zjImgPosition" :src="zjURL" />
              </el-col>
              <el-col :span="6" class="hlxIMG">
                <img class="centerFirst_img hlxImgPosition" :src="hlxURL" style="margin-top:-5px" />
              </el-col>
              <el-col :span="6" class="nbqIMG1">
                <img
                  class="centerFirst_img nbqImgPosition1"
                  :src="nbqURL2"
                  style="margin-top:210px;margin-left:10px"
                />
              </el-col>
              <el-col :span="6" style="height:100%;width:calc(100% - 1270px)">
                <span class="nbqIMG2" style="margin-top:-10px">
                  <img class="centerFirst_img nbqImgPosition2" :src="nbqURL" />
                </span>
              </el-col>
            </el-row>
            <el-row class="row3"></el-row>
            <el-row class="row4">
              <el-col :span="12" style="width:850px;height:100%">
                <img class="centerFirst_img kgzImgPosition" :src="kgzURL" />
              </el-col>
              <el-col :span="12" style="width:calc(100% - 850px);height:100%">
                <img class="centerFirst_img xbImgPosition" :src="xbURL" />
              </el-col>
            </el-row>
            <el-row class="row5"></el-row>
          </el-row>

          <el-row class="fourth">
            <el-row class="row1"></el-row>
            <el-row class="row2">
              <el-col :span="6" style="height:100%;width:620px;">
                <div
                  style="height:120px;width:120px;text-align: center;margin-left: 500px;margin-top: 310px;"
                >
                  <span class="circleTitle circleNum">
                    <span>{{dealPower(dataNBQ2.dcpwr)}}</span>万kW
                  </span>
                  <span class="circleImg0"></span>
                  <span class="circleTitle">直流有功</span>
                </div>
              </el-col>
              <el-col :span="6" style="height:100%;width:450px;">
                <div
                  style="height:120px;width:120px;text-align: center;margin:110px 0px 0px 110px;"
                >
                  <span class="circleTitle circleNum">
                    <span>{{dealPower(dataNBQ1.dcpwr)}}</span>万kW
                  </span>
                  <span class="circleImg0"></span>
                  <span class="circleTitle">直流有功</span>
                </div>
              </el-col>
              <el-col :span="6" style="height:100%;width:195px;">
                <div style="height:120px;width:120px;text-align: center;margin-top: 310px;">
                  <span class="circleTitle circleNum">
                    <span>{{dealPower(dataNBQ2.acpwr)}}</span>万kW
                  </span>
                  <span class="circleImg1"></span>
                  <span class="circleTitle">交流有功</span>
                </div>
              </el-col>
              <el-col :span="6" style="height:100%;width:calc(100% - 1265px);">
                <div style="height:120px;width:120px;text-align: center;margin-top: 110px;">
                  <span class="circleTitle circleNum">
                    <span>{{dealPower(dataNBQ1.acpwr)}}</span>万kW
                  </span>
                  <span class="circleImg1"></span>
                  <span class="circleTitle">交流有功</span>
                </div>
              </el-col>
            </el-row>
            <el-row class="row3"></el-row>
            <el-row class="row4"></el-row>
            <el-row class="row3"></el-row>
          </el-row>

          <el-row class="fifth">
            <el-row class="row1"></el-row>
            <el-row class="row2">
              <el-col
                :span="6"
                style="height:100%;width:310px;text-align: center;position:relative"
              >
                <span class="zj_systemMonitor3" style="position:absolute;top:165px">组件</span>
                <span class="zjLine_systemMonitor3" style="margin-top:365px;">
                  <img :src="zjLineURL" />
                </span>
              </el-col>
              <el-col :span="6" style="height:100%;width:466px;text-align: center;">
                <span class="hlxLine_systemMonitor3">
                  <img :src="hlxLineURL" />
                </span>
                <span class="hlx_systemMonitor3">汇流箱</span>
              </el-col>
              <el-col
                :span="6"
                style="height:100%;width:300px;text-align: center;position:relative"
              >
                <span
                  class="nbq1_systemMonitor3"
                  style="position:absolute;top:285px;left:-117px"
                >逆变器</span>
                <span class="nbqLine1_systemMonitor3" style="margin-top: 438px;margin-left:-220px">
                  <img :src="nbqLineURL" />
                </span>
              </el-col>
              <el-col :span="6" style="height:100%;">
                <span class="nbqLine2_systemMonitor3">
                  <img :src="xbLineURL" style="" />
                </span>
                <span class="nbq2_systemMonitor3">逆变器</span>
              </el-col>
            </el-row>
            <el-row class="row3">
              <el-col :span="8" style="width: 580px;height: 250px;margin-right: 100px;">
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
                        <span class="num allnum">
                          {{dataZJ
                          .pvnum}}&nbsp;
                        </span>块
                      </span>
                    </td>
                  </tr>
                </table>
                <div
                  class="zjTable"
                  style="width:580px;max-height: 100px;overflow-y: auto;overflow-x:hidden;"
                >
                  <table style="width:580px;border-top: 0px;overflow-y: scroll;border-bottom: 0px">
                    <tr v-for="(item, index) in dataZJ.pvstring" class="colorTr" :key="index">
                      <td style="border-right:1px solid #8dd5b5;" v-if="item.col1">
                        <span class="jtszTitle_zj">
                          {{ item.col1.factor }}({{ item.col1.batterytype }})
                          <br />
                          <span class="jtszTitle_zjcode">{{ item.col1.model }}</span>
                        </span>
                        <span class="jtsz_zj">
                          <span class="num">{{item.col1.num}}&nbsp;</span>块
                        </span>
                      </td>
                      <td style="border-right:1px solid #8dd5b5;" v-if="item.col2">
                        <span class="jtszTitle_zj">
                          {{ item.col2.factor }}({{ item.col2.batterytype }})
                          <br />
                          <span class="jtszTitle_zjcode">{{ item.col2.model }}</span>
                        </span>
                        <span class="jtsz_zj">
                          <span class="num">{{item.col2.num}}&nbsp;</span>块
                        </span>
                      </td>
                    </tr>
                  </table>
                </div>
              </el-col>
              <el-col :span="8" style="width: 420px;height: 200px;"></el-col>
              <el-col :span="8" style="height:100%;width:calc(100% - 1540px);"></el-col>
            </el-row>
            <el-row class="row4">
              <el-col
                :span="6"
                style="height:100%;width:780px;text-align: right;position:relative;"
              >
                <span class="kgz_systemMonitor3" style="position:absolute;right:10px;">开关站/升压站</span>
                <span class="kgzLine_systemMonitor3" style="margin-top:36px;">
                  <img :src="xbLineURL" style="margin-right: 190px;margin-top:212px ;transform: rotate(180deg);" />
                </span>
              </el-col>
              <el-col :span="6" style="height:100%;width:calc(100% - 780px);text-align: left;">
                <span class="xb_systemMonitor3">箱变</span>
                <span class="xbLine_systemMonitor3" style="margin-top:36px;">
                  <img :src="xbLineURL" style="margin-left: 383px;margin-top:-87px;transform: rotate(180deg);" />
                </span>
              </el-col>
            </el-row>

            <el-row class="row5">
              <el-col :span="12" style="width: 785px;height: 200px;">
                <table style="width:540px;height: 151px;margin-left: 317px;">
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
              <el-col :span="12" style="width: calc(100% - 785px);height: 200px;">
                <table style="width:420px;height: 200px;margin-left:190px">
                  <tr class="firstTr">
                    <th colspan="2">
                      <span class="title">箱变信息</span>
                      <!-- <span class="titleSpell">BOX TRANSFORMER INFORMATION</span> -->
                    </th>
                  </tr>
                  <tr class="secondTr">
                    <td colspan="2">
                      <router-link style="text-decoration: underline;" class="szTitle" :to="{ name: '方阵数量', query:{pro1:valuepc,pro2:valuejd,pro3:valuedz} }">方阵数量</router-link>
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
          <canvas id="flowarrow"></canvas>
        </el-row>
      </el-scrollbar>
    </el-row>
  </transition>
</template>

<script>
import { CreateFlowline } from "@/utils/flowArrowWithPath";
export default {
  props: [
    "valuepc","valuejd",
    "valuedz",
    "dataXB",
    "dataKGZ",
    "dataNBQ1",
    "dataNBQ2",
    "dataHLX",
    "dataZJ"
  ],
  components: {
    // CreateFlowline
  },
  data() {
    return {
      zjURL: "/images/组件图标.png",
      hlxURL: "/images/汇流箱图标.png",
      nbqURL: "/images/逆变器图标.png",
      nbqURL2: "/images/ZCSNBQ.png",
      xbURL: "/images/箱变图标.png",
      kgzURL: "/images/开关站图标.png",

      hlxLineURL: "/images/线条2.png",
      xbLineURL: "/images/线条1.png",
      zjLineURL: "/images/线条3.png",
      nbqLineURL: "/images/线条4.png"
    };
  },
  mounted() {
    this.CreateFlowline();
  },
  methods: {
    CreateFlowline() {
      var path =
        "M175,475l145,0 0,-102 1100,0 0,102 42 ,0 0,637 -860 0M320 ,475l0,106 1100,0 0,-106 ";
      var res = new CreateFlowline(path, "flowarrow", {
        canvas_w: 1500,
        canvas_h: 1500,
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
    errornum2() {
      return this.dataNBQ2.commnum + this.dataNBQ2.faultnum;
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
<style scoped="scoped" lang="scss">
#systemMonitor .first {
  > div {
    overflow: hidden;
    width: 1540px;
  }
}
.line_bottom {
  position: absolute;
  right: 43px;
}
</style>
<style>
#moScroller .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
