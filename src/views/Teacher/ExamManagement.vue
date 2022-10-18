<template>
  <div>

    <div style="margin: 10px 0">
      <el-input style="width: 200px" placeholder="Please input course name" suffix-icon="el-icon-search" v-model="source"></el-input>
      <el-input style="width: 200px" placeholder="Please input paper id" suffix-icon="el-icon-search" v-model="paperid"></el-input>
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
<!--      <el-table-column prop="examcode" label="Exam code" width="120">-->
<!--      </el-table-column>-->
      <el-table-column prop="source" label="Course name" width="180">
      </el-table-column>
      <el-table-column prop="paperid" label="Paper id" width="100">
      </el-table-column>
      <el-table-column prop="examdate" label="Exam date" width="160">
      </el-table-column>
      <el-table-column prop="totaltime" label="Total time (minutes)" width="160">
      </el-table-column>
      <el-table-column prop="grade" label="Grade" width="100">
      </el-table-column>
      <el-table-column prop="term" label="Term" width="100">
      </el-table-column>
      <el-table-column prop="major" label="Major" width="160">
      </el-table-column>
      <el-table-column prop="totalscore" label="Total score" width="140">
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
              @confirm="del(scope.row.examcode)"
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
    <el-dialog title="New exam Information" :visible.sync="dialogFormVisible" width="30%" >
      <el-form label-width="110px" size="small">
<!--        <el-form-item label="Exam code">-->
<!--          <el-input v-model="form.examcode" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="Course name">
          <el-input v-model="form.source" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Paper id">
          <el-input v-model="form.paperid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Exam date">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="Select Date" v-model="form.examdate" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="Total time (minutes)">
          <el-input v-model="form.totaltime" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Grade">
          <el-select v-model="form.grade" placeholder="Please select participated student grade">
            <el-option
                v-for="item in gradeoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Term">
        <el-select v-model="form.term" placeholder="Please select exam term">
          <el-option
              v-for="item in termoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="Major">
          <el-select v-model="form.major" placeholder="Please select exam major">
            <el-option
                v-for="item in majoroptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Total score">
          <el-input v-model="form.totalscore" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Type">
          <el-select v-model="form.type" placeholder="Please select exam type">
            <el-option
                v-for="item in typeoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Tips">
          <el-input v-model="form.tips" autocomplete="off"></el-input>
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
  name: "ExamManagement",
  data(){
    return{
      tableData: [],
      total :0,
      pageNum: 1,
      pageSize: 2,
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
      termoptions: [{
        value: '2019/09',
        label: '2019/09'
      }, {
        value: '2020/02',
        label: '2020/02'
      }, {
        value: '2020/04',
        label: '2020/04'
      }, {
        value: '2020/09',
        label: '2020/09'
      }, {
        value: '2021/02',
        label: '2021/02'
      }, {
        value: '2021/04',
        label: '2021/04'
      }, {
        value: '2021/09',
        label: '2021/09'
      }, {
        value: '2022/02',
        label: '2022/02'
      }, {
        value: '2022/04',
        label: '2022/04'
      }, {
        value: '2022/09',
        label: '2022/09'
      }
      ],
      gradeoptions: [{
        value: '2019/09',
        label: '2019/09'
      }, {
        value: '2020/02',
        label: '2020/02'
      }, {
        value: '2020/04',
        label: '2020/04'
      }, {
        value: '2020/09',
        label: '2020/09'
      }, {
        value: '2021/02',
        label: '2021/02'
      }, {
        value: '2021/04',
        label: '2021/04'
      }, {
        value: '2021/09',
        label: '2021/09'
      }, {
        value: '2022/02',
        label: '2022/02'
      }, {
        value: '2022/04',
        label: '2022/04'
      }, {
        value: '2022/09',
        label: '2022/09'
      }
      ],
      majoroptions: [{
        value: 'SWE',
        label: 'SWE'
      }, {
        value: 'DMT',
        label: 'DMT'
      }, {
        value: 'CST',
        label: 'CST'
      }, {
        value: 'AIT',
        label: 'AIT'
      },
        {
          value: 'ACC',
          label: 'ACC'
        },
        {
          value: 'FIN',
          label: 'FIN'
        },
        {
          value: 'ADT',
          label: 'ADT'
        },
        {
          value: 'CHS',
          label: 'CHS'
        },
        {
          value: 'CME',
          label: 'CME'
        },
        {
          value: 'EEE',
          label: 'EEE'
        },
        {
          value: 'EGE',
          label: 'EGE'
        },
        {
          value: 'IBU',
          label: 'IBU'
        },
        {
          value: 'JRN',
          label: 'JRN'
        },
        {
          value: 'MAT',
          label: 'MAT'
        },
        {
          value: 'MBT',
          label: 'MBT'
        },
        {
          value: 'MEC',
          label: 'MEC'
        },
        {
          value: 'TCM',
          label: 'TCM'
        },
      ],
      typeoptions: [{
        value: 'Open book',
        label: 'Open book'
      }, {
        value: 'Close book',
        label: 'Close book'
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
      request.get("/exam/page", {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          paperid: this.paperid,
          source: this.source,
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
      request.post("/exam", this.form).then(res => {
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
      request.delete("/exam/" + id).then(res => {
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
      let ids = this.multipleSelection.map(value => value.id)  // [{}, {}, {}] => [1,2,3]
      request.post("/exam/del/batch", ids).then(res => {
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