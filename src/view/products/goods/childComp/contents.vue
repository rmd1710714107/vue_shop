<template>
  <div class="contents">
    <card>
      <el-row :gutter="20">
        <el-col :span="10">
          <el-input
            placeholder="请输入商品"
            class="input-with-select"
            v-model="shop.query"
            clearable
            @clear="getGoodsList"
          >
            <el-button slot="append" icon="el-icon-search" @click="getGoodsList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加商品</el-button>
        </el-col>
      </el-row>

      <el-table border :data="goodsList" :highlight-current-row="true">
        <el-table-column type="index" label="序号" header-align="center" width="50"></el-table-column>
        <el-table-column
          v-for="(item,index) in tableParams"
          :key="index"
          :label="item.label"
          :show-overflow-tooltip="item.show_overflow_tooltip"
          :width="item.width"
          :formatter="index===3?dateFormat:null"
          header-align="center"
        >
        <template v-slot="scope">
          <table-content :tableData="scope.row[item.prop]" :isLight="isLight" :query="shop.query"></table-content>
        </template>
        </el-table-column>
        <el-table-column label="操作" header-align="center">
          <template v-slot="scope">
            <el-tooltip
              class="item"
              effect="dark"
              v-for="(item,index) in operation"
              :key="index"
              :content="item.content"
              :enterable="false"
              placement="top"
              @click.native="operate(index,scope.row)"
            >
              <el-button :type="item.type" :icon="item.icon" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="shop.pageum"
        :page-sizes="[10, 20, 30, 40,50]"
        :page-size="shop.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </card>
  </div>
</template>

<script>
import card from "../../../../components/card";
import { getGoodsList } from "../../../../network/product";
import { message } from "../../../../components/message";
import moment from "moment"; //格式化时间的库
import tableContent from "./tableContent"
export default {
  name: "",
  components: {
    card,
    tableContent
  },
  data() {
    return {
      shop: {
        query: "",
        pagenum: 1, //当前页码
        pagesize: 10 //每页显示多少条
      },
      total: 0,
      operation: [
        { content: "编辑", type: "primary", icon: "el-icon-edit" },
        { content: "删除", type: "danger", icon: "el-icon-delete" }
      ],
      goodsList: [], //商品列表
      tableParams: [
        {
          label: "商品名称",
          prop: "goods_name",
          width: "650",
          show_overflow_tooltip: true
        },
        {
          label: "商品价格",
          prop: "goods_price",
          width: "100",
          show_overflow_tooltip: false
        },
        {
          label: "商品重量",
          prop: "goods_weight",
          width: "100",
          show_overflow_tooltip: false
        },
        {
          label: "创建时间",
          prop: "add_time",
          width: "160",
          show_overflow_tooltip: false
        }
      ], //表格的各项参数
      isLight:false//是否高亮搜索结果
    };
  },
  created() {
    this.getGoodsList();
  },

  methods: {
    getGoodsList() {
      getGoodsList(this.shop).then(res => {
        if (res.data.meta.status !== 200) {
          message(true, "error", res.data.meta.msg);
        } else {
          this.goodsList = res.data.data.goods;
          console.log(this.goodsList);
          this.total = res.data.data.total;
        }
      });
      if(this.shop.query){
        this.isLight=true;
      }else{
        this.isLight=false;
      }
    },
    goods_name() {
      if (this.shop.query) {
        this.heightLightRes();
      }
    },
    handleCurrentChange(newPage) {
      this.shop.pagenum = newPage;
      this.getGoodsList();
    },
    handleSizeChange(newSize) {
      this.shop.pagesize = newSize;
      this.getGoodsList();
    },
    dateFormat(row, column) {
      //格式化时间
      let date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
    queryGood(id) {}
  }
};
// placeholder="请输入内容"
// class="input-with-select"
// v-model="params.query"
// clearable
// @clear="getUsersList"
// @click="getUsersList"
// @click="addUsers"
</script>
<style scoped>
.el-table {
  margin-top: 0.15rem;
}
</style>