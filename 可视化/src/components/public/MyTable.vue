<template>
    <div class="my-table">
        <div class="my-thead">
            <div class="my-thead-bg">
                <div class="bg-content"></div>
            </div>
            <div class="thead-content">
                <div class="my-th" v-for="(item,index) in thead" :key="index" :style="{width:item.width}">
                    <p>{{item.name}}</p>
                    <div class="unit">{{item.unit}}</div>
                </div>
            </div>
        </div>
        <div class="my-tbody">
            <div class="my-tr" v-for="(row,index) in tableData" :key="index">
                <div class="my-td" v-for="(cell,i) in thead"  :key="i" :style="{width:cell.width}">{{cell.prop=='index'?index+1:row[cell.prop]}}</div>
            </div>
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
        margin-top: 20px;
        margin-left: 16px;
    }
    .my-thead{
        position: relative;
        height: 47px;
        .my-thead-bg{
            display: flex;
            // height: 60px;
            width: 100%;
            position: absolute;
            z-index: 0;
            // &::before,&::after{
            //     content: '';
            //     width: 20px;
            //     display: inline-block;
            //     height: 100%;
            //     background: url("/img/thead-left.png")no-repeat;
            // }
            // &::after{
            //     background: url("/img/thead-right.png")no-repeat right;
            // }
            .bg-content{
                width: 100%;
                // background: url("/img/thead-center.png")repeat-x;
            }
        }
        .thead-content{
            position: relative;
            z-index: 9;
            display: flex;
            text-align: center;
            width: 358px;
            height: 46px;
            background-color: rgba(0, 131, 199, 0.3);
           border: solid 1px rgba(0, 131, 199, 0.6);
            .my-th{
                padding: 10px;
                flex: 1;
                white-space: nowrap;
                p{
                    font-size: 16px;
                    line-height: 26px;
                    color: #dcf4ff;
                }
                .unit{
                    font-size: 14px;
                    color:#508080;
                }
            }
        }

    }
    .my-tbody{
            

           
            min-height: 50px;
            position: relative;
            text-align: center;
            display: table;
        .my-tr{
            width: 358px;
            // height: 200px;
             background: url('/img/kuan-blue.png')no-repeat;
            // background: url("/img/table-line.png")no-repeat bottom center;
            // &:last-of-type{
            //     background: no-repeat;
            // }
            .my-td{
                padding-left: 14px;
                display: table-cell;
                line-height: 40px;
                box-sizing: border-box;
                color: #fff;//rgba(255,255,255,.3);
            }
        }
    }
</style>
