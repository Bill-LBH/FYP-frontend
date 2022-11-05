<template>
  <el-menu :default-openeds="[]" default-active="/home" style="min-height: 100%; overflow-x: hidden"
           background-color="#293c54"
           text-color="#cfd7e7"
           active-text-color="#ffd04b"
           :collapse-transition="false"
           :collapse="isCollapse"
           router
  >
    <div style="margin-left: 5px; height: 60px; line-height: 60px; text-align: center; display: flex">
      <i class="iconfont icon-kaoshi" style="font-size: 40px; font-weight: bold; color: #ffd04b;"></i>
      <b style="margin-top:4px; color: #ffd04b; font-size: 25px; font-family:logo2 " v-show="logoTextShow">Online Exam</b>
    </div>
    <el-menu-item index="/home" style="font-size: 17px; font-weight: bold">
      <i class="el-icon-house"></i>
      <template slot="title">
        <span slot="title">Homepage</span>
      </template>
    </el-menu-item>
    <el-submenu index="1" >
      <template slot="title">
        <i class="el-icon-date"></i>
        <span style="font-size: 17px;font-weight: bold">Exam</span>
      </template>
      <el-menu-item index="/exam" style="font-size: 15px;font-weight: bold">
        <template slot="title">
          <span slot="title">Exam arrange</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/papermanage" style="font-size: 15px;font-weight: bold">
        <template slot="title">
          <span slot="title">Paper setting</span>
        </template>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="2" style="font-size: 17px;font-weight: bold">
      <template slot="title">
        <i class="el-icon-notebook-2"></i>
        <span style="font-size: 17px">Question</span>
      </template>
      <el-menu-item index="/multi_choice" style="font-size: 15px">
        <template slot="title">
          <span slot="title">Multiple-choice</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/fill_in" style="font-size: 15px">
        <template slot="title">
          <span slot="title">Fill-in</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/judge" style="font-size: 15px">
        <template slot="title">
          <span slot="title">Judge</span>
        </template>
      </el-menu-item>
    </el-submenu>
    <el-menu-item index="/score" style="font-size: 17px;font-weight: bold">
      <i class="el-icon-notebook-1"></i>
      <template slot="title">
        <span slot="title">Score</span>
      </template>
    </el-menu-item>
    <el-menu-item index="/student" style="font-size: 17px;font-weight: bold">
      <i class="el-icon-user-solid"></i>
      <template slot="title">
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