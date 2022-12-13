<template>
  <div style="font-size: 12px; border-bottom: 1px solid #ccc; line-height: 60px; display: flex">
    <div style="flex: 1">
      <span :class="collapseBtnClass" style="cursor: pointer; font-size: 20px" @click="Collapse"></span>
      <el-breadcrumb separator="/" style="display: inline-block; margin-left: 10px">
        <el-breadcrumb-item v-for="item in routers" :to="{ path: item.path }" :key="item.index">
          {{ item.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-dropdown style="width: 100px; cursor: pointer">
      <div style="display: inline-block">
        <span>{{ UserName }}</span><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
      </div>
      <el-dropdown-menu slot="dropdown" style="width: 100px; text-align: center">
        <el-dropdown-item style="font-size: 17px; padding: 5px 0" >
          <span style="text-decoration: none" @click="logout" >Exit</span>
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
    collapse: {
      type: Function,
      default: () => {
        return Function;
      },
    },

  },
  computed: {
    routers() {
      return this.$route.matched.map((i, index) => {
        return {key: index, name: i.name, path: i.path}
      })
    }
  },
  data() {
    return {
      UserName: localStorage.getItem("UserName"),
      routerpath: []
    }
  },

  methods: {
    logout() {
      this.$router.push("/")
      localStorage.removeItem("UserName")
      localStorage.removeItem("UserId")
      localStorage.removeItem("User")
      localStorage.removeItem("Type")
      this.$message.success("Exit successfully")
    },
    Collapse() {
      this.collapse();
    },

  }
}
</script>

<style scoped>

</style>