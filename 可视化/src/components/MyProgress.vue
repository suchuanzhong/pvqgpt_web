<template>
    <div class="pro-box">
        <div class="pro-bar" :style="{width:w+'px'}">
            <div class="svg-bg">
                <svg 
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="138px" height="6px">
                    <path fill-rule="evenodd"  :fill="color"
                    d="M-0.000,-0.000 L26.000,-0.000 L26.000,6.000 L-0.000,6.000 L-0.000,-0.000 Z"/>
                    <path fill-rule="evenodd"  :fill="color"
                    d="M28.000,-0.000 L54.000,-0.000 L54.000,6.000 L28.000,6.000 L28.000,-0.000 Z"/>
                    <path fill-rule="evenodd"   :fill="color"
                    d="M56.000,-0.000 L82.000,-0.000 L82.000,6.000 L56.000,6.000 L56.000,-0.000 Z"/>
                    <path fill-rule="evenodd"   :fill="color"
                    d="M84.000,-0.000 L110.000,-0.000 L110.000,6.000 L84.000,6.000 L84.000,-0.000 Z"/>
                    <path fill-rule="evenodd"  :fill="color"
                    d="M112.000,-0.000 L138.000,-0.000 L138.000,6.000 L112.000,6.000 L112.000,-0.000 Z"/>
                </svg>
            </div>
        </div>
        <div class="pro-text">{{progress}} <small>{{unit}}</small></div>
        <div class="svg-bg">
            <svg 
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="138px" height="6px">
                <path fill-rule="evenodd"   fill="rgb(26, 61, 101)"
                d="M-0.000,-0.000 L26.000,-0.000 L26.000,6.000 L-0.000,6.000 L-0.000,-0.000 Z"/>
                <path fill-rule="evenodd"  fill="rgb(26, 61, 101)"
                d="M28.000,-0.000 L54.000,-0.000 L54.000,6.000 L28.000,6.000 L28.000,-0.000 Z"/>
                <path fill-rule="evenodd"  fill="rgb(26, 61, 101)"
                d="M56.000,-0.000 L82.000,-0.000 L82.000,6.000 L56.000,6.000 L56.000,-0.000 Z"/>
                <path fill-rule="evenodd"  fill="rgb(26, 61, 101)"
                d="M84.000,-0.000 L110.000,-0.000 L110.000,6.000 L84.000,6.000 L84.000,-0.000 Z"/>
                <path fill-rule="evenodd"  fill="rgb(26, 61, 101)"
                d="M112.000,-0.000 L138.000,-0.000 L138.000,6.000 L112.000,6.000 L112.000,-0.000 Z"/>
            </svg>
        </div>

    </div>
</template>

<script>
    export default {
        name: "MyProgress",
        props:{
            progress:{
                default:0
            },
            color:{
                default:'#51a4ff'
            },
            unit:{
                default:""
            }
        },
        data(){
            return {
            }
        },
        computed:{
            w(){
                let num=Math.abs(this.progress);
                var n=parseInt(num/20);
                return 1.38*num;
            },
            adbNum(){
                return Math.abs(this.progress);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .pro-box{
        position: relative;
        max-width: 300px;
        white-space: nowrap;
        // margin: 10px 0;
    }
    .pro-bar{
        overflow: hidden;
        max-width: 158px;
        height: 20px;
        position: absolute;
        z-index: 9;
    }
    .pro-text{
        position: absolute;
        left: 145px;
        font-size: 20px;
        font-family: "DINOT";
        color:#ff2066;
        // top: -3px;
        line-height: 20px;
        small{
            font-size: 16px;
        }
    }
</style>