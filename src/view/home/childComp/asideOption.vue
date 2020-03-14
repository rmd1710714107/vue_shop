<template>
  <!-- 这是侧边栏列表 -->
  <div class="aside">
    <!-- 侧边栏菜单区 -->
    <!-- router="true"开启菜单的路由模式 -->
    <!-- 由于存在默认动画，所以菜单收缩回去会有一点卡，此时需要用 collapse-transition="false"关闭默认动画-->
    <el-menu
      background-color="#333744"
      text-color="#fff"
      active-text-color="#409eff"
      :unique-opened="true"
      :collapse="flag"
      :collapse-transition="false"
      :router="true"
      :default-active="this.$route.path"
    >
      <div class="toggle" @click="unfold">|||</div>
      <!-- 每个菜单都有唯一的index(string)值，不然点击时index相同的菜单会同时展开 -->
      <el-submenu :index="item.id+''" v-for="(item,index) in menuList" :key="item.id">
        <template slot="title">
          <i :class="'iconfont '+icons[index]"></i>
          <span>{{item.authName}}</span>
        </template>
        <!-- 二级菜单 -->
        <el-menu-item
          :index="'/'+childItem.path"
          v-for="childItem in item.children"
          :key="childItem.id"
        >
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>{{childItem.authName}}</span>
          </template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { getMenuList } from "network/request.js";
import {message} from "components/message.js"
export default {
  name: "asideOption",
  components: {},
  data() {
    return {
      menuList: "",
      icons: [
        "icon-user",
        "icon-tijikongjian",
        "icon-3702mima",
        "icon-danju",
        "icon-baobiao"
      ],
      flag: false
    };
  },
  mounted() {
    getMenuList().then(res => {
      if (res.data.meta.status !== 200) {
        message(true,"error",res.data.meta.msg);
      } else {
        this.menuList = res.data.data;
      }
    });
  },
  methods: {
    unfold() {
      this.flag = !this.flag;
      this.$emit("width", this.flag);
    },
  }
};
</script>
<style scoped>
.iconfont {
  margin-right: 0.1rem;
}
.el-menu {
  border-right: none;
}
.toggle {
  background-color: #4a5064;
  font-size: 0.1rem;
  color: #fff;
  text-align: center;
  letter-spacing: 0.02rem;
  cursor: pointer;
  padding: 0.05rem 0;
}
</style>