<template>
  <div class="wrapper">
    <div style="margin: 200px auto; background-color: #fff; width: 350px; height: 320px; padding: 20px; border-radius: 10px">
      <div style="margin: 20px 0; text-align: center; font-size: 24px"><b>Online exam system</b></div>
      <el-form :model="user" :rules="rules" ref="studentForm">
        <el-form-item prop="id">
          <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-user" v-model="user.id"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-lock" show-password v-model="user.password"></el-input>
        </el-form-item>
        <div style="margin-left: 60px">
          <el-radio-group v-model="identity">
            <el-radio :label="1">Student</el-radio>
            <el-radio :label="2">Teacher</el-radio>
          </el-radio-group>
        </div>
        <el-form-item style="margin: 10px 0; text-align: right">
          <el-button type="primary" size="small"  autocomplete="off" @click="login">Login</el-button>
          <el-button type="warning" size="small"  autocomplete="off">Register</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      user: {},
      identity:'',
      rules: {
        id: [
          { required: true, message: 'Please input user ID', trigger: 'blur' },
          { min: 1, max: 15, message: 'Length from 1 to 15 characters', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please input password', trigger: 'blur' },
          { min: 1, max: 16, message: 'Length from 1 to 16 characters', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    login() {
      this.$refs['studentForm'].validate((valid) => {
        if (valid) {  // 表单校验合法
          console.log(this.identity)
          if(this.identity="1"){

            this.request.post("/student/login", this.user).then(res => {
              if(!res) {
                this.$message.error("Student name or password error")
              } else {
                this.$router.push("/")
              }
            })
          }
          else if(this.identity="2"){
            this.request.post("/teacher/login", this.user).then(res => {
              if(!res) {
                this.$message.error("Teacher name or password error")
              } else {
                this.$router.push("/")
              }
            })

          }
        } else {
          return false;
        }
      });
    }
  }
}
</script>

<style>
.wrapper {
  height: 100vh;
  background-image: linear-gradient(to bottom right, #FC466B , #3F5EFB);
  overflow: hidden;

}
</style>