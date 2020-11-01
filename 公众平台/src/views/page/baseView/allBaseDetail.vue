<template>
<div>
    <div class="zui-conter">
        <HomeMap
                @station-change="onStationChange($event)"
                class="zui-map"
                ref="map"
                :markerData="markerMapData"
        ></HomeMap>
        <div class="zui-row">
            <div
                    :class="{
          'arr-btn-left': showRightBtn,
          'arr-btn-right': !showRightBtn
        }"
                    @click="showRightBtnUpdate()"
            ></div>
            <div class="zui-left" v-if="showRightBtn">
                <div class="zui-mian">
                    <h3>{{baseTitle}}</h3>
                    <div class="zui-list" v-if="refrashData">
                        <div>
                            <SubTitle
                                    text="装机规模"
                                    en=" "
                                    class="inlineBlock active"
                            ></SubTitle>
                            <echartPieLegend
                                    unit="(MW)"
                                    :dataObj="echartsAllData.baseInfoObj['baseBatch']"
                                    :centerObj="echartsAllData.baseInfoObj['total']"
                                    ref="pies"
                                    style="height:190px;"
                                    ids="scale"
                            ></echartPieLegend>
                        </div>
                        <div>
                            <SubTitle
                                    :text="'年发电量'"
                                    en=" "
                                    class="inlineBlock active"
                            ></SubTitle>
                            <echartBarHorizontal
                                    ids="yearlist"
                                    style="height:240px"
                                    :dataArr="listRadia"
                                    unit="亿kWh"
                            ></echartBarHorizontal>
                        </div>
                        <div>
                            <SubTitle
                                    :text="'利用小时数'"
                                    en=" "
                                    class="inlineBlock active"
                            ></SubTitle>
                            <echartBarHorizontal
                                    ids="yearEnergy"
                                    unit="h"
                                    :dataArr="powerGener"
                                    :theme="['#1da63b', '#19b197']"
                                    style="height:240px"
                            ></echartBarHorizontal>
                        </div>
                    </div>
                </div>
            </div>
            <div
                    :class="{ 'arr-left': !showlegend, 'arr-right': showlegend }"
                    @click="showlegendUpdate()"
            ></div>
            <div class="zui-right box-right" v-if="showlegend">
                <!--        <div class="batchName" @click="onClickProvince(globalTotal)" >{{globalTotal.batchName+'（'+globalTotal.count+'）'}}</div>-->
                <div class="batchName" @click="onClickProvince(globalTotal)" >{{globalTotal.batchName}}
                    <span class="counts">{{globalTotal.count}}</span>
                </div>
                <el-tree
                        node-key="id"
                        class="flow-tree"
                        highlight-current
                        :data="navList"
                        :props="defaultProps"
                        default-expand-all
                        @node-click="onClickProvince"
                        ref="tree"
                >
          <span class="custom-tree-node" slot-scope="{ node, data }" >
<!--            <span>{{-->
              <!--             data.name || data.batchName + "（" + data.count + "）"-->
              <!--            }}</span>-->
            <span>{{
             data.name || data.batchName
            }} </span>
              <span class="number"  v-if="data.childrens">{{data.count}}</span>
          </span>
                </el-tree>
            </div>
            <div class="maplegend">
                <div class="maplegend_title">图例</div>
                <div class="maplegend_con">
                    <div  v-bind:style="{'color':(hiddenstatelegend?'#25D3FF':'#999')}">
                        <img src="/img/cluster/third-base.png" alt="">第一批次
                    </div>

                    <div  v-bind:style="{'color':(hiddenstatelegend?'#0ED318':'#999')}">
                        <img src="/img/cluster/one-base.png" alt="">第二批次
                    </div>
                    <div  v-bind:style="{'color':(hiddenstatelegend?'#FFBA00':'#999')}">
                        <img src="/img/cluster/two-base.png" alt="">第三批次
                    </div>


                </div>
            </div>
        </div>
    </div>
</div>

