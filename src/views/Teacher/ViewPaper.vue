<template>
  <div class="content">
        <el-collapse class="inner">
          <el-collapse-item>
            <template slot="title" name="1">
              <div class="titlei">Number of Multi-choice question: {{topicCount[0]}}</div>
            </template>
            <div class="contenti">
              <el-table :data="topic[1]" border stripe :header-cell-class-name="headerBg">
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="Analysis" style="width: 80%">
                        <span>{{ props.row.analysis }}</span>
                      </el-form-item>
                      <el-form-item label="Score">
                        <span>{{ props.row.score }}</span>
                      </el-form-item>
                      <el-form-item label="Section">
                        <span>{{ props.row.section }}</span>
                      </el-form-item>
                      <el-form-item label="Level">
                        <span>{{ props.row.level }}</span>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
                <!--      <el-table-column prop="questionid" label="Question Id" width="140">-->
                <!--      </el-table-column>-->
                <el-table-column prop="subject" label="Subject" width="120">
                </el-table-column>
                <el-table-column prop="question" label="Question" width="180">
                </el-table-column>
                <el-table-column prop="answera" label="Answer A" width="160">
                </el-table-column>
                <el-table-column prop="answerb" label="Answer B" width="160">
                </el-table-column>
                <el-table-column prop="answerc" label="Answer C" width="160">
                </el-table-column>
                <el-table-column prop="answerd" label="Answer D" width="160">
                </el-table-column>
                <el-table-column prop="rightanswer" label="Right answer" width="110">
                </el-table-column>
                <el-table-column label="Operation"  width="200" align="center">
                  <template v-slot="scope">
                    <el-popconfirm
                        class="ml-5"
                        confirm-button-text='Yes'
                        cancel-button-text='No'
                        icon="el-icon-info"
                        icon-color="red"
                        title="Are you sure you want to delete it?"
                        @confirm="del(scope.row.questionid)"
                    >
                      <el-button type="danger" slot="reference">Delete <i class="el-icon-remove-outline"></i></el-button>
                    </el-popconfirm>

                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title" name="2">
              <div class="titlei">Number of Fill-in question: {{topicCount[1]}}</div>
            </template>
            <div class="contenti">
              <el-table :data="topic[2]" border stripe :header-cell-class-name="headerBg">
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="Analysis" style="width: 100%">
                        <span>{{ props.row.analysis }}</span>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
                <!--      <el-table-column prop="questionid" label="Question Id" width="140">-->
                <!--      </el-table-column>-->
                <el-table-column prop="subject" label="Subject" width="140">
                </el-table-column>
                <el-table-column prop="question" label="Question" width="345">
                </el-table-column>
                <el-table-column prop="answer" label="Answer" width="140">
                </el-table-column>
                <!--      <el-table-column prop="analysis" label="Analysis" width="160">-->
                <!--      </el-table-column>-->
                <el-table-column prop="score" label="Score" width="140">
                </el-table-column>
                <el-table-column prop="section" label="Section" width="140">
                </el-table-column>
                <el-table-column prop="level" label="Level" width="140">
                </el-table-column>
                <el-table-column label="Operation" width="200" align="center">
                  <template v-slot="scope">
                    <el-popconfirm
                        class="ml-5"
                        confirm-button-text='Yes'
                        cancel-button-text='No'
                        icon="el-icon-info"
                        icon-color="red"
                        title="Are you sure you want to delete it?"
                        @confirm="del(scope.row.questionid)"
                    >
                      <el-button type="danger" slot="reference">Delete <i class="el-icon-remove-outline"></i></el-button>
                    </el-popconfirm>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title" name="3">
              <div class="titlei">Number of Judge question: {{topicCount[2]}}</div>
            </template>
            <div class="contenti">
              <el-table :data="topic[3]" border stripe :header-cell-class-name="headerBg">
                <!--      <el-table-column prop="questionid" label="Question Id" width="140">-->
                <!--      </el-table-column>-->
                <el-table-column prop="subject" label="Subject" width="170">
                </el-table-column>
                <el-table-column prop="question" label="Question" width="310">
                </el-table-column>
                <el-table-column prop="answer" label="Answer" width="80">
                </el-table-column>
                <el-table-column prop="analysis" label="Analysis" width="250">
                </el-table-column>
                <el-table-column prop="score" label="Score" width="80">
                </el-table-column>
                <el-table-column prop="section" label="Section" width="120">
                </el-table-column>
                <el-table-column prop="level" label="Level" width="80">
                </el-table-column>
                <el-table-column label="Operation"  width="200" align="center">
                  <template v-slot="scope">
                    <el-popconfirm
                        class="ml-5"
                        confirm-button-text='Yes'
                        cancel-button-text='No'
                        icon="el-icon-info"
                        icon-color="red"
                        title="Are you sure you want to delete it?"
                        @confirm="del(scope.row.questionid)"
                    >
                      <el-button type="danger" slot="reference">Delete <i class="el-icon-remove-outline"></i></el-button>
                    </el-popconfirm>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-collapse-item>
        </el-collapse>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "ViewPaper",
  data(){
    return{
      topicCount: [], //每种类型题目的总数
      score: [],  //每种类型分数的总数
      examData: { //考试信息
        // source: null,
        // totalScore: null,
      },
      activeName: '0',
      headerBg: 'headerBg',
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
      let paperId = this.$route.query.paperId //获取路由传递过来的试卷编号
        request.get("/paper-manage/paper/"+paperId).then(res => {  //通过paperId获取试题题目信息
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
    },
    del(id) {
      request.delete(`/paper-manage/${id}`).then(res => {
        if (res) {
          this.$message.success("Delete successfully")
          this.load()
        } else {
          this.$message.error("Delete failed")
        }
      })
    },
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val
    },
  }
}
</script>

<style scoped>

</style>