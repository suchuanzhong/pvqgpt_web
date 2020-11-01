<template>
    <div class="zui-box">
        <div class="zui-title">
            <div class="zui-header">{{titledata.titleText}}</div>
<!--            <ul class="main" v-if="titledata.is_shownum">-->
<!--                <li style="margin-top: 20px;display: inline-block">-->
<!--                    <div class="zui-main">{{titledata.indexOneValue}}</div>-->
<!--                    <div class="my-icon-number"> <span>{{titledata.indexOneText}}</span></div>-->
<!--                </li>-->
<!--                <li style="margin-top: 20px;margin-left:30px;display: inline-block">-->
<!--                    <div class="zui-main">{{titledata.indexTwoValue}}</div>-->
<!--                    <div class="my-icon-number"> <span>{{titledata.indexTwoText}}</span></div>-->
<!--                </li>-->
<!--            </ul>-->
        </div>

    </div>
</template>

<script>
    export default {
        data(){
            return{
                titledata:{} ,
         
            }
        },
        mounted(){
     
            setInterval(()=>{
                let barDatas=localStorage.getItem('titledata');
                this.titledata=JSON.parse(barDatas);
                console.log(this.titledata)
            },300)
            
        }
    }
</script>

<style scoped lang="scss">
    .zui-box{
        min-width: 600px;
        //  margin: 0 auto;
        .zui-title{
            margin-top: 20px;
            text-align: center;
        }
        .zui-header{
            line-height: 50px;
            font-size:30px;
            font-family:PingFang;
            font-weight:bold;
            color:rgba(255,255,255,1);
            text-shadow:0px 0px 0px rgba(0, 0, 0, 0.5);

            background: url("/img/echartPower-title.png")  no-repeat;
            background-size: 100% 100%;
        }

        .zui-main{
            font-family:DINOT;
            font-weight:bold;
            font-style:italic;
            font-size: 36px;
            color:rgba(255,255,255,1);
            /*line-height:12px;*/
            -webkit-text-stroke:2px #3e2806;

        }
        .my-icon-number{
            margin-top: 6px;
            width: 190px;
            height: 44px;
            background-size: 100% 100%;
            display: inline-block;
            background: url("/img/echartPower-bg.png") center no-repeat;
            span{
                color: #fff;
                text-align: center;
                font-family:PingFang;
                font-weight:bold;
                font-size: 16px;
                line-height: 58px;
            }
        }
        .zui-totaol{
            font-family:DINOT;
            font-weight:bold;
            font-style:italic;
            font-size: 36px;
            color:rgba(255,255,255,1);
            /*line-height:12px;*/
            -webkit-text-stroke:2px #3e2806;
        }
    }
</style>