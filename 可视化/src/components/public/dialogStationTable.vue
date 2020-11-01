<template>
  <el-dialog
    :title="baseName?`${baseName}-${DataType}数据`:DataType"
    :visible.sync="dialogVisible"
    @close="dialogClose"
    append-to-body
    fullscreen=true
    :show-close="showclose"
    class="dialogBarTable"
  >
    <div class="barHeight" v-if="isShowTable" >
        <div id="bartable" class="full"></div>
        <div id="bartablebg" class="full full-bg"></div>
    </div>
    <!-- <YearTab /> -->
    <div class="tableBox" v-if="is_table">
       
        <div class="tableTitle">
            <p>数据表格</p>
        </div>
        <template>
            <div class="table-box">
                <el-table :data="tableData" border style="width: 100%" v-if="isShowTable" height="289px">
                <el-table-column type="index" label="序号" width="100" align="center"></el-table-column>
                <el-table-column prop="name" label="基地" width="180" align="center" v-if="!baseName"></el-table-column>
                <el-table-column prop="baseName" label="基地" width="260" align="center" v-if="baseName"></el-table-column>
                <el-table-column prop="name" label="电站" width="180" align="center" v-if="baseName"></el-table-column>
                <el-table-column
                    v-for="(item,i) in tableCol"
                    :key="i"
                    :prop="item.prop"
                    :label="item.label"
                    align="center"
                ></el-table-column>
                </el-table>
                <div v-if="!isShowTable" style="text-align:center;">暂无数据</div>
            </div>
        </template>
        </div>
  </el-dialog>  
