<template>
    <div class="shop">
      <nav-bar :content="content"></nav-bar>
      <contents></contents>
    </div>
</template>

<script>
import navBar from "../../../components/navBar"
import contents from "./childComp/contents"
export default {
  name:"shop",
  components: {
    navBar,
    contents
  },
  data() {
    return {
      content:["商品管理","商品列表"]
    };
  },
}
</script>