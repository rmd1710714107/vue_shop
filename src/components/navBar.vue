<template>
  <div class="nav">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for=" (item,index) in content" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "navBar",
  props:{
    content:{
      type:Array,
      default(){
        return[]
      }
    }
  },
  components: {},
  data() {
    return {};
  }
};
</script>