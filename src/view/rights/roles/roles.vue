<template>
    <div class="roles">
      <nav-bar :content="content"></nav-bar>
      <contents></contents>
    </div>
</template>

<script>
import navBar from "../../../components/navBar"
import contents from "./childComp/contents"
export default {
  name:"roles",
  components: {
    navBar,
    contents
  },
  data() {
    return {
      content:["权限管理","角色列表"]
    };
  },
}
</script>