<template>
  <!-- 这是登陆后的界面 -->
  <!-- <el-button type="info" @click="loginout">安全退出</el-button> -->
  <el-container class="home-container">
    <el-header>
      <logo></logo>
      <el-button type="info" @click="loginout">安全退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="flag?'64px':'200px'">
        <aside-option @width="width"></aside-option>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import logo from "./childComp/logo";
import asideOption from "./childComp/asideOption";
export default {
  name: "home",
  components: {
    logo,
    asideOption
  },
  data() {
    return {
      flag:null
    };
  },
  methods: {
    loginout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    width(index){
      this.flag=index;
    }
  }
};
</script>
<style scoped>
.home-container {
  font-size: 0.16rem;
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ffffff;
}
.el-aside {
  background-color: #373d41;
}
.main {
  background-color: #eaedf1;
}

</style>