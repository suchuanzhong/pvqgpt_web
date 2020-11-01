<template>
  <div ref="ids" style="height: 100%;width:100%;"></div>
</template>
<script>
export default {
  components: {},
  props: {
    ids: {
      default: "LightSensors"
    },
    LeftData: {
      default: function() {
        return [
          {
            name: "北京",
            value: 100
          }
        ];
      }
    },
    rightData: {
      default: function() {
        return [
          {
            name: "北京",
            value: 100
          }
        ];
      }
    },
    yname: {
      default: ""
    },
    max: {
      default: ""
    }
  },
  data() {
    return {};
  },
  watch: {},
  mounted() {
    this.mychart = this.$echarts.init(this.$refs.ids);
    this.drawChart();
  },
  computed: {},
  methods: {

formatValue(obj) {
    return formatNumber(obj.value);
},

formatNameValue (obj) {
    return obj.name+"："+formatNumber(obj.value);
},

formatNumber(n){
   var b=parseInt(n).toString();
   var len=b.length;
   if(len<=3){return b;}
   var r=len%3;
   return r>0?b.slice(0,r)+","+b.slice(r,len).match(/\d{3}/g).join(","):b.slice(r,len).match(/\d{3}/g).join(",");
},
    drawChart() {

      let echarts = this.$echarts;
      let giftImageUrl= "/img/circle-bg.png";
      let option = {
        title: {
          text: this.title,
          left: 88,
          top: 0,
          bottom: 20,
          textStyle: {
            color: "#82c2eb",
            fontFamily: "PingFang SC",
            fontSize: 14
          },
          subtext: this.subText
        },
        graphic:{
          elements:[


                  {
                  type: "image",
                  style: {
                        image: giftImageUrl,
                        width: 146,
                        height: 146
                      },
                  left: "17%",
                  top: "3%"
                }
                // {
                //   type: "image",
                //   style: {
                //         image: giftImageUrl,
                //         width: 146,
                //         height: 146
                //       },

                //   right: "8%",
                //   top: "4%"
                // }
          ]
        },
        grid: {
          top: "30px",
          left: "6%",
          right: "6%",
          bottom: "26%",
          containLabel: true
        },
        legend: {
          bottom: "0px",
          left:'8px',
          textStyle:{
            color:'#fff'
          },
          // selectedMode:false,
          data: ["单晶", "多晶", "第一批次", "第二批次", "第三批次"],
          itemWidth: 5,
			    itemHeight: 5,
        },
        series: [
          {
            type: "pie",
            data: this.LeftData,
            label: {
              normal: {
                position: "inner",
                textStyle: {},
                formatter:(param) => {
                  return param.percent + '%'
                }
              }
            },
            radius: "40%",
            center: ["20%", "50%"],
            color: ["#51a4ff", "#17e0be"]
          },
          {
            color: ["#e8386f", "#0061f3", "#4d9eff"],
            // "name" : "贡献明细",
            type: "pie",
            data: this.rightData,
            label: {
              normal: {
                position: "inner",
                textStyle: {},
                formatter:(param) => {
                  return param.data.value
                }
              }
            },
            radius: "67%",
            center: ["50%", "45%"]
          }
        ]
      };
      this.mychart.setOption(option);
      // this.mychart.on('click',function(params){
      //     console.log(params);
      // });
    }
  }
};
</script>
<style lang="scss" scoped>
#LightSensor {
  height: 180px;
}
</style>

