<template>
  <div>
    <el-row :gutter="0">
      <el-col :span="3">
        <div style="height: 100px; line-height: 60px; width: 200px">
          <img src="../../assets/new_logo.png" alt="" style="width: 30px; position: relative; right: 5px; margin-top: 15px">
          <b style="color: black; font-size: 20px; margin-bottom: 20px">Online Exam</b>
        </div>
      </el-col>
      <el-col :span="20">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" router
                 style="">
          <el-menu-item index="/myexam">Exam List</el-menu-item>
          <el-menu-item index="/myscore">My Score</el-menu-item>
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
      activeIndex: '1',
      activeIndex2: '1'
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style scoped>

</style>