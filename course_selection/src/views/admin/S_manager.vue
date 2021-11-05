<template>
  <div>
    <!--卡片区域-->
<el-card>
      <el-row type="flex" justify="left" :gutter="20">
        <!--输入框-->
        <el-col :span="8">
          <el-input placeholder="请输入学号" v-model="searchform.xh"
          clearable @clear="getstuList">
            <el-button slot="append"
            icon = "el-icon-search" @click="searchstu"></el-button>
          </el-input>
        </el-col>
        <!--添加按钮-->
        <el-col :span = "3">
          <el-button type="primary" @click="addDialogVisible = true">添加</el-button>
        </el-col>
      </el-row>
  <!--主体表格-->
  <el-table :data="stuList" border stripe style="width: 100%">
    <el-table-column fixed prop="xh" label="学号" width="80"></el-table-column>
    <el-table-column prop="xm" label="姓名" width="70"></el-table-column>
    <el-table-column prop="xb" label="性别" width="50"></el-table-column>
    <el-table-column prop="csrq" label="出生日期" width="120"></el-table-column>
    <el-table-column prop="jg" label="籍贯" width="70"></el-table-column>
    <el-table-column prop="sjhm" label="手机号码" width="120"></el-table-column>
    <el-table-column prop="yxh" label="院系号" width="80"></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini" icon="el-icon-edit"
          @click="showEditDialog(scope.row,scope.row.xh)"></el-button>
          <!--弹窗数据-->
        <el-button
          size="mini"
          type="danger" icon="el-icon-delete"
          @click="deleteByxh(scope.row.xh)"></el-button>
      </template>
    </el-table-column>
  </el-table>
