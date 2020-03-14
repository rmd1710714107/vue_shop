<template>
<!-- 这是登录组件 -->
    <div class="login">
      <div class="login_box">
        <avatar></avatar>
        <input-area></input-area>
      </div>
    </div>
</template>

<script>
import avatar from "./childComp/avatar_box";
import inputArea from "./childComp/inputArea"
export default {
  name:"login",
  data() {
    return {

    };
  },
  components:{
    avatar,
    inputArea
  }
}
</script>
<style scoped>
  .login{
    background-color: #2b4b6b;
    height: 100%;
    width: 100%;
  }
  .login_box{
    width: 4.5rem;
    height:3rem;
    background-color: #fff;
    border-radius: 0.03rem;
    position: absolute;
    left: calc((100% - 4.5rem)/2);
    top: calc((100% - 3rem)/2);
  }
</style>