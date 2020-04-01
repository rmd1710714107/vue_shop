<template>
  <div class="orderList">
    <main-content :content="content">
      <el-row :gutter="20" slot="top">
        <el-col :span="10">
          <el-input
            placeholder="请输入内容"
            class="input-with-select"
            v-model="list.query"
            clearable
            @clear="getOrderList"
          >
            <el-button slot="append" icon="el-icon-search" @click="getOrderList"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-table :data="orderData" slot="middle" border>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="订单编号" prop="order_number"></el-table-column>
        <el-table-column label="订单价格" prop="order_price"></el-table-column>
        <el-table-column label="是否付款">
          <template v-slot="scope">
            <el-tag v-if="scope.row.pay_status==='0'" type="danger">未付款</el-tag>
            <el-tag v-else type="success">已付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否发货" prop="is_send"></el-table-column>
        <el-table-column label="下单时间" :formatter="dateFormat"></el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="edit"></el-button>
            <el-button size="mini" type="success" icon="el-icon-location"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[10, 20, 30]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        slot="bottom"
      ></el-pagination>
    </main-content>
    <form-dia :dialog="dialog" :info="info" :toast="toast" :rulers="rulers">
      <el-cascader
        slot="top"
        v-model="city"
        :options="cityOptions"
        :props="{ expandTrigger: 'hover' }"
      ></el-cascader>
    </form-dia>
  </div>
</template>

<script>
import mainContent from "../../../components/mainContent";
import { getOrderList } from "../../../network/order";
import { message } from "../../../utils/message";
import moment from "moment"; //格式化时间的库
import formDia from "../../../components/dialog";
import cityOptions from '../../../utils/cityOptions'
export default {
  name: "",
  components: {
    mainContent,
    formDia
  },
  data() {
    return {
      city:[],
      cityOptions: cityOptions,
      queryInfo: {
        pagenum: 1,
        pagesize: 1
      },
      total: 0,
      content: ["订单管理", "订单列表"],
      list: {
        query: ""
      },
      orderData: [],
      toast: {
        title: "修改地址",
        dialogVisible: false,
        labelWidth: "100px"
      },
      dialog: [
        { label: "省市区\\县", dataType: "province", disabled: false },
        { label: "详细地址", dataType: "detailAdress", disabled: false }
      ],
      info: {
        detailAdress: ""
      },
      rulers: {
        province:[
          { required: true, message: "省市区\\县", trigger: "blur" }
        ],
        detailAdress: [
          { required: true, message: "请输入详细地址", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getOrderList();
  },
  methods: {
    getOrderList() {
      getOrderList(this.queryInfo).then(res => {
        console.log(res);
        if (res.data.meta.status !== 200) {
          message("error", res.data.meta.msg);
        } else {
          this.total = res.data.data.total;
          this.orderData = res.data.data.goods;
        }
      });
    },
    dateFormat(row, column) {
      //格式化时间
      let date = row.create_time;
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getOrderList();
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getOrderList();
    },
    edit() {
      console.log(this.toast.dialogVisible);
      this.toast.dialogVisible = true;
    }
  }
};
</script>
<style scoped>
.el-table {
  margin: 0.15rem 0;
}
</style>