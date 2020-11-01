<template>
  <div class="zui-info-detail">
    <div class="zui-info-breads">
      <i class="zui-icon-back" @click="back"></i>
      <i class="bold-text">详细信息</i>
    </div>
    <div class="zui-info-article">
      <div class="zui-article-title">{{ articleData.title }}</div>
      <div class="zui-article-info">
        <span>发布时间：{{ articleData.reportTime | dateFormat }}</span>
      </div>
    </div>
    <div class="zui-article-content" v-html="articleData.reportContent"></div>
    <div class="art-file" v-if="articleData.reportName">
      <p>附件：</p>
      <a :href="articleData.dataAddress" target="_blank">{{
        articleData.reportName
      }}</a>
    </div>
  </div>
</template>
<script>
import { getFormatDate } from "@/utils/auth";
export default {
  data() {
    return {
      articleData: {}
    };
  },
  filters: {
    dateFormat(date) {
      return getFormatDate("yyyy-MM-dd hh:mm:ss", date);
    }
  },
  mounted() {
    this.getInfoDetail();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    getInfoDetail() {
      this.$fetch("/MtrMonitoringReport/GetMtrDetQuery", {
        id: this.$route.params.id
      }).then(res => {
        this.articleData = res.data;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
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
.art-file {
  p{
    color: #000;
  }
  a {
    color: #19b193;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
