<template>
    <div class="backAndLocal">
        <div class="left-weather">
            <i class="icon-wea-dy"></i>
            <big>32 c°</big>
            <span class="left-title">晴转多云</span>
            <i class="left-Location"></i>
            <span class="location-title">{{position}}</span>
        </div>
    </div>
</template>
<style>
    .backAndLocal {
        position: absolute;
        left: 40px;
        top: 30px;
        z-index: 99;
        display: flex;
    }
    
    .backAndLocal::before {
        content: "";
        display: inline-block;
        vertical-align: middle;
        width: 8px;
        height: 30px;
        background: url("/img/header-left.png")left no-repeat;
    }
    
    .backAndLocal::after {
        content: "";
        display: inline-block;
        vertical-align: middle;
        width: 8px;
        height: 30px;
        background: url("/img/header-right.png")right no-repeat;
    }
    
    .left-weather {
        display: flex;
        margin: 0 20px 0 10px;
    }
    
    .icon-wea-dy {
        width: 50px;
        height: 36px;
        background: url('/img/weather.png')center no-repeat;
        display: inline-block;
        margin-top: -4px;
    }
    
    big {
        font-size: 24px;
        color: #fff;
        vertical-align: sub;
        margin: 0 0px 0 8px;
        border-right: 1px solid transparent;
        border-color: rgba(255, 255, 255, 0.5);
        padding-right: 16px;
        height: 26px;
    }
    
    .left-title {
        font-size: 16px;
        color: #fff;
        vertical-align: sub;
        padding: 0 16px 0 14px;
        line-height: 26px;
    }
    
    .left-Location {
        width: 16px;
        height: 22px;
        display: inline-block;
        background: url('/img/Location.png')no-repeat;
    }
    
    .location-title {
        font-size: 16px;
        color: #fff;
        vertical-align: sub;
        line-height: 26px;
        padding-left: 6px;
    }
</style>