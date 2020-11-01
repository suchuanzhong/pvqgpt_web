<template>
  <div class="arr">
    <div class="left-btn" @click="toggleLeft" :class="{hideLeft:hideLeft}"></div>
    <div class="right-btn" @click="toggleRight" v-if="showRightBtn" :class="{hideRight:hideRight}"></div>
    <div class="legend" :class="{hideRight:(hideRight||!showRightBtn)}" v-show="showlegend"></div>
    <div class="left-shadow">
    <div class="left-box">
      <div class="left-bg">
        <div class="seationbg" style="height:auto;background-size:100% 100%;padding-bottom:40px;">
          <div class="station-bg ">
            <el-form ref="form" :model="form" label-width="40px">
              <el-form-item label="基地" style="color:#82c2eb">
                <el-select
                  v-model="form.base"
                  placeholder="请选择"
                  multiple
                  collapse-tags
                  @change="changeJD"
                  popper-class="stationsdowm"
                  style="width: 310px;"
                >
                  <el-option
                    :label="item.baseName"
                    :value="item.code"
                    v-for="(item,idx) in baseOption"
                    :key="idx"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="电站" style="color:#82c2eb">
                <el-select
                  v-model="form.baseDZ"
                  placeholder=""
                  multiple
                  collapse-tags
                  :disabled="form.base[0]=='全部'||form.base.length>1?true:false"
                   @change="changeDz"
                  style="width: 310px;"
                >
                  <el-option
                    v-for="(item,idx) in dzOption"  
                    :label="item.projectName"
                    :value="item.projectCode"
                    :key="idx"
                  ></el-option>
                </el-select>
              </el-form-item>
              <!-- <el-form-item label="日期" style="color:#82c2eb">
                <el-col :span="24">
                  <el-select
                    v-model="form.dateType"
                    placeholder="请选择"
                    style="width:310px;"
                  >
                    <el-option label="按年" value="year"></el-option>
                    <el-option label="按月" value="month"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="24" style="padding-top:20px">
                  <div class="block">
                    <el-date-picker
                      v-model="form.date"
                      style="width:310px;"
                      :type="form.dateType"
                      :value-format="'yyyy-MM-dd'"
                      placeholder
                    ></el-date-picker>
                  </div>
                </el-col>
              </el-form-item> -->
              <div class="tie-box">
                <div class="tie-left">
                  <h4>指标</h4>
                </div>
                <div class="tie-right">
                  <el-row :gutter="20">
                    <el-col :span="12" v-for="(item,index) in stationData" :key="index">
                      <div class="xiemian" :class="{active:isActStation(item.name)}" @click="toggleActStattion(item.value,item.name,item.unit,item.typeNum)">
                        <label>{{item.name}}</label>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
               <el-row :gutter="25">
                  <el-col :span="12" >
                    <div class="stat" @click="OpenRunMap" @dblclick="CloseRunMap">
                      <span>统计</span>
                    </div>
                  </el-col>
                  <el-col :span="12" >
                    <div class="stat" @click="getStaticData('more')">
                      <span>更多</span>
                    </div>
                  </el-col>
                </el-row>
            </el-form>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
