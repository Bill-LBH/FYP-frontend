<template>
  <div>
    <el-row :gutter="0">
      <el-col :span="3">
        <div style="height: 60px; line-height: 60px; text-align: center; display: flex; background-color:#293c54 ">
          <i class="iconfont icon-kaoshi" style="font-size: 40px; font-weight: bold; color: #ffd04b;"></i>
          <b style="color: #ffd04b; font-size: 25px; font-family:logo2; margin-top: 3px ">Online Exam</b>
        </div>
      </el-col>
      <el-col :span="21">
        <el-menu :default-openeds="[]" default-active="/myexam" class="el-menu-demo" mode="horizontal"
                 @select="handleSelect" router
                 style="" background-color="#293c54"
                 text-color="#cfd7e7"
                 active-text-color="#ffd04b">
          <el-menu-item index="/myexam" style="font-size: 15px;font-weight: bold">Exam List</el-menu-item>
          <el-menu-item index="/myscore" style="font-size: 15px;font-weight: bold">My Score</el-menu-item>
          <el-menu-item style="position: absolute; right:0;">
            <el-dropdown style="width: 100px; cursor: pointer">
              <div style="display: inline-block">
                <span style="font-size: 15px;font-weight: bold;color:#cfd7e7 ">{{ UserName }}</span><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
              </div>
              <el-dropdown-menu slot="dropdown" style="width: 100px; text-align: center">
                <el-dropdown-item style="font-size: 17px; padding: 5px 0">
                  <router-link to="/person">Info</router-link>
                </el-dropdown-item>
                <el-dropdown-item style="font-size: 17px; padding: 5px 0">
                  <span style="text-decoration: none" @click="logout">Exit</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Navigation",
  data() {
    return {
      UserName: localStorage.getItem("UserName"),
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    logout() {
      this.$router.push("/")
      localStorage.removeItem("UserName")
      localStorage.removeItem("UserId")
      this.$message.success("Exit successfully")
    },
  }
}
</script>

<style scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>