// 添加题库
<template>
  <div class="add">
    <el-tabs v-model="activeName">
      <el-tab-pane name="first">
        <span slot="label"><i class="el-icon-circle-plus"></i>Add questions</span>
        <section class="append">
          <ul>
            <li>
              <span>Type:</span>
              <el-select v-model="optionValue" placeholder="Please select question type" class="w150">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </li>
            <li v-if="optionValue == 'Multiple Choice'">
              <span>Section:</span>
              <el-input
                  placeholder="Type in section"
                  v-model="postChange.section"
                  class="w150"
                  clearable>
              </el-input>
            </li>
            <li v-if="optionValue == 'Multiple Choice'">
              <span>Score:</span>
              <el-input
                  placeholder="Type in score"
                  v-model="postChange.score"
                  class="w150"
                  clearable>
              </el-input>
            </li>
            <li v-if="optionValue == 'Fill-in-the-blank'">
              <span>Section:</span>
              <el-input
                  placeholder="Type in section"
                  v-model="postFill.section"
                  class="w150"
                  clearable>
              </el-input>
            </li>
            <li v-if="optionValue == 'Fill-in-the-blank'">
              <span>Score:</span>
              <el-input
                  placeholder="Type in score"
                  v-model="postFill.score"
                  class="w150"
                  clearable>
              </el-input>
            </li>
            <li v-if="optionValue == 'Judgement'">
              <span>Section:</span>
              <el-input
                  placeholder="Type in section"
                  v-model="postJudge.section"
                  class="w150"
                  clearable>
              </el-input>
            </li>
            <li v-if="optionValue == 'Judgement'">
              <span>Score:</span>
              <el-input
                  placeholder="Type in score"
                  v-model="postJudge.score"
                  class="w150"
                  clearable>
              </el-input>
            </li>
            <li v-if="optionValue == 'Multiple Choice'">
              <span>Difficulty Level:</span>
              <el-select v-model="postChange.level" placeholder="Select difficulty level" class="w150">
                <el-option
                    v-for="item in levels"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </li>
            <li v-if="optionValue == 'Fill-in-the-blank'">
              <span>Difficulty Level:</span>
              <el-select v-model="postFill.level" placeholder="Select difficulty level" class="w150">
                <el-option
                    v-for="item in levels"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </li>
            <li v-if="optionValue == 'Judgement'">
              <span>Difficulty Level:</span>
              <el-select v-model="postJudge.level" placeholder="Select difficulty level" class="w150">
                <el-option
                    v-for="item in levels"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </li>
            <li v-if="optionValue == 'Multiple Choice'">
              <span>Correct option:</span>
              <el-select v-model="postChange.rightanswer" placeholder="Select the correct answer" class="w150">
                <el-option
                    v-for="item in rights"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </li>
          </ul>
          <!-- 选择题部分 -->
          <div class="change" v-if="optionValue == 'Multiple Choice'">
            <div class="title">
              <el-tag>Question:</el-tag><span>Enter the title in the input box below, such as - The role of DNS servers and DHCP servers is ()</span>
              <el-input
                  type="textarea"
                  rows="4"
                  v-model="postChange.question"
                  placeholder="Please input question"
                  resize="none"
                  class="answer">
              </el-input>
            </div>
            <div class="options">
              <ul>
                <li>
                  <el-tag type="success">A</el-tag>
                  <el-input
                      placeholder="Input Option A"
                      v-model="postChange.answera"
                      clearable="">
                  </el-input>
                </li>
                <li>
                  <el-tag type="success">B</el-tag>
                  <el-input
                      placeholder="Input Option B"
                      v-model="postChange.answerb"
                      clearable="">
                  </el-input>
                </li>
                <li>
                  <el-tag type="success">C</el-tag>
                  <el-input
                      placeholder="Input Option C"
                      v-model="postChange.answerc"
                      clearable="">
                  </el-input>
                </li>
                <li>
                  <el-tag type="success">D</el-tag>
                  <el-input
                      placeholder="Input Option D"
                      v-model="postChange.answerd"
                      clearable="">
                  </el-input>
                </li>
              </ul>
            </div>
            <div class="title">
              <el-tag size="small">Explanation</el-tag><span>Enter explanation in the input box below</span>
              <el-input
                  type="textarea"
                  rows="4"
                  v-model="postChange.analysis"
                  placeholder="Please input explanation"
                  resize="none"
                  class="answer">
              </el-input>
            </div>
            <div class="submit">
              <el-button type="primary" @click="changeSubmit()">Add</el-button>
            </div>
          </div>
          <!-- 填空题部分 -->
          <div class="change fill" v-if="optionValue == 'Fill-in-the-blank'">
            <div class="title">
              <el-tag size="small">Question</el-tag><span>Enter the question, shaped as - From the perspective of the composition of computer network systems, computer networks can be divided into () and (). Note that the candidate's answer section must be enclosed in parentheses.</span>
              <el-input
                  type="textarea"
                  rows="4"
                  v-model="postFill.question"
                  placeholder="Please input question"
                  resize="none"
                  class="answer">
              </el-input>
            </div>
            <div class="fillAnswer">
              <el-tag size="small">Correct answer</el-tag>
              <el-input v-model="postFill.answer"></el-input>
            </div>
            <div class="title analysis">
              <el-tag type="success" size="small">Explanation</el-tag><span>Enter the explanation in the input box below</span>
              <el-input
                  type="textarea"
                  rows="4"
                  v-model="postFill.analysis"
                  placeholder="Please input explanation"
                  resize="none"
                  class="answer">
              </el-input>
            </div>
            <div class="submit">
              <el-button type="primary" @click="fillSubmit()">Add</el-button>
            </div>
          </div>
          <!-- 判断题 -->
          <div class="change judge" v-if="optionValue == 'Judgement'">
            <div class="title">
              <el-tag size="small">Question</el-tag><span>Enter the question in the input box below</span>
              <el-input
                  type="textarea"
                  rows="4"
                  v-model="postJudge.question"
                  placeholder="Please input question"
                  resize="none"
                  class="answer">
              </el-input>
            </div>
            <div class="judgeAnswer">
              <el-radio v-model="postJudge.answer" label="T">True</el-radio>
              <el-radio v-model="postJudge.answer" label="F">False</el-radio>
            </div>
            <div class="title">
              <el-tag size="small">Explanation</el-tag><span>Enter the explanation in the input box below</span>
              <el-input
                  type="textarea"
                  rows="4"
                  v-model="postJudge.analysis"
                  placeholder="Please input explanation"
                  resize="none"
                  class="answer">
              </el-input>
            </div>
            <div class="submit">
              <el-button type="primary" @click="judgeSubmit()">Add</el-button>
            </div>
          </div>
        </section>
        <!-- 在线手动组卷 -->
      </el-tab-pane>
      <el-tab-pane name="second">
        <span slot="label"><i class="el-icon-folder-add"></i>  Question selection</span>
        <div class="box">
          <span>Type:</span>
          <el-select v-model="questiontypea" placeholder="Types of questions" class="w150" @change="load" style="margin-left: 20px;width: 170px">
            <el-option
                v-for="item in type"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
          <div class="multiple" v-if="questiontypea=='Multiple choice question'">

            <el-table :data="MultitableData" border stripe :header-cell-class-name="headerBg" @selection-change="handleSelectionChange" style="margin-top: 20px">
              <el-table-column type="selection" width="55"></el-table-column>
              <!--      <el-table-column prop="questionid" label="Question Id" width="140">-->
              <!--      </el-table-column>-->
              <el-table-column prop="subject" label="Subject" width="120">
              </el-table-column>
              <el-table-column prop="question" label="Question" width="180">
              </el-table-column>
              <el-table-column prop="answera" label="Answer A" width="180">
              </el-table-column>
              <el-table-column prop="answerb" label="Answer B" width="180">
              </el-table-column>
              <el-table-column prop="answerc" label="Answer C" width="180">
              </el-table-column>
              <el-table-column prop="answerd" label="Answer D" width="180">
              </el-table-column>
              <el-table-column prop="rightanswer" label="Right answer" width="110">
              </el-table-column>
              <el-table-column prop="analysis" label="Analysis" width="140">
              </el-table-column>
              <el-table-column prop="score" label="Score" width="100">
              </el-table-column>
              <el-table-column prop="section" label="Section" width="100">
              </el-table-column>
              <el-table-column prop="level" label="Level" width="80">
              </el-table-column>
              <el-table-column label="Operation"  width="200" align="center">
                <template v-slot="scope">
                  <el-button type="success" @click="addmultiple(scope.row)">Add <i class="el-icon-folder-add"></i></el-button>
                </template>
              </el-table-column>
            </el-table>
            <div style="padding: 10px 0">
              <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="pageNum"
                  :page-sizes="[2, 5, 10, 20]"
                  :page-size="pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total">
              </el-pagination>
            </div>
          </div>
          <div class="judge" v-if="questiontypea=='Judge question'">
            <el-table :data="JudgetableData" border stripe :header-cell-class-name="headerBg" @selection-change="handleSelectionChange" style="margin-top: 20px">
              <el-table-column type="selection" width="55"></el-table-column>
              <!--      <el-table-column prop="questionid" label="Question Id" width="140">-->
              <!--      </el-table-column>-->
              <el-table-column prop="subject" label="Subject" width="170">
              </el-table-column>
              <el-table-column prop="question" label="Question" width="300">
              </el-table-column>
              <el-table-column prop="answer" label="Answer" width="80">
              </el-table-column>
              <el-table-column prop="analysis" label="Analysis" width="160">
              </el-table-column>
              <el-table-column prop="score" label="Score" width="80">
              </el-table-column>
              <el-table-column prop="section" label="Section" width="120">
              </el-table-column>
              <el-table-column prop="level" label="Level" width="80">
              </el-table-column>
              <el-table-column label="Operation"  width="200" align="center">
                <template v-slot="scope">
                  <el-button type="success" @click="addjudge(scope.row)">Add <i class="el-icon-edit"></i></el-button>
                </template>
              </el-table-column>
            </el-table>
            <div style="padding: 10px 0">
              <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="pageNum"
                  :page-sizes="[2, 5, 10, 20]"
                  :page-size="pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total">
              </el-pagination>
            </div>
          </div>
          <div class="fill" v-if="questiontypea=='Fill in question'">
            <el-table :data="FilltableData" border stripe :header-cell-class-name="headerBg"
                      @selection-change="handleSelectionChange" style="margin-top: 20px">
              <el-table-column type="selection" width="55"></el-table-column>
              <!--      <el-table-column prop="questionid" label="Question Id" width="140">-->
              <!--      </el-table-column>-->
              <el-table-column prop="subject" label="Subject" width="140">
              </el-table-column>
              <el-table-column prop="question" label="Question" width="140">
              </el-table-column>
              <el-table-column prop="answer" label="Answer" width="140">
              </el-table-column>
              <el-table-column prop="analysis" label="Analysis" width="140">
              </el-table-column>
              <el-table-column prop="score" label="Score" width="140">
              </el-table-column>
              <el-table-column prop="section" label="Section" width="140">
              </el-table-column>
              <el-table-column prop="level" label="Level" width="140">
              </el-table-column>
              <el-table-column label="Operation" width="200" align="center">
                <template v-slot="scope">
                  <el-button type="success" @click="addfill(scope.row)">Add <i class="el-icon-edit"></i></el-button>
                </template>
              </el-table-column>
            </el-table>
            <div style="padding: 10px 0">
              <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="pageNum"
                  :page-sizes="[2, 5, 10, 20]"
                  :page-size="pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total">
              </el-pagination>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  data() {
    return {
      MultitableData: [],
      FilltableData: [],
      JudgetableData:[],
      activeName: 'first',  //活动选项卡
      total :0,
      pageNum: 1,
      pageSize: 2,
      headerBg: 'headerBg',
      options: [ //题库类型
        {
          value: 'Multiple Choice',
          label: 'Multiple Choice'
        },
        {
          value: 'Fill-in-the-blank',
          label: 'Fill-in-the-blank'
        },
        {
          value: 'Judgement',
          label: 'Judgement'
        },
      ],
      type: [ //试题类型
        {
          value: 'Multiple choice question',
          label: 'Multiple choice question'
        },
        {
          value: 'Judge question',
          label: 'Judge question'
        },
        {
          value: 'Fill in question',
          label: 'Fill in question'
        }
      ],
      questiontypea: 'Multiple choice question',
      levels: [ //难度等级
        {
          value: '1',
          label: '1'
        },
        {
          value: '2',
          label: '2'
        },
        {
          value: '3',
          label: '3'
        },
        {
          value: '4',
          label: '4'
        },
        {
          value: '5',
          label: '5'
        },
      ],
      rights: [ //正确答案
        {
          value: 'A',
          label: 'A'
        },
        {
          value: 'B',
          label: 'B'
        },
        {
          value: 'C',
          label: 'C'
        },
        {
          value: 'D',
          label: 'D'
        },
      ],
      paperid: null,
      optionValue: 'Multiple Choice', //题型选中值
      subject: '', //试卷名称用来接收路由参数
      postChange: { //选择题提交内容
        subject: '', //试卷名称
        level: '', //难度等级选中值
        rightanswer: '', //正确答案选中值
        section: '', //对应章节
        question: '', //题目
        analysis: '', //解析
        score:'',
        answera: '',
        answerb: '',
        answerc: '',
        answerd: '',
      },
      postFill: { //填空题提交内容
        subject: '', //试卷名称
        level: '', //难度等级选中值
        answer: '', //正确答案
        section: '', //对应章节
        question: '', //题目
        analysis: '', //解析
        score:'',
      },
      postJudge: { //判断题提交内容
        subject: '', //试卷名称
        level: '', //难度等级选中值
        answer: '', //正确答案
        section: '', //对应章节
        question: '', //题目
        analysis: '', //解析
        score:'',
      },
      postPaper: { //考试管理表对应字段
        paperid: null,
        questiontype: null, // 试卷类型 1--选择题  2--填空题   3--判断题
        questionid: null,
      }
    };
  },
  created() {
    this.getParams()
    this.load()
  },
  methods: {
    // handleClick(tab, event) {
    //   console.log(tab, event);
    // },
    load() {
      console.log(this.questiontypea)
      if(this.questiontypea=='Multiple choice question'){
        request.get("/multi-question/page", {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            subject: '',
            section: '',
          }
        }).then(res => {
          console.log(res)

          this.MultitableData = res.records
          this.total = res.total

        })
      }
      else if(this.questiontypea=='Judge question'){
        request.get("/judge-question/page", {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            subject: '',
            section: '',
          }
        }).then(res => {
          console.log(res)

          this.JudgetableData = res.records
          this.total = res.total

        })
      }
      else if (this.questiontypea=='Fill in question'){
        request.get("/fill-question/page", {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            subject: '',
            section: '',
          }
        }).then(res => {
          console.log(res)

          this.FilltableData = res.records
          this.total = res.total

        })

      }
      /*      fetch("http://localhost:9090/user/page?pageNum="+this.pageNum+"&pageSize=" + this.pageSize + "&username=" + this.username)
                .then(res => res.json()).then(res => {
              console.log(res)
              this.tableData = res.data
              this.total = res.total
            })*/
    },
    handleSizeChange(pageSize) {
      console.log(pageSize)
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum) {
      console.log(pageNum)
      this.pageNum = pageNum
      this.load()
    },
    getParams() {
      let subject = this.$route.query.subject //获取试卷名称
      let paperid = this.$route.query.paperId //获取paperId
      this.paperid = paperid
      this.subject = subject
      this.postPaper.paperid = paperid
    },
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val
    },
    changeSubmit() { //选择题题库提交
      this.postChange.subject = this.subject
      request.post('/multi-question/MultiQuestion',this.postChange).then(res => { //添加成功显示提示
        let status = res.code
        console.log(status)
        if(status == 200) {
          this.$message.success("Add to paper successfully")
          this.postChange = {}
        }
      }).then(() => {
        request.get(`/multi-question/multiQuestionId`).then(res => { //获取当前题目的questionId
          let questionid = res.data.questionid
          this.postPaper.questionid = questionid
          this.postPaper.questiontype = 1
          request.post('/paper-manage/paperManage',this.postPaper)
        })
      })
    },
    addmultiple(row){
      this.postPaper.questionid=row.questionid
      this.postPaper.questiontype=1
      request.get('/paper-manage/'+row.questionid).then(res=>{
        if(res.code == 400){
          request.post('/paper-manage/paperManage',this.postPaper).then(res => {
            let status = res.code
            if(status == 200) {
              this.$message({
                message: 'Add to the paper',
                type: 'success'
              })
              this.postPaper = {}
              this.postPaper.paperid=this.paperid
            }
          })
        }
        else if(res.code == 200){
          this.$message({
            message:'Question already exists',
                type: 'error'
          })
          this.postPaper = {}
          this.postPaper.paperid=this.paperid
        }
      })
    },
    fillSubmit() { //填空题提交
      this.postFill.subject = this.subject
      request.post('/fill-question/fillQuestion', this.postFill).then(res => {
        let status = res.code
        if(status == 200) {
          this.$message({
            message: 'Add to the paper',
            type: 'success'
          })
          this.postFill = {}
        }
      }).then(() => {
        request.get(`/fill-question/fillQuestionId`).then(res => { //获取当前题目的questionId
          let questionid = res.data.questionid
          this.postPaper.questionid = questionid
          this.postPaper.questiontype = 2
          request.post('/paper-manage/paperManage', this.postPaper)
        })
      })
    },
    addfill(row){
      this.postPaper.questionid=row.questionid
      this.postPaper.questiontype=2
      request.get('/paper-manage/'+row.questionid).then(res=>{
        if(res.code == 400){
          request.post('/paper-manage/paperManage',this.postPaper).then(res => {
            let status = res.code
            if(status == 200) {
              this.$message({
                message: 'Add to the paper',
                type: 'success'
              })
              this.postPaper = {}
              this.postPaper.paperid=this.paperid
            }
          })
        }
        else if(res.code == 200){
          this.$message({
            message:'Question already exists',
            type: 'error'
          })
          this.postPaper = {}
          this.postPaper.paperid=this.paperid
        }
      })
    },
    judgeSubmit() { //判断题提交
      this.postJudge.subject = this.subject
      request.post('/judge-question/judge',this.postJudge).then(res => {
        let status = res.code
        if(status == 200) {
          this.$message({
            message: 'Add to the paper',
            type: 'success'
          })
          this.postJudge = {}
        }
      }).then(() => {
        request.get(`/judge-question/judgeQuestionId`).then(res => { //获取当前题目的questionId
          let questionid = res.data.questionid
          console.log(questionid)
          this.postPaper.questionid = questionid
          this.postPaper.questiontype = 3
          request.post('/paper-manage/paperManage', this.postPaper)
        })
      })
    },
    addjudge(row){
      this.postPaper.questionid=row.questionid
      this.postPaper.questiontype=3
      request.get('/paper-manage/'+row.questionid).then(res=>{
        if(res.code == 400){
          request.post('/paper-manage/paperManage',this.postPaper).then(res => {
            let status = res.code
            if(status == 200) {
              this.$message({
                message: 'Add to the paper',
                type: 'success'
              })
              this.postPaper = {}
              this.postPaper.paperid=this.paperid
            }
          })
        }
        else if(res.code == 200){
          this.$message({
            message:'Question already exists',
            type: 'error'
          })
          this.postPaper = {}
          this.postPaper.paperid=this.paperid
        }
      })
    },
  },
};
</script>

