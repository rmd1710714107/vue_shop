<template>
  <div class="rights">
    <nav-bar :content="nav"></nav-bar>
    <contents></contents>
  </div>
</template>

<script>
import contents from "./childComp/contents"
import navBar from "components/navBar"
export default {
  name: "rights",
  components: {
    navBar,
    contents
  },
  data() {
    return {
      nav:["权限管理","权限列表"]
    };
  }
};
</script>