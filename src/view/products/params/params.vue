<template>
    <div class="params">
      <contents></contents>
    </div>
</template>

<script>
import contents from "./childComp/contents"
export default {
  name:"params",
  components: {
    contents
  },
  data() {
    return {
    };
  },
}
</script>