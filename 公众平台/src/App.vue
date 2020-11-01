<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import url(./assets/scss/public.scss);

@import "public/css/public.scss";
@import "public/css/scss/icon.scss";
@import "public/css/scss/home.scss";

.el-button--active {
  height: 35px;
  text-align: center;
  color: #fff;
  border: none;
  line-height: 12px;
  background-image: linear-gradient(to right, #19b197, #1da63b);
  &:focus,
  &:hover,
  &:active {
    color: #fff;
    border: none;
  }
  &:hover {
    opacity: 0.9;
  }
}

.el-radio-button__orig-radio:checked + .el-radio-button__inner {
  background-image: linear-gradient(to right, #19b197, #1da63b);
  border-color: transparent;
  background-color: #fff;
  -webkit-box-shadow: -1px 0 0 0 transparent;
  box-shadow: -1px 0 0 0 transparent;
}
.el-radio-button__inner:hover {
  color: #1da63b;
}
.el-radio-button__inner {
  padding: 9px 12px;
}
.el-radio-button__inner,
.el-radio-group {
  display: inline-block;
  line-height: 1;
  height: 35px;
  margin-top: -1px;
}

.table-header th {
  background: #eaeff1;
  color: #333333;
}
</style>
