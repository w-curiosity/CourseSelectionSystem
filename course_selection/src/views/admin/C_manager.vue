<template>
  <div>
    <!--卡片区域-->
<el-card>
      <el-row type="flex" justify="left" :gutter="20">
        <!--输入框-->
        <el-col :span="8">
          <el-input placeholder="请输入课号" v-model="searchform.kh" 
          clearable @clear="getList">
            <el-button slot="append"
            icon = "el-icon-search" @click="search"></el-button>
          </el-input>
        </el-col>
        <!--添加按钮-->
        <el-col :span = "3">
          <el-button type="primary" @click="addDialogVisible = true">添加</el-button>
        </el-col>
      </el-row>
  <!--主体表格-->
  <el-table :data="List" border stripe style="width: 100%">
    <el-table-column fixed prop="kh" label="课号" width="100"></el-table-column>
    <el-table-column prop="km" label="课名" width="100"></el-table-column>
    <el-table-column prop="xf" label="学分" width="50"></el-table-column>
    <el-table-column prop="xs" label="学时" width="50"></el-table-column>
    <el-table-column prop="yxh" label="院系号" width="80"></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini" icon="el-icon-edit"
          @click="showEditDialog(scope.row,scope.row.kh)"></el-button>
          <!--弹窗数据-->
        <el-button
          size="mini"
          type="danger" icon="el-icon-delete"
          @click="deleteBykh(scope.row.kh)"></el-button>
      </template>
    </el-table-column>
  </el-table>
</el-card>
    <!--编辑对话框-->
    <template>
    <el-dialog title="修改课程信息" :visible.sync="editDialogVisible" width="480px"
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
          <!--第2行：学分、学时-->
          <el-row type="flex" justify="center" :gutter="20">
            <el-col :span="10">
              <el-form-item label="学分" prop="xf">
                <el-input v-model="editform.xf"></el-input>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="学时" prop="xs">
              <el-input v-model="editform.xs"></el-input>
              </el-form-item>     
            </el-col>
          </el-row>
          <!--第3行：院系号-->
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
          <el-button type="primary" @click="edit">确 定</el-button>
        </div>
    </el-dialog>
    </template>
    <!--添加对话框-->
    <el-dialog title="添加课程" :visible.sync="addDialogVisible" width="560px"
    @close="addDialogClosed">
        <el-form :model="addform" label-width="80px" :rules="addFormRules" ref="addFormRef">
           <!--第1行：课号、课名-->
          <el-row type="flex" justify="center" :gutter="20">
            <el-col :span="10">
              <el-form-item label="课号" prop="kh">
              <el-input v-model="addform.kh"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="课名" prop="km">
              <el-input v-model="addform.km"></el-input>
              </el-form-item>            
            </el-col>
          </el-row>
          <!--第2行：学分、学时-->
          <el-row type="flex" justify="center" :gutter="20">
            <el-col :span="10">
              <el-form-item label="学分" prop="xf">
                <el-input v-model="addform.xf"></el-input>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="学时" prop="xs">
              <el-input v-model="addform.xs"></el-input>
              </el-form-item>     
            </el-col>
          </el-row>
          <!--第3行：院系号-->
          <el-row type="flex" justify="center" :gutter="20">
            <el-col :span="10">
              <el-form-item label="院系号" prop="yxh">
              <el-input v-model="addform.yxh"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="add">确 定</el-button>
        </div>
    </el-dialog>
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
      // 控制编辑对话框的显示隐藏
      editDialogVisible: false,
      // 控制添加对话框的显示隐藏
      addDialogVisible: false,
      editform: {
        kh: '',
        km: '',
        xf: '',
        xs: '',
        yxh: ''
      },
      addform: {
        kh: '',
        km: '',
        xf: '',
        xs: '',
        yxh: ''
      },
      searchform: {
        kh: ''
      },
      //信息填写校验提示
      addFormRules: {
        kh: [{ required:true, message:"请输入课号", trigger: 'blur' }],
        km: [{ required:true, message:"请输入课名", trigger: 'blur' }],
        xf: [{ required:true, message:"请输入学分", trigger: 'blur' }],
        xs: [{ required:true, message:"请输入学时", trigger: 'blur' }],
        yxh: [{ required:true, message:"请输入院系号", trigger: 'blur' }],
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
      this.$http.get('/api/course/showc',
        { params: this.queryinfo })
      this.List = res
    },
    // 按工号查询信息
    async search () {
      var kh = this.searchform.kh
      const { data: res } = await 
      this.$http.get('/api/course/selectc?kh=' + kh)
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
    // 添加学生
    add () {
      //预校验
      this.$refs.addFormRef.validate(async valid =>{
        if (!valid) return
      //发起请求
      const { data: res } = await
      this.$http.post('/api/course/addc', this.addform )
      this.$message.success('添加课程成功！')
      this.addDialogVisible = false
      this.getList() // 重新获取数据
      })
    },
    // 显示要编辑的数据
    async showEditDialog (row,kh) {
      this.editform = row
      console.log(kh)
      this.editDialogVisible = true
    },
    // 修改
    edit () {
      //预校验
      this.$refs.editFormRef.validate(async valid =>{
        if (!valid) return
      //发起请求
      const { data: res } = await
      this.$http.post('/api/course/updatec?'+ 
        'xf='+ this.editform.xf + '&' +
        'xs='+ this.editform.xs + '&' +
        'yxh='+ this.editform.yxh + '&' +
        'kh='+ this.editform.kh
      )
      this.$message.success('修改成功！')
      this.editDialogVisible = false
      this.getList() // 重新获取数据
      })
    },
    // 删除数据
    async deleteBykh (kh) {
      // 弹框
      const confirmResult = await this.$confirm('此操作将永久删除该课程, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).catch(err => err)
      if(confirmResult == 'cancel' ){
        return this.$message.info('已取消删除')
      }
      console
      const { data: res } = await this.$http.post('/api/course/delc?kh=' + kh )
      this.$message.success('删除课程成功！')
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
