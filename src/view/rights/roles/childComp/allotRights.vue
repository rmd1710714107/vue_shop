<template>
  <div class="allotRights">
    <el-dialog title="分配权限" :visible.sync="dialogVisible" width="50%" @close="reset">
      <el-tree
        :data="rightsList"
        :props="treeProps"
        default-expand-all
        show-checkbox
        node-key="id"
        :default-checked-keys="defKeys"
        ref="treeRef"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {allotRights} from "../../../../network/rights"
import {message} from "../../../../components/message"
export default {
  name: "allotRights",
  props: {
    rightsList: {
      type: Array,
      defaule() {
        return [];
      }
    },
    role: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  components: {},
  data() {
    return {
      dialogVisible: false,
      defKeys: [],
      treeProps: {
        label: "authName",
        children: "children"
      }
    };
  },
  methods: {
    getRightsList() {
      this.defKeys = [];
      this.getDefKeys(this.role, this.defKeys);
      this.dialogVisible = true;
    },
    getDefKeys(node, arr) {
      if (!node.children) {
        return arr.push(node.id);
      } else {
        node.children.forEach(item => {
          this.getDefKeys(item, arr);
        });
      }
    },
    allotRights() {
      const Keys = [
        ...this.$refs.treeRef.getHalfCheckedKeys(),
        ...this.$refs.treeRef.getCheckedKeys()
      ];
      const rids=Keys.join(",");
      allotRights(this.role.id,rids).then(res=>{
        console.log(res);
        if(res.data.meta.status!==200){
          message(true,"error","res.data.meta.msg");
        }else{
          message(true,"success","分配成功");
          this.$bus.$emit("allotRights")
        }
      })
      this.dialogVisible=false;
    },
    reset() {
      this.defKeys = [];
    }
  }
};
</script>