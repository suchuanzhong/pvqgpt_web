<template>
    <div style="height:100%">
        <div class="title">
            <h1>汇流箱监测</h1>
            <p>数据采集时间:{{ lastTime | replaceT }}</p>
        </div>
        <div class="groupMonitoring  HLbox" style="height:calc(100% - 78px)">
            <div class="inputValue">
                <div>
                    <label>低电流为低于平均电流</label>
                    <el-input style="width:80px; " size="mini" v-model.number="inputValue">
                        <i slot="suffix"
                           style="display:flex;align-items:center;height:100%;color:#8dd5b5;padding-right:20px;font-size:16px;">%</i>
                    </el-input>
                </div>
                <div class="indicator">
                    <span></span>
                    <span>零电量</span>
                    <span></span>
                    <span>低电流</span>
                </div>
            </div>
            <div style="height:426px;">
                <el-table ref="hltable" :header-cell-style="headercellstyle" :cell-style="cellstyle" :data="tableData"
                          border height="410px" size="medium" highlight-current-row @row-click="rowClick">
                    <el-table-column prop="combinerboxcode" align="center" label="汇流箱编码" width='320px'></el-table-column>
                    <el-table-column prop="out_vol" align="center" label="输出总电压(V)" width='120px'></el-table-column>
                    <el-table-column prop="out_cur" align="center" label="输出总电流(A)" width='120px'></el-table-column>
                    <el-table-column :label="'i'+(index+1)+'A'" v-for="(item, index) in columnArr" :key="index" align="center" width='80px'>
                        <template slot-scope="scope">
                            <span :style="scope.row['current'+(index+1)] | colorFilter">{{ scope.row['current'+(index+1)] }}</span>
                        </template>
                    </el-table-column>
                </el-table>
                <EleCurrEcharts :chartData="chartData" :currCode='currCode' v-if="isShowCharts"></EleCurrEcharts>
            </div>
        </div>
    </div>
</template>

<script>
    import EleCurrEcharts from "./EleCurrEcharts";

    var that;
    export default {
        components: {
            EleCurrEcharts
        },
        props: ["nodedata"],
        data() {
            return {
                selectRow: {},
                inputValue: 2,
                aveage: 100, //默认平均值为100；返回数据后取所有电流的平均值
                tableData: [],
                lastTime: "",
                tablecols: [],
                chartData: [],
                currCode: '',
                isShowCharts: false,
                columnArr: null
            };
        },
        watch: {
            nodedata(val) {
                if (val) {
                    this.getDataByCode(val.code);
                }
            },
            inputValue(newVal, val) {
                if (!val) return;
                if (newVal < 2) return;
                this.getDataByCode(this.nodedata.code);
            }
        },
        mounted() {
            that = this;
            this.getDataByCode(this.nodedata.code);
        },
        methods: {
            getDataByCode(code) {
                this.$fetchGet({url:'/RealTimeData/Getcomlist',params:{invertercode:code}}).then(
                    res => {
                        // console.log(res.data);
                        this.lastTime = res.data.timestamp;
                        this.tableData = [];
                        let sum = 0;
                        for (let item of res.data.data) {
                            let tableItem = {};
                            tableItem.combinerboxcode = item.combinerboxcode;
                            tableItem.out_cur = item.out_cur;
                            tableItem.out_vol = item.out_cur;
                            for (let key = 1; key <= res.data.zlnum; key++) {
                                tableItem['current' + key] = item['dc_cur_' + key];
                                sum += Math.round(item['dc_cur_' + key]);
                            }
                            this.tableData.push(tableItem);
                        }
                        this.columnArr = new Array(Number.parseInt(res.data.zlnum));
                        this.aveage = Number.parseFloat((sum / (res.zlnum * res.data.length)).toFixed(2));
                    });
            },
            rowClick(row) {
                this.currCode = row.combinerboxcode;
                //选中当前行显示实时电流
                this.$fetchGet({
                    url: "/RealTimeData/Getcomzllist",
                    params: {combinecode: row.combinerboxcode}
                }).then(res => {
                    this.isShowCharts = true;
                    this.$nextTick(() => {
                        this.chartData = res.data.zls;
                    })
                });
            },
            headercellstyle() {
                return {
                    background: "#1da63b",
                    color: "#fff",
                    "border-right-color": "#8dd5b5",
                    "border-bottom-color": "#8dd5b5"
                };
            },
            cellstyle() {
                return {
                    color: "#1bac6b",
                    "border-right-color": "#8dd5b5",
                    "border-bottom-color": "#8dd5b5"
                };
            }
        },
        filters: {
            colorFilter(value) {
                if (value <= 0) {
                    return " color:rgb(255, 76, 49)";
                } else if (value < that.inputValue * 0.01 * that.aveage) return " color:#1bac6b";
                else return " color:#1bac6b";
            }
        }
    };
</script>
<style>

</style>
