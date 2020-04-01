<template>
  <div class="addUsers">
    <!-- 添加用户 -->
    <form-dia :dialog="add" :toast="toast" :rulers="addFormRules" @dialog="addUsers"></form-dia>
  </div>
</template>

<script>
import { addUsers } from "network/users.js";
import formDia from "components/dialog";
import {message} from "../../../utils/message"
export default {
  name: "addUsers",
  components: {
    formDia
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
      toast:{
        title:"添加用户",
        addDialogVisible:false
      },
      add: [
        { dataType: "username", label: "用户名",disabled:false },
        { dataType: "password", label: "密码",disabled:false },
        { dataType: "email", label: "邮箱",disabled:false },
        { dataType: "mobile", label: "手机号",disabled:false }
      ],
      addFormRules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 5, max: 10, message: "长度在 5 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 5, max: 10, message: "长度在 5 到 10 个字符", trigger: "blur" }
        ],
        email: [{ validator: checkEmail, trigger: "blur" }],
        mobile: [{ validator: checkMobile, trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.$bus.$on("addUsers", () => {
      this.toast.addDialogVisible = true;
    });
  },
  methods: {
    addUsers(formData) {
      addUsers(formData[0]).then(res => {
        console.log(res);
        if(res.data.meta.status!==201){
          message("error","添加失败")
        }else{
          message("success","添加成功");
          this.$bus.$emit("update");
          formData[1].resetFields();
        }
      });
    }
  },
  
};
</script>