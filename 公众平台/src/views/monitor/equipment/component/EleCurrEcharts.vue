<template>
  <div class="HLboxEcharts">
    <el-checkbox v-model="checkstate" v-if="isShow">全选</el-checkbox>
    <div class="containter2" id="containter2" style="width:100%;height:300px;"></div>
  </div>
</template>

<script>
export default {
  props:['chartData','currCode'],
  data() {
    return {
      checkstate: true,
      myEcharts: null,
      result:[],
      legendData:[],
      isShow:false,
      xaxisarr:[],
    }
  },
  watch: {
    'checkstate': function() {
      this.drowEcharts();
    },
    chartData(newVal){
      if(!newVal||!newVal.length) return;
      this.xaxisarr=this.xAxisData;
      let arr1=newVal.map(i=>i.zlnum);
      let arr2=[...new Set(arr1)];
      this.legendData=[];
      this.result=arr2.map(i=>{
        this.legendData.push('i'+i);
        return {
          zlnum:i,
          data:this.xaxisarr.map(n=>{
            let da=newVal.filter(item=>item.zlnum==i&&item.timestamp.length==19&&item.timestamp.substr(-8,5)==n);
            if(da.length>0){
              return da[0].zlcurr;
            }
            return null;
          })
        }
      })

      this.drowEcharts();
    }
  },
  computed: {
    legendSelect() {
      let obj = {};
      if (this.checkstate) {
        this.result.map(item => {
          this.$set(obj, 'i'+item.zlnum, true)
        })
      } else {
        this.result.map(item => {
          this.$set(obj,'i'+ item.zlnum, false)
        })
      };
      return obj
    },
    xAxisData() {
      function add0(m){return m<10?'0'+m:m };
      // let startTime=new Date(localStorage.startTime);
      // let endTime=new Date(localStorage.endTime);
       let startTime=new Date('2019-06-12T05:00:00');
      let endTime=new Date("2019-06-12T19:00:00");
      let date1=new Date('2016/03/1 '+startTime.getHours()+":"+startTime.getMinutes());
      let date2=new Date('2016/03/1 '+endTime.getHours()+":"+endTime.getMinutes());
      let datearr=[];
      for(var i=date1;i<=date2;i.setMinutes(i.getMinutes()+5)){
        datearr.push(add0(i.getHours())+":"+add0(i.getMinutes()));
      }
      return datearr;
    },
    seriesData() {
      return this.result.map((item) => {
        let data = item.data;
        return {
          name: 'i'+item.zlnum,
          type: 'line',
          smooth: true,
          data: data,
          yAxisIndex: 0,
          // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0,
                color: 'rgba(255,193,26,0.1)' // 0% 处的颜色
              }, {
                offset: 1,
                color: 'rgba(255,193,26,0.01)' // 100% 处的颜色
              }],
              globalCoord: false // 缺省为 false
            }
          },
          showSymbol: true,
          symbolSize: 8,
          //设定实心点的大小
          animation: true,
        }
      })

    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", () => {
        setTimeout(() => {
          this.myEcharts.resize();
        }, 200)
      });
    })

  },

  methods: {
    drowEcharts() {
      this.isShow=true;
      var echarts=this.$echarts;
      this.myEcharts = echarts.init(document.getElementById('containter2'));
      let option = {
        color: ["#FFFF00", "#FF0000", "#E6E6FA", "#DA70D6", "#BFEFFF", "#B3EE3A", "#8B3A3A", "#008B8B", "#CD1076", "#DB7093", "#CDAD00", "#9A32CD", "#707070", "#3CB371", "#FAEBD7", "#FFEC8B", "#8B8989", "#228B22"],
        // color:this.colorData,
        title: {
          text: this.currCode?this.currCode+'实时电流':'组串实时电流',
          left: 'center',
          top: 0,
          textStyle: {
            color: "#666"
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: this.legendData,
          icon: 'circle',
          itemHeight: 8,
          top: '25px',
          right: "150px",
          textStyle: {
            color: "#666"
          }
        },
        grid: {
          left: '20px',
          right: '60px',
          bottom: '20px',
          top: '50px',
          containLabel: true,
          show: false,
          borderWidth: 1,
          borderColor: 'rgb(46, 85, 138)'
        },
        dataZoom : [
          // {
          //     type: 'slider',
          //     show: true,
          //     start: 94,
          //     end: 100,
          //     handleSize: 8
          // },
          {
            type: 'inside',
            start: 0,
            end: 100
          },
          // {
          //     type: 'slider',
          //     show: true,
          //     yAxisIndex: 0,
          //     filterMode: 'empty',
          //     width: 12,
          //     height: '70%',
          //     handleSize: 8,
          //     showDataShadow: false,
          //     left: '93%'
          // }
        ],
        xAxis: {
          type: 'category',
          boundaryGap: true,
          // name: '时间(h)',
          data: this.xaxisarr,
          nameLocation: 'end',
          nameTextStyle: {
            color: '#666',
            fontSize: 14,
            padding: [25, 0, 0, 0],
          },
          splitLine: { // 分隔线
            show: true,
            lineStyle: {
              color: 'rgb(202,215,204)',
            }
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(46,85,138,0)',

            }
          },
          axisLabel: {
            color: '#adadad'
          },
          axisTick: {
            show: true,
          },
          axisPointer:{
            type:'line',
            lineStyle:{
              width :40,
              color:'rgba(135,206,250,0.05)'
            }
          }
        },
        yAxis: {
          type: 'value',
          name: '实时电流(A)',
          nameTextStyle: {
            color: '#666',
            fontSize: 14,
          },
          splitLine: { // 分隔线
            show: true,
            lineStyle: {
              type: 'dashed',
              color: 'rgb(202,215,204)',
            }
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(46,85,138,0)',
            }
          },
          axisLabel: {
            color: '#adadad'
          },
          axisTick: {
            show: false,
          }
        },
        series: this.seriesData
      };

      option.legend.selected = this.legendSelect;

      this.myEcharts.setOption(option);
    },
  }
}
</script>
