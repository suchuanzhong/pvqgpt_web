<template>
  <div class="view-container measureRpt">
    <MtHeader backPagePathName="userSet"></MtHeader>
    <div class="indexBox marginTop">
      <group>
        <cell v-for="(item,index) in indexType" :key="index">
          <span slot="title" class="soltTitle">{{item.title}}</span>
          <span slot="value">
            <img src="./../../../assets/img/xiazai.png" alt slot="icon" height="24" width="auto" />
          </span>
        </cell>
      </group>
    </div>
  </div>
</template>
<script>
import Title from "@/components/public/HeadTitle";
import { Group, Cell } from "vux";
import MtHeader from "@/components/public/MtHeader";
export default {
  components: {
    Title,
    Group,
    Cell,
    MtHeader
  },
  data() {
    return {
      indexType: [
        {
          title: "光伏发电基地运行监测月报",
          time: "2018.12"
        },
        {
          title: "光伏发电基地运行监测月报",
          time: "2018.11"
        },
        {
          title: "光伏发电基地运行监测月报",
          time: "2018.10"
        },
        {
          title: "光伏发电基地运行监测月报",
          time: "2018.09"
        },
        {
          title: "光伏发电基地运行监测月报",
          time: "2018.08"
        },
        {
          title: "光伏发电基地运行监测月报",
          time: "2018.07"
        },
        {
          title: "光伏发电基地运行监测月报",
          time: "2018.07"
        },
        {
          title: "光伏发电基地运行监测月报",
          time: "2018.07"
        },
        {
          title: "光伏发电基地运行监测月报",
          time: "2018.07"
        },
        {
          title: "光伏发电基地运行监测月报",
          time: "2018.07"
        },
        {
          title: "光伏发电基地运行监测月报",
          time: "2018.07"
        },
        {
          title: "光伏发电基地运行监测月报",
          time: "2018.07"
        }
      ]
    };
  },
  mounted() {},
  methods: {},
  filters: {}
};
</script>
<style lang="less" scoped>
.Documents {
  display: flex;
  flex-direction: column;
  .indexBox {
    flex: 1;
    overflow-x: hidden;
  }
}
.titleWrap {
  background: linear-gradient(to right, #65be24 0%, #48a73c 50%, #65be24 100%);
  height: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.head-title {
  padding-top: 0 !important;
}
.soltTitle {
  display: flex;
  align-items: center;
  color: #333;
  font-size: 0.14rem;
  img {
    margin-right: 0.1rem;
  }
}
</style>
<style lang="less">
.Documents {
  .indexBox {
    margin-top: 0.1rem;
    .weui-cell {
      padding: 0.08rem 0.15rem;
    }
    .weui-cells.vux-no-group-title {
      margin-top: 0 !important;
      .vux-cell-bd.vux-cell-primary p {
        display: flex;
        align-items: center;
      }
    }
  }
}
.marginTop .weui-cells {
  margin-top: 0 !important;
}
</style>
