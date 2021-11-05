<template>
  <div>
    <!--卡片区域-->
<el-card>
      <el-row type="flex" justify="left" :gutter="20">
      </el-row>
      <span>已选课程</span>
  <!--主体表格-->
  <el-table :data="List" border stripe style="width: 100%">
    <el-table-column fixed prop="kh" label="课号" width="100"></el-table-column>
    <el-table-column prop="km" label="课名" width="100"></el-table-column>
    <el-table-column prop="xm" label="教师姓名" width="90"></el-table-column>
    <el-table-column prop="sksj" label="上课时间" width="120"></el-table-column>
    <el-table-column prop="xf" label="学分" width="50"></el-table-column>
    <el-table-column prop="xs" label="学时" width="50"></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger" icon="el-icon-delete"
          @click="deleteBykh(scope.row.kh)"></el-button>
      </template>
    </el-table-column>
  </el-table>
</el-card>
  </div>
</template>

<script>
export default {
  name: 'CManager',
  data () {
    return {
      queryinfo: {
        query: ''
      },
      List: [],
    }
  },
  created () {
    this.getList()
  },
  //获取token
  methods: {
    async getList () {
      var xh = window.sessionStorage.getItem('id')
     //获取xq
      const { data: res1 } = await 
      this.$http.get('/api/course/selectxq',
        { params: this.queryinfo })
      console.log(res1)
      var xq = JSON.stringify(res1).slice(15,26)
      //获取可选课程
      const { data: res } = await 
      this.$http.get('/api/course/showe?xh=' + xh + '&' +'xq='+ xq,
        { params: this.queryinfo })
      this.List = res
    },
    // 删除数据
    async deleteBykh (kh) {
      //获取xq
      const { data: res1 } = await 
      this.$http.get('/api/course/selectxq',
        { params: this.queryinfo })
      console.log(res1)
      var xq = JSON.stringify(res1).slice(15,26)
      // 弹框
      var xh = window.sessionStorage.getItem('id')
      const confirmResult = await this.$confirm('此操作将退选该课程, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).catch(err => err)
      if(confirmResult == 'cancel' ){
        return this.$message.info('已取消删除')
      }
      const { data: res } = await this.$http.post('/api/course/dele?xh=' + xh + '&' + 'kh=' + kh + '&' + 'xq=' + xq )
      this.$message.success('退选课程成功！')
      this.getList ()
    }

  }
}
</script>

<style>
.el-table{
  margin-top: 15px;
}
</style>
