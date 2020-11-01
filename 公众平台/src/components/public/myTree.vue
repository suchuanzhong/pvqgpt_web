<template>
  <div>
    <ul class="sub-page-menu">
      <li
        :class="{
          active: item.isOpen
        }"
        v-for="item in CopyData"
        :key="item.id"
        :style="{
          height:
            item.isOpen && item[propData.children].length > 0
              ? item[propData.children].length * 46 + 70 + 'px'
              : '70px',
          transition: 'all linear 0.2s'
        }"
      >
        <div class="my-tree__node" @click="clickFirstMenu(item)">
          <i
            v-if="item[propData.children] && item[propData.children].length > 0"
            class="my-tree__preIcon el-icon-caret-bottom"
            @click.stop="clickFirstMenu(item)"
          ></i>
          {{ item[propData.name] }}
        </div>
        <template
          v-if="item[propData.children] && item[propData.children].length > 0"
        >
          <div class="sub-tree__children">
            <div
              class="sub-tree__node"
              :class="{ active: child.id == actMenuId }"
              v-for="child in item[propData.children]"
              :key="child.id"
              @click.stop="clickSubMenu(child, item)"
            >
              {{ child[propData.name] }}
            </div>
          </div>
        </template>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    treeData: {
      default: function() {
        return [];
      }
    },
    actSubMenu: {
      default: ""
    },
    nodeSlide: {
      default: true
    },
    checkFirstChild: {
      default: false
    },
    propData: {
      default: function() {
        return {
          children: "children",
          name: "name"
        };
      }
    }
  },
  data() {
    return {
      actMenuId: "",
      CopyData: []
    };
  },
  mounted() {
    this.CopyData = JSON.parse(JSON.stringify(this.treeData));
    this.actMenuId = this.actSubMenu;
  },
  methods: {
    slideMenu(data) {
      data.isOpen = !data.isOpen;
    },
    clickFirstMenu(data) {
      if (this.checkFirstChild) {
        let isOpens = JSON.parse(JSON.stringify(data.isOpen));
        this.CopyData = this.CopyData.map(item => {
          item.isOpen = false;
          return item;
        });
        if (data[this.propData.children].length > 0) {
          data.isOpen = !isOpens;
          this.actMenuId = data[this.propData.children][0].id;
        } else {
          data.isOpen = true;
        }
      }
      if (this.nodeSlide) {
        this.slideMenu(data);
      }
      this.$emit("firstMenuClick", data);
    },
    clickSubMenu(data, pData) {
      this.actMenuId = data.id;
      this.$emit("subMenuClick", data, pData);
    }
  }
};
</script>
<style lang="scss" scoped>
.sub-page-menu {
  width: 100%;
  padding-right: 45px;
  li .my-tree__node {
    margin-right: 26px;
    height: 50px;
    line-height: 50px;
    border: 1px solid #e4e4e4;
    color: #666666;
    font-size: 16px;
    margin-bottom: 20px;
    text-align: center;
    letter-spacing: 2px;
    position: relative;
    cursor: pointer;
    padding-left: 50px;
    padding-right: 50px;
    .my-tree__preIcon {
      position: absolute;
      left: 20px;
      top: 16px;
      color: #cccccc;
      transform: rotate(0deg);
      transition: 0.2s all;
    }
    &:hover {
      color: #1bac6b;
    }
  }
  li {
    color: #999;
    overflow: hidden;
  }
  li.active {
    // transition: all linear 2s;
    .my-tree__node {
      border: none;
      background: transparent;
      color: #fff;
      &::after {
        content: "";
        height: 52px;
        top: 0;
        display: block;
        background: url(./../../assets/img/sub-li-act.png) no-repeat right;
        left: 0;
        position: absolute;
        width: calc(100% + 24px);
        z-index: -1;
      }
      .my-tree__preIcon {
        color: #fff;
        transform: rotate(180deg);
        transition: 0.2s all;
      }
    }
  }
  .sub-tree__node {
    text-align: center;
    height: 36px;
    line-height: 36px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin-bottom: 10px;
    padding: 0 10px;
    cursor: pointer;
    width: calc(100% - 26px);
    &.active {
      color: #1bac6b;
      font-weight: bold;
      background: url(./../../assets/img/my_subTree.png) no-repeat;
      background-size: 100% 100%;
    }
    &:hover {
      color: #1bac6b;
    }
  }
}
</style>
