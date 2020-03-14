<template>
    <div class="contents">
      <card>
        <el-table :data="rightsList" border stripe>
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
      </card>
    </div>
</template>

<script>
import {message} from "components/message"
import card from "components/card"
import {getRightsList} from "network/rights.js"
export default {
  name:"contents",
  components: {
    card
  },
  data() {
    return {
      rightsList:[]
    };
  },
  mounted(){
    getRightsList(this.$route.path,"list").then(res=>{
      if(res.data.meta.status!==200){
        message(true,"error",res.data.meta.msg);
      }else{
        this.rightsList=res.data.data;
      }
    });
  }
}
</script>
<style scoped>
  
</style>