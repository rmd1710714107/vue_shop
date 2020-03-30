<template>
  <div class="main">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for=" (item,index) in content" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card" shadow="never">
      <div><slot name="top"></slot></div>
      <div class="middle"><slot name="middle"></slot></div>
      <div class="bottom"><slot name="bottom"></slot></div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "contentTest",
  components: {},
  props:{
    content:{
      type:Array,
      default(){
        return[]
      }
    }
  },
  data() {
    return {};
  }
};
</script>
<style scoped>
.box-card{
  margin-top: 0.15rem;
}
</style>