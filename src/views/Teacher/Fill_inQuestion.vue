<template>
  <div>

    <div style="margin: 10px 0">
      <el-input style="width: 200px" placeholder="Please input subject" suffix-icon="el-icon-search" v-model="subject"></el-input>
      <el-input style="width: 200px" placeholder="Please input section" suffix-icon="el-icon-search" v-model="section"></el-input>
      <el-button class="ml-5" type="primary" @click="load">Search</el-button>
      <el-button class="el-alert--warning" type="primary" @click="reset">Reset</el-button>
    </div>

    <div style="margin: 10px 0">
      <el-button type="primary" @click="handleAdd">Add<i class="el-icon-circle-plus-outline"></i></el-button>
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
      <el-table-column label="Operation"  width="200" align="center">
        <template v-slot="scope">
          <el-button type="success" @click="handleEdit(scope.row)">Edit <i class="el-icon-edit"></i></el-button>
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
    <el-dialog title="New fill in question" :visible.sync="dialogFormVisible" width="30%" >
      <el-form label-width="100px" size="small">
<!--        <el-form-item label="Question Id">-->
<!--          <el-input v-model="form.questionid" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="Subject">
          <el-input v-model="form.subject" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Question">
          <el-input v-model="form.question" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Answer">
          <el-input v-model="form.answer" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Analysis">
          <el-input v-model="form.analysis" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Score">
          <el-input v-model="form.score" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Section">
          <el-input v-model="form.section" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Level">
          <el-select v-model="form.level" placeholder="Please select difficulty of this question">
            <el-option
                v-for="item in leveloptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
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
  name: "Fill_in",
  data(){
    return{
      tableData: [],
      total :0,
      pageNum: 1,
      pageSize: 2,
      subject: "",
      question: "",
      answer:"",
      analysis:"",
      score:"",
      section:"",
      level:"",
      headerBg: 'headerBg',
      form: {},
      dialogFormVisible: false,
      leveloptions: [{
        value: '1',
        label: '1'
      }, {
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
    }
  },
  created() {
    // 请求分页查询数据
    this.load()
  },
  methods: {
    load() {
      request.get("/fill-question/page", {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          subject: this.subject,
          section: this.section,
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
      this.source = ""
      this.paperid = ""
      this.load()
    },
    handleAdd() {
      this.dialogFormVisible = true
      this.form = {}
    },
    save() {
      request.post("/fill-question", this.form).then(res => {
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
      request.delete("/fill-question/" + id).then(res => {
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
      let ids = this.multipleSelection.map(v => v.questionid)  // [{}, {}, {}] => [1,2,3]
      request.post("/fill-question/del/batch", ids).then(res => {
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