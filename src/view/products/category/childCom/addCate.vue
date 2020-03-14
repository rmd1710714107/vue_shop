<template>
  <div class="addCate">
    <el-dialog title="添加分类" :visible.sync="dialogVisible" width="30%" @close="reset">
      <el-form :model="formData" :rules="addCateFormRules" ref="addCateFormRef" label-width="100px">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="formData.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <!-- options用来指定数据源 -->
          <el-cascader
            v-model="selectedKeys"
            :options="parentCateList"
            :props="cascaderProps"
            @change="parentCateChange"
            size="medium"
            clearbale
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShow">取 消</el-button>
        <el-button type="primary" @click="addCat">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addCate, getParentCate } from "../../../../network/product";
import { message } from "../../../../components/message";
export default {
  name: "addCate",
  components: {},
  data() {
    return {
      dialogVisible: false,
      name: "",
      formData: {
        cat_name: "",
        // 父级分类id
        cat_pid:"0",
        // 分类等级默认是一级分类
        cat_level: "0"
      },
      addCateFormRules: {
        cat_name: [
          { required: true, message: "请输入分类名称", trigger: "blur" }
        ]
      },
      parentCateList: [],
      cascaderProps: {
        expandTrigger: "hover",
        value: "cat_id",
        label: "cat_name",
        children: "children",
        checkStrictly: true
      },
      /* 选中的父级分类的ID数 */
      selectedKeys: []
    };
  },
  mounted() {
    this.$bus.$on("addCate", this.init);
  },
  methods: {
    init(initialData) {
      this.getParentCate();
      // this.name=initalData.
      this.isShow();
    },
    isShow() {
      this.dialogVisible = !this.dialogVisible;
    },
    getParentCate() {
      getParentCate({ type: 2 }).then(res => {
        if (res.data.meta.status !== 200) {
          message(true, "error", res.data.meta.msg);
        } else {
          this.parentCateList = res.data.data;
        }
      });
    },
    /* 选择项发生变化触发这个函数 */
    parentCateChange() {
      /* 
      如果selectedKeys数组中的length大于0，证明选了的父级分类，反之，则没有选中任何父级分类
     */
      if (this.selectedKeys.length > 0) {
        this.formData.cat_pid = this.selectedKeys[this.selectedKeys.length - 1];
        this.formData.cat_level = this.selectedKeys.length;
        return;
      } else {
        this.formData.cat_pid = 0;
        this.formData.cat_level = 0;
      }
    },
    addCat() {
      this.$refs.addCateFormRef.validate(valid => {
        if (!valid) return;
        console.log(this.formData);
        addCate(this.formData).then(res => {
          console.log(res);
          if (res.data.meta.status !== 201) {
            message(true, "error", res.data.meta.msg);
          } else {
            message(true, "success", "添加成功");
            this.$bus.$emit("updateCateList")
            this.isShow();
          }
        });
      });
    },
    reset() {
      // console.log("reset");
      // this.$refs.addCateFormRef.resetFields();
      // this.selectedKeys = [];
      // this.formData.cat_level = 0;
      // this.formData.cat_pid = 0;
    }
  }
};
</script>
<style scoped>
</style>