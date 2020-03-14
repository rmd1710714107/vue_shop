<template>
<!-- 这是登录区域的头像 -->
    <div class="avatar_box">
      <img src="../../../assets/img/logo.png" alt="">
    </div>
</template>

<script>
export default {
  name:"avatar",
  components: {},
  data() {
    return {

    };
  },
}
</script>
<style scoped>
 .avatar_box{
   height: 1.3rem;
   width: 1.3rem;
   border: 0.01rem solid #eee;
   border-radius: 50%;
   padding: 0.1rem;
   position: absolute;
   left: calc((100% - 1.3rem)/2);
   top: calc((1.3rem - 100%)/2);
   background-color: #fff;
 }
  .avatar_box img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
</style>