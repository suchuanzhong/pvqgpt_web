<template>
  <div class="zui-sub-title">
    <h2>{{ text }}</h2>
    <p>{{ en | toUpperCase }}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  filters: {
    toUpperCase(text) {
      return text.toUpperCase();
    }
  },
  props: {
    text: {
      default: "标题"
    },
    en: {
      default: "title"
    }
  }
};
</script>
<style lang="scss" scoped>
.zui-sub-title {
  h2 {
    font-size: 26px;
    color: #000;
  }
  p {
    font-size: 14px;
    color: #888888 !important;
  }
}
</style>
