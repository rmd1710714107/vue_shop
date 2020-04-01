<template>
<!-- 这是用户列表界面 -->
  <div class="contents">
    <main-content :content="content">
      <el-row :gutter="20" slot="top">
        <el-col :span="10">
          <el-input
            placeholder="请输入内容"
            class="input-with-select"
            v-model="params.query"
            clearable
            @clear="getUsersList"
          >
            <el-button slot="append" icon="el-icon-search" @click="getUsersList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addUsers">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 用户列表区 -->
      <el-table :data="usersList" border stripe slot="middle">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column
          v-for="(item,index) in tableData"
          :key="index"
          :label="item.label"
          :prop="item.prop"
        ></el-table-column>
        <el-table-column label="状态" prop="mg_state">
          <!-- 使用作用域插槽获取当前列的数据 -->
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="statusChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
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
        :current-page="params.pageum"
        :page-sizes="[1, 2, 3, 4]"
        :page-size="params.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        slot="bottom"
      ></el-pagination>
    </main-content>
  </div>
</template>

<script>
import {
  getUsersList,
  changeState,
  deleteUsers
} from "network/users";
import { message } from "../../../utils/message";
import mainContent from "components/mainContent"
export default {
  name: "contents",
  components: {
    mainContent
  },
  data() {
    return {
      usersList: [],
      total: 0,
      tableData: [
        { label: "姓名", prop: "username" },
        { label: "邮箱", prop: "email" },
        { label: "电话", prop: "mobile" },
        { label: "角色", prop: "role_name" }
      ],
      operation: [
        { content: "编辑", icon: "el-icon-edit", type: "primary" },
        { content: "删除", icon: "el-icon-delete", type: "danger" },
        { content: "分配角色", icon: "el-icon-setting", type: "warning" }
      ],
      params: {
        query: "",
        pagenum: 1,
        pagesize: 2
      },
      content:["用户管理","用户列表"]
    };
  },
  mounted() {
    this.getUsersList();
    this.$bus.$on("update", this.getUsersList);
  },
  methods: {
    getUsersList() {
      getUsersList(this.$route.path, this.params).then(res => {
        if (res.data.meta.status !== 200) {
          message( "error", res.data.meta.msg);
        } else {
          this.usersList = res.data.data.users;
          this.total = res.data.data.total;
        }
      });
    },
    handleSizeChange(newSize) {
      this.params.pagesize = newSize;
      this.getUsersList();
    },
    handleCurrentChange(newPage) {
      this.params.pagenum = newPage;
      this.getUsersList();
    },
    statusChange(data) {
      changeState(this.$route.path, data.id, data.mg_state).then(res => {
        if (res.data.meta.status !== 200) {
          message( "error", res.data.meta.msg);
        } else {
          message( "success", res.data.meta.msg);
        }
      });
    },
    addUsers() {
      this.$bus.$emit("addUsers");
    },
    operate(index, data) {
      if (index === 0) {
        this.$bus.$emit("edit", data);
      } else if (index === 1) {
      } else {
        this.$bus.$emit("allot",data);
      }
    },
    deleteUsers(id) {
      this.$confirm("是否彻底删除用户?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteUsers(id).then(res => {
            if (res.data.meta.status !== 200) {
              message( "error", res.data.meta.msg);
            } else {
              message( "success", res.data.meta.msg);
              this.getUsersList();
            }
          });
        })
        .catch(error => {
          message( "info", "已取消");
        });
    }
  }
};
</script>
<style scoped>
.el-table,
.el-pagination {
  margin-top: 0.15rem;
}
</style>