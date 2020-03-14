<template>
<!-- 这是登陆区域相关内容 -->
  <div class="input_area">
    <el-form ref="form" 
             label-width="0px" 
             class="input" 
             :model="login"
             :rules="loginFormRules">
      <!-- label-width是给 el-form-item里的label占位的，也就是决定着el-form-item的label的宽度-->
      <!-- elementUI表单组件必须进行数据绑定，不然输入的内容无法显示 -->
      <!-- ;(value,key) in loginFormRules
       -->
      <el-form-item v-for="(item,index) in loginForm" 
                    :key="index" 
                    :prop="item.dataType">
        <el-input :prefix-icon="item.icon" 
                  :type="item.type"
                  v-model="login[item.dataType]">
        </el-input>
      </el-form-item>
      <el-form-item class="btns">
        <el-button v-for="(item,index) in button" 
                   :type="item.type" 
                   :key="index"
                   @click="reset(index)">{{item.text}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {login} from "network/users.js"
import {message} from "components/message.js"
export default {
  name: "inputArea",
  components: {

  },
  data() {
    return {
      loginForm:[
        {dataType:"username",type:"text",icon:"iconfont icon-user"},
        {dataType:"password",type:"password",icon:"iconfont icon-3702mima"}
      ],
      login:{
        username:"admin",
        password:"123456"
      },
      button:[
        {type:"primary",text:"登录"},
        {type:"info",text:"重置"}
      ],
      loginFormRules:{
        username:[
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ],
        password:[
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    reset(index){
      switch (index) {
        case 0:
          this.$refs.form.validate((valid)=>{
            if(!valid){
              message(true,"error","请输入正确格式的数据");
            }else{
              login(this.login.username,this.login
              .password).then((res)=>{
                let userInfo=res.data;
                if(userInfo.meta.status!==200){
                  message(true,"error",userInfo.meta.msg);
                }else{
                  window.sessionStorage.setItem("token",userInfo.data.token);
                  this.$router.push("/home");
                }
              })
            };
          })
          break;
        case 1:
          this.$refs.form.resetFields();
        break;
      }
    }
  }
};
</script>
<style scoped>
 .btns{
   display: flex;
   justify-content: flex-end;
 }
 .input_area{
   width: 100%;
   padding: 0.2rem;
   position: absolute;
   bottom: 0%;
   box-sizing: border-box;
 }
 input_area .input{
   width: 100%;
 }
</style>