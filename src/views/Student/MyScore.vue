<template>
  <div class="table">
    <p class="title">Score</p>
    <section class="content-el">
      <el-table ref="filterTable" :data="score" v-loading="loading">
        <el-table-column
            prop="answerdate"
            label="Submit moment"
            sortable
            width="300"
            column-key="answerdate"
            :filters="filter"
            :filter-method="filterHandler">
        </el-table-column>
        <el-table-column
            prop="subject"
            label="Subject"
            width="300"
            filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag>{{scope.row.subject}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="score" label="Score" width="200"></el-table-column>
        <el-table-column label="Pass" width="100">
          <template slot-scope="scope">
            <el-tag :type="scope.row.score>= 60 ? 'success' : 'danger'">{{scope.row.score >= 60 ? "pass" : "fail"}}</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="center" align="middle" class="pagination">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagination.current"
            :page-sizes="[4,6,8,10]"
            :page-size="pagination.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.total">
        </el-pagination>
      </el-row>
    </section>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "MyScore",
  data() {
    return {
      pagination: { //分页后的留言列表
        current: 1, //当前页
        total: null, //记录条数
        size: 10 //每页条数
      },
      loading: false, //加载标识符
      score: [], //学生成绩
      filter: null //过滤参数
    }
  },
  created() {
    this.getScore()
    this.loading = true //数据加载则遮罩表格
  },
  methods: {
    getScore() {
      let studentId=localStorage.getItem("UserId")

      request.get('/score/page2',{
        params: {
          pageNum: this.pagination.current,
          pageSize: this.pagination.size,
          id:studentId
        }
      }).then(res => {
        console.log(res)
        if(res.code == 200) {
          this.loading = false //数据加载完成去掉遮罩
          this.score = res.data.records
          this.pagination = {...res.data}
          let mapVal = this.score.map((element,index) => { //通过map得到 filter:[{text,value}]形式的数组对象
            let newVal = {}
            newVal.text = element.answerdate
            newVal.value = element.answerdate
            return newVal
          })
          let hash = []
          const newArr = mapVal.reduce((item, next) => { //对新对象进行去重操作
            hash[next.text] ? '' : hash[next.text] = true && item.push(next);
            return item
          }, []);
          this.filter = newArr
        }
      })
    },
    //改变当前记录条数
    handleSizeChange(val) {
      this.pagination.size = val
      this.getScore()
    },
    //改变当前页码，重新发送请求
    handleCurrentChange(val) {
      this.pagination.current = val
      this.getScore()
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
  padding-top: 20px;
}
.table {
  width: 980px;
  margin: 0 auto;
  .title {
    margin: 20px;
    font-size: 20px;
    font-weight: bold;
  }
  .content-el {
    background-color: #fff;
    padding: 20px;
  }
}
</style>