<style lang="less" scoped>
.add {
  margin: 0px 40px;
  .box {
    padding: 0px 20px;
    ul li {
      margin: 10px 0px;
      display: flex;
      align-items: center;
      .el-input {
        width: 6%;
      }
      .w150 {
        margin-left: 30px;
        width: 5%;
      }
    }
  }
  .el-icon-circle-plus {
    margin-right: 10px;
  }
  .icon-daoru-tianchong {
    margin-right: 10px;
  }
  .append {
    margin: 0px 20px;
    ul {
      display: flex;
      align-items: center;
      list-style-type:none;
      li {
        margin-right: 25px;
      }
    }
    .change {
      margin-top: 20px;
      padding: 20px 16px;
      background-color: #E7F6F6;
      border-radius: 4px;
      .title {
        padding-left: 6px;
        color: #2f4f4f;
        span:nth-child(1) {
          margin-right: 6px;
        }
        .answer {
          margin: 20px 0px 20px 8px;
        }
        .el-textarea {
          width: 98% !important;
        }
      }
      .options {
        ul {
          display: flex;
          flex-direction: column;
        }
        ul li {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          margin: 10px 0px;
          span {
            margin-right: 20px;
          }
        }
      }
      .submit {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .fill {
      .fillAnswer {
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          margin-right: 6px;
        }
        .el-input {
          width: 100% !important;
        }
      }
      .analysis {
        margin-top: 20px;
        margin-left: 5px;
      }
    }
    .judge {
      .judgeAnswer {
        margin-left: 20px;
        margin-bottom: 20px;
      }
    }
    .w150 {
      width: 200px;
    }
    //li:nth-child(2) {
    //  display: flex;
    //  align-items: center;
    //  justify-content: center;
    //}
  }
}
</style>