</template>
<script>
  export default {
    components: {
      SubTitle: resolve => {
        require(["@/components/public/subTitle1.vue"], resolve);
      },
      echartPieLegend: resolve => {
        require(["@/components/public/echarts/echartsPieLegend.vue"], resolve);
      },
      echartBarHorizontal: resolve => {
        require(["@/components/public/echarts/echartBarHorizontal.vue"], resolve);
      },
      HomeMap: resolve => {
        require(["@/components/public/map.vue"], resolve);
      }
    },
    filters: {},
    data() {
      return {
        globalTotal:{},//全国统计
        defaultProps: {
          children: "childrens",
          label: "batchName"
          ,
        },
        navList: [],
        childData: [], //存储省份
        baseData: [], //存储基地
        styleClear: [],
        markerMapData: [],
        listRadia: [],
        powerGener: [],
        showRightBtn: true,
        showlegend: true,
        baseTitle:'全国光伏领跑基地',
        baseForm: {
          BatchName: "",
          Dataid: ""
        },
        refrashData: true,
          hiddenstatelegend:true,
        echartsAllData: {
          baseInfoObj: {
            baseBatch: []
          }
        }
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      setFromMap(data){
        console.log('setFromMap',data)
        this.baseTitle=data.value;
      },
      //传入到地图id,name
      mapTreelId(id){
        if(id){
          this.$nextTick(()=>{
            this.$refs.tree.setCurrentKey(id);
            console.log('id',id)
          })
        }
      },
      onClickProvince(data) {
       
        console.log(data)
        this.childData.push(data.name);

        var para;
        if(data.name!=null)  {
          if(data.batchName=="全国")
          {
            para ={ type: "1", value: data.name };
          } else
          {
              para ={ type: "3", value: data.id };
              this.baseTitle=data.name;
          }

        } else
        {
            {para ={ type: "4", value: data.batchName };}
            this.baseTitle=data.batchName;
        }
        this.onStationChange(para);
        this.$refs.map.styleClear(data.batchName,data.name);

      },
      //右侧tree
      getCodeList() {
          // debugger
        this.$fetch("/MtrBase/GetProvinceMapListAsync").then(res => {
          if (res.code == 1) {
            this.globalTotal = res.data;
            
                  if(res.data.childrens && res.data.childrens.length>0){
                 this.navList = res.data.childrens;

            }

          }
        });
      },

      onStationChange(params) {
        this.getQueryData(params);
      },
      //地图界面
      getMapBaseList() {
        this.$fetch("/MtrBase/GetBaseMapList").then(res => {
          this.markerMapData = res.data;
            // this.$refs.map.addMarker(this.markerMapData)
        });
      },

      getQueryData(params) {
        this.refrashData = false;

        this.$fetch("/DigitalPv/GetHierarchyView", params)
                .then(res => {
                  let Data = res.data;

                  this.echartsAllData = {
                    baseInfoObj: {
                      baseBatch: []
                    },
                    powerGener: {}
                  };
                  for (var name in Data) {
                    switch (name) {
                      case "baseInfoObj":
                        this.echartsAllData.baseInfoObj.total = {
                          name: "总装机",
                          value: Data[name].totalScale
                        };
                        this.echartsAllData.baseInfoObj.baseBatch = Data[
                                name
                                ].baseBatch.map(item => {
                          return {
                            value: item.value1,
                            name: item.name1
                          };
                        });
                        break;
                    }
                  }
                  let recieveData = [
                    {
                      year: "",
                      data: [],
                      nameList: []
                    }
                  ];
                  for (let item of Data.listRadiation) {
                    recieveData[0].year = item.year.toString();
                    recieveData[0].data.push(item.inRadiation);
                    recieveData[0].nameList.push(item.basename);
                  }
                  this.listRadia = recieveData;
                  let yearsData = [
                    {
                      year: "",
                      data: [],
                      nameList: []
                    }
                  ];
                  for (let item of Data.listPower) {
                    yearsData[0].year = item.year.toString();
                    yearsData[0].data.push(item.powerGenerationValue);
                    yearsData[0].nameList.push(item.basename);
                  }
                  this.powerGener = yearsData;

                  this.refrashData = true;
                })

                .catch(() => {
                  this.$message({
                    type: "error",
                    message: "数据请求失败，请重试"
                  });
                  this.refrashData = true;
                });
      },

      showlegendUpdate() {
        this.showlegend = !this.showlegend;
      },
      showRightBtnUpdate() {
        this.showRightBtn = !this.showRightBtn;
      }
    },

    watch: {},
    created() {
      this.getCodeList();
      this.getMapBaseList();
      this.getQueryData();
      // this.showRightBtnUpdate();
    }
  };
</script>
<style lang="scss" scoped>
    .maplegend{
        position: absolute;
        right:0px;
        font-size: 14px;
        bottom: 5px;
        border-radius: 6px;
        box-shadow:0px 0px 4px 0px rgba(0, 0, 0, 0.1);
        padding: 8px;
        background:rgba(255,255,255,0.94);
        line-height: 40px;
        min-width: 196px;
        .maplegend_title {
            color: #000;
            border-bottom: 1px solid #ccc;
            height: 32px;
            /*margin-bottom: 10px;*/
            font-size: 14px;
        }

        .maplegend_con{
            cursor: pointer;
            margin: 10px 0px;
            line-height:34px;
            img {
                display: inline;
                width: 34px;
                margin-right: 5px;
                margin-bottom: 5px;
            }
        }
    }
  //数字可视化
  .zui-map {
    height: 100%;
    background: #e4e4e4;
  }
  .inlineBlock {
    margin-top: 20px;
  }

  .zui-conter {
    position: absolute;
    height: 100%;
    width: 100%;
  }
  .zui-row {
    .zui-left {
      width: 450px;
      height: calc(100% - 60px);
      position: absolute;
      top: 60px;
      left: 0px;
      z-index: 96;
      background-color: #ffffff;
      box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
      border-radius: 2px;
      .zui-mian {
        position: relative;
        height: calc(100% - 10px);
        overflow-y: auto;
        overflow-x: hidden;

        .zui-list {
          padding-left: 20px;
        }
        h3 {
          text-align: center;
          font-size: 20px;
          font-weight: bold;
          color: #000;
          line-height: 56px;
          border-bottom: 1px solid #e4e4e4;
        }
        .zui-sub-title p {
          text-align: left;
        }
      }
    }
    .zui-right {
      width: 200px;
      position: absolute;
      top: 76px;
      right: 0px;
      background:rgba(255,255,255,0.94);
      box-shadow:0px 0px 4px 0px rgba(0, 0, 0, 0.1);
      border-radius: 6px;
      padding: 10px 10px;
    }
  }

  .arr-btn-left,
  .arr-btn-right {
    display: inline-block;
    width: 19px;
    height: 111px;
    position: absolute;
    left: 460px;
    top: 50%;
    z-index: 99;
    transform: translate(-50%, 0);
    background: url("../../../assets/img/index/btn-left.png") no-repeat;
    cursor: pointer;
  }
  .arr-btn-right {
    background: url("../../../assets/img/index/btn-right.png") no-repeat;
    left: 10px;
  }
  .arr-left,
  .arr-right {
    display: inline-block;
    width: 19px;
    height: 111px;
    position: absolute;
    right: -8px;
    top: 40%;
    z-index: 99;
    transform: translate(-50%, 0);
    background: url("../../../assets/img/index/art-left.png") no-repeat;
    cursor: pointer;
  }
  .arr-right {
    background: url("../../../assets/img/index/art-right.png") no-repeat;
    right: 188px;
  }
</style>
<style lang="scss">
  .zui-mian::-webkit-scrollbar {
    width: 4px;
  }
  .zui-mian::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
  }
  .zui-mian::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
  }
  .box-right {
    .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
      color: #000 !important;
      font-size: 16px;
      font-weight: 800;
      background-color: #ebf2f6 !important;
    }
    .batchName{
      cursor: pointer;
      font-size: 16px;
      padding-top: 5px;
      color: #666666;
      padding-bottom: 6px;
      height: 32px!important;
      padding-left: 15px;
      /*background-color: #ebf2f6;*/
      /*background:linear-gradient(90deg,rgba(29,166,59,0.34),rgba(25,177,151,0.34));*/
      

    }
    .counts{
      color: #fff;
      padding: 0px 2px;
      background:linear-gradient(90deg,rgba(29,166,59,0.7),rgba(25,177,151,0.7));
      border-radius:4px;
    }
      .number{
          color: #fff;
          padding: 0px 5px;
          background:linear-gradient(90deg,rgba(29,166,59,0.7),rgba(25,177,151,0.7));
          border-radius:4px;
    }
    .batchName:hover{
      color: #000 !important;
      font-size: 16px;
      font-weight: 800;
      background-color: #ebf2f6 !important;
    }
    .batchName:focus,batchName:active{
      color: #000 !important;
      font-size: 16px;
      font-weight: 800;
      background-color: #ebf2f6 !important;
    }
    .flow-tree {
      /*padding-left:15px;*/
      color: #666666 !important;
      font-size: 16px;
      background-color: #fff !important;
    }
    .flow-tree /deep/ .el-icon-caret-right:before {
      content: "\e6e1";
      font-size: 16px;
    }
    .flow-tree /deep/ .el-tree-node__expand-icon .el-icon-caret-right:before {
      content: "\e603";
      font-size: 16px;
    }
    .flow-tree /deep/ .el-tree-node__content:hover {
      color: #000 !important;
      font-size: 16px;
      font-weight: 800;
      background-color: #ebf2f6 !important;
    }
    .flow-tree /deep/.custom-tree-node /deep/ span{
        margin-left: 15px;
    }
    .flow-tree /deep/.el-tree-node__content{
      height: 25px !important;
      border-bottom: 1px solid ;
      border-image: linear-gradient(90deg, rgba(29,166,59,0.18),rgba(25,177,151,0.18)) !important;
    }
    .el-tree-node {
      > .el-tree-node__children {
        overflow: visible !important;
      }
      .el-tree-node__expand-icon {
        position: absolute;
        right: 2%;
      }
      .el-tree-node__label {
        margin-left: 15px;
      }
    }
    .el-tree-node:focus > .el-tree-node__content {
      color: #000 !important;
      font-size: 16px;
      font-weight: 800;
      background-color: #ebf2f6 !important;
     

    }
  }


</style>
