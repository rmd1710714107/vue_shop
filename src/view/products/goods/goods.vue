<template>
    <div class="shop">
      <contents></contents>
    </div>
</template>

<script>
import contents from "./childComp/contents"
export default {
  name:"shop",
  components: {
    contents
  },
  data() {
    return {
    };
  },
}
</script>