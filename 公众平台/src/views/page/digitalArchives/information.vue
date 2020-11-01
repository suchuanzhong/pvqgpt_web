<template>
    <div class="zui-info-details">
        <!--        <div class="zui-info-breads">-->
        <!--&lt;!&ndash;            <i class="zui-icon-back" @click="back"></i>&ndash;&gt;-->
        <!--            <i class="bold-text">信息详情</i>-->
        <!--        </div>-->
        <div class="zui-info-article">
            <div class="zui-article-title">{{articleData.basename }}</div>
        </div>
        <div class="zui-article-content" v-html="articleData.content"></div>
    </div>
</template>
<script>
    import { getFormatDate } from "@/utils/auth";
    export default {
        props: {
            articleData: {
                default: function() {
                    return {};
                }
            },

        },
        filters: {
            dateFormat(date) {
                return getFormatDate("yyyy-MM-dd hh:mm:ss", date);
            }
        },
        mounted() {

        },
        methods: {
            // back() {
            //     this.$emit("update:showList", true);
            // }
        }
    };
</script>
<style lang="scss" scoped>
    .zui-info-details{
        padding: 50px;
    }
    .bold-text {
        font-weight: bold;
        font-size: 18px;
        padding-left: 50px;
        color: #666666;
    }
    .zui-info-breads {
        background: #efefef;
        padding: 16px 20px;
        i {
            vertical-align: middle;
        }
    }
    .zui-info-article {
        padding: 60px 20px 20px 20px;
        text-align: center;
        border-bottom: 1px solid #eeeeee;
    }
    .zui-article-info {
        display: flex;
        padding: 15px 0;
        span {
            flex: 1;
            white-space: nowrap;
            text-align: center;
            color: #999999;
            font-size: 14px;
        }
    }
    .zui-article-title {
        color: #000;
        font-size: 20px;
    }
    .zui-article-content {
        padding: 20px 0;
        // 可以删掉
        color: #666666;
        font-size: 16px;
        line-height: 2em;
        // 可以删掉 --end
    }
    .zui-icon-back {
        cursor: pointer;
    }
</style>
