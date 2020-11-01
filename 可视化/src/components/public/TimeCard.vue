<template>
    <div class="tiem-box">
        <div class="title">{{title}}</div>
        <div class="year">{{value}}</div> 
        <div class="month">{{unit}} <span class="cum">{{cumu}}</span></div>  
       
    </div>
</template>

<script>
    export default {
        name: "MyCard",
        props:{
             title:{
                default:"时间"
            },
            value:{
                default:"年"
            },
            unit:{
                default:"月"
            },
            cumu:{
               default:"累计" 
            }
           
        }

    }
</script>

<style scoped lang="scss">
    .tiem-box{
        background: rgba(0, 130, 146, 0.15);
        margin: 20px 0;
        border: 1px solid rgba(0, 151, 149, 0.63);
        border-radius: 3px;
        color:#fff;
          line-height: 52px;
       
        
        .title{
            background: rgba(0, 125, 144, 0.32);
            line-height: 52px;
            font-size: 14px;
            position: fixed;
           

        }
         
        .year{
             display: inline;
            padding: 10px 0 0;
            font-size: 12px;
            position: absolute;
            left: 92px;
            top: 12px;
            font-family: CITYM;
            color:#016a79;
            font-weight: normal;   
        }
         .month{
                color: #72ebfc;
                font-size: 12px;
                position: relative;
                right: 40px;
                top: 2px;
            }
            .cum{
                color: #3b7982;
                font-size: 12px;
                position: absolute;
                right: 121px;
               
            }
    }
</style>
