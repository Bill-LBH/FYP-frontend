<template>
  <el-container>
    <el-header style="padding: 0">
      <Navigation/>
    </el-header>
    <el-main class="main">
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
.main {
  background-color: #eee;
  height: 700px;
}

</style>