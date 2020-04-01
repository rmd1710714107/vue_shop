<template>
    <div class="order">
      <order-list></order-list>
    </div>
</template>

<script>
import orderList from "./childCom/orderList"
export default {
  name:"order",
  components: {
    orderList
  },
  data() {
    return {
    };
  },
}
</script>