<template>
  <div>
    <div :style="{padding:'50px 50px'}" >
      <div :title="title"  :width="bodyWidth"  id="basicInfo" class="overflow_dialog" >
        <el-row class="station" :gutter="40">
          <el-col :xl="12" :lg="6" v-for="(item,j) in stationList" :key="j" style="margin-bottom: 20px">
            <contentBox :id="'content'+j" :title="item.projectname">
              <div  slot="content">
                <div  class="station">
                  <div class="labelList">
                    <stationText
                            v-for="(i, index) in labelList"
                            :key="index"
                            :title="i.title"
                            :unit="i.unit"
                            :value="item[i.key]"
                            :type="i.type"
                    ></stationText>
                  </div>
                </div>
                <el-row type="flex" justify="space-between" style="margin-top:20px;">
                  <el-col :span="12">
                    <singleTitle title="项目组件统计" subTitle=""></singleTitle>
                    <!--                                    <el-select v-model="isTable" placeholder="请选择">-->
                    <!--                                        <el-option label="图" :value="true"></el-option>-->
                    <!--                                        <el-option label="表" :value="false"></el-option>-->
                    <!--                                    </el-select>-->
                    <el-row type="flex" justify="space-between" class="pie_wrapper">
                      <el-col :span="9">
                        <doublePie
                                ref="deubs"
                                :ids="'doublePie' + j"
                                :data1="item.pvstringData1"
                                :data2="item.pvstringData2">
                        </doublePie>
                      </el-col>
                      <el-col :span="13" class="invest_legend_wrapper">
                        <div class="legendBox">
                          <div v-for="(legend,index) in pvstringLegend" :key="index">
                            <div class="pvstring_row single_legend" v-if="item[legend[0].key]!=null">
                              <i class="legend-color" :style="'border-color:'+legend[0].color"></i>
                              <stationText
                                      v-for="(i,index2) in legend"
                                      :key="index2"
                                      :title="i.title"
                                      :unit="i.unit"
                                      :value="i.unit?item[i.key]:item[i.key]+'%'"
                                      :className="i.className"></stationText>
                            </div>
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="10">
                    <singleTitle title="项目逆变器统计" subTitle=""></singleTitle>
                    <el-row type="flex" justify="space-between" class="pie_wrapper">
                      <el-col :span="14">
                        <doublePie1
                                ref="pies"
                                :ids="'doublePie0'+j"
                                :data1="item.investData1"
                                :data2="item.investData2"
                        ></doublePie1>
                      </el-col>
                      <el-col :span="7" class="invest_legend_wrapper">
                        <div class="legendBox">
                          <div v-for="(i,index) in investLegend" :key="index">
                            <div v-if="item[i.key]!=null" class="single_legend">
                              <i class="legend-color" :style="'border-color:'+i.color"></i>
                              <stationText
                                      :title="i.title"
                                      :unit="i.unit"
                                      :value="item[i.key]"
                                      :className="i.className"
                              ></stationText>
                            </div>
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </div>
            </contentBox>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
  import stationText from '@/components/homeModule/stationText'
  import doublePie from '@/components/charts/doublePie'
  import doublePie1 from '@/components/charts/doublePie1'
  import singleTitle from '@/components/homeModule/singleTitle'
  import contentBox from '@/components/homeModule/contentBox'
  export default {
    props:{
      title:{
        default:'标题'
      },
      // baseName: {
      //   default:'XXX基地'
      // }
    },
    components:{
      stationText,doublePie,doublePie1,
      singleTitle,contentBox
    },
    data(){
      return {
        form:[],
        refresh:true,
        bodyWidth:'100%',
        baseName: "XXX基地",
        labelList:[
          { title: "装机容量", key: 'capacity', unit: "MW",  type: 'number' },
          { title: "上网电价", key: 'price', unit: "元/kWh" ,  type: 'number'},
          { title: "建设时间", key: 'buildtime',  type: 'date' },
          { title: "并网时间", key: 'nettime',  type: 'date' },
          { title: "业主单位", key: 'ownercode',  type: 'text' },
        ],
        pvstringLegend:[
          [
            { title: "单晶组件", key: 'danjnum', unit: "块", className: 'f_green',color:'#32eac5' },
            // { title: "标称转换效率", key: 'danjeffect', className: 'f_green' },
          ],
          [
            { title: "单晶组件-安装容量", key: 'danjcapacity', unit: "MW", className: 'f_lakeBlue',color:'#00efff' },
          ],
          [
            { title: "多晶组件", key: 'duojnum', unit: "个", className: 'f_blue',color:'#00c6ff' },
            // { title: "标称转换效率", key: 'duojeffect', className: 'f_blue' }
          ],
          [
            { title: "多晶组件-安装容量", key: 'duojcapacity', unit: "MW", className: 'f_orange',color:'#ff8400' },
          ]
        ],
        investLegend:[
          { title: "集中式逆变器", key: 'invertnuM1', unit: "台", className: 'f_green',color:'#2dc076' },
          { title: "集中式逆变器-安装容量", key: 'invertcapacitY1', unit: "MW", className: 'f_lakeBlue',color:'#00efff' },
          { title: "集散式逆变器", key: 'invertnuM2', unit: "台", className: 'f_blue',color:'#0072ff' },
          { title: "集散式逆变器-安装容量", key: 'invertcapacitY2', unit: "MW", className: 'f_orange',color:'#fe7e00' },
          { title: "组串式逆变器", key: 'invertnuM3', unit: "台", className: 'f_grey_n',color:'#b6caf5' },
          { title: "组串式逆变器-安装容量", key: 'invertcapacitY3', unit: "MW", className: 'f_purple',color:'#978ffd' }
        ],
        baseinfo:{},
        stationList:[],
        capacityData:[],
        isShow:true,
      }
    },
    mounted(){
      this.getselectinfo();
      var w = document.getElementById("app").clientWidth;
      w = w == 1903 ? 1920 : w;
      this.bodyWidth = 1200 < w && w < 1903 ? "1200px" : w + "px";
      window.onresize = () => {
        w = document.getElementById("app").clientWidth;
        w = w == 1903 ? 1920 : w;
        this.bodyWidth = 1200 < w && w < 1903 ? "1200px" : w + "px";
        // this.refresh=false;
        setTimeout(() => {
          this.refresh = true;
        }, 10);
      };
    },
    methods:{
      getselectinfo(){
        var _this = this;
        _this.$fetch('/MtrBaseChildPages/GetBaseInfo',{
          baseId:this.$route.query.id
        }) .then( res => {
          var data=res.data;
          _this.baseinfo=data.baseinfo[0];
          _this.capTotal = 0;
          data.station.forEach(item => {
            _this.$set(item, "isTable", true);
            _this.capTotal += item.capacity;
            _this.capacityData.push({
              name: item.projectname,
              value: item.capacity
            });
            _this.isShow = false;
            _this.$nextTick(() => {
              _this.isShow = true;
            });

            item.investData1 = [];
            item.investData2 = [];
            _this.investLegend.forEach((i, index) => {
              item[index % 2 ? "investData2" : "investData1"].push({
                name: i.title,
                value: item[i.key]
              });
            });

            item.pvstringData1 = [];
            item.pvstringData2 = [];
            _this.pvstringLegend.forEach((i, index) => {
              item[index % 2 ? "pvstringData2" : "pvstringData1"].push({
                name: i[0].title,
                value: item[i[0].key]
              });
            });

          });

          _this.stationList = data.station;
        })
      },


    }
  }
