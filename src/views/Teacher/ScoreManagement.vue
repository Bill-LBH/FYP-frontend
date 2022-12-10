<template>
  <div>

    <div style="margin: 10px 0">
      <el-input style="width: 200px" placeholder="Please input student id" suffix-icon="el-icon-search" v-model="studentid"></el-input>
      <el-input style="width: 200px; margin-left: 10px" placeholder="Please input exam code" suffix-icon="el-icon-search" v-model="examcode"></el-input>
      <el-button style="margin-left: 10px" class="ml-5" type="primary" @click="load">Search</el-button>
      <el-button class="el-alert--warning" type="primary" @click="reset">Reset</el-button>
    </div>

    <div style="margin: 10px 0">
      <el-popconfirm
          class="ml-5"
          confirm-button-text='Yes'
          cancel-button-text='No'
          icon="el-icon-info"
          icon-color="red"
          title="Are you sure you want to delete this data in bulk?"
          @confirm="delBatch"
      >
        <el-button type="danger" slot="reference">Batch delete <i class="el-icon-remove-outline"></i></el-button>
      </el-popconfirm>
    </div>

    <el-table :data="tableData" border stripe :header-cell-class-name="headerBg" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
<!--      <el-table-column prop="scoreid" label="Score Id" width="140">-->
<!--      </el-table-column>-->
      <el-table-column prop="examcode" label="Exam code" width="140">
      </el-table-column>
      <el-table-column prop="studentid" label="Student ID" width="140">
      </el-table-column>
      <el-table-column prop="subject" label="Subject" width="140">
      </el-table-column>
      <el-table-column prop="score" label="Score" width="140">
      </el-table-column>
      <el-table-column prop="answerdate" label="Submit moment" width="140">
      </el-table-column>
      <el-table-column label="Operation"  width="180" align="center">
        <template v-slot="scope">
          <el-button type="success" @click="handleEdit(scope.row)">Edit <i class="el-icon-edit"></i></el-button>
          <el-popconfirm
              class="ml-5"
              confirm-button-text='Yes'
              cancel-button-text='No'
              icon="el-icon-info"
              icon-color="red"
              title="Are you sure you want to delete it?"
              @confirm="del(scope.row.scoreid)"
          >
            <el-button type="danger" slot="reference">Delete <i class="el-icon-remove-outline"></i></el-button>
          </el-popconfirm>
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
    <el-dialog title="New score information" :visible.sync="dialogFormVisible" width="30%" >
      <el-form label-width="100px" size="small">
<!--        <el-form-item label="Score Id">-->
<!--          <el-input v-model="form.scoreid" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="Student Id">
          <el-input v-model="form.studentid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Subject">
          <el-input v-model="form.subject" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Score">
          <el-input v-model="form.score" type="number" autocomplete="off"></el-input>
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
  name: "ScoreManagement",
  data(){
    return{
      tableData: [],
      total :0,
      pageNum: 1,
      pageSize: 10,
      scoreid:"",
      examcode:"",
      studentid: "",
      subject:"",
      score:"",
      answerdate:"",
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
      request.get("/score/page", {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          studentid: this.studentid,
          examcode: this.examcode,
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
    reset() {
      this.examcode = ""
      this.scoreid = ""
      this.load()
    },
    handleAdd() {
      this.dialogFormVisible = true
      this.form = {}
    },
    save() {
      request.post("/score", this.form).then(res => {
        if (res) {
          this.$message.success("Save successfully")
          this.dialogFormVisible = false
          this.load()
        } else {
          this.$message.error("Failed")
        }
      })
    },
    handleEdit(row) {
      this.form = row
      this.dialogFormVisible = true
    },
    del(id) {
      request.delete("/score/" + id).then(res => {
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
    delBatch() {
      let ids = this.multipleSelection.map(v => v.scoreid)  // [{}, {}, {}] => [1,2,3]
      request.post("/score/del/batch", ids).then(res => {
        if (res) {
          this.$message.success("Batch delete successfully")
          this.load()
        } else {
          this.$message.error("Batch delete failed")
        }
      })
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