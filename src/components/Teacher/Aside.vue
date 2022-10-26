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
      <img src="../../assets/new_logo.png" alt="" style="width: 30px; position: relative; top:5px;  right: 5px">
      <b style="color: white; font-size: 20px" v-show="logoTextShow">Online Exam</b>
    </div>
    <el-menu-item index="/home" style="font-size: 17px">
      <i class="el-icon-house"></i>
      <template slot="title">
        <span slot="title">Homepage</span>
      </template>
    </el-menu-item>
    <el-submenu index="1" >
      <template slot="title">
        <i class="el-icon-date"></i>
        <span style="font-size: 17px">Exam</span>
      </template>
      <el-menu-item index="/exam" style="font-size: 15px">
        <template slot="title">
          <span slot="title">Exam arrange</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/papermanage" style="font-size: 15px">
        <template slot="title">
          <span slot="title">Paper setting</span>
        </template>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="2" style="font-size: 17px">
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
    <el-menu-item index="/score" style="font-size: 17px">
      <i class="el-icon-notebook-1"></i>
      <template slot="title">
        <span slot="title">Grade</span>
      </template>
    </el-menu-item>
    <el-menu-item index="/student" style="font-size: 17px">
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