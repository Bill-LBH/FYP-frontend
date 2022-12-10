<template>
  <section class="index">
    <div class="hello">
      <i class="iconfont icon-xihuan" style="margin-right: 40px"></i>
      <span>Nice to meet you,professor {{user.userName}}</span>
    </div>
    <div class="msg">
      <p class="title">Academic affairs：</p>
      <ul>
        <li @click="openMsg1()"><i class="iconfont icon-flag"></i>Public holiday notice</li>
        <li @click="openMsg2()"><i class="iconfont icon-flag"></i>Process of FYP presentation</li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      user: { //用户信息
        userName: null,
        userId: null
      }
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() { //获取用户信息
      let userName = localStorage.getItem("UserName")
      let userId = localStorage.getItem("UserId")
      this.user.userName = userName
      this.user.userId = userId
    },
    openMsg1() {
      this.$alert('Dear professor,Monday is public holiday, please arrange the replacement class','Public holiday notice',{
        confirmButtonText: 'OK'
      })
    },
    openMsg2() {
      this.$alert('Dear professor,Please check the thesis of final year student','Process of FYP presentation',{
        confirmButtonText: 'OK'
      })
    }
  }
}
</script>


<style lang="less" scoped>
.index {
  margin-left: 70px;
  .hello {
    font-size: 20px;
    color: #726f70;
    .icon-xihuan {
      font-size: 30px;
      color: #dd6572;
    }
  }
  .msg {
    .title {
      font-size: 16px;
      color: #000;
      margin-top: 20px;
      margin-left: 10px;
    }
    ul {
      display: flex;
      flex-direction: column;
      width: 300px;
      overflow: hidden;
    }
    li {
      margin-top: 10px;
      font-size: 14px;
      color: lightcoral;
      cursor: pointer;
      display: inline-block;
    }
  }
}
</style>