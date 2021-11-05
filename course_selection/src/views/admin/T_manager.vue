<template>
  <div>
    <!--卡片区域-->
<el-card>
      <el-row type="flex" justify="left" :gutter="20">
        <!--输入框-->
        <el-col :span="8">
          <el-input placeholder="请输入工号" v-model="searchform.gh" 
          clearable @clear="getList">
            <el-button slot="append"
            icon = "el-icon-search" @click="searcht"></el-button>
          </el-input>
        </el-col>
        <!--添加按钮-->
        <el-col :span = "3">
          <el-button type="primary" @click="addDialogVisible = true">添加</el-button>
        </el-col>
      </el-row>
  <!--主体表格-->
  <el-table :data="List" border stripe style="width: 100%">
    <el-table-column fixed prop="gh" label="工号" width="80"></el-table-column>
    <el-table-column prop="xm" label="姓名" width="70"></el-table-column>
    <el-table-column prop="xb" label="性别" width="50"></el-table-column>
    <el-table-column prop="csrq" label="出生日期" width="120"></el-table-column>
    <el-table-column prop="xl" label="职称" width="70"></el-table-column>
    <el-table-column prop="jbgz" label="手机号码" width="120"></el-table-column>
    <el-table-column prop="yxh" label="院系号" width="80"></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini" icon="el-icon-edit"
          @click="showEditDialog(scope.row,scope.row.gh)"></el-button>
          <!--弹窗数据-->
        <el-button
          size="mini"
          type="danger" icon="el-icon-delete"
          @click="deleteBygh(scope.row.gh)"></el-button>
      </template>
    </el-table-column>
  </el-table>
</el-card>
    <!--编辑对话框-->
    <template>
    <el-dialog title="修改教师信息" :visible.sync="editDialogVisible" width="580px"
    @close="editDialogClosed">
        <el-form :model="editform" label-width="70px" :rules="editFormRules" ref="editFormRef">
          <!--第1行：工号、姓名（不可改）-->
          <el-row type="flex" justify="center" :gutter="20">
            <el-col :span="10">
              <el-form-item label="工号" prop="gh">
              <el-input v-model="editform.gh" disabled></el-input>
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
              <el-form-item label="职称" prop="xl">
                <el-select v-model="editform.xl" placeholder="请选择">
                <el-option label="讲师" value="讲师"></el-option>
                <el-option label="副教授" value="副教授"></el-option>
                <el-option label="教授" value="教授"></el-option>
              </el-select>
              </el-form-item>           
            </el-col>
            <el-col :span="10">
              <el-form-item label="手机号码" prop="sjhm">
              <el-input v-model="editform.jbgz"></el-input>
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
          <el-button type="primary" @click="editt">确 定</el-button>
        </div>
    </el-dialog>
    </template>
    <!--添加对话框-->
    <el-dialog title="添加教师" :visible.sync="addDialogVisible" width="580px"
    @close="addDialogClosed">
        <el-form :model="addform" label-width="80px" :rules="addFormRules" ref="addFormRef">
           <!--第1行：工号、姓名-->
          <el-row type="flex" justify="center" :gutter="20">
            <el-col :span="10">
              <el-form-item label="工号" prop="gh">
              <el-input v-model="addform.gh"></el-input>
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
          <!--第3行：职称、基本工资-->
          <el-row type="flex" justify="center" :gutter="20">
            <el-col :span="10">
              <el-form-item label="职称" prop="xl">
              <el-select v-model="addform.xl" placeholder="请选择">
                <el-option label="讲师" value="讲师"></el-option>
                <el-option label="副教授" value="副教授"></el-option>
                <el-option label="教授" value="教授"></el-option>
              </el-select>
              </el-form-item>           
            </el-col>
            <el-col :span="10">
              <el-form-item label="手机号码" prop="jbgz">
              <el-input v-model="addform.jbgz"></el-input>
              </el-form-item>           
            </el-col>
          </el-row>
          <!--第4行：院系号、密码-->
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
          <el-button type="primary" @click="addt">确 定</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'TManager',
  data () {
    return {
      queryinfo: {
        query: ''
      },
      List: [],
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
        yxh: ''
      },
      addform: {
        gh: '',
        xm: '',
        xb: '',
        csrq: '',
        xl: '',
        jbgz: '',
        yxh: '',
        pw:''
      },
      searchform: {
        gh: ''
      },
      //信息填写校验提示
      addFormRules: {
        gh: [{ required:true, message:"请输入工号", trigger: 'blur' }],
        xm: [{ required:true, message:"请输入姓名", trigger: 'blur' }],
        xb: [{ required:true, message:"请输入性别", trigger: 'blur' }],
        csrq: [{ required:true, message:"请输入出生日期", trigger: 'blur' }],
        xl: [{ required:true, message:"请输入职称", trigger: 'blur' }],
        jbgz: [{ required:true, message:"请输入基本工资", trigger: 'blur' }],
        yxh: [{ required:true, message:"请输入院系号", trigger: 'blur' }],
        pw: [{ required: true, message: "请输入密码", trigger: 'blur' }],
      },
      //信息填写校验提示
      editFormRules: {
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    // 获取信息
    async getList () {
      const { data: res } = await 
      this.$http.get('/api/user/showt',
        { params: this.queryinfo })
      this.List = res
    },
    // 按工号查询信息
    async searcht () {
      var gh = this.searchform.gh
      const { data: res } = await 
      this.$http.get('/api/user/selectt?gh=' + gh)
      this.List = res
    },
    //监听"添加对话框"关闭
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    //监听"修改对话框"关闭
    editDialogClosed () {
      this.$refs.editFormRef.resetFields()
    },
    // 添加老师
    addt () {
      //预校验
      this.$refs.addFormRef.validate(async valid =>{
        if (!valid) return
      //发起请求

      const { data1: res1 } = await
      this.$http.post('/api/user/add_login?'+ 
        'username='+ this.addform.gh + '&' +
        'password='+ this.addform.pw + '&' +
        'role_id='+ '2' + '&' +
        'role_name='+ '教师'
      )

      const { data2: res2 } = await
      this.$http.post('/api/user/addt', this.addform )

      this.$message.success('添加老师成功！')
      this.addDialogVisible = false
      this.getList() // 重新获取数据
      })
    },
    // 显示要编辑的数据
    async showEditDialog (row,gh) {
      this.editform = row
      console.log(gh)
      this.editDialogVisible = true
    },
    // 修改
    editt () {
      //预校验
      this.$refs.editFormRef.validate(async valid =>{
        if (!valid) return
      //发起请求
      const { data: res } = await
      this.$http.post('/api/user/updatet?'+ 
        'xb='+ this.editform.xb + '&' +
        'csrq='+ this.editform.csrq + '&' +
        'xl='+ this.editform.xl + '&' +
        'jbgz='+ this.editform.jbgz + '&' +
        'yxh='+ this.editform.yxh + '&' +
        'gh='+ this.editform.gh
      )
      this.$message.success('修改成功！')
      this.editDialogVisible = false
      this.getList() // 重新获取数据
      })
    },
    // 删除数据
    async deleteBygh (gh) {
      // 弹框
      const confirmResult = await this.$confirm('此操作将永久删除该教师, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).catch(err => err)
      if(confirmResult == 'cancel' ){
        return this.$message.info('已取消删除')
      }
      console
      const { data1: res1 } = await this.$http.post('/api/user/del_login?username=' + gh )
      const { data2: res2 } = await this.$http.post('/api/user/delt?gh=' + gh )
      this.$message.success('删除教师成功！')
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
