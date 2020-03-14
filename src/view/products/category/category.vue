<template>
    <div class="category">
      <nav-bar :content="nav"></nav-bar>
      <contents></contents>
      <add-cate></add-cate>
    </div>
</template>

<script>
import navBar from "../../../components/navBar"
import contents from "./childCom/contents"
import addCate from "./childCom/addCate"
export default {
  name:"category",
  components: {
    navBar,
    contents,
    addCate
  },
  data() {
    return {
      nav:["商品管理","商品分类"]
    };
  },
}
</script>