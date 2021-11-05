<template>
  <div>
    <!--卡片区域-->
<el-card>
      <el-row type="flex" justify="center" :gutter="20">
        <!--输入框-->
        <el-col :span="8">
          <el-input placeholder="请输入课号" v-model="searchform.kh" clearable @clear="getgradeList">
            <el-button slot="append"
            icon = "el-icon-search" @click="searchgrade"></el-button>
          </el-input>
        </el-col>
      </el-row>
  <!--主体表格-->
  <el-table :data="gradeList" border stripe style="width: 100%">
    <el-table-column prop="kh" label="课号" width="100"></el-table-column>
    <el-table-column prop="xh" label="学号" width="80"></el-table-column>
    <el-table-column prop="xm" label="姓名" width="70"></el-table-column>
    <el-table-column prop="km" label="课名" width="150"></el-table-column>
    <el-table-column prop="zpcj" label="总评成绩" width="90"></el-table-column>
    <el-table-column prop="pscj" label="平时成绩" width="90"></el-table-column>
    <el-table-column prop="kscj" label="考试成绩" width="90"></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini" icon="el-icon-edit"
          @click="showEditDialog(scope.row,scope.row.xh)"></el-button>
          <!--弹窗数据-->
      </template>
    </el-table-column>
  </el-table>
</el-card>
    <!--编辑对话框-->
    <template>
    <el-dialog title="修改成绩信息" :visible.sync="editDialogVisible" width="560px"
    @close="editDialogClosed">
        <el-form :model="editform" label-width="70px" :rules="editFormRules" ref="editFormRef">
          <!--第1行：学号、姓名（不可改）-->
          <el-row type="flex" justify="center" :gutter="20">
            <el-col :span="10">
              <el-form-item label="学号" prop="xh">
              <el-input v-model="editform.xh" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="姓名" prop="xm">
              <el-input v-model="editform.xm" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--第2行：总评成绩、课名(不可修改)-->
          <el-row type="flex" justify="center" :gutter="20">
            <el-col :span="10">
              <el-form-item label="课号" prop="kh">
                <el-input v-model="editform.kh" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="总评成绩" prop="zpcj">
              <el-input v-model="editform.zpcj" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--第3行：平时成绩、考试成绩-->
          <el-row type="flex" justify="center" :gutter="20">
            <el-col :span="10">
              <el-form-item label="平时成绩" prop="pscj">
              <el-input v-model="editform.pscj"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="考试成绩" prop="kscj">
              <el-input v-model="editform.kscj"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editgrade">确 定</el-button>
        </div>
    </el-dialog>
    </template>
    <!--添加对话框-->
  </div>
</template>

<script>
export default {
  name: 'StuManager',
  data () {
    return {
      queryinfo: {
        query: ''
      },
      queryinfo1: {
        query: ''
      },
      gradeList: [],
      // 控制编辑对话框的显示隐藏
      editDialogVisible: false,
      // 控制添加对话框的显示隐藏
      addDialogVisible: false,
      editform: {
        xh: '',
        xm: '',
        kh: '',
        zpcj: '',
        pscj: '',
        kscj: ''
      },
      searchform: {
        kh: ''
      },
      editFormRules: {
      }
    }
  },
  created () {
    this.getgradeList()
  },
  methods: {
    // 获取信息
    async getgradeList () {
      //获取学期
      const { data: res1 } = await 
      this.$http.get('/api/course/selectxq',
        { params: this.queryinfo1 })
      console.log(res1)
      var xq = JSON.stringify(res1).slice(15,26)
      console.log(xq)
      //获取工号
      var gh = window.sessionStorage.getItem('id')
      const { data: res } = await
      this.$http.get('/api/teacher/showgrade?gh=' + gh + '&' +'xq='+ xq,
        { params: this.queryinfo })
      this.gradeList = res
    },
    // 按课程号查询信息
    async searchgrade () {
      //获取学期
      const { data: res1 } = await 
      this.$http.get('/api/course/selectxq',
        { params: this.queryinfo1 })
      console.log(res1)
      var xq = JSON.stringify(res1).slice(15,26)
      console.log(xq)
      var gh = window.sessionStorage.getItem('id')
      var kh = this.searchform.kh
      const { data: res } = await
      this.$http.get('/api/teacher/selectgrade?kh=' + kh + '&' +
      'gh=' + gh + '&' +'xq=' + xq)
      this.gradeList = res
    },
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    editDialogClosed () {
      this.$refs.editFormRef.resetFields()
    },
    // 显示要编辑的数据
    async showEditDialog (row, xh) {
      this.editform = row
      console.log(xh)
      this.editDialogVisible = true
    },
    // 修改成绩
    editgrade () {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        var gh = window.sessionStorage.getItem('id')
        const { data: res } = await
        this.$http.post('/api/teacher/updategrade?' +
        'pscj=' + this.editform.pscj + '&' +
        'kscj=' + this.editform.kscj + '&' +
        'xh=' + this.editform.xh + '&' +
        'kh=' + this.editform.kh + '&' +
        'gh=' + gh
        )
        this.$message.success('修改学生成功！')
        this.editDialogVisible = false
        this.getgradeList() // 重新获取数据
      })
    },

  }
}
</script>

<style>
.el-table{
  margin-top: 15px;
}
</style>
