<template>
    <div class="report">
      <contents></contents>
    </div>
</template>

<script>
import contents from "./childComp/contents"
export default {
  name:"report",
  components: {
    contents
  },
  data() {
    return {

    };
  },
}
</script>