<template>
  <div class="dialog">
    <el-dialog :title="toast.title" :visible.sync="toast.dialogVisible" width="50%">
      <!-- 内容主体区域 -->
      <el-form ref="form" :label-width="toast.labelWidth" class="input" :model="info" :rules="rulers">
        <el-form-item
          v-for="(item,index) in dialog"
          :key="index"
          :label="item.label"
          :prop="item.dataType"
        >
          <div v-if="item.flag==='slot'"><slot name="top"></slot></div>
          <el-input
            v-model="info[item.dataType]"
            :type="item.dataType=='password'?'password':''"
            :disabled="item.disabled"
            v-else
          >
          </el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer" v-if="toast.showBox===1">
        <el-button @click="toast.dialogVisible = false">取 消</el-button>
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
    info: {
      type: Object,
      default() {
        return {
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
          this.$emit("dialog", [this.info,this.$refs.form]);
          this.toast.dialogVisible = false;
        }
      });
    }
  }
};
</script>