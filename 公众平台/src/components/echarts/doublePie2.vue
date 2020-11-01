<template>
    <div :id="ids" style="height: 100%;"></div>
</template>

<script>
    export default {
        props: {
            ids: {
                default: "echartsPolar"
            },
            data1: {
                //中心饼图数据
                default: function() {
                    return [

                    ]
                }
            },
            data2: {
                //圆环数据
                default: function() {
                    return [
                        // {value:210, name:'邮件营销'},
                        // {value:190, name:'视频广告'},

                    ]
                }
            }
        },
        methods: {
            initEcharts() {
                // var echarts = this.$echarts
                var option = {
                    tooltip: {
                        show: true,
                        trigger: "item",
                        formatter: "{b} : <br />{d}%  ({c})",
                        position: function(point, params, dom, rect, size) {
                            // 鼠标坐标和提示框位置的参考系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
                            // 提示框位置
                            var x = 0; //x轴
                            var y = 0; //y轴
                            // 当前鼠标位置
                            var pointX = point[0];
                            var pointY = point[1];
                            // 提示框大小
                            var boxWidth = size.contentSize[0];
                            var boxHeight = size.contentSize[1];
                            // boxWidth > pointX 说明鼠标左边放不下提示框
                            if (boxWidth > pointX) {
                                x = 5;
                            } else {
                                //左边放的下
                                x = pointX - boxWidth;
                            }
                            // boxHeight > pointY说明鼠标上边放不下提示框
                            if (boxHeight > pointY) {
                                y = 5;
                            } else {
                                //上边放得下
                                y = pointY - boxHeight;
                            }
                            return [x, y];
                        }
                    },
                    legend: {
                        orient: "vertical",
                        icon: "circle",
                        bottom: 20,
                        x: "center",
                        textStyle: {
                            color: "#fff"
                        },
                        show: false
                    },
                    color: ["#00efff", "#fe7e00", "#978ffd"],
                    series: [
                        {
                            //扇形
                            name: "访问来源",
                            type: "pie",
                            radius: "66%",
                            center: ["50%", "50%"],
                            data: this.data1,
                            label: {
                                normal: {
                                    show: false
                                }
                            },
                            itemStyle: {
                                normal: {
                                    borderWidth: 5,
                                    borderColor: "#fff",
                                    color: function(params) {
                                        var colorList = ["#2bd099", "#1096ff", "#7e91b9", "#f03a3a", "#FE8463", "#72fae2"]
                                        return colorList[params.dataIndex]
                                    }
                                },
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: "rgba(0, 0, 0, 0.5)"
                                }
                            }
                        },
                        {
                            //圆环
                            type: "pie",
                            radius: ["74%", "88%"],
                            center: ["50%", "50%"],
                            data: this.data2,
                            label: {
                                normal: {
                                    show: false
                                }
                            },
                            itemStyle: {
                                normal: {
                                    borderWidth: 5,
                                    borderColor: "#fff",
                                    color: function(params) {
                                        var colorList = ["#fe7e00", "#00efff", "#978ffd", "#ce6af9", "#FE8463", "#72fae2"]
                                        return colorList[params.dataIndex]
                                    }
                                },
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: "rgba(0, 0, 0, 0.5)"
                                }
                            }
                        }
                    ]
                }

                let myChart = this.$echarts.init(document.getElementById(this.ids))
                myChart.setOption(option)
            }
        },
        mounted() {
            this.initEcharts()
        }
    }
</script>
<style>
</style>
