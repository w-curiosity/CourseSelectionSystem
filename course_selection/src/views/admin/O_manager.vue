<template>
  <div>
    <!--卡片区域-->
<el-card>
      <el-row type="flex" justify="left" :gutter="10">
        <!--输入框-->
        <el-col :span="8">
          <el-select placeholder="请选择学期" v-model="searchform.xq" 
          clearable @clear="getList">
            <el-option label="2020-2021冬季" value="2020-2021冬季"></el-option>
            <el-option label="2020-2021秋季" value="2020-2021秋季"></el-option>
            <el-option label="2019-2020冬季" value="2019-2020冬季"></el-option>
            <el-option label="2019-2020秋季" value="2019-2020秋季"></el-option>
            <el-option label="2018-2019冬季" value="2018-2019冬季"></el-option>
          </el-select>
        </el-col :span = "3">
        <el-col>
        <el-button icon="el-icon-search" circle @click="search"></el-button>
        </el-col>
        <!--添加按钮-->
        <el-col :span = "3">
          <el-button type="primary" @click="addDialogVisible = true">添加</el-button>
        </el-col>
      </el-row>
  <!--主体表格-->
  <el-table :data="List" border stripe style="width: 100%">
    <el-table-column prop="xq" label="学期" width="150">
    </el-table-column>
    <el-table-column fixed prop="kh" label="课号" width="100"></el-table-column>
    <el-table-column prop="gh" label="工号" width="60"></el-table-column>
    <el-table-column prop="sksj" label="上课时间" width="100"></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini" icon="el-icon-edit"
          @click="showEditDialog(scope.row,scope.row.kh)"></el-button>
          <!--弹窗数据-->
        <el-button
          size="mini"
          type="danger" icon="el-icon-delete"
          @click="deletebykhgh(scope.row.kh,scope.row.gh)"></el-button>
      </template>
    </el-table-column>
  </el-table>
</el-card>
    <!--编辑对话框-->
    <template>
    <el-dialog title="修改开课信息" :visible.sync="editDialogVisible" width="550px"
    @close="editDialogClosed">
        <el-form :model="editform" label-width="70px" :rules="editFormRules" ref="editFormRef">
          <!--第1行：学期、课号（不可改）-->
          <el-row type="flex" justify="center" :gutter="20">
            <el-col :span="10">
              <el-form-item label="学期" prop="xq">
              <el-input v-model="editform.xq"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="课号" prop="kh">
              <el-input v-model="editform.kh" disabled></el-input>
              </el-form-item>            
            </el-col>
          </el-row>
          <!--第2行：工号、上课时间-->
          <el-row type="flex" justify="center" :gutter="20">
            <el-col :span="10">
              <el-form-item label="工号" prop="gh">
                <el-input v-model="editform.gh" disabled></el-input>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="上课时间" prop="sksj">
              <el-input v-model="editform.sksj"></el-input>
              </el-form-item>     
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
    <el-dialog title="添加课程" :visible.sync="addDialogVisible" width="600px"
    @close="addDialogClosed">
        <el-form :model="addform" label-width="80px" :rules="addFormRules" ref="addFormRef">
           <!--第1行：课号、课名-->
          <el-row type="flex" justify="center" :gutter="20">
            <el-col :span="10">
              <el-form-item label="学期" prop="xq">
                <el-select v-model="addform.xq" placeholder="请选择">
                  <el-option label="2020-2021冬季" value="2020-2021冬季"></el-option>
                  <el-option label="2020-2021秋季" value="2020-2021秋季"></el-option>
                  <el-option label="2019-2020冬季" value="2019-2020冬季"></el-option>
                  <el-option label="2019-2020秋季" value="2019-2020秋季"></el-option>
                  <el-option label="2018-2019冬季" value="2018-2019冬季"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="课号" prop="课号">
              <el-input v-model="addform.kh"></el-input>
              </el-form-item>            
            </el-col>
          </el-row>
          <!--第2行：工号、上课时间-->
          <el-row type="flex" justify="center" :gutter="20">
            <el-col :span="10">
              <el-form-item label="工号" prop="gh">
                <el-input v-model="addform.gh"></el-input>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="上课时间" prop="xs">
              <el-input v-model="addform.sksj"></el-input>
              </el-form-item>     
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
      //选择学期
      filterXQ:'',
      // 控制编辑对话框的显示隐藏
      editDialogVisible: false,
      // 控制添加对话框的显示隐藏
      addDialogVisible: false,
      editform: {
        xq: '',
        kh: '',
        gh: '',
        sksj: ''
      },
      addform: {
        xq: '',
        kh: '',
        gh: '',
        sksj: ''
      },
      searchform: {
        kh: '',
        xq: ''
      },
      options: ['2013-2014冬季', '2013-2014秋季','2012-2013冬季','2012-2013秋季','2018-2019冬季'],
      //信息填写校验提示
      addFormRules: {
        kh: [{ required:true, message:"请输入课号", trigger: 'blur' }],
        gh: [{ required:true, message:"请输入工号", trigger: 'blur' }],
        sksj: [{ required:true, message:"请输入上课时间", trigger: 'blur' }]
      },
      //信息填写校验提示
      editFormRules: {
      },
     
    }
  },
  created () {
    this.getList()
  },

  methods: {
    // 获取信息
    async getList () {
      const { data: res } = await 
      this.$http.get('/api/course/showo',
        { params: this.queryinfo })
      this.List = res
    },
    // 按学期查询信息
    async search () {
      var xq = this.searchform.xq
      const { data: res } = await 
      this.$http.get('/api/course/selecto?xq=' + xq)
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
      this.$http.post('/api/course/addo', this.addform )
      this.$message.success('新增开课成功！')
      this.addDialogVisible = false
      this.search()
      })
    },
    // 显示要编辑的数据
    async showEditDialog (row,gh) {
      this.editform = row
      console.log(gh)
      this.editDialogVisible = true
    },
    // 修改
    edit () {
      //预校验
      this.$refs.editFormRef.validate(async valid =>{
        if (!valid) return
      //发起请求
      const { data: res } = await
      this.$http.post('/api/course/updateo?'+ 
        'xq='+ this.editform.xq + '&' +
        'sksj='+ this.editform.sksj + '&' +
        'kh='+ this.editform.kh + '&' +
        'gh='+ this.editform.gh
      )
      this.$message.success('修改成功！')
      this.editDialogVisible = false
      this.search ()
      })
    },
    // 删除数据
    async deletebykhgh (kh,gh) {
      // 弹框
      const confirmResult = await this.$confirm('此操作将永久删除该开课信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).catch(err => err)
      if(confirmResult == 'cancel' ){
        return this.$message.info('已取消删除')
      }
      console
      const { data: res } = await this.$http.post
      ('/api/course/delo?kh=' + kh + '&' +'gh='+ gh )
      this.$message.success('删除成功！')
      this.search ()
    }

  }
}
</script>

<style>
.el-table{
  margin-top: 15px;
}
</style>
