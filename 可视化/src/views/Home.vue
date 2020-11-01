<template>
    <div style="position:absolute;width: 100%;height: 100%;">
        
        <!-- <div class="left-btn" @click="toggleLeft" :class="{hideLeft:hideLeft}"></div>
        <div class="right-btn" @click="toggleRight" v-if="showRightBtn" :class="{hideRight:hideRight}">

        </div>
        <div class="legend" :class="{hideRight:(hideRight||!showRightBtn)}" v-show="showlegend">
        </div> -->
       <router-view ref="main"/>
    </div>
</template>
<script>

    export  default {
        data(){
            return {
                hideLeft:false,
                hideRight:false,
                showRightBtn:true,
                showlegend:false,
                position:"北京"
            }
        },
        watch:{
            $route(route){
                this.hideLeft=false;
                this.hideRight=false;
                this.showRightBtn=true;
            }
        },
        components:{
          
        },
        methods:{
            toggleLeft(){
                this.hideLeft=!this.hideLeft;
                $('.left-box').toggleClass('hideContentLeft')                
            },
            toggleRight(){
                this.hideRight=!this.hideRight;
                $('.right-box').toggleClass('hideContentRight')
            },
            showlegends(show){
                this.showlegend=show;
            },
            changeposition(text){
                this.position=text;
            }
        },
        mounted() {
        }
    }
</script>
<style scoped lang="scss" >
    .left-btn,.right-btn{
        width: 23px;
        height: 43px;
        position: absolute;
        top: 50%;
        margin-top: -21px;
        z-index: 999;
        cursor: pointer;
        opacity: 0.7;

        &:hover{
            opacity: 1;
        }
    }
    .left-btn{
        background: url("/img/btn-left.png")no-repeat;
        left: 446px;
        transition: left .5s;
    }
    .right-btn{
        background: url("/img/btn-right.png")no-repeat;
        right: 446px;
        transition: right .5s;
    }
    .hideRight{
        right: 30px;
        transition: right .5s;
        background: url("/img/btn-left.png")no-repeat;
    }
    .hideLeft{
        left: 30px;
        transition: left .5s;
        background: url("/img/btn-right.png")no-repeat;
    }
   
    
    
    
   
    // .hideContentLeft{
    //     left: -4460px!important;
    //     transition: left .5s;
    // }
    // .hideContentRight{
    //     right: -446px!important;
    //     transition: right .5s;
    // }
   
    .legend{
        position:absolute;
        right:400px;
        z-index: 99;
        bottom: 130px;
        transition: right .5s;
        &.hideRight{
            right: 30px;
            transition: right .5s;
            background:none;
        }
    }
</style>
