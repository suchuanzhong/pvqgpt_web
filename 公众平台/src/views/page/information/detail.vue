<template>
  <div class="zui-info-detail">
    <div class="zui-info-breads">
      <i class="zui-icon-back" @click="back"></i>
      <i class="bold-text">详细信息</i>
    </div>
    <div class="zui-info-article">
      <div class="zui-article-title">{{ articleData.title }}</div>
      <div class="zui-article-info">
        <span
          style="overflow:hidden;max-width:33%;white-space:nowrap;text-overflow: ellipsis;"
          >发布单位：{{ articleData.publishingCompany }}</span
        >
        <span>发布时间：{{ articleData.times | dateFormat }}</span>
        <span>来源：{{ articleData.source }}</span>
        <span>浏览次数：{{ articleData.browse }}</span>
      </div>
    </div>
    <div class="zui-article-content" v-html="articleData.contentInfo"></div>
  </div>
</template>
<script>
import { getFormatDate } from "@/utils/auth";
export default {
  data() {
    return {
      articleData: {
        title:
          "权威发布 | 国家发改委出台2020年集中式光伏发电指导价，户用光伏补贴0.08元/千瓦时",
        company: "XXX",
        creationTime: "2020-04-02 12:27",
        source: "国家发展改革委",
        number: 154,
        content:
          '<p style="">国家发改委出台2020年集中式光伏发电指导价，户用光伏补贴0国家发改委出台2020年集中式光伏发电指导价，户用光伏补贴0,国家发改委出台2020年集中式光伏发电指导价，户用光伏补贴0。</p>'
      }
    };
  },
  filters: {
    dateFormat(date) {
      return date ? getFormatDate("yyyy-MM-dd hh:mm:ss", date) : "";
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
      this.$fetch("MtrNewsInformation/GetTypeNewsInformation", {
        Dataid: this.$route.params.id
      }).then(res => {
        if (res.data.data && res.data.data.length > 0) {
          this.articleData = res.data.data[0];
        } else {
          this.articleData = {};
        }
      });
    },
  
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
</style>
