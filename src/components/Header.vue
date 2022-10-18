<template>
  <div style="font-size: 12px; border-bottom: 1px solid #ccc; line-height: 60px; display: flex">
  <div style="flex: 1">
    <span :class="collapseBtnClass" style="cursor: pointer; font-size: 20px" @click="collapse"></span>
      <el-breadcrumb separator="/" style="display: inline-block; margin-left: 10px">
        <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
        <el-breadcrumb-item>{{ currentPathName }}</el-breadcrumb-item>
      </el-breadcrumb>
  </div>
    <el-dropdown style="width: 100px; cursor: pointer">
      <div style="display: inline-block">
        <span>{{ teacher.username }}</span><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
      </div>
      <el-dropdown-menu slot="dropdown" style="width: 100px; text-align: center">
        <el-dropdown-item style="font-size: 14px; padding: 5px 0">
          <router-link to="/person">Personal info</router-link>
        </el-dropdown-item>
        <el-dropdown-item style="font-size: 14px; padding: 5px 0">
          <span style="text-decoration: none" @click="logout">Exit</span>
        </el-dropdown-item>
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
  },
  data() {
    return {
      teacher: localStorage.getItem("teacher") ? JSON.parse(localStorage.getItem("teacher")) : {}
    }
  },

  methods: {
    logout() {
      this.$router.push("/login")
      localStorage.removeItem("teacher")
      this.$message.success("Exit successfully")
    }
  }
}
</script>

<style scoped>

</style>