<template>
  <div>
    <div class="big-search">
      <el-input
              v-model="keywords"
              placeholder="请输入关键字"
              suffix-icon="el-icon-search"
              @change="getComList"
      >
        <!-- @keyup.enter.native="getComList" -->
      </el-input>
    </div>
    <SubTitle
            style="margin:60px 0 30px 0"
            text="光伏设备"
            en="PV equipment"
            class="inlineBlock"
    ></SubTitle>
    <el-container>
      <el-aside width="356px">
        <MyTree
                :treeData="subMenuList"
                @firstMenuClick="clickFirstMenu"
                @subMenuClick="clickSubMenu"
                :propData="treeProp"
                :actSubMenu.sync="actMenuId"
                v-if="subMenuList.length > 0"
                :checkFirstChild="true"
                :nodeSlide="false"
        ></MyTree>
      </el-aside>
      <el-main style="min-height:400px;padding-top:0">
        <el-row :gutter="30" class="equip-list">
          <el-col :span="8" v-for="item in equipList" :key="item.id">
            <div style="height:270px;" @click="getDetailList(item)">
              <!-- <myVideo
                v-if="item.sourceType == 2"
                style="width:100%;height:220px"
              ></myVideo> -->
              <el-image
                      :src="item.sourcePath"
                      style="width:100%;height:220px;border:1px solid #e3e3e3;"
              ></el-image>
              <div class="equipName">
                {{ item.devicename }}
              </div>
            </div>
          </el-col>
        </el-row>
        <el-pagination
                background
                class="bdPage"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageData.page"
                :page-size="pageData.pageSize"
                layout="total,prev, pager, next"
                :total="pageData.total"
        >
        </el-pagination>
        <div
                class="equip-detail-list"
                v-if="showSwiper"
                @click="showSwiper = false"
        >
          <div class="swiperOne" @click.stop="">
            <div class="swiper-wrapper">
              <div
                      class="swiper-slide"
                      v-for="(item, index) in detailList"
                      :key="index"
              >
                <myVideo
                        v-if="item.sourceType == 2"
                        style="width:100%;height:220px"
                ></myVideo>
                <el-image
                        v-else
                        :src="item.videoAddress"
                        style="height:auto;min-height:270px;width:100%;max-width:1000px;border:1px solid #e3e3e3;background:#fff;"
                ></el-image>
              </div>
            </div>
            <div>
              <div class="swiper-button-next"></div>
              <div class="swiper-button-prev"></div>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
  import Swiper from "swiper";
  import "swiper/css/swiper.css";
  export default {
    components: {
      SubTitle: resolve => {
        require(["@/components/public/subTitle.vue"], resolve);
      },
      MyTree: resolve => {
        require(["@/components/public/myTree.vue"], resolve);
      },
      myVideo: resolve => {
        require(["@/components/public/vueVideo.vue"], resolve);
      }
    },
    data() {
      return {
        showSwiper: false,
        equipList: [],
        actMenuId: "",
        subMenuList: [],
        treeProp: {
          children: "childTreeNode",
          name: "name"
        },
        pageData: {
          pageSize: 10,
          page: 1,
          total: 0
        },
        keywords: "",
        subData: {},
        firstData: {},
        detailList: [],
        picListSwiper: null
      };
    },
    methods: {
      getDetailList(data) {
        this.showSwiper = true;
        if (this.picListSwiper) {
          Swiper.destroy(this.picListSwiper);
        }
        this.$fetch("/MtrDeviceVideo/GetDeviceVideoList", {
          DeviceId: data.id
        }).then(res => {
          this.detailList = res.data.data;
          this.picListSwiper = new Swiper(".swiperOne", {
            slidesPerView:
                    this.detailList.length < 4 ? this.detailList.length : 4,
            observer: true,
            spaceBetween: 20,
            loop: true,
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev"
            }
          });
        });
      },
      getMenuTreeData() {
        this.$fetch("/LtrDevice/GetDeviceTree").then(res => {
          let data = res.data;
          let _this = this;
          this.subMenuList = data.map((item, idx) => {
            if (idx == 0 && item.childTreeNode.length > 0) {
              _this.actMenuId = item.childTreeNode[0].id;
              item.isOpen = true;
              _this.clickSubMenu(item.childTreeNode[0], item);
            } else {
              item.isOpen = false;
            }
            return item;
          });
          // this.getDetailList(data);
        });
      },
      handleSizeChange(val) {
        this.pageData.pageSize = val;
        this.getDepList();
      },
      handleCurrentChange(val) {
        this.pageData.page = val;
        this.getDepList();
      },
      clickFirstMenu(data) {
        this.actMenuId = "";
        this.firstData = data;
        this.subData = {
          id: ""
        };
      },
      clickSubMenu(data, Pdata) {
        this.subData = data;
        this.firstData = Pdata;
        this.getDepList();
      },
      getDepList() {
        this.$fetch("/LtrDevice", {
          Devattribute: this.subData.id, //一级
          Devtype: this.firstData.id,
          page: this.pageData.page,
          pageSize: this.pageData.pageSize,
          Devicename: this.keywords
        }).then(res => {
          this.equipList = res.data.data;
        });
      },
      getComList() {
        this.clickSubMenu(this.subData, this.firstData);
      }
    },
    mounted() {
      this.getMenuTreeData();
    }
  };
</script>
<style lang="scss" scope="scope">
  .equipName {
    height: 42px;
    line-height: 42px;
    margin-top: -4px;
    text-align: center;
    background: #f5f5f5;
    color: #666666;
  }
  .equip-list {
    min-height: 308px;
    .el-col {
      margin-bottom: 30px;
    }
    img {
      margin: 0;
      border: 1px solid #e4e4e4;
    }
  }
  .equip-detail-list {
    overflow: hidden;
  }
  .swiper-slide {
    display: inline-block;
    text-align: center;
  }
  .equip-detail-list {
    background: rgba($color: #000000, $alpha: 0.5);
    position: fixed;
    overflow: hidden;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 999;
    padding: 10%;
  }
  .swiperOne {
    position: relative;
    overflow: hidden;
    top: 50%;
    transform: translate(0, -50%);
  }
</style>
