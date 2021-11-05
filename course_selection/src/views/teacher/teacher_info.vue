<template>
  <div>
    <!--卡片区域-->
<el-card>
    
      <template slot-scope="scope">

    <el-form :model="editform" label-width="70px" :rules="editFormRules" ref="editFormRef" size="mini">
          <!--第1行：学号、姓名（不可改）-->
          <el-row type="flex" :gutter="20">
            <el-col :span="10">
              <el-form-item label="工号" prop="gh">
              <el-input v-model="editform.gh" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" :gutter="20">
            <el-col :span="10">
              <el-form-item label="姓名" prop="xm">
              <el-input v-model="editform.xm" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--第2行：性别、出生日期-->
          <el-row type="flex" :gutter="20">
            <el-col :span="10">
              <el-form-item label="性别" prop="xb">
                <el-select v-model="editform.xb" placeholder="请选择" disabled>
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex"  :gutter="20">
            <el-col :span="10">
               <el-form-item label="出生日期" prop="csrq">
              <el-input v-model="editform.csrq" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--第3行：职称、基本工资-->
          <el-row type="flex"  :gutter="20">
            <el-col :span="10">
              <el-form-item label="职称" prop="xl">
              <el-input v-model="editform.xl" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex"  :gutter="20">
            <el-col :span="10">
              <el-form-item label="手机号码" prop="jbgz">
              <el-input v-model="editform.jbgz"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--第4行：院系号-->
          <el-row type="flex"  :gutter="20">
            <el-col :span="10">
              <el-form-item label="院系号" prop="yxh">
              <el-input v-model="editform.yxh" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 密码-->
          <el-row type="flex"  :gutter="20">
            <el-col :span="10">
              <el-form-item label="密码" prop="pw">
              <el-input type="password" v-model="editform.pw"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <!--  修改  -->
          <el-row type="flex"  :gutter="20">
            <el-col :span="10">
                <el-button type="primary" @click="editteacher">确 定</el-button>
            </el-col>
          </el-row>

        </el-form>
</template>

    
</el-card>

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
      stuList: [],
      // 控制编辑对话框的显示隐藏
      editDialogVisible: false,
      // 控制添加对话框的显示隐藏
      addDialogVisible: false,
      editform: {
        gh: '',
        xm: '',
        xb: '',
        csrq: '',
        xl: '',
        jbgz: '',
        yxh: '',
        pw: ''
      },
      // 信息填写校验提示
      editFormRules: {
      }
    }
  },
  created () {
    this.getuser()
  },
  methods: {
      // 获取该用户信息
    async getuser () {
      this.editform.gh = window.sessionStorage.getItem('id') // 取到了赋值给gh
      const { data: res } = await 
      this.$http.get('/api/user/selectt?gh=' + this.editform.gh)

      var xm = []
      var xb = []
      var csrq = []
      var xl = []
      var jbgz = []
      var yxh = []
      var pw = []

      res.map((item) => {xm += item.xm+","})
      xm = xm.substring(0, xm.length -1)
      this.editform.xm = xm.split(",")

      res.map((item) => {xb += item.xb+","})
      xb = xb.substring(0, xb.length -1)
      this.editform.xb = xb.split(",")

      res.map((item) => {csrq += item.csrq+","})
      csrq = csrq.substring(0, csrq.length -1)
      console.log(csrq)
      this.editform.csrq = csrq.split(",")
    
      res.map((item) => {xl += item.xl+","})
      xl = xl.substring(0, xl.length -1)
      this.editform.xl = xl.split(",")

      res.map((item) => {jbgz += item.jbgz+","})
      jbgz = jbgz.substring(0, jbgz.length -1)
      this.editform.jbgz = jbgz.split(",")
      
      res.map((item) => {yxh += item.yxh+","})
      yxh = yxh.substring(0, yxh.length -1)
      this.editform.yxh = yxh.split(",")

      res.map((item) => {pw += item.pw+","})
      pw = pw.substring(0, pw.length -1)
      this.editform.pw = pw.split(",")

    },
      
    // 获取信息
    async getteacherList () {
      const { data: res } = await 
      this.$http.get('/api/user/showt',
        { params: this.queryinfo })
      this.stuList = res
      console.log(res)
    },



    // 监听"添加对话框"关闭
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    // 监听"修改对话框"关闭
    editDialogClosed () {
      this.$refs.editFormRef.resetFields()
    },

    
    // 显示要编辑的数据
    async showEditDialog (row,gh) {
      this.editform = row
      console.log(gh)
      this.editDialogVisible = true
    },

    // 修改老师
    editteacher () {
      // 预校验
      this.$refs.editFormRef.validate(async valid =>{
        if (!valid) return
      // 发起请求

      const { data1: res1 } = await
      this.$http.post('/api/user/login_update?'+ 
        'password='+ this.editform.pw + '&' +
        'username='+ this.editform.gh
      )

      const { data2: res2 } = await
      this.$http.post('/api/user/teacher_updatet?'+ 
        'xb='+ this.editform.xb + '&' +
        'csrq='+ this.editform.csrq + '&' +
        'xl='+ this.editform.xl + '&' +
        'jbgz='+ this.editform.jbgz + '&' +
        'yxh='+ this.editform.yxh + '&' +
        'pw='+ this.editform.pw + '&' +
        'gh='+ this.editform.gh
      )
      this.$message.success('信息修改成功！')
      this.editDialogVisible = false
      this.getteacherList() // 重新获取数据
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
