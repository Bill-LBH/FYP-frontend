<template>
  <div class="loginwrapper">
    <div style="margin: 200px auto; background-color: #fff; width: 360px; height: 340px; padding: 20px; border-radius: 10px">
      <div style="margin: 20px 0; text-align: center; font-size: 24px; color: darkorange">
        <i class="el-icon-reading"></i>
        <b style="margin-left: 10px">Online exam system</b></div>
      <el-form :model="user" :rules="rules" ref="studentForm">
        <el-form-item prop="id">
          <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-user" v-model="user.id"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-lock" show-password v-model="user.password"></el-input>
        </el-form-item>
        <div style="text-align: center " >
          <el-radio-group v-model="identity">
            <el-radio :label="1" style="margin-right: 40px;color: lightslategray">Student</el-radio>
            <el-radio :label="2" style="margin-left: 40px;color: lightslategray">Teacher</el-radio>
          </el-radio-group>
        </div>
        <el-form-item style="margin: 15px 15px; text-align: center">
          <el-button style="margin-right: 30px" type="primary" size="medium"  autocomplete="off" @click="login">Login</el-button>
          <el-button style="margin-left: 30px" type="warning" size="medium"  autocomplete="off" @click="register">Register</el-button>
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
      identity:'3',
      rules: {
        id: [
          { required: true, message: 'Please input user ID', trigger: 'blur' },
          { min: 10, max: 10, message: 'Length is 10 characters', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please input password', trigger: 'blur' },
          { min: 5, max: 16, message: 'Length from 5 to 16 characters', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    login() {
      this.$refs['studentForm'].validate((valid) => {
        if (valid) {  // 表单校验合法
          if(this.identity=="1"){

            this.request.post("/student/login", this.user).then(res => {
              if(res.code!=200) {
                this.$message.error("Student name or password error")
              } else {
                this.$router.push("/index")
              }
            })
          }
          else if(this.identity=="2"){
            this.request.post("/teacher/login", this.user).then(res => {
              if(res.code!=200) {
                this.$message.error("Teacher name or password error")
              } else {
                this.$router.push("/teacher")
              }
            })

          }
          else if(this.identity=="3"){
            this.$message.error("Please select user type")
          }
        } else {
          return false;
        }
      });
    },
    register(){
      console.log(this.identity)
      if(this.identity=="1"){
        console.log(this.identity)
            this.$router.push('/verify')
          }
      else if(this.identity=="2"){
        this.$message.error("Teacher can't register the account")
      }

      else if(this.identity=="3"){
        this.$message.error("Please select user type")
      }
      else {
        return false;
      }
      }
        }
}
</script>

<style>
.loginwrapper {
  height: 100vh;
  background-image: linear-gradient(to bottom right, #fffb0d , #3F5EFB);
  overflow: hidden;

}
</style>