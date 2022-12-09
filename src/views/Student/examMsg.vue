<template>
  <div id="msg">
    <div class="title">
      <span>Paper list</span>
      <span> /  {{examData.source}}</span>
    </div>
    <div class="wrapper">
      <ul class="top">
        <li class="example">{{examData.source}}</li>
        <li class="right">
          <div>
            <span class="count">Total points</span>
            <span class="score">{{examData.totalscore}}</span>
          </div>
        </li>
      </ul>
      <ul class="bottom">
        <li>Update in {{examData.examdate}}</li>
        <li>From {{examData.major}}</li>
        <li class="btn">{{examData.type}}</li>
        <li class="right"><el-button @click="toAnswer(examData.examcode)">Start to answer</el-button></li>
      </ul>
      <ul class="info">
        <li @click="dialogVisible = true"><a href="javascript:;"><i class="el-icon-files"></i> Notice to Candidates</a></li>
      </ul>
    </div>
    <div class="content">
      <el-collapse v-model="activeName" >
        <el-collapse-item class="header" name="0">
          <template slot="title" class="stitle" >
            <div class="title">
              <span style="width: 550px">{{examData.source}}</span>
              <span class="time">{{examData.totalscore}} Points / {{examData.totaltime}} Minutes</span>
              <el-button type="primary" size="small">Details of questions</el-button>
            </div>
          </template>
          <el-collapse class="inner">
            <el-collapse-item>
              <template slot="title" name="1">
                <div class="titlei">Number of Multi-choice question: {{topicCount[0]}}</div>
              </template>
            </el-collapse-item>
            <el-collapse-item>
              <template slot="title" name="2">
                <div class="titlei">Number of Fill-in question: {{topicCount[1]}}</div>
              </template>
            </el-collapse-item>
            <el-collapse-item>
              <template slot="title" name="3">
                <div class="titlei">Number of Judge question: {{topicCount[2]}}</div>
              </template>
            </el-collapse-item>
          </el-collapse>
        </el-collapse-item>

      </el-collapse>
    </div>
    <!--考生须知对话框-->
    <el-dialog
        title="Notice to Candidates"
        :visible.sync="dialogVisible"
        width="30%">
      <span>{{examData.tips}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">OK</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import request from "@/utils/request";
import {mapState} from 'vuex'
import store from '@/vuex/store'
export default {
  name: "examMsg",
  data() {
    return {
      dialogVisible: false, //对话框属性
      activeName: '0',  //默认打开序号
      topicCount: [],//每种类型题目的总数
      score: [],  //每种类型分数的总数
      examData: { //考试信息
        // source: null,
        // totalScore: null,
      },
      topic: {  //试卷信息

      },
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    //初始化页面数据
    init() {
      let examcode = this.$route.query.examcode //获取路由传递过来的试卷编号
      request.get("/exam/"+examcode).then(res => {  //通过examCode请求试卷详细信息
        this.examData = res.data
        let paperId = this.examData.paperid
        request.get("/paper-manage/paper/"+paperId).then(res => {  //通过paperId获取试题题目信息
          console.log(res)
          this.topic = res
          console.log(this.topic)
          let keys = Object.keys(this.topic) //对象转数组
          keys.forEach(e => {
            let data = this.topic[e]
            this.topicCount.push(data.length)
            let currentScore = 0
            for(let i = 0; i< data.length; i++) { //循环每种题型,计算出总分
              currentScore += data[i].score
            }
            this.score.push(currentScore) //把每种题型总分存入score
          })
        })
      })
    },
    toAnswer(id) {
      let isPractice = false
      store.commit("practice", isPractice)
      this.$router.push({path:"/answer",query:{examcode: id}})
    },
  },
  computed:mapState(["isPractice"])
}
</script>

<style lang="less" scoped>
.bottom {
  .right{
    .el-button{
      color: #409EFF;
      border-color: #c6e2ff;
      background-color: #ecf5ff;
    }
  }
}
.right {
  margin-left: auto;
}
.inner .contenti .question {
  margin-left: 40px;
  color: #9a9a9a;
  font-size: 14px;
}
.content .inner .titlei {
  margin-left: 20px;
  font-size: 16px;
  color: #88949b;
  font-weight: bold;
}
.content .title .time {
  font-size: 16px;
  color: #999;
}
.content .stitle {
  background-color: #0195ff;
}
.content .title span {
  margin-right: 10px;
}
#msg .content .title {
  height: 90px;
  font-size: 20px;
  margin: 0px;
  display: flex;
  align-items: center;
}
.content {
  margin-top: 20px;
  background-color: #fff;
}
.content .header {
  padding: 10px 30px;
}
.wrapper .info {
  margin: 20px 0px 0px 20px;
  border-top: 1px solid #eee;
  padding: 20px 0px 10px 0px;
}
.wrapper .info a {
  color: #88949b;
  font-size: 14px;
}
.wrapper .info a:hover {
  color: #0195ff;
}
.wrapper .bottom .btn {
  cursor: pointer;
  padding: 5px 10px;
  border: 1px solid #88949b;
  border-radius: 4px;
}
.wrapper .bottom {
  display: flex;
  margin-left: 20px;
  color: #999;
  font-size: 14px;
  align-items: center;
}
.wrapper .bottom li {
  margin-right: 14px;
}
#msg {
  background-color: #eee;
  width: 980px;
  margin: 0 auto;
}
#msg .title {
  margin: 20px;
}
#msg .wrapper {
  background-color: #fff;
  padding: 10px;
}
.wrapper .top {
  display: flex;
  margin: 20px;
  align-items: center;
}
.wrapper .top .right {
  margin-left: auto;
}
.wrapper .top .example {
  color: #333;
  font-size: 22px;
  font-weight: 700;
}
.wrapper .top li i {
  margin-left: 20px;
  color: #88949b;
}
.wrapper .right .count {
  color: #fff;
  padding: 4px 10px;
  background-color: #88949b;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border: 1px solid #88949b;
}
.wrapper .right .score {
  position: relative;
  padding: 1px 12px;
  font-size: 20px;
  color: #88949b;
  border: 1px dashed #88949b;
  border-left: none;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  font-weight: bold;
}
.wrapper .right div {
  position: relative;
}
</style>