</script>

<style lang="scss">
  .el-select>.el-input{
    display: inline-block !important;
    top: -35px !important;
  }
  #basicInfo{

    el-select{
      border:1px solid #8f9dae;
      border-radius: 10px;
    }
    .el-select,.el-input__inner{
      width: 54px;
      height: 20px;
      border-radius: 10px !important;
      float: right;
    }
    .el-select-dropdown{
      background-color:#1f395b;
    }
    .box_rec {
      margin: 40px 0 0 40px;

      p {
        color: #666 !important;
        background-color: #fff;
      }
    }
    // 饼图legend样式
    .legendBox{
      width: 100%;
      .single_legend{
        margin-top: 14px;
        position: relative;
        /*margin-top: 20px;*/
        /*position: relative;*/
        .legend-color{
          border: 1px solid #fff;
          border-radius: 3px;
          width: 15px;
          height: 5px;
          display: inline-block;
          margin: 0 10px;
          position: absolute;
          left: -40px;
          top: 40%;
        }
        .numcls{
          height: auto !important;
        }
      }
      .stationText{
        /*color: #fff;*/
        padding: 0;
        font-size: 14px;
        .num{
          font-size: 20px;
        }
        label{
          font-size: 12px;
        }
      }
      .pvstring_row{
        display: flex;
        &>.stationText{
          flex:1;
        }
      }
    }
  }
</style>
<style lang="scss" scoped>
  .italic_title{
    text-align: center;
    position: absolute;
    width: 45%;
    font-style: italic;
    font-family: "MStiffHeiPRC-Bold";
    color: #00baff;
  }
  .bg_box{
    padding: 0;
    /*background: url('/img/index/base_box1.png') no-repeat;*/
    /*background-size: 100% 100%;*/
    position: relative;
    .italic_title{
      font-size: 24px;
      width: 40%;
      top:5%;
      left: 40px;
    }

    .pieBox{
      position: relative;
      .pie_text{
        position: absolute;
        text-align: center;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        span{
          font-size: 18px;
          font-weight: 600;
        }
        label{
          font-size: 14px;
        }
      }
    }

  }
  .pie_wrapper{
    height: 320px;
    overflow: hidden;
  }
  .station{
    position: relative;
    z-index: 9;
    margin-top: 10px;
    .station_box{
      width:49%;
      padding: 4% 3% 3%;
      background: url('/img/index/base_box2.png') no-repeat;
      background-size: 100% 100%;
      margin-top: 30px;
      position: relative;
      .italic_title{
        font-size: 20px;
        top: 3%;
        left: 6%;
      }
      .pie_wrapper{
        height: 300px;
        .invest_legend_wrapper{
          display: flex;
          align-items: center;
        }
      }

    }
    .station_box:nth-child(2n+1){
      margin-right: 2%;
    }
    .labelList{
      color: #fff;
      display: flex;
      width: 100%;
      &>div{
        // flex: 1;
        width: 150px;
        border-right: 1px dotted  rgba(203,203,203,1);
      }
      &>div:first-child{
        padding: 0;
      }
      &>div:last-child{
        flex: 1;
        border: none;
      }
    }
  }
</style>
