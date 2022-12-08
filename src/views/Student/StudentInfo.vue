<template>
  <div>
    <el-card>
      <el-descriptions class="margin-top" title="简介" :column="2" border>
        <template slot="extra">
          <el-button type="primary" size="small">Edit</el-button>
        </template>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-picture-outline"></i>
            Avatar
          </template>
          <img class="img" :src="avatar" alt="" />
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
            <i class="el-icon-s-custom"></i>
            Address
          </template>
          {{ address }}
        </el-descriptions-item>
        <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-s-custom"></i>
          Major
        </template>
        {{ major }}
      </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-s-custom"></i>
            Year
          </template>
          {{ year }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-s-custom"></i>
            Institute
          </template>
          {{ institute }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
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
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      this.account=localStorage.getItem("UserId")
      request.get("/student/"+this.account)
          .then((res) => {
            console.log(res)
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
            console.log(err);
          });
    },
  },
}
</script>

<style scoped>

</style>