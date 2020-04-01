<template>
  <!-- 这是角色权限内容 -->
  <div class="contents">
    <main-content :content="content">
      <el-row slot="top">
        <el-col>
          <el-button type="primary" @click="addRoles">添加角色</el-button>
        </el-col>
      </el-row>
      <el-table :data="rolesList" border stripe class="elTable" slot="middle">
        <el-table-column type="expand">
          <template v-slot="scope">
            <role-rights :scope="scope.row"></role-rights>
          </template>
        </el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column
          v-for="(item,index) in tableData"
          :key="index"
          :label="item.label"
          :prop="item.prop"
        ></el-table-column>
        <el-table-column label="操作" prop="roleName">
          <template v-slot="scope">
            <el-button
              size="mini"
              v-for="(item,index) in operation"
              :key="index"
              :icon="item.icon"
              :type="item.type"
              @click="operate(index,scope.row)"
            >{{item.operate}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </main-content>

    <!-- 分配权限对话框 -->
    <allot-rights :rightsList="rightsList" :role="role" ref="allotRights"></allot-rights>
  </div>
</template>

<script>
import allotRights from "./allotRights";
import mainContent from "components/mainContent"
import {
  getRolesList,
  deleteRight,
  getAllRights
} from "../../../../network/rights";
import { message } from "../../../../utils/message";
import roleRights from "./roleRights";
export default {
  name: "contents",
  components: {
    mainContent,
    roleRights,
    allotRights
  },
  data() {
    return {
      rolesList: [],
      tableData: [
        { label: "角色名称", prop: "roleName" },
        { label: "角色描述", prop: "roleName" },
        { label: "角色名称", prop: "roleDesc" }
      ],
      operation: [
        { icon: "el-icon-edit", type: "primary", operate: "编辑" },
        { icon: "el-icon-delete", type: "danger", operate: "删除" },
        { icon: "el-icon-setting", type: "warning", operate: "分配权限" }
      ],
      rightsList: [],
      role: {},
      content:["权限管理","角色列表"]
    };
  },
  created() {
    this.getRolesList();
  },
  mounted() {
    this.$bus.$on("allotRights", this.getRolesList)
  },
  methods: {
    addRoles() {},
    operate(index, role) {
      if (index === 2) {
        getAllRights("tree").then(res => {
          if (res.data.meta.status !== 200) {
            message( "error", res.data.meta.msg);
          } else {
            this.rightsList = res.data.data;
            new Promise((resolve, rejected) => {
              this.role = role;
              resolve();
            }).then(() => {
              // this.$refs.allotRights.$emit("getRightsList");
              this.$refs.allotRights.getRightsList();
            });
          }
        });
      }
    },
    getRolesList() {
      getRolesList(this.$route.path).then(res => {
        if (res.data.meta.status !== 200) {
          message("error", res.data.meta.msg);
        } else {
          this.rolesList = res.data.data;
        }
      });
    }
  }
};
</script>
<style scoped>
.elTable {
  margin-top: 0.15rem;
}
</style>