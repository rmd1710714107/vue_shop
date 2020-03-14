<template>
  <div class="contents">
    <card>
      <el-button type="primary" @click="addCate">添加分类</el-button>
      <tree-table
        :data="cateList"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        :show-index="true"
        :border="true"
        :show-row-hover="false"
        class="treeTable"
      >
        <template v-slot:isok="scope">
          <i class="el-icon-success" v-if="scope.row.cat_deleted===false" style="color:lightgreen;"></i>
          <i class="el-icon-error" v-else></i>
        </template>
        <template v-slot:order="scope">
          <el-tag siza="mini" v-if="scope.row.cat_level===0">一级</el-tag>
          <el-tag siza="mini" type="success" v-else-if="scope.row.cat_level===1">二级</el-tag>
          <el-tag siza="mini" type="warning" v-else>三级</el-tag>
        </template>
        <template v-slot:operate="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete">编辑</el-button>
        </template>
      </tree-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[3, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </card>
  </div>
</template>

<script>
import card from "../../../../components/card";
import { getCateList } from "../../../../network/product";
import { message } from "../../../../components/message";
export default {
  name: "contents",
  components: {
    card
  },
  created() {
    this.getCateList();
  },
  data() {
    return {
      cateList: [],
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      total: 0,
      columns: [
        { label: "分类名称", prop: "cat_name" },
        {
          label: "是否有效",
          type: "template", //表示当前列定义为模板列
          template: "isok" //表示当前这一列使用模板名称
        },
        {
          label: "排序",
          type: "template", //表示当前列定义为模板列
          template: "order" //表示当前这一列使用模板名称
        },
        {
          label: "操作",
          type: "template", //表示当前列定义为模板列
          template: "operate" //表示当前这一列使用模板名称
        }
      ]
    };
  },
  mounted () {
    this.$bus.$on("updateCateList",this.getCateList)
  },
  methods: {
    getCateList() {
      getCateList(this.queryInfo).then(res => {
        if (res.data.meta.status !== 200) {
          message(true, "error", res.data.meta.msg);
        } else {
          this.cateList = res.data.data.result;
          this.total = res.data.data.total;
        }
      });
    },
    handleSizeChange(newSize){
      this.queryInfo.pagesize=newSize;
      this.getCateList();
    },
    handleCurrentChange(newPage){
      this.queryInfo.pagenum=newPage;
      this.getCateList();
    },
    addCate(){
      this.$bus.$emit("addCate")
    }
  }
};
</script>
<style scoped>
  .treeTable{
    margin-top: 0.15rem;
  }
</style>