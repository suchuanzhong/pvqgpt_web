<template>
    <div class="stationText">
        <p>{{title}}</p>
        <p v-if="type=='date'" :class="['baseline_text',className]"><span>{{value | formatGridtime }}</span></p>
        <p v-else-if="type=='text'" :class="['baseline_text',className]"><el-tooltip class="item" effect="dark" :content="value" placement="top"><span>{{value}}</span></el-tooltip></p>
        <p v-else><span :class="['num',className]">{{value}}</span><label>{{unit}}</label></p>
    </div>
</template>

<script>
    export default {
        props:{
            title:{
                default:'装机容量'
            },
            value: {
                default:'0'
            },
            unit:{
                default:''
            },
            type:{ //传入date格式化时间----2018年8月
                default:''
            },
            className: {
                default:'f_blue'
            },
        },
        filters:{
            formatGridtime(time){
                var time=new Date(time);
                var year=time.getFullYear();
                var month=time.getMonth()+1;
                return year+'年'+month+'月'
            }
        }
    }
</script>

<style lang="less" scoped>
.stationText{
    padding-left: 18px;
    span{
        font-size: 20px;
        font-family: DINOT;
        margin-right: 10px;
    }
    .num{
        font-size: 30px;
    }
    .baseline_text span{
        height: 38px;
        display: flex;
        align-items: flex-end;
        font-family: "微软雅黑";
        // overflow: hidden;
        // text-overflow:ellipsis;
        // white-space: nowrap;
    }
}
.stationText:last-child{ 
   .baseline_text span{
       padding-top: 12px;
    } 
}
</style>