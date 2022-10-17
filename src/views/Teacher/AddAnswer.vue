<template>
  <div>

    <div style="margin: 10px 0">
      <el-input style="width: 200px" placeholder="Please input exam code" suffix-icon="el-icon-search" v-model="examcode"></el-input>
      <el-input style="width: 200px" placeholder="Please input course name" suffix-icon="el-icon-search" v-model="source"></el-input>
      <el-input style="width: 200px" placeholder="Please input paper id" suffix-icon="el-icon-search" v-model="paperid"></el-input>
      <el-button class="ml-5" type="primary" @click="load">Search</el-button>
      <el-button class="el-alert--warning" type="primary" @click="reset">Reset</el-button>
    </div>


    <el-table :data="tableData" border stripe :header-cell-class-name="headerBg">
<!--      <el-table-column prop="examcode" label="Exam code" width="120">-->
<!--      </el-table-column>-->
      <el-table-column prop="source" label="Course name" width="180">
      </el-table-column>
      <el-table-column prop="paperid" label="Paper id" width="100">
      </el-table-column>
      <el-table-column prop="examdate" label="Exam date" width="160">
      </el-table-column>
      <el-table-column prop="totaltime" label="Total time" width="100">
      </el-table-column>
      <el-table-column prop="grade" label="Grade" width="100">
      </el-table-column>
      <el-table-column prop="term" label="Term" width="100">
      </el-table-column>
      <el-table-column prop="major" label="Major" width="160">
      </el-table-column>
      <el-table-column prop="totalscore" label="Total score" width="140">
      </el-table-column>
      <el-table-column fixed="right" label="Operation" width="150">
        <template v-slot="scope">
          <el-button @click="add(scope.row.paperid,scope.row.source)" type="primary" size="small">Edit paper</el-button>
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
</template>

<script>
import request from "@/utils/request";

export default {
  name: "AddAnswer",
  data(){
    return{
      tableData: [],
      total :0,
      pageNum: 1,
      pageSize: 2,
      examcode:"",
      source: "",
      paperid: "",
      examdate:"",
      totaltime:"",
      grade:"",
      term:"",
      major:"",
      totalscore: "",
      type: "",
      tips:"",
      headerBg: 'headerBg',
      form: {},
      dialogFormVisible: false,
    }
  },
  created() {
    // 请求分页查询数据
    this.load()
  },
  methods: {
    load() {
      request.get("/exam/page", {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          examcode: this.examcode,
          source: this.source,
          paperid: this.paperid,
        }
      }).then(res => {
        console.log(res)

        this.tableData = res.records
        this.total = res.total

      })
      /*      fetch("http://localhost:9090/user/page?pageNum="+this.pageNum+"&pageSize=" + this.pageSize + "&username=" + this.username)
                .then(res => res.json()).then(res => {
              console.log(res)
              this.tableData = res.data
              this.total = res.total
            })*/
    },
    add(paperId,source) { //增加题库
      this.$router.push({path:'/addAnswerChildren',query: {paperId: paperId,subject:source}})
    },
    reset() {
      this.examcode = ""
      this.source = ""
      this.paperid = ""
      this.load()
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
    }

  }

}
</script>

<style>
</style>