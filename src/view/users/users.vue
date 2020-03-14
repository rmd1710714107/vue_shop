<template>
    <div class="users">
      <nav-bar></nav-bar>
      <contents></contents>
      <add-users></add-users>
      <editUsers></editUsers>
      <allot-roles></allot-roles>
    </div>
</template>

<script>
import navBar from "@/components/navBar"
import contents from "./childComp/contents"
import addUsers from "./childComp/addUsers"
import editUsers from "./childComp/editUsers"
import allotRoles from "./childComp/allotRoles"
export default {
  name:"users",
  components: {
    navBar,
    contents,
    addUsers,
    editUsers,
    allotRoles
  },
  data() {
    return {

    };
  },
}
</script>
<style scoped>

</style>