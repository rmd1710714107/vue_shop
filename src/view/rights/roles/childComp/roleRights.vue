<template>
  <div class="roleRights">
    <el-row :class="['vcenter',index===0?'tpBorder':'','btBorder']" v-for="(item,index) in scope.children" :key="item.id">
      <!-- 渲染一级权限 -->
      <el-col :span="5">
        <el-tag class="elTag" closable @close="removeRight(scope,item)">{{item.authName}}</el-tag>
        <i class="el-icon-caret-right"></i>
      </el-col>
      <!-- 渲染二三级权限 -->
      <el-col :span="19">
        <el-row :class="['vcenter',index===item.children.length-1?'':'btBorder']" v-for="(childItem,index) in item.children" :key="childItem.id">
          <el-col :span="6">
            <el-tag class="elTag" closable @close="removeRight(scope,childItem)">{{childItem.authName}}</el-tag>
            <i class="el-icon-caret-right"></i>
          </el-col>
          <el-col :span="18">
            <el-tag
              type="warning"
              v-for="(grandItem,index) in childItem.children"
              :key="grandItem.id"
              closable
              @close="removeRight(scope,grandItem)"
              class="elTag"
            >{{grandItem.authName}}</el-tag>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { deleteRight } from "../../../../network/rights";
import { message } from "../../../../utils/message";
export default {
  name: "roleRights",
  props: {
    scope:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    removeRight(role,right){
      this.$confirm("是否彻底删除权限?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log(roleId,rightId);
          deleteRight(role.id,right.id).then(res=>{
            if(res.data.meta.status!==200){
              message( "error", "删除失败");
            }else{
              role.children=res.data.data;
            }
          })
        })
        .catch(error => {
          message( "info", "已取消");
        });
    }
  }
};
</script>
<style scoped>
  .elTag{
    margin:0.07rem;
  }
  .vcenter{
    display: flex;
    align-items: center;
  }
  .tpBorder{
    border-top:1px solid #eee;
  }
  .btBorder{
    border-bottom:1px solid #eee;
  }
</style>