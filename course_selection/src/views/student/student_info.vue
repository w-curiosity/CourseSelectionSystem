<template>
  <div>
    <!--卡片区域-->
<el-card>
    
      <template slot-scope="scope">

    <el-form :model="editform" label-width="70px" :rules="editFormRules" ref="editFormRef" size="mini">
          <!--第1行：学号、姓名（不可改）-->
          <el-row type="flex" :gutter="20">
            <el-col :span="10">
              <el-form-item label="学号" prop="xh">
              <el-input v-model="editform.xh" disabled></el-input>
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
          <!--第3行：籍贯、手机号码-->
          <el-row type="flex"  :gutter="20">
            <el-col :span="10">
              <el-form-item label="籍贯" prop="jg">
              <el-input v-model="editform.jg" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex"  :gutter="20">
            <el-col :span="10">
              <el-form-item label="手机号码" prop="sjhm">
              <el-input v-model="editform.sjhm"></el-input>
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
              <el-input  type="password" v-model="editform.pw"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <!--  修改  -->
          <el-row type="flex"  :gutter="20">
            <el-col :span="10">
                <el-button type="primary" @click="editstu">确 定</el-button>
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
        xh: '',
        xm: '',
        xb: '',
        csrq: '',
        jg: '',
        sjhm: '',
        yxh: '',
        pw:''
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
      this.editform.xh = window.sessionStorage.getItem('id') // 取到了赋值给xh
      const { data: res } = await 
      this.$http.get('/api/user/selectstu?xh=' + this.editform.xh)

      var xm = []
      var xb = []
      var csrq = []
      var jg = []
      var sjhm = []
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
    
      res.map((item) => {jg += item.jg+","})
      jg = jg.substring(0, jg.length -1)
      this.editform.jg = jg.split(",")

      res.map((item) => {sjhm += item.sjhm+","})
      sjhm = sjhm.substring(0, sjhm.length -1)
      this.editform.sjhm = sjhm.split(",")
      
      res.map((item) => {yxh += item.yxh+","})
      yxh = yxh.substring(0, yxh.length -1)
      this.editform.yxh = yxh.split(",")

      res.map((item) => {pw += item.pw+","})
      pw = pw.substring(0, pw.length -1)
      this.editform.pw = pw.split(",")

    },
      
    // 获取信息
    async getstuList () {
      const { data: res } = await 
      this.$http.get('/api/user/showstu',
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
    async showEditDialog (row,xh) {
      this.editform = row
      console.log(xh)
      this.editDialogVisible = true
    },

    // 修改学生
    editstu () {
      // 预校验
      this.$refs.editFormRef.validate(async valid =>{
        if (!valid) return
      // 发起请求
      const { data1: res1 } = await
      this.$http.post('/api/user/login_update?'+ 
        'password='+ this.editform.pw + '&' +
        'username='+ this.editform.xh
      )

      const { data2: res2 } = await
      this.$http.post('/api/user/stu_updatestu?'+ 
        'xb='+ this.editform.xb + '&' +
        'csrq='+ this.editform.csrq + '&' +
        'jg='+ this.editform.jg + '&' +
        'sjhm='+ this.editform.sjhm + '&' +
        'yxh='+ this.editform.yxh + '&' +
        'pw='+ this.editform.pw + '&' +
        'xh='+ this.editform.xh
      )
      this.$message.success('信息修改成功！')
      this.editDialogVisible = false
      this.getstuList() // 重新获取数据
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
