<template>
<div class="equimentbox">
    <div class="header m-b-15" style="height:42px;position:relative">
        <stationSelect
          :defaulState="true"
          :emitState="true"
          @selectedStation="onSelectedPC"
          :optindata = optinedataPC
          :defaultKey = optinePcKey
          selName = "批次"
          ref="StationSelect1"
        ></stationSelect>
        <stationSelect
          :defaulState="true"
          :emitState="true"
          @selectedStation="onSelectedJD"
          :optindata = optinedataJD
          :defaultKey = optineJdKey
          selName = "基地"
          ref="StationSelect2"
        ></stationSelect>
        <stationSelect
          :defaulState="true"
          :emitState="true"
          @selectedStation="onSelectedDZ"
          :optindata = optinedataDZ
          selName = "电站"
          ref="StationSelect3"
        ></stationSelect>
      </div>

  <el-container class="full" id="systemEquipmentMonitor">
    
    <el-aside width="255px">
      <nav-meun @selectnodedata="selectnodeData" ref="navmeun"></nav-meun>
    </el-aside>
    <el-main class="mainWrap">
      <component :is="selectNode" @viewnbqinfo="viewnbqinfo" :nodedata="nodedata" ref="changeview"></component>
    </el-main>
  </el-container>
</div>  
</template>
<script>
import stationSelect from "@/components/station";
import MainWrap from "./component/mainWrap.vue";
import groupMonitoring from "./component/groupMonitoring.vue";
import HLbox from "./component/HLbox.vue";
import NavMeun from "./component/meumList.vue";
import $ from 'jquery'

export default {
  components: {
    stationSelect,
    MainWrap: MainWrap,
    groupMonitoring: groupMonitoring,
    HLbox: HLbox,
    NavMeun: NavMeun
  },
  data() {
    return {
      projectUrl: "/RealTimeData/GetProList",
      selectNode: "MainWrap", //选择加载页面  方阵、逆变器
      stationid: "",
      stationData: [],
      nodedata: {},
      code: "",
      optinedataPC:[],
      optinedataJD:[],
      optinedataDZ:[],
      optinePcKey:{
                    value:"name",
                    label:"id"
                },
      optineJdKey:{
                    value:"id",
                    label:"name"
                },
    };
  },
  mounted() {
  
    this.$refs.StationSelect1.stationid = this.$route.query.pro1;
    this.$refs.StationSelect2.stationid = this.$route.query.pro2;
    this.$refs.StationSelect3.stationid = this.$route.query.pro3;
    // this.stationid = this.$route.query.pro3;
    this.$refs.navmeun.getMenuLevel1(this.$route.query.pro3);
     this.getSelateData()//获取下拉列表数据
  },
  methods: {
    //获取selsct数据
    getSelateData(){
      this.$fetchGet({url:'/MtrBase/GetBatchBaseTree'}).then(res =>{
        this.optinedataPC = res.data
        for(let item of res.data){
          if(this.$route.query.pro1 === item.name){
            this.optinedataJD = item.childTreeNode
            for(let C of item.childTreeNode){
              if(this.$route.query.pro2 === C.id){
                this.onSelectedJD(C.id)
              }
            }
          }
        }
        
        
      })
    },
    onSelectedPC(data){
      this.optinedataJD = []
        this.optinedataPC.map(item=>{
          if(item.name == data){
            this.optinedataJD = item.childTreeNode
          }
        })
    },
    onSelectedJD(data){
       this.optinedataDZ =[]
        this.$fetchGet({url:'/RealTimeData/GetProList',params:{baseid:data}}).then(res =>{
          this.optinedataDZ = res.data
        })
    },
    // 电站改变时调用
    onSelectedDZ(id) {
      this.stationid = id;
      this.selectNode = "MainWrap";
      this.$refs.navmeun.getMenuLevel1(id);
    },
    // 点击逆变器表头调用
    viewnbqinfo(row, parentnodedata) {
      var _this = this;
      if (row.type == 3) this.selectNode = "groupMonitoring";
      else this.selectNode = "HLbox";
      _this.nodedata =null; 
      //  展开列表，添加选中状态
      _this.$refs.navmeun.$refs.navtree.store.nodesMap[parentnodedata.code].expanded = true;
      _this.$nextTick(() => {
        let queryNode = $(".select").next().find(".el-tree-node__content");
        let length = queryNode.length;
        for (let i = 0; i < length; i++) {
          let node = queryNode.eq(i).find(".custom-tree-node").eq(0).find("span");
          if ($(node).text().trim() == row.name ) {
            $(".select").removeClass("select");
            queryNode.eq(i).addClass("select");
          }
        }
        _this.nodedata = row;
      });
    },
    // 树形控件调用
    selectnodeData(view, data) {
      this.selectNode = view;
      this.$nextTick(() => {
        this.nodedata = data;
      });
    }
  }
};
</script>

<style lang="scss">
.equimentbox{
  background-color: #fff;
  padding: 20px;
}
// #systemEquipmentMonitor{
  @import "public/css/scss/sysEquip.scss";
// }
</style>
