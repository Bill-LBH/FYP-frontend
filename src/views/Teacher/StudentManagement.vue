<template>
<div>

  <div style="margin: 10px 0">
    <el-input style="width: 200px" placeholder="Please input student id" suffix-icon="el-icon-search" v-model="id"></el-input>
    <el-input style="width: 200px; margin-left: 10px" placeholder="Please input student major" suffix-icon="el-icon-search" v-model="major"></el-input>
    <el-input style="width: 200px; margin-left: 10px" placeholder="Please input student name" suffix-icon="el-icon-search" v-model="username"></el-input>
    <el-button style="margin-left: 10px" class="ml-5" type="primary" @click="load">Search</el-button>
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
    <el-upload action="http://localhost:9090/student/import" :show-file-list="false" accept="xlsx" :on-success="handleExcelImportSuccess" style="display: inline-block">
      <el-button type="primary" class="ml-5">Import <i class="el-icon-bottom"></i></el-button>
    </el-upload>
    <el-button type="primary" @click="exp" class="ml-5">Export <i class="el-icon-top"></i></el-button>
  </div>

  <el-table :data="tableData" border stripe :header-cell-class-name="headerBg" @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="55"></el-table-column>
    <el-table-column prop="id" label="Student id" width="140">
    </el-table-column>
    <el-table-column prop="username" label="Name" width="140">
    </el-table-column>
    <el-table-column prop="gender" label="Gender" width="140">
    </el-table-column>
    <el-table-column prop="address" label="Address" width="140">
    </el-table-column>
    <el-table-column prop="email" label="Email" width="180">
    </el-table-column>
    <el-table-column prop="phone" label="Phone" width="140">
    </el-table-column>
    <el-table-column prop="major" label="Major" width="140">
    </el-table-column>
    <el-table-column prop="year" label="Enrollment year" width="140">
    </el-table-column>
    <el-table-column prop="institute" label="Institute" width="140">
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
            @confirm="del(scope.row.id)"
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
  <el-dialog title="New student Information" :visible.sync="dialogFormVisible" width="30%" >
    <el-form label-width="100px" size="small">
      <el-form-item label="Id">
        <el-input v-model="form.id" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Name">
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      \<el-form-item label="Gender">
      <el-select v-model="form.gender" placeholder="Please select difficulty of this question">
        <el-option
            v-for="item in genderoptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
      <el-form-item label="Major">
        <el-select v-model="form.major" placeholder="Please select student major">
          <el-option
              v-for="item in majoroptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Enroll Year">
        <el-input v-model="form.year" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Institute">
        <el-input v-model="form.institute" autocomplete="off"></el-input>
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
  name: "StudentManagement",
  data(){
    return{
      tableData: [],
      total :0,
      pageNum: 1,
      pageSize: 2,
      id:"",
      username: "",
      gender:"",
      address:"",
      email:"",
      phone:"",
      major:"",
      year:"",
      institute:"",
      headerBg: 'headerBg',
      form: {},
      dialogFormVisible: false,
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
      genderoptions: [{
        value: 'Male',
        label: 'Male'
      }, {
        value: 'Female',
        label: 'Female'
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
      request.get("/student/page", {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          id: this.id,
          major: this.major,
          username: this.username,
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
      this.username = ""
      this.major =""
      this.id = ""
      this.load()
    },
    handleAdd() {
      this.dialogFormVisible = true
      this.form = {}
    },
    handleExcelImportSuccess() {
      this.$message.success("Import successful")
      this.load()
    },
    exp() {
      window.open("http://localhost:9090/student/export")
    },
    save() {
      request.post("/student", this.form).then(res => {
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
      request.delete("/student/" + id).then(res => {
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
      request.post("/student/del/batch", ids).then(res => {
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