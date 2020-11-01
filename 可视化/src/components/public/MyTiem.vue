<template>
    <div class="my-table">
        <div class="my-thead">
            <div class="my-thead-bg">
                <div class="bg-content"></div>
            </div>
            <!-- <div class="thead-content">
                <div class="my-th" v-for="(item,index) in thead" :style="{width:item.width}">
                    <p>{{item.name}}</p>
                    <div class="unit">{{item.unit}}</div>
                </div>
            </div>
        </div>
        <div class="my-tbody">
            <div class="my-tr" v-for="(row,index) in tableData" :key="index">
                <div class="my-td" v-for="(cell,i) in thead" :style="{width:cell.width}">{{cell.prop=='index'?index+1:row[cell.prop]}}</div>
            </div> -->
        </div>

    </div>
</template>

<script>
    export default {
        name: "MyTable",
        props:{
            tableHeight:{
              default:300
            },
            thead:{
                default:function () {
                    return [{
                        name:"年日照实数",
                        unit:"(h/a)",
                        prop:'day',
                        width:'33%'
                    },{
                        name:"年辐射总览",
                        unit:"(h/a)",
                        prop:'year',
                        width:'33%'
                    },{
                        name:"等量热量所需标准煤",
                        unit:"(h/a)",
                        prop:'value',
                        width:'33%'
                    }]
                }
            },
            tableData:{
                default:function () {
                    return [{
                        day:"12",
                        year:150,
                        value:4516
                    },{
                        day:"12",
                        year:150,
                        value:4516
                    },{
                        day:"12",
                        year:150,
                        value:4516
                    },{
                        day:"12",
                        year:150,
                        value:4516
                    },{
                        day:"12",
                        year:150,
                        value:4516
                    }]
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .my-table{
        margin-bottom: 20px;
    }
    .my-thead{
        position: relative;
        height: 60px;
        .my-thead-bg{
            display: flex;
            height: 60px;
            width: 100%;
            position: absolute;
            z-index: 0;
            &::before,&::after{
                content: '';
                width: 20px;
                display: inline-block;
                height: 100%;
                background: url("/img/thead-left.png")no-repeat;
            }
            &::after{
                background: url("/img/thead-right.png")no-repeat right;
            }
            .bg-content{
                width: 100%;
                background: url("/img/thead-center.png")repeat-x;
            }
        }
        .thead-content{
            position: relative;
            z-index: 9;
            width: 100%;
            height: 100%;
            display: flex;
            text-align: center;
            .my-th{
                padding: 10px;
                flex: 1;
                white-space: nowrap;
                p{
                    color:#00ffff;
                    font-size: 14px;
                }
                .unit{
                    font-size: 14px;
                    color:#508080;
                }
            }
        }

    }
    .my-tbody{
        background: url("/img/tbody-bg.png")repeat;
        min-height: 50px;
        width: 100%;
        position: relative;
        &::before,&::after{
            content:"";
            display: inline-block;
            width: 30px;
            height: 30px;
            position: absolute;
            bottom: 0;
        }
        &::before{
            background: url("/img/tbody-bottom-bg.png")no-repeat left bottom;
            left: 0;
        }
        &::after{
            background: url("/img/tbody-bottom-bg.png")no-repeat right bottom;
            right: 0;
        }

        display: table;
        .my-tr{
            display: table-row;
            background: url("/img/table-line.png")no-repeat bottom center;
            &:last-of-type{
                background: no-repeat;
            }
            .my-td{
                display: table-cell;
                line-height: 40px;
                box-sizing: border-box;
                color: rgba(255,255,255,.3);
            }
        }
    }
</style>
