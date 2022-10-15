<template>
  <div style="font-size: 12px; border-bottom: 1px solid #ccc; line-height: 60px; display: flex">
  <div style="flex: 1">
    <span :class="collapseBtnClass" style="cursor: pointer; font-size: 20px" @click="collapse"></span>
      <el-breadcrumb separator="/" style="display: inline-block; margin-left: 10px">
        <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
        <el-breadcrumb-item>{{ currentPathName }}</el-breadcrumb-item>
      </el-breadcrumb>
  </div>
  <el-dropdown style="width: 70px; cursor: pointer">
    <span>Lin</span><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
    <el-dropdown-menu slot="dropdown" >
      <el-dropdown-item style="font-size: 14px; padding: 5px 0">Info</el-dropdown-item>
      <el-dropdown-item style="font-size: 14px; padding: 5px 0">Exit</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    collapseBtnClass: String,
    collapse: Boolean,
  },
  computed: {
    currentPathName () {
      return this.$route.name;　　//需要监听的数据
    }
  }
}
</script>

<style scoped>

</style>