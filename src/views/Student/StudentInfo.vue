<template>
  <div>
    <el-card>
      <el-descriptions class="margin-top" title="Info" :column="2" border>
        <template slot="extra">
          <el-button type="primary" size="small" @click="handleEdit">Edit</el-button>
        </template>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-picture-outline"></i>
            Avatar
          </template>
          <img class="img" :src="avatar" alt="" style="height: 120px"/>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            User Id
          </template>
          {{ account }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-s-custom"></i>
            User name
          </template>
          {{ nickname }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-male"></i>
            <i class="el-icon-female"></i>
            Gender
          </template>
          <el-tag size="small">{{ sex }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-message"></i>
            Email
          </template>
          {{ email }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            Phone number
          </template>
          {{ mobilePhoneNumber }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-s-home"></i>
            Address
          </template>
          {{ address }}
        </el-descriptions-item>
        <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-s-cooperation"></i>
          Major
        </template>
        {{ major }}
      </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-date"></i>
            Year
          </template>
          {{ year }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-school"></i>
            Institute
          </template>
          {{ institute }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-dialog title="New student Information" :visible.sync="dialogFormVisible" width="30%" >
      <el-form label-width="100px" size="small">
        <el-form-item label="Address">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="save">Confirm</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "StudentInfo",
  data() {
    return {
      avatar: null,
      account: null,
      email: null,
      mobilePhoneNumber: null,
      nickname: null,
      sex: null,
      address:null,
      major:null,
      year:null,
      institute:null,
      form: {},
      dialogFormVisible: false,
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    save() {
      request.post("/student", this.form).then(res => {
        if (res) {
          this.$message.success("Save successfully")
          this.dialogFormVisible = false
          this.load()
        } else {
          this.$message.error("Failed")
        }
      })
    },
    load() {
      this.account=localStorage.getItem("UserId")
      request.get("/student/"+this.account)
          .then((res) => {
            this.avatar = res.url;
            this.email = res.email;
            this.mobilePhoneNumber = res.phone;
            this.nickname = res.username;
            this.sex = res.gender;
            this.address=res.address;
            this.major=res.major;
            this.year=res.year;
            this.institute=res.institute;
          })
          .catch((err) => {
          });
    },
    handleEdit() {
      this.form.address=this.address
      this.form.email=this.email
      this.form.phone=this.mobilePhoneNumber
      this.dialogFormVisible = true
    },
  },
}
</script>

<style scoped>

</style>