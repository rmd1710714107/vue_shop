<template>
    <div class="category">
      <contents></contents>
      <add-cate></add-cate>
    </div>
</template>

<script>
import contents from "./childCom/contents"
import addCate from "./childCom/addCate"
export default {
  name:"category",
  components: {
    contents,
    addCate
  },
  data() {
    return {
    };
  },
}
</script>