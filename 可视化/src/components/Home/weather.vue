<template>
    <div class="weather">
        <div class="weather-station">
            <div class="date-time">
                <div class="time">{{time}}</div>
                <!-- <div class="date">{{date}}</div> -->
            </div>
            <div class="weather-title">
                <div class="weeks"> {{week}}</div>
                <span style="padding: 0 7px 0 3px;">.</span>
                <div class="date">{{date}}</div>
            </div>
            
            <!-- <div class="right-weather">
                <i class="icon-wea-dy"></i>
                <big>27°</big>
                <span>阴天</span>
            </div> -->
        </div>
    </div>
</template>

<script>
    export default {
        name: "weather",
        data(){
          return{
              date:'',
              time:'',
              week:"",
              dateIndex:null
          }
        },
        created() {
            Date.prototype.format = function(fmt){ //author: meizz
                var o = {
                    "y":this.getFullYear(),
                    "M+" : this.getMonth()+1,                 //月份
                    "d+" : this.getDate(),                    //日
                    "h+" : this.getHours(),                   //小时
                    "m+" : this.getMinutes(),                 //分
                    "s+" : this.getSeconds(),                 //秒
                    "q+" : Math.floor((this.getMonth()+3)/3), //季度
                    "S"  : this.getMilliseconds(),            //毫秒
                    "w"  : this.getDay()            //星期
                };
                if(/(y+)/.test(fmt))
                    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
                for(var k in o)
                    if(new RegExp("("+ k +")").test(fmt))
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
                return fmt;
            }
        },
        watch:{
        },
        mounted() {
            this.time=new Date().format('hh:mm:ss');
            this.date=new Date().format('yyyy.MM.dd');
            var weekList=['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
            this.week=weekList[new Date().format('w')];
            this.dateIndex=setInterval(_=>{
                this.time=new Date().format('hh:mm:ss');
                this.date=new Date().format('yyyy.MM.dd');
                this.week=weekList[new Date().format('w')];
            },1000)
        }
    }
</script>

<style scoped lang="scss">
    .weather-station{
        position: absolute;
        right: 20px;
        top: 20px;
        z-index: 999;
        // width: 8px;
        // height: 30px;
        &::before{
           content:"";
            display: inline-block;
            vertical-align: middle;
            width: 8px;
            height: 30px;
            background: url("/img/header-left.png")left no-repeat;
            padding-left: 14px;
        }
        &::after{
             content: "";
            display: inline-block;
            vertical-align: middle;
            width: 8px;
            height: 30px;
            background: url("/img/header-right.png")right no-repeat;
            padding-right: 16px;
        }
      
        .date-time{
            color: #fff;
            padding-right: 10px;
            display: inline-block;
            vertical-align: text-top;
            
            .time{
                font-family: DINOT;
                font-size: 24px;
                line-height: 24px;
                text-shadow: 5px 5px 6px rgba(0,96,255,1.0);
                &::after{
                    content: "";
                    width: 8px;
                    height: 3px;
                    background-color: #5bffff;
                    display: inline-block;
                    vertical-align: top;
                    margin-top:0px;
                    margin-left: 10px;
                }
            }
        }
        .weather-title{
            display: inline-block;
            // width: 170px;
            height: 28px;
            background-color: rgba(27,81,132,0.6);
            color: #fff;
            vertical-align:middle;
            .weeks{
                padding-left: 14px;
                font-size: 16px;
                line-height: 26px;
                display: inline-block;
            } 
            .date{
                 line-height: 26px;
                display: inline-block;
                font-size: 18px;
                padding-right: 14px;
            }
        }
   
    .right-weather{
            color: #fff;
            font-size: 17px;
            display: inline-block;
            height: 34px;
            padding-left: 10px;
            line-height: 34px;
            i{
                background: url("../../assets/img/yt.png")no-repeat;
                display: inline-block;
                width: 40px;
                height: 34px;
                vertical-align: text-bottom;
            }
            big {
                font-size: 38px;
                color:#fff;
                vertical-align:sub;
                margin: 0 0 0 5px;
                /*background-image: -webkit-gradient(linear,*/
                /*0 0,*/
                /*0 bottom,*/
                /*from(#00fff0),*/
                /*to(#0072ff));*/
                /*-webkit-background-clip: text;*/
                /*-webkit-text-fill-color: transparent;*/
            }
            span{
                font-size: 14px;
                vertical-align: sub;
            }
    }
    }
</style>
