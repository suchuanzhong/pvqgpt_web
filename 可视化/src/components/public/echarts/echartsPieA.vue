<template>
  <div class="barHeight">
    <div :id="ids" class="full"></div>
    <div :id="ids+'bg'" class="full full-bg"></div>
  </div>
</template>
<script>
export default {
    props: {
        ids: {
        default: "mytwopieData"
        }
    },
    data(){
        return{}
    },
    mounted() {
        this.drawCharts();
    },
    methods:{
        drawCharts() {
            this.mychart = this.$echarts.init(document.getElementById(this.ids));
        
            let option = {
                // tooltip: {
                //     trigger: 'item',
                //     formatter: '{a} <br/>{b}: {c} ({d}%)'
                // },
                color:[
                    "#51a4ff",
                    "#0066ff",
                    "#17e0be",
                    "#9ee596",
                    "#f2ff06",
                    "#f0aef9",
                    "#17595a",
                    "#004d21",
                    "#9c8300",
                    "#62915a",
                    "#9fa603",
                    "#7c5a81"
                ],
                legend: {
                     data: [
                            {
                            name: "第一批次",
                            icon: "rect"
                            },
                            {
                            name: "第二批次",
                            icon: "rect"
                            },
                            {
                            name: "第三批次",
                            icon: "rect"
                            }
                            // {
                            // name: "累计并网容量",
                            // icon: "rect"
                            // },
                            // {
                            // name: "在建容量",
                            // icon: "rect"
                            // },
                            // {
                            // name: "未开工容量",
                            // icon: "rect"
                            // }
                        ],
                        // right: 0,
                        // left: 150,
                        top: -5,
                        bottom:50,
                        textStyle: {
                            color: "#82c2eb",
                            fontSize: 14
                        },
                        itemWidth: 10,
                        itemHeight: 4,
                        itemGap: 10
                },
                series: [
                    // {
                    //     name: '',
                    //     type: 'pie',
                    //     // selectedMode: 'single',
                    //     radius: [0, '40%'],
                    //     hoverAnimation:false,
                    //     label: {
                    //         position: 'outside'
                    //     },
                    //     labelLine: {
                    //         show: true,
                    //         length:20,
                    //         length2:20
                    //     },
                    //     top:50,
                    //     data: [
                    //         {value: 1223.5, name: '累计并网容量'},
                    //         {value: 191.5, name: '在建容量'},
                    //         {value: 35, name: '未开工容量'}
                    //     ]
                    // },
                    {
                        name: '',
                        type: 'pie',
                        radius: ['0%', '80%'],
                        label: {
                             position:'inside'
                        },
                        
                        data: [
                            {value: 335, name: '第一批次'},
                            {value: 310, name: '第二批次'},
                            {value: 234, name: '第三批次'}
                        ]
                    }
                ]
            };
            this.mychart.setOption(option);
            // this.initBg(option);
        },
    }
}
</script>
<style scoped>
.barHeight {
  height: 180px;
  position: relative;
}
.full {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 9;
}
.full-bg {
  position: absolute;
  z-index: 0;
  top: 0;
  width: 100%;
  height: 100%;
  left: 0;
}
</style>