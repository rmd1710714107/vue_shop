<template>
    <div class="contents">
      <main-content :content="nav">
        <el-table :data="rightsList" border stripe slot="middle">
          <el-table-column type="index"></el-table-column>
          <el-table-column label="权限名称" prop="authName"></el-table-column>
          <el-table-column label="路径" prop="path"></el-table-column>
          <el-table-column label="权限等级" prop="level">
            <template v-slot="scope">
              <el-tag v-if="scope.row.level==='0'">标签一</el-tag>
              <el-tag type="success" v-else-if="scope.row.level==='1'">标签二</el-tag>
              <el-tag type="warning" v-else-if="scope.row.level==='2'">标签三</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </main-content>
    </div>
</template>

<script>
import {message} from "../../../../utils/message"
import mainContent from "components/mainContent"
import {getRightsList} from "network/rights.js"
export default {
  name:"contents",
  components: {
    mainContent
  },
  data() {
    return {
      rightsList:[],
      nav:["权限管理","权限列表"]
    };
  },
  mounted(){
    getRightsList(this.$route.path,"list").then(res=>{
      if(res.data.meta.status!==200){
        message("error",res.data.meta.msg);
      }else{
        this.rightsList=res.data.data;
      }
    });
  }
}
</script>
<style scoped>
  
</style>