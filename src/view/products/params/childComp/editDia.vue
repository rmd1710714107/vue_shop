<template>
  <div class="edit-dia">
    <el-dialog
      title="修改参数"
      :visible.sync="dialogVisible"
      width="50%"
      @close="reset"
      :show-close="false"
    >
      <el-form ref="editFormRef" :model="editForm" label-width="100px" :rules="editFormRules">
        <el-form-item label="title" prop="attr_name">
          <el-input v-model="editForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShow('cancel')">取 消</el-button>
        <el-button type="primary" @click="editParams">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {editParams} from "../../../../network/product"
export default {
  name: "editDia",
  props: {
    dialogVisible:{
      type:Boolean,
      default(){
        return false;
      }
    },
    editForm:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  data() {
    return {
      editFormRules:{
        attr_name: [
          {
            required: true,
            message: "请输入参数名称",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    reset() {
      this.$refs.editFormRef.resetFields();
    },
    isShow(arg){
      this.$emit("show",arg);
    },
    editParams(){
      this.$refs.editFormRef.validate(valid=>{
        if(!valid) return;
        editParams(this.editForm).then(res=>{
          this.isShow("edit");
        })
      })
    }
    
  }
};
</script>