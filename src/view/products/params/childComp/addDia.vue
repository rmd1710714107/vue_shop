<template>
  <!-- 添加参数对话框 -->
  <div class="addDia">
    <el-dialog :title="'添加'+title" :visible.sync="dialogVisible" width="50%" @close="reset" :show-close="false">
      <el-form ref="addFormRef" :model="addForm" label-width="100px" :rules="addFormRules">
        <el-form-item :label="title" prop="attr_name">
          <el-input v-model="addForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShow('cancel')">取 消</el-button>
        <el-button type="primary" @click="addParams">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addParams } from "../../../../network/product";
import { message } from "../../../../components/message";
export default {
  name: "addDia",
  props: {
    cat_id:{
      type:Number,
      default:0
    },
    activeName:{
      type:String,
      default(){
        return ""
      }
    },
    dialogVisible:{
      type:Boolean,
      default(){
        return false
      }
    }
  },
  computed: {
    title() {
      if (this.activeName === "many") {
        return "动态参数";
      } else {
        return "静态属性";
      }
    }
  },
  data() {
    return {
      addForm:{
        attr_name:""
      },
      addFormRules:{
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
      this.$refs.addFormRef.resetFields();
    },
    addParams(){
      this.$refs.addFormRef.validate(valid=>{
        if(!valid) return;
        addParams({cat_id:this.cat_id,attr_name:this.addForm.attr_name,attr_sel:this.activeName}).then(res=>{
          if(res.data.meta.status!==201){
            message(true,"error",res.data.meta.msg);
          }else{
            message(true,"success",res.data.meta.msg);
            this.isShow("add");
          }
        })
      })
    },
    isShow(arg){
      this.$emit("show",arg);
    }
    
  }
};
</script>