<template>
  <el-menu :default-openeds="[]" style="min-height: 100%; overflow-x: hidden"
           background-color="rgb(48, 65, 86)"
           text-color="#fff"
           active-text-color="#ffd04b"
           :collapse-transition="false"
           :collapse="isCollapse"
           router
  >
    <div style="height: 60px; line-height: 60px; text-align: center">
      <img src="../assets/new_logo.png" alt="" style="width: 40px; position: relative; top: 10px; right: 5px">
      <b style="color: white" v-show="logoTextShow">Online Exam</b>
    </div>
    <el-menu-item index="/">
      <template slot="title">
        <i class="el-icon-house"></i>
        <span slot="title">Homepage</span>
      </template>
    </el-menu-item>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-date"></i>
        <span>Exam</span>
      </template>
      <el-menu-item index="/exam">
        <template slot="title">
          <span slot="title">Exam arrange</span>
        </template>
      </el-menu-item>
      <el-menu-item index="3">
        <template slot="title">
          <span slot="title">Paper setting</span>
        </template>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-notebook-2"></i>
        <span>Question</span>
      </template>
      <el-menu-item index="/multi_choice">
        <template slot="title">
          <span slot="title">Multiple-choice</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/fill_in">
        <template slot="title">
          <span slot="title">Fill-in</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/judge">
        <template slot="title">
          <span slot="title">Judge</span>
        </template>
      </el-menu-item>
    </el-submenu>
    <el-menu-item index="/score">
      <template slot="title">
        <i class="el-icon-notebook-1"></i>
        <span slot="title">Grade</span>
      </template>
    </el-menu-item>
    <el-menu-item index="/student">
      <template slot="title">
        <i class="el-icon-user-solid"></i>
        <span slot="title">Student</span>
      </template>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "Aside",
  props: {
    isCollapse: Boolean,
    logoTextShow: Boolean
  }
}
</script>

<style scoped>

</style>