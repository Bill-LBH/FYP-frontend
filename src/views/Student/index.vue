<template>
  <el-container>
    <el-header>
<Navigation/>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
import Navigation from "@/components/Student/Navigation";
export default {
  name: "index",
  components: {
    Navigation
  }
}
</script>

<style scoped>

</style>