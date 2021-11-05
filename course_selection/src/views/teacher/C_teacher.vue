<template>
  <div>
    <!--卡片区域-->
<el-card>
  <!--主体表格-->
  <el-table :data="courseList" border stripe style="width: 100%">
    <el-table-column prop="kh" label="课号" width="100"></el-table-column>
    <el-table-column prop="km" label="课名" width="150"></el-table-column>
    <el-table-column prop="sksj" label="上课时间" width="200"></el-table-column>
    <el-table-column prop="bili" label="平时成绩比例" width="150"></el-table-column>
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
    <el-dialog title="修改成绩比例信息" :visible.sync="editDialogVisible" width="560px"
    @close="editDialogClosed">
        <el-form :model="editform" label-width="70px" :rules="editFormRules" ref="editFormRef">
          <!--第1行：课号、课名（不可改）-->
          <el-row type="flex" justify="center" :gutter="20">
            <el-col :span="10">
              <el-form-item label="课号" prop="kh">
              <el-input v-model="editform.kh" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="课名" prop="km">
              <el-input v-model="editform.km" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--第2行：上课时间、比例(可修改)-->
          <el-row type="flex" justify="center" :gutter="20">
            <el-col :span="10">
              <el-form-item label="上课时间" prop="sksj">
                <el-input v-model="editform.sksj" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="平时成绩比例" prop="bili">
              <el-input v-model="editform.bili"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editcourse">确 定</el-button>
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
      courseList: [],
      // 控制编辑对话框的显示隐藏
      editDialogVisible: false,
      // 控制添加对话框的显示隐藏
      addDialogVisible: false,
      editform: {
        kh: '',
        km: '',
        sksj: '',
        bili: ''
      },
      editFormRules: {
      }
    }
  },
  created () {
    this.getcourseList()
  },
  methods: {
    // 获取信息
    async getcourseList () {
      //获取xq
      const { data: res1 } = await 
      this.$http.get('/api/course/selectxq',
        { params: this.queryinfo })
    console.log(res1)
      var xq = JSON.stringify(res1).slice(15,26)
      var gh = window.sessionStorage.getItem('id')
      const { data: res2 } = await
      this.$http.get('/api/teacher/showcourse?gh=' + gh + '&' +'xq='+ xq)
      this.courseList = res2
    },
    // 按课程号查询信息
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    editDialogClosed () {
      this.$refs.editFormRef.resetFields()
    },
    // 显示要编辑的数据
    async showEditDialog (row, kh) {
      this.editform = row
      console.log(kh)
      this.editDialogVisible = true
    },
    // 修改成绩比例
    editcourse () {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await
        this.$http.post('/api/teacher/updatecourse?' +
        'kh=' + this.editform.kh + '&' +
        'bili=' + this.editform.bili
        )
        this.$message.success('修改成功！')
        this.editDialogVisible = false
        this.getcourseList() // 重新获取数据
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

