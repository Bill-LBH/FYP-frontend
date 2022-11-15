<template>
  <div class="verifywrapper">
    <div style="margin:200px 638px 100px 638px; background-color: #fff; width: 260px; height: 180px; padding: 20px; border-radius: 10px">
      <el-form :model="student" :rules="rules" ref="studentForm">
        <el-form-item prop="id" style="margin-top: 30px">
          <el-input placeholder="Please input your user id" size="medium" style="margin: 5px 0" prefix-icon="el-icon-user" v-model="student.id"></el-input>
        </el-form-item>
        <el-button style="margin: 10px 70px" type="primary" size="medium"  autocomplete="off" @click="verify">Verify</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "VerifyAccount",
  data() {
    return {
      student:{},
      rules:{
        id: [
          { required: true, message: 'Please input your student id', trigger: 'blur' },
          { min: 10, max: 10, message: 'Length is 10 characters', trigger: 'blur' }
        ],
      }
    }
    },
  methods: {
    verify(){
      this.$refs['studentForm'].validate((valid) => {
        if (valid) {
          this.request.get("/student/"+ this.student.id).then(res => {
            if(!res) {
              this.$message.error("Student doesn't exist")
            } else {
              this.$router.push({path:"/register",query:{id:this.student.id}})
            }
          })
        }// 表单校验合法
        else {
          return false;
        }
  });
    }
  }
}
</script>

<style scoped>
.verifywrapper {
  height: 100vh;
  background-image: linear-gradient(to bottom right, #fffb0d , #3F5EFB);
  overflow: hidden;

}
</style>