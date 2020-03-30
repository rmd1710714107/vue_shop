<template>
  <div class="rights">
    <contents></contents>
  </div>
</template>

<script>
import contents from "./childComp/contents"
export default {
  name: "rights",
  components: {
    contents
  },
  data() {
    return {
      nav:["权限管理","权限列表"]
    };
  }
};
</script>