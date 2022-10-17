// 添加题库
<template>
  <div class="add">
    <el-tabs v-model="activeName">
      <el-tab-pane name="first">
        <span slot="label"><i class="el-icon-circle-plus"></i>Add questions</span>
        <section class="append">
          <ul>
            <li>
              <span>Question type:</span>
              <el-select v-model="optionValue" placeholder="Please select question type" class="w150">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </li>
            <li v-if="optionValue == 'Multiple Choice Question'">
              <span>Section：</span>
              <el-input
                  placeholder="Please input section"
                  v-model="postChange.section"
                  class="w150"
                  clearable>
              </el-input>
            </li>
            <li v-if="optionValue == 'Fill-in-the-blank Question'">
              <span>Section：</span>
              <el-input
                  placeholder="Please input section"
                  v-model="postFill.section"
                  class="w150"
                  clearable>
              </el-input>
            </li>
            <li v-if="optionValue == 'Judgment Question'">
              <span>Section：</span>
              <el-input
                  placeholder="Please input section"
                  v-model="postJudge.section"
                  class="w150"
                  clearable>
              </el-input>
            </li>
            <li v-if="optionValue == 'Multiple Choice Question'">
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
            <li v-if="optionValue == 'Fill-in-the-blank Question'">
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
            <li v-if="optionValue == 'Judgment Question'">
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
            <li v-if="optionValue == 'Multiple Choice Question'">
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
          <div class="change" v-if="optionValue == 'Multiple Choice Question'">
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
              <el-tag>Explanation:</el-tag><span>Enter explanation in the input box below</span>
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
          <div class="change fill" v-if="optionValue == 'Fill-in-the-blank Question'">
            <div class="title">
              <el-tag>Question:</el-tag><span>Enter the question, shaped as - From the perspective of the composition of computer network systems, computer networks can be divided into () and (). Note that the candidate's answer section must be enclosed in parentheses.</span>
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
              <el-tag>Correct answer:</el-tag>
              <el-input v-model="postFill.answer"></el-input>
            </div>
            <div class="title analysis">
              <el-tag type="success">Explanation:</el-tag><span>Enter the explanation in the input box below</span>
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
          <div class="change judge" v-if="optionValue == 'Judgment Question'">
            <div class="title">
              <el-tag>Question:</el-tag><span>Enter the question in the input box below</span>
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
              <el-tag>Evaluation:</el-tag><span>Enter the explanation in the input box below</span>
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
      </el-tab-pane>
      <el-tab-pane name="second">
        <span slot="label"><i class="iconfont icon-daoru-tianchong"></i>Online Paper Formation</span>
        <div class="box">
          <ul>
            <li>
              <span>Difficulty:</span>
              <el-select v-model="difficultyValue" placeholder="Difficulty of questions" class="w150">
                <el-option
                    v-for="item in difficulty"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </li>
            <li>
              <span>Number of multiple choice questions：</span> <el-input type="text" v-model="changeNumber"></el-input>
            </li>
            <li>
              <span>Number of fill-in-the-blank questions：</span> <el-input type="text" v-model="fillNumber"></el-input>
            </li>
            <li>
              <span>Number of judgment questions：</span> <el-input type="text" v-model="judgeNumber"></el-input>
            </li>
            <li>
              <el-button type="primary" @click="create()">Forming paper now</el-button>
            </li>
          </ul>
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
      changeNumber: null, //选择题出题数量
      fillNumber: null, //填空题出题数量
      judgeNumber: null, //判断题出题数量
      activeName: 'first',  //活动选项卡
      options: [ //题库类型
        {
          value: 'Multiple Choice Question',
          label: 'Multiple Choice Question'
        },
        {
          value: 'Fill-in-the-blank Question',
          label: 'Fill-in-the-blank Question'
        },
        {
          value: 'Judgment Question',
          label: 'Judgment Question'
        },
      ],
      difficulty: [ //试题难度
        {
          value: 'Simple',
          label: 'Simple'
        },
        {
          value: 'Normal',
          label: 'Normal'
        },
        {
          value: 'Difficulty',
          label: 'Difficulty'
        }
      ],
      difficultyValue: 'Simple',
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
      optionValue: 'Multiple Choice Question', //题型选中值
      subject: '', //试卷名称用来接收路由参数
      postChange: { //选择题提交内容
        subject: '', //试卷名称
        level: '', //难度等级选中值
        rightanswer: '', //正确答案选中值
        section: '', //对应章节
        question: '', //题目
        analysis: '', //解析
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
      },
      postJudge: { //判断题提交内容
        subject: '', //试卷名称
        level: '', //难度等级选中值
        answer: '', //正确答案
        section: '', //对应章节
        question: '', //题目
        analysis: '', //解析
        score:2,
      },
      postPaper: { //考试管理表对应字段
        paperid: null,
        questionType: null, // 试卷类型 1--选择题  2--填空题   3--判断题
        questionId: null,
      }
    };
  },
  created() {
    this.getParams()
  },
  methods: {
    // handleClick(tab, event) {
    //   console.log(tab, event);
    // },
    create() {
      this.$axios({
        url: '/paper-manage/item',
        method: 'post',
        data: {
          changeNumber: this.changeNumber,
          fillNumber: this.fillNumber,
          judgeNumber: this.judgeNumber,
          paperId: this.paperId,
          subject: 'Network' //题目数量太少，指定为计算机网络出题
        }
      }).then(res => {
        console.log(res)
        let data = res.data
        if(data.code=="200"){
          setTimeout(() => {
            this.$router.push({path: '/exam'})
          },1000)
          this.$message({
            message: data.message,
            type: 'success'
          })
        }else if(data.code=="400"){
          this.$message({
            message: data.message,
            type: 'error'
          })
        }

      })
    },
    getParams() {
      let subject = this.$route.query.subject //获取试卷名称
      let paperid = this.$route.query.paperId //获取paperId
      this.paperid = paperid
      this.subject = subject
      this.postPaper.paperid = paperid
    },
    changeSubmit() { //选择题题库提交
      this.postChange.subject = this.subject
      this.$axios({ //提交数据到选择题题库表
        url: '/multi-question/MultiQuestion',
        method: 'post',
        data: {
          ...this.postChange
        }
      }).then(res => { //添加成功显示提示
        let status = res.data.code
        if(status == "200") {
          this.$message({
            message: 'Added to the paper',
            type: 'success'
          })
          this.postChange = {}
        }
      }).then(() => {
        this.$axios(`/multi-question/multiQuestionId`).then(res => { //获取当前题目的questionId
          let questionId = res.data.data.questionId
          this.postPaper.questionId = questionId
          this.postPaper.questionType = 1
          this.$axios({
            url: '/paper-manage/paperManage',
            method: 'Post',
            data: {
              ...this.postPaper
            }
          })
        })
      })
    },
    fillSubmit() { //填空题提交
      this.postFill.subject = this.subject
      request.post('/fill-question/fillQuestion'+ this.postFill).then(res => {
        let status = res.data.code
        if(status == "200") {
          this.$message({
            message: 'Add to the paper',
            type: 'success'
          })
          this.postFill = {}
        }
      }).then(() => {
        request.get(`/fill-question/fillQuestionId`).then(res => { //获取当前题目的questionId
          let questionId = res.data.data.questionId
          this.postPaper.questionId = questionId
          this.postPaper.questionType = 2
          request.post('/paper-manage/paperManage'+this.postPaper)
        })
      })
    },
    judgeSubmit() { //判断题提交
      this.postJudge.subject = this.subject
      request.post('/judge-question'+this.postJudge).then(res => {
        let status = res.data.code
        if(status == "200") {
          this.$message({
            message: 'Add to the paper',
            type: 'success'
          })
          this.postJudge = {}
        }
      }).then(() => {
        request.get(`/judge-question/judgeQuestionId`).then(res => { //获取当前题目的questionId
          let questionId = res.data.data.questionId
          this.postPaper.questionId = questionId
          this.postPaper.questionType = 3
          request.post('/paper-manage/paperManage'+this.postPaper)
        })
      })
    }
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
        margin-left: 20px;
        width: 7%;
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
      li {
        margin-right: 20px;
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
          width: 98%;
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
          width: 91% !important;
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
      width: 150px;
    }
    li:nth-child(2) {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>