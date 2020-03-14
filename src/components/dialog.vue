<template>
  <div class="dialog">
    <el-dialog :title="toast.title" :visible.sync="toast.addDialogVisible" width="50%">
      <!-- 内容主体区域 -->
      <el-form ref="form" label-width="70px" class="input" :model="userInfo" :rules="rulers">
        <el-form-item
          v-for="(item,index) in dialog"
          :key="index"
          :label="item.label"
          :prop="item.dataType"
        >
          <el-input
            v-model="userInfo[item.dataType]"
            :type="item.dataType=='password'?'password':''"
            :disabled="item.disabled"
          ></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="toast.addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="validate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "formDia",
  props: {
    dialog: {
      type: Array,
      default() {
        return [];
      }
    },
    rulers: {
      type: Object,
      default() {
        return {};
      }
    },
    toast: {
      type: Object,
      default() {
        return {};
      }
    },
    userInfo: {
      type: Object,
      default() {
        return {
          username: "",
          password: "",
          email: "",
          mobile: ""
        };
      }
    }
  },
  data() {
    let checkEmail = (rule, value, callback) => {
      const reg = /^[0-9A-Za-z][\w\.]+\@[0-9A-Za-z]{2,5}\.[A-Za-z]{2,3}$/;
      if (reg.test(value) || !value) {
        callback();
      } else {
        callback(new Error("请输入正确的邮箱"));
      }
    };
    let checkMobile = (rule, value, callback) => {
      const reg = /^1[3578]?[0-9]{9}$/;
      if (reg.test(value) || !value) {
        callback();
      } else {
        callback(new Error("请输入正确手机号"));
      }
    };
    return {
    };
  },
  methods: {
    validate() {
      this.$refs.form.validate(validate => {
        if (validate) {
          this.$emit("dialog", [this.userInfo,this.$refs.form]);
          this.toast.addDialogVisible = false;
        }
      });
    }
  }
};
</script>