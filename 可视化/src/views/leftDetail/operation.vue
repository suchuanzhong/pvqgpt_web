<template>
  <div class="arr">
    <div class="left-btn" @click="toggleLeft" :class="{hideLeft:hideLeft}"></div>
    <div class="right-btn" @click="toggleRight" v-if="showRightBtn" :class="{hideRight:hideRight}"></div>
    <div class="legend" :class="{hideRight:(hideRight||!showRightBtn)}" v-show="showlegend"></div>
    <div class="left-shadow">
      <div class="left-box">
        <div class="left-bg">
          <div class="seations">
            <Title title="领跑概况"></Title>
            <el-carousel class="information zui-info">
              <el-carousel-item v-for="(item,index) in mationDatas" :key="index">
                <el-row>
                  <div class="construction">
                    <span class="truction-title">{{item.baseName}}</span>
                    <span class="truction-color">{{item.scale}}</span>
                    <span class="truction-unit">MW</span>
                  </div>
                  <el-col :span="12" class="nav">
                    <i class="my-iocn-time"></i>
                    <div class="mation-title">
                      <div class="power-list">
                        <span>建设时间</span>
                      </div>
                      <div class="power">
                        <span class="power-left">{{item.constructionTime}}</span>
                        <span class="power-kw"></span>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="12" class="nav">
                    <i class="my-iocn-time"></i>
                    <div class="mation-title">
                      <div class="power-list">
                        <span>并网时间</span>
                      </div>
                      <div class="power">
                        <span class="power-left">{{item.networkingTime}}</span>
                        <span class="power-kw"></span>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="12" class="nav">
                    <i class="my-iocn-cumulative"></i>
                    <!--                  <i class="my-iocn-temperature"></i>-->
                    <div class="mation-title">
                      <div class="power-list">
                        <span>发电量</span>
                      </div>
                      <div class="power">
                        <span class="power-left">{{item.totalAmount}}</span>
                        <span class="power-kw">万kW.h</span>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="12" class="nav">
                    <i class="my-iocn-Numberhours"></i>
                    <div class="mation-title">
                      <div class="power-list">
                        <span>利用小时数</span>
                      </div>
                      <div class="power">
                        <span class="power-lefts" :title="item.yaerUtilizationHours">{{item.yaerUtilizationHours}}</span>
                        <span class="power-kw">h</span>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="12" class="nav">
                    <i class="my-iocn-temperature"></i>
                    <div class="mation-title">
                      <div class="power-list">
                        <span>资源区</span>
                      </div>
                      <div class="power">
                        <span class="power-left">{{item.resourceName}}</span>
                        <!--                      <span class="power-kw">℃</span>-->
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="12" class="nav">
                    <i class="my-iocn-intensity"></i>
                    <div class="mation-title">
                      <div class="power-list">
                        <span>辐射量</span>
                      </div>
                      <div class="power">
                        <span class="power-leftes" :title="item.cantRadiation">{{item.cantRadiation}}</span>
                        <span class="power-kw">kW.h/m²</span>
                      </div>
                    </div>
                  </el-col>

                </el-row>
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="seation">
            <Title title="领跑企业" @click.native="loadfdlxss" @dblclick.native="Closefdlxss"></Title>
            <EchartBasePie  style="height:220px;width:100%;"
                            :data="talentRatio" centerName="装机容量统计"
                            :startAngle="startAngle"
                            ref="basePie1"
                            graphicPosRight="5%"
                            :piePosition='piePosition'
                            centerValue="" centerSubName="MW" flag ids="pie1"
            ></EchartBasePie>
          </div>
          <div class="seation">
            <Title title="领跑设备"></Title>
            <div style="height:200px;width:100%;">
              <Myecharts
                      ids="resource" ref="doublePieRef"
                      :LeftData="LeftData"
                      :rightData="rightData"></Myecharts>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.click {
  cursor: pointer;
}
</style>
<script>
import Title from "@/components/public/TitleName";
import Myecharts from "@/components/public/echarts/echartsNumer";
import MyTable from "@/components/public/MyTable";
// import EchartsPie from "@/components/public/echarts/echartsPie";
import EchartBasePie from "@/components/public/echartsPie";
let time = null;
export default {
  name: "Resources",
  data() {
    return {
      theads: {},
      LeftData: [],
      barOneData: [],
      xAxisData: [],
      rightData: [],
      aixaData: [],
      oneData: [],
      barDataArr: [],
      hideLeft: false,
      hideRight: false,
      showRightBtn: true,
      showlegend: false,
      dataArrs: [],
      mationDatas: [],
      tableData: [],
      effctData: [],
      showlayer: false,
      talentRatio:[],
      startAngle:102,
      piePosition:["50%", "49.5%"],
    };
  },
  components: {
    Title,
    Myecharts,
    MyTable,
    // EchartsPie,
    EchartBasePie
  },
  mounted() {
    this.getEffctData();
    this.getTianqi();
    this.leadqy();
    this.enterprise();
    this.status();
  },
  beforeDestroy() {
    this.showlayer = true;
    //移除资源图层
    this.showResourceLayer();
    // this.$parent.$refs.map.showBaseInfo=false;
    //移除基地分布
    if (this.$parent.$refs.map && this.$parent.$refs.map.getViewer) {
      var viewer = this.$parent.$refs.map.getViewer();
      if (viewer) {
        clearDataSourcees(["base"], viewer);
      }
    }
  },
  methods: {
    //领跑设备
    leadqy() {
      this.$axios.post("LeadingBaseControll/GetEquipment").then(res => {
        if (res.code == 1) {
          if (res.data && res.data.length > 0) {
            let passData = res.data;
            for (let item of passData) {
              if (item.devType == "组件") {
                this.LeftData.push({
                  name: item.attributes,
                  value: item.dEvcApACITYSum
                });
              } else if (item.devType == "逆变器") {
                this.rightData.push({
                  name: item.attributes,
                  value: item.dEvcApACITYSum
                });
              }
            }
            this.$refs.doublePieRef.drawChart();
          }
        }
      });
    },
    getEffctData() {
      $.ajax({
        url: "json/3D_effect.json",
        async: false,
        type: "get",
        dataType: "json",
        success: res => {
          this.effctData = res;
          // this.initEffect();
        }
      });

    },
    loadfdlxss() {
      clearTimeout(time);
      time = setTimeout(() => {
        this.oprationMapServer(this.effctData.领跑基地.光资源调用);
      }, 300);
    },
    Closefdlxss() {
      clearTimeout(time);
      this.oprationMapServer(this.effctData.领跑基地.光资源关闭);
    },
    oprationMapServer(data) {
      try {
        RESAFETY.callService(data);
      } catch (e) {
        console.log(e);
      }
    },
    //领跑企业
    enterprise() {
      this.$axios.post("/LeadingBaseControll/LeadEnterprise").then(res => {
        if (res.code == 1) {
          if (res.data && res.data.length > 0) {
            let passData = res.data;
            for (let item of  passData){
              this.talentRatio.push({
                name: item.baseName,
                value: item.scale,
                // value: item.scale,
                unit:''
              })
            }

            this.$nextTick(() => {
              this.$refs.basePie1.initEcharts();
            });
          }
        }
      });
    },
    //建设情况查询
    status() {
      this.$axios.post("LeadingBaseControll/GetBaseId").then(res => {
        if (res.code == 1) {
          if (res.data && res.data.length > 0) {
            // this.getTianqi(res.data)
            for (let i in res.data) {
              if (res.data.hasOwnProperty(i)) {
                this.getTianqi(res.data[i].code);
              }
              // JSON.parse(res.data[i].code)
            }
          }
        }
      });
    },
    //领跑概况
    getTianqi(val) {
      if (val) {
        // let baseCodes= val||'01' ;
        // let situation=
        this.$axios
          .post("LeadingBaseControll/GetConstructionInof?baseCode=" + val)
          .then(res => {
            // debugger
            if (res.code == 1) {
              this.mationDatas.push(res.data);
            }
          });
      }
    },
    toggleLeft() {
      this.hideLeft = !this.hideLeft;
      $(".left-shadow").toggleClass("hideContentLeft");
    },
    toggleRight() {
      this.hideRight = !this.hideRight;
      $(".right-shadow").toggleClass("hideContentRight");
    },
    showlegends(show) {
      this.showlegend = show;
    },
    changeposition(text) {
      this.position = text;
    },
    showResourceLayer() {
      this.showlayer = !this.showlayer;
      if (this.$parent.$refs.map && this.$parent.$refs.map.showResourceLayer) {
        this.$parent.$refs.map.showResourceLayer(this.showlayer);
      }
      if (this.$parent.$refs.map && this.$parent.$refs.map.getViewer) {
        var viewer = this.$parent.$refs.map.getViewer();
        if (viewer) addBasePoint(this, viewer);
        if (this.showlayer)
          viewer.scene.camera.flyTo({
            destination: {
              x: -3719914.7214529333,
              y: 9923008.103096997,
              z: 2961333.5440157317
            },
            orientation: {
              pitch: -1.210401948634264,
              heading: 6.202436309227091,
              roll: 6.283185307179586
            }
          });
      }
    }
  }
};
</script>
<style lang="scss">
.zui-info {
  .el-carousel__arrow--left{
     left: 0px !important;
   }
  .el-carousel__arrow--right{
    right: 0px !important;
  }
}
</style>
<style lang="scss" scoped>
.information {
  padding: 10px 10px 0 10px;
  .el-carousel__container {
    position: relative;
    height: 300px;
  }
  .construction {
    height: 34px;
    background: rgba(0, 88, 134, 0.4);
    border: 1px solid #07507b;
    margin-bottom: 14px;
    margin-right: 10px;
  }
  .truction-title {
    color: #82c2eb;
    font-size: 16px;
    line-height: 30px;
    padding-left: 22px;
  }
  .truction-color {
    color: #ff9d00;
    font-size: 20px;
    padding-left: 40px;
    padding-right: 9px;
    line-height: 30px;
  }
  .truction-unit {
    color: #477595;
    font-size: 14px;
    line-height: 30px;
  }
  .nav {
    margin-bottom: 10px;
  }
  .my-iocn-time {
    width: 53px;
    height: 64px;
    display: inline-block;
    background: url("../../assets/img/tiem.png") no-repeat;
  }
  .my-iocn-times {
    width: 53px;
    height: 64px;
    display: inline-block;
    background: url("../../assets/img/tiem.png") no-repeat;
  }
  .my-iocn-temperature {
    width: 53px;
    height: 64px;
    display: inline-block;
    background: url("../../assets/img/temperature.png") no-repeat;
  }
  .my-iocn-Numberhours {
    width: 53px;
    height: 64px;
    display: inline-block;
    background: url("../../assets/img/Numberhours.png") no-repeat;
  }
  .my-iocn-cumulative {
    width: 53px;
    height: 64px;
    display: inline-block;
    background: url("../../assets/img/Power-generation.png") no-repeat;
  }
  .my-iocn-intensity {
    width: 53px;
    height: 64px;
    display: inline-block;
    background: url("../../assets/img/intensity.png") no-repeat;
  }
  .power-list {
    margin-bottom: 6px;
    width: 123px;
    height: 26px;
    background: rgba(0, 88, 134, 0.4);

    span {
      text-align: center;
      color: #82c2eb;
      font-size: 16px;
      line-height: 24px;
      padding-left: 8px;
    }
  }
  .power {
    width: 123px;
    height: 34px;
    background: rgba(0, 88, 134, 0.4);
    display: inline-block;
    // margin-left: 8px;
  }
  .power-left {
    /*width: 100px;*/
    color: #dcf4ff;
    font-family: DINOT;
    font-size: 20px;
    line-height: 32px;
    float: left;
    margin-left: 8px;
    // color: #dcf4ff;
  }
  .power-lefts {
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100px;
    color: #dcf4ff;
    font-family: DINOT;
    font-size: 20px;
    line-height: 32px;
    float: left;
    margin-left: 8px;
    // color: #dcf4ff;
  }
  .power-leftes {
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 50px;
    color: #dcf4ff;
    font-family: DINOT;
    font-size: 20px;
    line-height: 32px;
    float: left;
    margin-left: 8px;
    // color: #dcf4ff;
  }
  .power-kw {
    float: right;
    font-family: PingFang-SC-Medium;
    font-size: 14px;
    line-height: 32px;
    color: #82c2eb;
    margin-right: 6px;
  }
  .mation-title {
    display: inline-block;
    vertical-align: text-bottom;
    margin-left: 4px;
  }
}
.infoCursor {
  cursor: pointer;
}
</style>