</template>
<script>
import YearTab from "./tabYear"
export default {
  components:{YearTab},
  props: {
    rotate: {
      default: false
    },

    index: {
      default: 0
    },
    theme: {
      default: function() {
        return [ "#51a4ff","#17e0be","#9ee596","#f2ff06","#f0aef9","#17595a","#004d21", "#9c8300", "#62915a","#9fa603","#7c5a81"];
      }
    },
    max: {
      default: ""
    },
    barWidth: {
      default: 12
    },
    showLegend: {
      default: false
    }
  },
  data() {
    return {
        showclose:false,
        isShowTable:true,//表格显示
        dialogVisible: true,
        mychart: null,
        stationAllData:{},
        tableData:[],
        tableCol:[],
        DataType:"",
        baseName:"",
        is_table:true,
        yearArr: ["2015 ","2016","2017","2018","2019"],
        mychart:null,
        option:null,
        currentIndex:5
    };
  },
created() {
    let barDatas = localStorage.getItem('JDstatisticData');
    let locData = JSON.parse(barDatas);
    this.allData = JSON.parse(barDatas)
    this.stationAllData = locData.barData;
    this.DataType = locData.dataType;
    this.baseName = locData.baseName.trim();
    this.is_table = locData.is_table
  },
  mounted() {
    this.getYear()
    let _that = this
      this.$nextTick(()=>{     
        this.resizeWorldMapContainer()
         this.drawChart()
         this.tableInit()
          this.mychart.on('timelinechanged', function (timeLineIndex) {
            
          let timeVal = _that.yearArr[timeLineIndex.currentIndex].substring(0,4);
          _that.currentIndex = timeLineIndex.currentIndex;
          _that.getStaticData(timeVal)
			});
      })
   
  },

  methods: {
    		//获取年份
		getYear(){
			let nowYear = new Date().getFullYear();
			let yearNum = new Array(6).fill({}).map((item,index)=>{
				return nowYear - index +"年"
			})
			this.yearArr = yearNum.reverse();
		},
    tableInit(){
        this.tableData =[]
        let tabledata= [],tableCol=[]
        let _this = this
        _this.stationAllData.xAsixData.map((item,index)=>{
            tabledata.push({
                name:item,
                baseName:this.baseName,
                valueOne:_this.stationAllData.dataArr[0].data[index],
                valueTwo:_this.stationAllData.dataArr[1] == undefined?"": _this.stationAllData.dataArr[1].data[index],
                valueThree:_this.stationAllData.dataArr[2] == undefined?"":_this.stationAllData.dataArr[2].data[index],
                valueFour:_this.stationAllData.dataArr[3] == undefined?"":_this.stationAllData.dataArr[3].data[index],
            })
        })
        let indexArr = ["valueOne","valueTwo","valueThree","valueFour"]
        _this.stationAllData.dataArr.map((item,index)=>{
            let lableSTr = ""
            if(_this.stationAllData.unit[index]==undefined){
                lableSTr = item.name+`(${_this.stationAllData.unit[0]})`
            }else if(_this.stationAllData.unit[index] ==""){
                lableSTr = item.name
            }else{
                lableSTr = item.name+`(${_this.stationAllData.unit[index]})`
            }
            tableCol.push({
                label: lableSTr,
                prop:indexArr[index]
            })
        })
        this.tableData= tabledata
        this.tableCol= tableCol
    },
    drawChart() {
      let _that = this
      let mychart = this.$echarts.init(document.getElementById("bartable"));

      
      var yAxis = [
        {
          type: "value",
          name: this.stationAllData.unit[0],
          splitNumber: 3,
          nameTextStyle: {
            color: "#82c2eb",
            fontSize: 12
          },
          axisLabel: {
            color: "#82c2eb",
            fontSize: 14
          },
          axisTick: {
            show: false
          },

          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(0, 131, 199, 0.4)"
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(0, 131, 199, 0.2)"
            }
          }
        }
      ];
      var series = [],legend = [];
      for (var i = 0; i < this.stationAllData.dataArr.length; i++) {
        legend.push(this.stationAllData.dataArr[i].name);
        if(this.stationAllData.dataArr[i].yAxisIndex==1){
          let rYaxis = JSON.parse(JSON.stringify(yAxis[0]))
          rYaxis.name = this.stationAllData.unit[1]
          yAxis.push(rYaxis)
        }
        let _this=this;
        series.push({
          type: this.stationAllData.dataArr[i].type,
          name: this.stationAllData.dataArr[i].name,
          data: this.stationAllData.dataArr[i].data,
          barMaxWidth: this.barWidth,
          yAxisIndex: this.stationAllData.dataArr[i].yAxisIndex || 0,
          axisPointer: {
            lineStyle: {
              color: "rgba(0,192,255,0.57)"
            }
          },
          itemStyle: {
            // normal: {
              color: this.theme[i]
              // color: (params)=> {            
              //        // 给出颜色组     
              //         var colorList = ['#ff9d00','#17e0be','#0066ff'];
              //         return params.dataIndex>(_this.dataArr[0].data.length-4)?colorList[_this.dataArr[0].data.length-1-params.dataIndex]:'#51a4ff'
              // }
            // }
          },
          label: {
            normal: {
              show: false,
              position: "top",
              color: this.theme[1],
              fontFamily: "DINOT",
              fontSize: "18px"
            },
            emphasis: {
              color: "#01cfee"
            }
          }
        });
      }
      let option = {
        baseOption:{
          timeline: {
            data: this.yearArr,
            axisType: 'category',
            rewind:true,
            autoPlay: false,
            currentIndex:this.currentIndex,
            playInterval: 1000,
            left: 'center',
            bottom: '0%',
            width: '95%',
            label: {
              normal: {
                textStyle: {
                  color: '#7fd4ff'
                }
              },
              emphasis: {
                textStyle: {
                  color: '#7fd4ff'
                }
              }
            },
            symbolSize: 15,
            lineStyle: {
              color: '#7fd4ff'
            },
            itemStyle:{
              normal:{
                color:'#7fd4ff'
              },
              emphasis:{
                color:'#7fd4ff'
              }
            },
            checkpointStyle: {
              borderColor: '#7fd4ff',
              color: '#7fd4ff',
              borderWidth: 5
            },
            controlStyle: {
              showPlayBtn: false,
              showNextBtn: true,
              showPrevBtn: true,
              normal: {
                color: '#7fd4ff',
                borderColor: '#7fd4ff'
              },
              emphasis: {
                color: '#a7fd4ffaa',
                borderColor: '#7fd4ff'
              }
            },

          },
          title: {
            top: 10,
            left: 10,
            textStyle: {
              color: "#82c2eb",
              fontFamily: "PingFang SC",
              fontWeight: "normal",
              fontSize: 14
            }
          },
          color:this.theme,
          grid: {
            top: 40,
            left: 40,
            right: 30,
            bottom: 80,
            containLabel: true
          },
          dataZoom: {
            show: true,
            type: "inside"
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow"
            }
          },
          legend: {
            show: legend.length>1?true:false,
            data: legend,
            icon: "circle",
            align: "left",
            left: "center",
            top: "1%",
            textStyle: {
              color: "#82c2eb"
            },
            itemWidth: 6,
            itemHeight: 6,
            itemGap: 20
          },
          xAxis: [
            {
              type: "category",
              data: this.stationAllData.xAsixData,
              axisLabel: {
                interval:0,
                color: "#82c2eb",
                fontSize:14,
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: "rgba(0, 131, 199, 0.2)"
                }
              },
              axisTick: false
            }
          ],
          yAxis: yAxis,
          series: series
        },
    
        options:[{
          xAxis: [
            {
              type: "category",
              data: this.stationAllData.xAsixData,
              axisLabel: {
                interval:0,
                color: "#82c2eb",
                fontSize:14,
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: "rgba(0, 131, 199, 0.2)"
                }
              },
              axisTick: false
            }
          ],
          yAxis: yAxis,
          series: series
        }]
      };

      if(this.echarts!==null){
        this.mychart = mychart
      }
      mychart.setOption(option);

      this.initBg(option.options[0]);
      window.addEventListener("resize", function(){
          mychart.resize();
           _this.resizeWorldMapContainer()
        });
    },
     getStaticData(yaernum) {
      
      let baseArr = this.allData.baseCode
      let baseDZ = this.allData.baseDZ
      let baseName = this.allData.baseName;
      let paramsData ={}
      let paramsDataStr=""//接口参数拼接
      if(this.allData.actStation == "GetAttenuation"){
         paramsData = {
          baseCode: baseArr,
          projectCode:baseDZ,
          DateTime: yaernum,

        };
        paramsDataStr=`DateTime=${paramsData.DateTime}&baseCode=${paramsData.baseCode}&projectcode=${paramsData.projectCode}&Type=`
        this.attenuationFuc(paramsDataStr,baseArr,baseDZ)
        return
      }else{
         paramsData = {
          baseCode: baseArr,
          projectCode:baseDZ,
          DateTime: yaernum,
        };
        paramsDataStr=`DateTime=${paramsData.DateTime}&baseCode=${paramsData.baseCode}&projectcode=${paramsData.projectCode}`
      }
      let _this = this;
      this.$axios.post("/StatisticalInfo/" + this.allData.actStation+"?"+paramsDataStr).then(res => {
        if (res.code == 1) {
          if (res.data.records && res.data.records.length >= 0) {
            let recordsData = JSON.parse(JSON.stringify(res.data.records)) ;
            let typenum= this.allData.typeNum
            recordsData.sort(function(a,b){
              let typeStr = typenum!==""? "value" + typenum:"value0";
              return b[typeStr]-a[typeStr]  
            })
            let axisData = [], dataArr = [];
            if (recordsData.length >= 0) {
              let seriesDatas = [], xasixData = [];
                  let name =this.allData.actStation !=="GetInverterConversionRate"? res.data["instructionsValue" + this.allData.typeNum]:res.data["indicatorsName"]
                  seriesDatas.push({
                    name: name,
                    type: "bar",
                    data: [],
                  });
                recordsData.forEach(item => {
                  this.allData.actStation =="GetAttenuation"||this.allData.actStation =="GetBasePrice"?xasixData.push(item.baseName):xasixData.push(item.name);
                    let values = this.allData.typeNum!==""? item["value" + this.allData.typeNum]:item["value0"];
                    seriesDatas[0].data.push(values);
                });
              let localbarData = {
               
                is_table:true,
                baseArr:baseArr,
                baseDZ:baseDZ,
                actStation:this.allData.actStation,
                baseName:baseName,
                dataType: _this.allData.dataType,
                barData: {
                  unit: _this.allData.barData.unit,
                  xAsixData: xasixData,
                  dataArr: seriesDatas
                }
              };
              this.stationAllData = localbarData.barData;
              this.DataType = localbarData.dataType;
              this.baseName = localbarData.baseName.trim();
              this.is_table = localbarData.is_table
              this.drawChart()
              this.tableInit()
             
            }
          }
        }
      });
    },
    //处理设备中衰减率及转换率
    attenuationFuc(datastr,baseArr,baseDZ){
      let attenuation =parseInt(this.allData.typeNum)+1
      let promise1 = this.$axios.post("/StatisticalInfo/" + this.allData.actStation+"?"+datastr+attenuation).then(res=>{
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
            let localbarData = {
              is_table:true,
              baseArr:baseArr,
              baseDZ:baseDZ,
              actStation:this.allData.actStation,
              dataType: this.allData.dataType,
              baseName : this.allData.baseName,
              barData: {
                unit: this.allData.barData.unit,
                xAsixData: xasixData,
                dataArr: seriesDatas
              }
            };
              this.stationAllData = localbarData.barData;
              this.DataType = localbarData.dataType;
              this.baseName = localbarData.baseName.trim();
              this.is_table = localbarData.is_table
              this.drawChart()
              this.tableInit()
          }
        
      })
    },
    resizeWorldMapContainer(){
      if(this.is_table) return
      document.getElementById("bartable").style.height = window.innerHeight-160+'px';
      document.getElementById("bartablebg").style.height = window.innerHeight-160+'px';
    },
    getMaxArr(arr) {
      let max = Math.max(...arr);
      let maxArr = arr.map(num => {
        return max;
      });
      return maxArr;
    },
    getMaxSeriseData(data, index = 1) {
      let newArr = data.map(item => {
        if (item.type == "bar" && item.xAxisIndex != index) {
          let dataArr = this.getMaxArr(item.data);
          return dataArr&&dataArr.length > 0 ? dataArr[0] : 0;
        } else {
          return false;
        }
      });
      let maxArr = [];
      newArr.forEach(item => {
        if (item !== false) {
          maxArr.push(item);
        }
      });
      return this.getMaxArr(maxArr);
    },
    initBg(option) {
        let echarts = this.$echarts;
        let newyAxis = option.yAxis.map(item => {
            return {
            type: "value",
             splitNumber: 3,
            axisLabel: {
                color: "rgba(130,194,235)",
                fontSize: 14
            },
            axisTick: {
                show: false
            },

            axisLine: {
                show: false,
                lineStyle: {
                color: "rgba(0, 131, 199, 0)"
                }
            },
            splitLine: {
                show: false,
                lineStyle: {
                color: "rgba(0, 131, 199, 0.2)"
                }
            }
            }
        });
        let optionBg = {
            title: {
              show: false
            },
            legend: {
              show: false
            },
            dataZoom: {
              show: true,
              type: "inside"
            },
            grid: {
              top: 40,
              left: 40,
              right: 30,
              bottom: 80,
              containLabel: true
            },
            xAxis: [
            {
                type: "category",
                data: this.stationAllData.xAsixData,
                axisLabel: {
                color: "rgba(0, 131, 199, 0)",
                fontSize:14,
                },
                axisLine: {
                show: true,
                lineStyle: {
                    color: "rgba(0, 131, 199, 0)"
                }
                },
                // avoidLabelOverlap: true,
                axisTick: false
            }
            ],
            yAxis: newyAxis
        };
        let maxData = this.getMaxSeriseData(option.series, 1);
        let maxDatas = this.stationAllData.xAsixData.map(value => {
            return maxData[0]
        });
        let mychartBg = echarts.init(document.getElementById("bartablebg"));
        var bDseries = []
            bDseries=[{
            name: "",
            type: "bar",
            color: "#00BFFF",
            tooltip: {
                show: false
            },
            barWidth: this.barWidth * option.series.length + 12,
            barGap: "-100%",
            itemStyle: {
                normal: {
                    color:"rgba(18, 117, 179,.3)"
                }
            },
            data: maxDatas
            }
           ];
           this.stationAllData.dataArr.map(item=>{
             if(item.yAxisIndex==1){
               bDseries.push(
                  {
                    name: "",
                    type: "line",
                    symbol:'none',
                    yAxisIndex:1,
                    itemStyle: {
                        color:"rgba(18, 117, 179,0)"
                    },
                    data: this.stationAllData.dataArr.pop().data
                  }
               )
             }
           })
        optionBg.series = bDseries;
        mychartBg.setOption(optionBg);
        window.addEventListener("resize", function(){ mychartBg.resize();});
    },
    dialogClose() {
        this.$parent.dialogTypeName = null;
    },
  }
};
</script>
<style lang="scss">
.dialogBarTable{

  .el-dialog__title{
    color: #fff;
  }
  .el-dialog{
    background-color: rgba(0,0,0,0.1);
    background: url(../../assets/img/bg1_03.png) no-repeat;
    background-size: 100% 100%;
  }
  .barHeight {
    width: 100%;
    height: 600px;
    position: relative;
  }
  .full {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 9;
  }
  .full-bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    z-index: 0;
    
  }
  .tableBox{
    //   height: 300px;
    .tableTitle{
        font-size: 18px;
        line-height: 24px;
        color: #fff;
        margin-bottom: 24px;
    }
    .el-table th, .el-table tr {
        color: #fff;
        background-color: rgb(18,50,88);
    }
    .el-table--enable-row-hover .el-table__body tr:hover>td {
        background-color: #124c75;
    }
    .el-table__body-wrapper,.el-table__header-wrapper{
      background-color: rgb(18,50,88);
    }
  }
}
</style>

