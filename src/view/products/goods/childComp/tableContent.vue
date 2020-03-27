<template>
<!-- 显示表格数据并实现搜索关键字高亮 -->
  <div class="tableContent">
    <p v-html="res"></p>
  </div>
</template>

<script>
export default {
  name: "tableContent",
  components: {},
  props: {
    tableData: null,
    query: {
      type: String,
      default: ""
    },
    isLight:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
    };
  },
  computed: {
    res() {
      if (this.isLight) {
        if (typeof this.tableData === "string") {
           let reg = new RegExp(this.query,"g");
          return this.tableData.replace(reg,'<span style="background-color:yellow;">'+this.query+"</span>");
        }
      }
      return this.tableData;
    }
  }
};
</script>