let time = null;
export default {
  name: "Resources",
  data() {
    return {
      stationAllData:{},
      showResult: false,
      stationData: [
        { name: "辐射量", value: "Radiation",typeNum:'', unit: ["kW.h/m²"] },//斜面辐射
        { name: "发电量",value: "Electricity",typeNum:0,unit: ["万kW.h"]},//发电量/利用小时数
        { name: "利用小时数",value: "Electricity",typeNum:1,unit: ["h"]},//发电量/利用小时数
        { name: "能效比", value: "Efficiency",typeNum:'', unit: ["%"] },//能效比
        { name: "组件转换效率", value: "GetAttenuation",typeNum:0, unit: ["%"] },//转换率/衰减率
        { name: "组件衰减率", value: "GetAttenuation",typeNum:1, unit: ["%"] },//转换率/衰减率
        { name: "逆变器转换率", value: "GetInverterConversionRate",typeNum:0, unit: ["%"] },//转换率/衰减率
        { name: "电价", value: "GetBasePrice",typeNum:'', unit: ["元/kW.h"] },//经济效益
        { name: "产值", value: "Economic",typeNum:1, unit: ["亿"] }//经济效益
      ],
      form: {
        name: "",
        region: "",
        // dateType: "year",
        // date:new Date().getFullYear() + '-01-01',
        base:["全部"],
        baseDZ:[],
      },
      baseOption: [],//基地数组
      baseName:'',//基地名称
      dzOption:[],//电站数组
      actStation: "Radiation",
      is_station:"辐射量",//是否选择
      actDep: "",//属性值
      typeNum:"",//指标数据类型
      hideLeft: false,
      hideRight: false,
      showRightBtn: true,
      showlegend: false,
      showlayer: false,
      actunit: ["kW.h/m²", "h"],
      actType: "辐射量",
      chooseArr:[],
      dialogTypeName:'',//展示图表
      videoData:[],
      effctData: [],
      oldBaseArr:[],
      nowBaseArr:["全部"],
      checkYear: null
    };
  },
  created() {
    this.getBaseInfomation();
  },
  computed: {
    myStatic() {
      return this.$store.state.staticData;
    }
  },
  watch: {
    myStatic(data) {},

    "$store.state.staticData": data => {}
  },
  mounted(){
    let yearNum = this.$route.query.yearnum;
    //通过url检查是否传值
    if (yearNum != null && yearNum != "") {
      // this.isShowHighLight = true;
      this.checkYear = yearNum;
    }
    // this.choosetemlate('今年运行')
    this.getJson();
    this.getEffctData();
    // this.getStaticData()
  },
  methods: {
    //获取弹窗数据源
    getJson(){
        $.ajax({
            url: 'json/data.json',
            success: (res => {
                this.videoData = res.videoData;
                  console.log(this.videoData);
            })
        })

    },
    //获取3D
    getEffctData() {
      $.ajax({
        url: "json/3D_effect.json",
        async: false,
        type: "get",
        dataType: "json",
        success: res => {
          this.effctData = res;
        }
      });
    },
    //设置弹窗信息
    show720(dataObj){
      console.log(dataObj);
        var data=[dataObj];
        try{
            RESAFETY.callService(data)
        }catch (e) {
            console.log('连接失败，cfg_system.run')
        }
    },
    dealBasename(){
      console.log(this.nowBaseArr)
      let jdNameArr = []
      let objkeyArray =[]
      this.nowBaseArr.map((item,index)=>{
        if(item!=="全部"&&item!==undefined){
          let jdName = this.baseOption.filter(c_item=>{
            return c_item.code == item
          })
          let jdstr = jdName[0].baseName
          if( jdstr.includes("采煤")){
            jdstr = jdstr.substring(0,jdstr.indexOf("采煤"))
          }else if(jdstr.includes("光伏")){
            jdstr = jdstr.substring(0,jdstr.indexOf("光伏"))
          }
          jdNameArr.push(jdstr)
        }else if(item == "全部"||item == undefined){
          jdNameArr.push("全部")
        }
      })
      if(jdNameArr.length>1){
        jdNameArr.map(item=>{
          let objkey = `${item}统计分析${this.actType}多选`
          objkeyArray.push(objkey)
        })
      }else if(jdNameArr.length==1&&jdNameArr[0]!=="全部"){
        let objkey = `${jdNameArr[0]}统计分析${this.actType}`
        objkeyArray.push(objkey)
      }else if (jdNameArr.length==1&&jdNameArr[0]=="全部"){
        let objkey = `统计分析${this.actType}`
          objkeyArray.push(objkey)
      }
      return objkeyArray
    },
    OpenRunMap() {
      //执行事件
      if(this.oldBaseArr.length>0){
        this.closePreRunMap() 
      }
    
      this.actType.includes("组件")?this.actType=this.actType.substring(2):''
      let BaseName = this.dealBasename()
      console.log("打开基地",BaseName)
        if(this.nowBaseArr.length==1&&this.nowBaseArr[0]!=="全部"){
          let obj = {
            is_shownum:false,
            titleText:`${new Date().getFullYear()}${BaseName[0].substring(0,BaseName[0].indexOf("统计分析"))}光伏领跑基地${this.actType}`,
            indexOneText:``,
            indexOneValue:``,
            indexTwoText:``,
            indexTwoValue:``,
          }
          localStorage.setItem("titledata",JSON.stringify(obj))
         
        }else{
          let obj = {
            is_shownum:false,
            titleText:`${new Date().getFullYear()}全国光伏领跑基地${this.actType}`,
            indexOneText:``,
            indexOneValue:``,
            indexTwoText:``,
            indexTwoValue:``,
          }
          localStorage.setItem("titledata",JSON.stringify(obj))
        }
        util3D.opHtmlBatch(parseInt(202008151551),"顶部标题")
        util3D.opHtmlBatchSend();


      clearTimeout(time);
      time = setTimeout(() => {
        if(!(BaseName.length==1&&BaseName[0].substring(0,4).includes("统计分析"))){
          this.oprationMapServer(this.effctData.统计分析.关闭统计分析基地名称);
        }
        BaseName.map(item=>{
          let keystr = '调用'+item
          if(keystr.includes("调用统计分析")){
            this.oprationMapServer(this.effctData.统计分析.调用统计分析基地名称);
          }
          this.oprationMapServer(this.effctData.统计分析[keystr]);
        })
        
        this.oldBaseArr=BaseName
      }, 300);
    },
    //关闭之前效果
    closePreRunMap(){
     
      this.actType.includes("组件")?this.actType=this.actType.substring(2):''
      this.oldBaseArr.map(item=>{
        let objkey = `关闭${item}`
        this.oprationMapServer(this.effctData.统计分析[objkey]);
        
      })
      console.log("历史记录",this.oldBaseArr)
      this.oldBaseArr =[]
    },
    CloseRunMap() {
        util3D.closeyemian("顶部标题");
       util3D.opHtmlBatchSend();
      this.actType.includes("组件")?this.actType=this.actType.substring(2):''
      let BaseName = this.dealBasename()
      console.log("关闭基地",BaseName)
      clearTimeout(time);
      //执行事件
      BaseName.map(item=>{
          let keystr = '关闭'+item
          this.oprationMapServer(this.effctData.统计分析[keystr]);
        })
    },
    oprationMapServer(data) {
      console.log(data)
      try {
        RESAFETY.callService(data);
      } catch (e) {
        console.log(e);
      }
    },
    //获取基地
    getBaseInfomation() {
      let paramsData = {page: "1",pageSize: "1000",searchField: [],orderField: []};
      this.$axios.post("/LeadingBaseControll/GetBaseId", paramsData).then(res => {
        if (res.code == 1) {
          if (res.data && res.data.length > 0) {
            this.baseOption = res.data;
         
          }
        }
      });
    },
    //统计数据
    getStaticData(typeName) {
      let baseArr = this.form.base[0]==["全部"]?",":this.form.base.join(',')
      let baseDZ = this.form.baseDZ[0]==["全部"]?",":this.form.baseDZ.join(',')
      let baseName = this.baseName;
      let paramsData ={}
      let paramsDataStr=""//接口参数拼接
      if(this.actStation == "GetAttenuation"){
         paramsData = {
          baseCode: baseArr,
          projectCode:baseDZ,
          DateTime: new Date().getFullYear(),

        };
        paramsDataStr=`DateTime=${paramsData.DateTime}&baseCode=${paramsData.baseCode}&projectcode=${paramsData.projectCode}&Type=`
        this.attenuationFuc(paramsDataStr,typeName,baseArr,baseDZ)
        return
      }else{
         paramsData = {
          baseCode: baseArr,
          projectCode:baseDZ,
          DateTime: new Date().getFullYear(),
        };
        paramsDataStr=`DateTime=${paramsData.DateTime}&baseCode=${paramsData.baseCode}&projectcode=${paramsData.projectCode}`
      }
      let _this = this;
      this.$axios.post("/StatisticalInfo/" + this.actStation+"?"+paramsDataStr).then(res => {
        if (res.code == 1) {
          if (res.data.records && res.data.records.length >= 0) {
            let recordsData = JSON.parse(JSON.stringify(res.data.records)) ;
            let typenum= this.typeNum
            recordsData.sort(function(a,b){
              let typeStr = typenum!==""? "value" + typenum:"value0";
              return b[typeStr]-a[typeStr]  
            })
            let axisData = [], dataArr = [];
            if (recordsData.length >= 0) {
              let seriesDatas = [], xasixData = [];
                  let name =this.actStation !=="GetInverterConversionRate"? res.data["instructionsValue" + this.typeNum]:res.data["indicatorsName"]
                  seriesDatas.push({
                    name: name,
                    type: "bar",
                    data: [],
                  });
                recordsData.forEach(item => {
                  this.actStation =="GetAttenuation"||this.actStation =="GetBasePrice"?xasixData.push(item.baseName):xasixData.push(item.name);
                    let values = this.typeNum!==""? item["value" + this.typeNum]:item["value0"];
                    seriesDatas[0].data.push(values);
                });
              let barData = {
                typeNum:this.typeNum,
                is_table:true,
                baseCode:baseArr,
                baseDZ:baseDZ,
                actStation:this.actStation,
                baseName:baseName,
                dataType: _this.actType,
                barData: {
                  unit: _this.actunit,
                  xAsixData: xasixData,
                  dataArr: seriesDatas
                }
              };
              localStorage.setItem("JDstatisticData", JSON.stringify(barData));
              if(typeName==="more"){
                  this.show720(this.videoData[1].url)
              }
              this.closeURL();
              this.openURL();
              this.$store.dispatch("getStaticData", barData);
            }
          }else{
            localStorage.setItem("JDstatisticData", JSON.stringify({}));
            this.closeURL();
            this.openURL();
            this.$store.dispatch("getStaticData", {});
          }
        }
      });
    },
    //处理设备中衰减率及转换率
    attenuationFuc(datastr,typeName,baseArr,baseDZ){
      let attenuation = this.typeNum+1
      let promise1 = this.$axios.post("/StatisticalInfo/" + this.actStation+"?"+datastr+attenuation).then(res=>{
          if (res) {
            let initData = res.data;
            initData.records.sort(function(a,b){
              let typeStr = "value0";
              return b[typeStr]-a[typeStr]  
            })
            let seriesDatas = [], xasixData = [];
            seriesDatas.push({
              name: initData.instructionsValue0.substring(2),
              type: "bar",
              data: [],
            });
            initData.records.forEach(item => {
              xasixData.push(item.baseName);
                let values = item["value"+0] == null?0:item["value"+0];
                seriesDatas[0].data.push(values);
            });
            let barData = {
              typeNum:this.typeNum,
              is_table:true,
              baseCode:baseArr,
              baseDZ:baseDZ,
              actStation:this.actStation,
              dataType: this.actType,
              baseName:this.baseName,
              barData: {
                unit: this.actunit,
                xAsixData: xasixData,
                dataArr: seriesDatas
              }
            };
            localStorage.setItem("JDstatisticData", JSON.stringify(barData));
            if(typeName==="more"){
                this.show720(this.videoData[1].url)
            }
            this.closeURL();
            this.openURL();
            this.$store.dispatch("getStaticData", barData);
          }else{
            localStorage.setItem("JDstatisticData", JSON.stringify({}));
            this.closeURL();
            this.openURL();
            this.$store.dispatch("getStaticData", {});
          }
        
      })
    },
    openURL() {
      var data = [{
        id: "201901301346",
        service_id: "web.browser.openModule"
      }];
      try {
        RESAFETY.callService(data);
      } catch (e) {
        console.log("连接失败,201901301346");
      }
    },
    closeURL() {
      var data = [{ service_id: "browser.close", title: "小微实证右侧" }];
      try {
        RESAFETY.callService(data);
      } catch (e) {
        console.log("连接失败，小微实证右侧");
      }
    },
    getStationData(val){
      
      this.dzOption = []
      let jdVal =val.length > 1 && val[0] == "全部"? JSON.parse(JSON.stringify(val)).splice(1, 2):val
      this.$axios.post("/StatisticalInfo/GetProList?baseId="+jdVal[0]).then(res => {
        if (res.code == 1) {
          if (res.data && res.data.length > 0) {
            this.dzOption = res.data;
         
          }
        }
      });
      this.baseOption.map(item=>{
        if(item.code==jdVal[0]){
          this.baseName = item.baseName
        }
      })
    },
    initOldArr(val){
      let nowarr = JSON.parse(JSON.stringify(val))
      if(nowarr.length>1&&nowarr[0]=="全部"){
        nowarr.shift()
      }
      this.nowBaseArr = nowarr
    },
    changeJD(val) {
      util3D.closeyemian("顶部标题");
      util3D.opHtmlBatchSend();
      this.baseName=""
      if(val.length > 1 ){
        this.form.baseDZ=[]
        this.initOldArr(JSON.parse(JSON.stringify(val)))
      }else if(val.length==1&&val[0]!=="全部"){
        this.form.baseDZ=["全部"]
        this.getStationData(val)
        this.initOldArr(JSON.parse(JSON.stringify(val)))
      }
      //初次选择去掉“全部”字段
      if (val.length > 1 && val[0] == "全部") {
        this.getStationData(val)
        this.form.baseDZ=["全部"]
        return val.splice(0, 1);
      } else if (val.length == 1 && val[0] == "全部") {
        return val;
      } else if (val.length == 0) {
        this.form.baseDZ=[]
        this.initOldArr(["全部"])
        return val.push("全部");
      }
    },
    changeDz(val){
      if (val.length > 1 && val[0] == "全部") {
        return val.splice(0, 1);
      } else if (val.length == 1 && val[0] == "全部") {
        return val;
      } else if (val.length == 0) {
        return val.push("全部");
      }
    },
    isActStation(name, is_station = "is_station") {
      return this[is_station] == name ? true : false;
    },
    toggleActStattion(name, text, unit,typeNum) {
      this.CloseRunMap()
      this.oprationMapServer(this.effctData.统计分析.关闭统计分析基地名称);
      this.is_station = text
      this["actStation"] = name;
      this.actType = text;
      this.actunit = unit;
      this.typeNum = typeNum;
      this.chooseArr = []   //属性数组清空
      this.actDep = ''      //属性值清空
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
  }
};
</script>
<style scoped>
.click {
  cursor: pointer;
}
</style>
<style lang="scss" scoped>
.station-bg {
  padding: 40px 26px 0 16px;

  .tie-box {
    display: flex;
    margin-top: 10px;

    .tie-left {
      display: inline-block;
      vertical-align: top;
      h4 {
        font-weight: normal;
        margin-right: 10px;
        font-size: 16px;
        line-height: 24px;
        color: #82c2eb;
      }
    }
    .tie-right {
      display: inline-block;
      //  margin-right: 26px;
    }
    .xiemian {
      cursor: pointer;
      width: 140px;
      height: 40px;
      // background-color: #022038;
      border-radius: 2px;
      border: solid 1px #006092;
      margin-bottom: 20px;
      text-align: center;
      label {
        font-size: 16px;
        line-height: 36px;
        color: #82c2eb;
      }
      &.active {
        border-color: #40aab9;
        background: rgba(64, 171, 185, 0.1);
        label {
          color: #fff;
          //  background-image: linear-gradient(90deg,
          //   rgba(18, 145, 211, 0.7) 0%,
          //   rgba(23, 181, 191, 0.7) 100%);
          border-radius: 2px;
          background: linear-gradient(to bottom, #8af0ff, #01d6eb);
          -webkit-background-clip: text;
          font-weight: bolder;
          color: transparent;
          -webkit-text-fill-color: transparent;
          text-fill-color: transparent;
          // text-shadow:0 0 20px rgba(5, 215, 236, 0.9);
        }
      }
    }
    .xiemianA{
      width: 100px;
    }
  }
  .stat {
    cursor: pointer;
    // position: relative;
    // left: 40px;
    // top: 20px;
    // width: 310px;
    height: 40px;
    background-image: linear-gradient(90deg, #1291d3 0%, #2679cd 100%);
    border-radius: 2px;
    text-align: center;
    span {
      font-size: 16px;
      line-height: 36px;
      color: #fff;
    }
  }
}

</style>
<style lang="scss">
   .station-bg{
    .el-tag.el-tag--info {
      color: #82c2eb;
      border: none;
      font-size: 14px;
      background: rgba(64, 171, 185, 0.1);
    }
    .el-select .el-tag__close.el-icon-close{
      display:none;
      background-color: #40aab9;
    }
    .el-tag.el-tag--info .el-tag__close {
      color: #fff;
    }
    .el-input.is-disabled .el-input__inner{
      background-color: #006092;
      border: 1px solid #006092;
    }
    .el-select .el-input.is-disabled .el-input__inner:hover,.el-input__inner:hover {
        border-color: #006092;
    }
    // #cdd5e0
   } 
  .el-select-dropdown.is-multiple .el-select-dropdown__item.selected {
    color: #fff !important;
    background-color: #40aab9 !important;
  }
  .el-select-dropdown{
    background-color: rgba(40, 53, 70, 1);
  }
  .stationsdowm{
     .el-scrollbar__wrap {
        overflow: scroll;
        margin: 0 -8px -8px 0 !important;
    }
    .el-select-dropdown__item {
    color: #fff !important;
}
  }
</style>
