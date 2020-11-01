<template>
  <div class="Wrap full">
    <div class="View-Wrap full flex-column">
      <div class="table-box flex-1 formcls" style="margin-top:20px">
        <el-table
          :data="tableData"
          class="table"
          stripe
          highlight-current-row
          @current-change="handleCurrentChange"
          style="width: 100%; "
          size="medium"
          border
        >
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          >
          </el-table-column>
          <el-table-column
            property="proName"
            label="名称"
            show-overflow-tooltip
            align="center"
          >
          </el-table-column>
          <el-table-column
            property="createTime"
            label="填报时间"
            show-overflow-tooltip
            align="center"
          >
          </el-table-column>
          <el-table-column label="操作" width="150" align="center">
            <template slot-scope="scope">
              <span class="op-btn">
                <img
                  src="/img/icon04.png"
                  alt=""
                  @click="download(scope.row)"
                />
                <img
                  src="/img/icon03.png"
                  alt=""
                  @click="deleForm(scope.row)"
                />
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="m-t-20">
        <pageBox :totalNum="totalNum" @Refresh="Refresh"></pageBox>
      </div>
    </div>
  </div>
</template>
<script>
import pageBox from "@/components/Page1.vue";
export default {
  components: { pageBox },
  data() {
    return {
      dialogTypeName: null,
      tableData: [
        { proName: "项目xxxx", compName: "100MW", createTime: "2018-05-21" }
      ],
      projectList: [
        { label: "项目1", value: "项目1" },
        { label: "项目2", value: "项目2" }
      ],
      tableHeight: null,
      pageInfo: {
        page: 1,
        pageSize: 20
      },
      totalNum: 0
    };
  },
  mounted() {},
  methods: {
    deleForm() {},
    download() {},
    handleCurrentChange() {},
    Refresh() {}
  }
};
</script>
<style lang="scss" scoped></style>
