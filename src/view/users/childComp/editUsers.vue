<template>
  <div class="edit">
    <form-dia :dialog="edit" :toast="toast" :rulers="FormRules" @dialog="editUsers" :userInfo="formData"></form-dia>
  </div>
</template>

<script>
import formDia from "components/dialog";
import {queryUsers,editUsers} from "network/users.js"
import {message} from "components/message"
export default {
  name: "queryUsers",
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
      id:"",
      toast:{
        title: "修改用户",
        addDialogVisible:false
      },
      edit: [
        { dataType: "username", label: "用户名",disabled:true },
        { dataType: "email", label: "邮箱",disabled:false },
        { dataType: "mobile", label: "手机号",disabled:false }
      ],
      FormRules:{
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入手机", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" }
        ]
      },
      formData:{}
    };
  },
  mounted(){
    this.$bus.$on("edit",(data)=>{
      this.toast.addDialogVisible = true;
      queryUsers(data.id).then(res=>{
        if(res.data.meta.status!==200){
          message(true,"error",res.data.meta.msg);
        }else{
           this.formData=res.data.data;
        }
      })
    })
    
  },
  methods:{
    editUsers(formData){
      editUsers(this.formData.id,formData[0]).then(res=>{
        console.log(res);
        if(res.data.meta.status!==200){
          message(true,"error",res.data.meta.msg);
        }else{
          message(true,"success",res.data.meta.msg);
          this.$bus.$emit("update");
        }
      })
    }
  }
};
</script>