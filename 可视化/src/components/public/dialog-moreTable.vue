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
<!--                <el-table-column prop="name" label="电站" width="180" align="center" v-if="baseName"></el-table-column>-->
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
export default {
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
        is_table:true
    };
  },
created() {
    let barDatas=localStorage.getItem('moreTable');
    let locData=JSON.parse(barDatas);
    this.stationAllData=locData.barData;
    this.DataType=locData.dataType;
    this.baseName=locData.baseName.trim();
    this.is_table = locData.is_table
  },
  mounted() {
      this.$nextTick(()=>{     
        this.resizeWorldMapContainer()
         this.drawChart()
         this.tableInit()
      })
   
  },

  methods: {
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
          bottom: 10,
          containLabel: true
        },
       
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          // show: legend.length>1?true:false,
          data: legend,
            icon: "circle",
            right: "8%",
            top: "0%",
          textStyle: {
            color: "#82c2eb"
          },
          itemWidth: 18,
          itemHeight:10,
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
      };
      mychart.setOption(option);
      this.initBg(option);
      window.addEventListener("resize", function(){
          mychart.resize();
           _this.resizeWorldMapContainer()
        });
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
              bottom: 10,
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
                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: "rgba(18, 117, 179,0)"
                        },
                        {
                            offset: 0.5,
                            color: "rgba(18, 117, 179,.5)"
                        },
                        {
                            offset: 1,
                            color: "rgba(18, 117, 179,0)"
                        }
                    ])
                    // barBorderRadius: 10,
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