</el-card>
    <!--编辑对话框-->
    <template>
    <el-dialog title="修改学生信息" :visible.sync="editDialogVisible" width="560px"
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
          <!--第2行：性别、出生日期-->
          <el-row type="flex" justify="center" :gutter="20">
            <el-col :span="10">
              <el-form-item label="性别" prop="xb">
                <el-select v-model="editform.xb" placeholder="请选择">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="出生日期" prop="csrq">
              <el-date-picker type="date" placeholder="选择日期" v-model="editform.csrq"
              style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <!--第3行：籍贯、手机号码-->
          <el-row type="flex" justify="center" :gutter="20">
            <el-col :span="10">
              <el-form-item label="籍贯" prop="jg">
              <el-input v-model="editform.jg"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="手机号码" prop="sjhm">
              <el-input v-model="editform.sjhm"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--第4行：院系号-->
          <el-row type="flex" justify="center" :gutter="20">
            <el-col :span="10">
              <el-form-item label="院系号" prop="yxh">
              <el-input v-model="editform.yxh"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editstu">确 定</el-button>
        </div>
    </el-dialog>
    </template>
    <!--添加对话框-->
    <el-dialog title="添加学生" :visible.sync="addDialogVisible" width="560px"
    @close="addDialogClosed">
        <el-form :model="addform" label-width="80px" :rules="addFormRules" ref="addFormRef">
           <!--第1行：学号、姓名-->
          <el-row type="flex" justify="center" :gutter="20">
            <el-col :span="10">
              <el-form-item label="学号" prop="xh">
              <el-input v-model="addform.xh"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="姓名" prop="xm">
              <el-input v-model="addform.xm"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--第2行：性别、出生日期-->
          <el-row type="flex" justify="center" :gutter="20">
            <el-col :span="10">
              <el-form-item label="性别" prop="xb">
                <el-select v-model="addform.xb" placeholder="请选择">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="出生日期" prop="csrq">
              <el-date-picker type="date" placeholder="选择日期" v-model="addform.csrq"
              style="width: 100%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <!--第3行：籍贯、手机号码-->
          <el-row type="flex" justify="center" :gutter="20">
            <el-col :span="10">
              <el-form-item label="籍贯" prop="jg">
              <el-input v-model="addform.jg"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="手机号码" prop="sjhm">
              <el-input v-model="addform.sjhm"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--第4行：院系号\密码-->
          <el-row type="flex" justify="center" :gutter="20">
            <el-col :span="10">
              <el-form-item label="院系号" prop="yxh">
              <el-input v-model="addform.yxh"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="密码" prop="pw">
              <el-input v-model="addform.pw"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addstu">确 定</el-button>
        </div>
    </el-dialog>
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
        yxh: ''
      },
      addform: {
        xh: '',
        xm: '',
        xb: '',
        csrq: '',
        jg: '',
        sjhm: '',
        yxh: '',
        pw:''
      },
      searchform: {
        xh: ''
      },
      // 信息填写校验提示
      addFormRules: {
        xh: [{ required: true, message: "请输入学号", trigger: 'blur' }],
        xm: [{ required: true, message: "请输入姓名", trigger: 'blur' }],
        xb: [{ required: true, message: "请输入性别", trigger: 'blur' }],
        csrq: [{ required: true, message: "请输入出生日期", trigger: 'blur' }],
        jg: [{ required: true, message: "请输入籍贯", trigger: 'blur' }],
        sjhm: [{ required: true, message: "请输入手机号码", trigger: 'blur' }],
        yxh: [{ required: true, message: "请输入院系号", trigger: 'blur' }],
        pw: [{ required: true, message: "请输入密码", trigger: 'blur' }],
      },
      // 信息填写校验提示
      editFormRules: {
      }
    }
  },
  created () {
    this.getstuList()
  },
  methods: {
    // 获取信息
    async getstuList () {
      const { data: res } = await 
      this.$http.get('/api/user/showstu',
        { params: this.queryinfo })
      this.stuList = res
      console.log(res)
    },
    // 按学号查询信息
    async searchstu () {
      var xh = this.searchform.xh
      const { data: res } = await 
      this.$http.get('/api/user/selectstu?xh=' + xh)
      this.stuList = res
    },
    // 监听"添加对话框"关闭
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    // 监听"修改对话框"关闭
    editDialogClosed () {
      this.$refs.editFormRef.resetFields()
    },
    // 添加学生
    addstu () {
      // 预校验
      this.$refs.addFormRef.validate(async valid =>{
        if (!valid) return
      // 发起请求
      console.log(this.addform.xh)
        const { data1: res1 } = await
        this.$http.post('/api/user/add_login?'+ 
          'username='+ this.addform.xh + '&' +
          'password='+ this.addform.pw + '&' +
          'role_id='+ '1' + '&' +
          'role_name='+ '学生'
        )

        const { data2: res2 } = await
        this.$http.post('/api/user/addstu', this.addform )

        this.$message.success('添加学生成功！')
        this.addDialogVisible = false
        this.getstuList() // 重新获取数据
      })
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
      const { data: res } = await
      this.$http.post('/api/user/updatestu?'+ 
        'xb='+ this.editform.xb + '&' +
        'csrq='+ this.editform.csrq + '&' +
        'jg='+ this.editform.jg + '&' +
        'sjhm='+ this.editform.sjhm + '&' +
        'yxh='+ this.editform.yxh + '&' +
        'xh='+ this.editform.xh
      )
      this.$message.success('修改学生成功！')
      this.editDialogVisible = false
      this.getstuList() // 重新获取数据
      })
    },
    // 删除数据
    async deleteByxh (xh) {
      // 弹框
      const confirmResult = await this.$confirm('此操作将永久删除该学生, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).catch(err => err)
      if(confirmResult == 'cancel' ){
        return this.$message.info('已取消删除')
      }
      const { data1: res1 } = await this.$http.post('/api/user/del_login?username=' + xh )
      const { data2: res2 } = await this.$http.post('/api/user/delstu?xh=' + xh )
      this.$message.success('删除学生成功！')
      this.getstuList ()
    }

  }
}
</script>

<style>
.el-table{
  margin-top: 15px;
}
</style>
