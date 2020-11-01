<template>
  <div>
    <span>{{ title }}</span>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      default: ""
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
div {
  padding-left: 10px;
  margin-bottom: 10px;
  background: url(/img/line01.png) left center no-repeat;
}
span {
  color: #1bac6b;
}
</style>
