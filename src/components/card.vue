<template>
    <div class="card">
      <el-card class="box-card" shadow="never">
        <slot></slot>
      </el-card>
    </div>
</template>

<script>
export default {
  name:"card"
}
</script>
<style scoped>
  .card{
    margin-top: 0.15rem;
  }
</style>