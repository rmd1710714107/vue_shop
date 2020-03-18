<template>
    <div class="params">
      <nav-bar :content="content"></nav-bar>
      <contents></contents>
    </div>
</template>

<script>
import navBar from "../../../components/navBar"
import contents from "./childComp/contents"
export default {
  name:"params",
  components: {
    navBar,
    contents
  },
  data() {
    return {
      content:["商品管理","参数列表"]
    };
  },
}
</script>