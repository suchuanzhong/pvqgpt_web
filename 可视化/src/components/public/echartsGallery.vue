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
    legendData:{
        default:function(){
            return ['第一批', '第二批', '第三批']
        }
    },
    galleryData: {
      default: function() {
        return [
            {
                value: 100,
                name: '第一批'
            },
            {
                value: 100,
                name: '第二批'
            },
            {
                value: 100,
                name: '第三批'
            }
        ];
      }
    }
  },
  data() {
    return {};
  },
  mounted() {
    this.mychart = this.$echarts.init(this.$refs.ids);
    this.drawChart();
  },
  computed: {},
  methods: {

    // formatValue(obj) {
    //     return formatNumber(obj.value);
    // },

    // formatNameValue (obj) {
    //     return obj.name+"："+formatNumber(obj.value);
    // },

    // formatNumber(n){
    // var b=parseInt(n).toString();
    // var len=b.length;
    // if(len<=3){return b;}
    // var r=len%3;
    // return r>0?b.slice(0,r)+","+b.slice(r,len).match(/\d{3}/g).join(","):b.slice(r,len).match(/\d{3}/g).join(",");
    // },
    drawChart() {

      let echarts = this.$echarts;
      let giftImageUrl= "/img/circle-bg.png";
      let option = {
        // backgroundColor: '#031845',
        //  color: ['#00FFFF', '#44EAB1', '#7BDD43', '#FEBE12', '#EBEC2F', '#FF7C44', '#FA3E5F', '#6635EF', '#FFAFDA'],
        tooltip: {
            trigger: 'item',
            formatter: "{b}: {c} ({d}%)",
            // formatter: "{a} <br/>{b}: {c} ({d}%)",
            position: 'inside'
        },
        graphic: {
            elements: [{
                type: 'image',
                style: {
                    image: giftImageUrl,
                    width: 100,
                    height: 100
                },
                left: 'center',
                top: 'center'
            }]
        },
        title: {
            text: '基地装机',
            left: 'center',
            top: 'center',
            padding: [24, 0],
            textStyle: {
                color: '#fff',
                fontSize: 14,
                align: 'center'
            }
        },
        legend: {
            show:this.legendData.length>4?false:true,
            orient: 'horizontal',
            icon: 'circle',
            top: 0,
           
            // x: 'center',
            data: this.legendData,
            textStyle: {
                color: '#fff'
            },
            itemWidth: 5,
            itemHeight: 5,
            itemGap: 5
        },
        series: [
            {
                name: '',
                type: 'pie',
                hoverAnimation: false,
                legendHoverLink: false,
                radius: ['38%', '45%'],
                color: ['#006495', '#1D5F84', '#255C6D', '#3C5C67', '#40486C', '#3F3C73', '#403D84', '#1F3A8D', '#0B3B77'],
               
                label: {
                    normal: {
                        position: 'inner'
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    },

                },
                tooltip: {
                    show: false,


                },

                data: []
            },
            {
                name: '',
                type: 'pie',
                legendHoverLink: this.galleryData.length>10?false:true,
                radius: ['50%', '80%'],
                 color:["#51a4ff","#0066ff","#17e0be","#9ee596","#f2ff06","#f0aef9","#17595a","#004d21","#9c8300","#62915a","#9fa603","#7c5a81"],
                labelLine: {
                    normal: {
                        show: false,
                        length: 5,
                        length2: 5,
                        lineStyle: {
                            width: 2
                        }
                    }
                },
                label: {
                    normal: {
                        show:false,
                        formatter: '{c|{c}}\n{hr|}\n{d|{d}%}',
                        // formatter: '{c|{c}}\n{hr|}\n{d|{d}%}',
                        rich: {
                            b: {
                                fontSize: 16,
                                color: '#12EABE',
                                align: 'left',
                                padding: 4
                            },
                            hr: {
                                borderColor: '#12EABE',
                                width: '100%',
                                borderWidth: 2,
                                height: 0
                            },
                            d: {
                                fontSize: 14,
                                color: '#fff',
                                align: 'center',
                                padding: 4
                            },
                            c: {
                                fontSize: 14,
                                color: '#fff',
                                align: 'center',
                                padding: 4
                            }
                        }
                    }
                },
                data: this.galleryData
            }
        ]
      };
      this.mychart.setOption(option);
    }
  }
};
</script>
<style lang="scss" scoped>
#LightSensor {
  height: 180px;
}
</style>

