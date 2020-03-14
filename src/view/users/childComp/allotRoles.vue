<template>
  <div class="allotRights">
    <el-dialog title="分配角色" :visible.sync="dialogVisible" width="50%" @close="reset">
      <p>姓名:{{name}}</p>
      <p>当前角色:{{currentRole}}</p>
      <p>
        分配新角色
        <el-select v-model="roleId" placeholder="请选择角色">
          <el-option
            v-for="item in rolesList"
            :key="item.id"
            :label="item.roleName"
            :value="item.id"
          ></el-option>
        </el-select>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button>取 消</el-button>
        <el-button type="primary" @click="allotRoles">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRoles, allotRoles } from "../../../network/users";
import { message } from "../../../components/message";
export default {
  name: "allotRoles",
  props: {},
  mounted() {
    this.$bus.$on("allot", this.init);
  },
  components: {},
  data() {
    return {
      initialData: null,
      dialogVisible: false,
      name: "",
      currentRole: "",
      roleId: "",
      rolesList: []
    };
  },
  methods: {
    init(data) {
      console.log(data);
      this.dialogVisible = !this.dialogVisible;
      this.initialData = data;
      this.name = this.initialData.username;
      this.currentRole = this.initialData.role_name;
      getRoles().then(res => {
        if (res.data.meta.status !== 200) {
          message(true, "error", res.data.meta.msg);
        } else {
          this.rolesList = res.data.data;
        }
      });
    },
    allotRoles() {
      if (!this.roleId) {
        return message(true, "error", "选择要分配的角色");
      } else {
        allotRoles(this.initialData.id, this.roleId).then(res => {
          if (res.data.meta.status !== 200) {
            message(true, "error", res.data.meta.msg);
          } else {
            this.$bus.$emit("update");
          }
        });
      }
      this.dialogVisible = !this.dialogVisible;
    },
    reset(){
      this.roleId="";
    }
  }
};
</script>