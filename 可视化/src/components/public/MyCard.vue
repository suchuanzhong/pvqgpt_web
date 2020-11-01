<template>
    <div class="my-card">
        <h2>{{ value }}</h2>
        <p>{{ unit }}</p>
        <div class="title">{{ title }}</div>
    </div>
</template>

<script>
export default {
    name: "MyCard",
    props: {
        value: {
            default: "281564"
        },
        unit: {
            default: "亿平方千米"
        },
        title: {
            default: "覆盖总面积"
        }
    }
}
</script>

<style scoped lang="scss">
.my-card {
    width:16px;
    height: 22px;
    display: inline-block;
    background: url('/img/Location-orange.png')no-repeat;
    // background: rgba(0, 130, 146, 0.15);
    // margin: 20px 0;
    // text-align: center;
    // border: 1px solid rgba(0, 151, 149, 0.63);
    // border-radius: 3px;
    // color: #fff;
    h2 {
        // padding: 10px 0 0;
        // font-size: 36px;
        // font-family: CITYM;
        // color: #01cfee;
        // font-weight: normal;
        span {
            color: #3b7982;
            margin-bottom: 10px;
            font-size: 14px;
            margin-bottom: 10px;
        }
    }
    p {
        color: #3b7982;
        font-size: 14px;
        margin-bottom: 10px;
    }
    .title {
        background: rgba(0, 125, 144, 0.32);
        line-height: 35px;
        font-size: 16px;
    }
}
</style>
