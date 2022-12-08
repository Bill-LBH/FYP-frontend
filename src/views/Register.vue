<template>
  <div class="registerwrapper">
    <div style="margin: 100px auto; background-color: #fff; width: 350px; height: 500px; padding: 20px; border-radius: 10px">
      <div style="margin: 20px 0; text-align: center; font-size: 24px"><b>Register</b></div>
      <el-form :model="student" :rules="rules" ref="studentForm">
        <el-form-item prop="password">
          <el-input placeholder="Please input password" size="medium" style="margin: 5px 0" prefix-icon="el-icon-lock" show-password v-model="student.password"></el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input placeholder="Please confirm password" size="medium" style="margin: 5px 0" prefix-icon="el-icon-lock" show-password v-model="student.confirmPassword"></el-input>
        </el-form-item>
        <el-form-item prop="address">
          <el-input placeholder="Please input your address" size="medium" style="margin: 5px 0" prefix-icon="el-icon-s-home"  v-model="student.address"></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input placeholder="Please input your email" size="medium" style="margin: 5px 0" prefix-icon="el-icon-message"  v-model="student.email"></el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input placeholder="Please input your phone" size="medium" style="margin: 5px 0" prefix-icon="el-icon-mobile"  v-model="student.phone"></el-input>
        </el-form-item>
        <el-form-item style="margin: 5px 0; text-align: right">
          <el-button type="primary" size="small"  autocomplete="off" @click="register">Register</el-button>
          <el-button type="warning" size="small"  autocomplete="off" @click="$router.push('/')">Back to login</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      student: {id:''},
      rules: {
        password: [
          { required: true, message: 'Please input password', trigger: 'blur' },
          { min: 1, max: 20, message: 'Length is between 1 and 20 characteristics', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: 'Please input password', trigger: 'blur' },
          { min: 1, max: 20, message: 'Length is between 1 and 20 characteristics', trigger: 'blur' }
        ],
        address: [
          { required: true, message: 'Please input your address', trigger: 'blur' },
          { min: 1, max: 255, message: 'Length is between 1 and 255 characteristics', trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'Please input your email', trigger: 'blur' },
          { min: 1, max: 25, message: 'Length is between 1 and 25 characteristics', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: 'Please input your phone', trigger: 'blur' },
          { min: 1, max: 20, message: 'Length is between 1 and 20 characteristics', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    register() {
      this.student.id=this.$route.query.id
      this.$refs['studentForm'].validate((valid) => {
        if (valid) {  // 表单校验合法
          if (this.student.password !== this.student.confirmPassword) {
            this.$message.error("The password entered twice does not match")
            return false
          }
          this.request.post("/student/register", this.student).then(res => {
            if(res) {
              this.$message.success("Register successfully")
              this.$router.push("/")
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      });
    }
  }
}
</script>

<style>
.registerwrapper {
  height: 100vh;
  background-image: linear-gradient(to bottom right, #FC466B , #3F5EFB);
  overflow: hidden;
}
</style>