<template>
  <div>
    <!--卡片区域-->
<el-card>
      <el-row type="flex" justify="left" :gutter="20">
        <!--输入框-->
        <el-col :span="8">
          <el-input placeholder="请输入院系号" v-model="searchform.yxh" 
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
    <el-table-column fixed prop="yxh" label="院系号" width="80"></el-table-column>
    <el-table-column prop="mc" label="名称" width="150"></el-table-column>
    <el-table-column prop="dz" label="地址" width="160"></el-table-column>
    <el-table-column prop="lxdh" label="联系电话" width="100"></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini" icon="el-icon-edit"
          @click="showEditDialog(scope.row,scope.row.yxh)"></el-button>
          <!--弹窗数据-->
        <el-button
          size="mini"
          type="danger" icon="el-icon-delete"
          @click="deleteBykh(scope.row.yxh)"></el-button>
      </template>
    </el-table-column>
  </el-table>
</el-card>
    <!--编辑对话框-->
    <template>
    <el-dialog title="修改院系信息" :visible.sync="editDialogVisible" width="450px"
    @close="editDialogClosed">
        <el-form :model="editform" label-width="70px" :rules="editFormRules" ref="editFormRef">
          <!--第1行：院系号、名称 不可改-->
          <el-row type="flex" justify="left">
            <el-col>
              <el-form-item label="院系号" prop="yxh">
              <el-input v-model="editform.yxh" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="名称" prop="mc">
                <el-input v-model="editform.mc" disabled></el-input>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <!--第2行：地址-->
          <el-row type="flex" justify="left">
            <el-col>
              <el-form-item label="地址" prop="dz">
              <el-input v-model="editform.dz"></el-input>
              </el-form-item>            
            </el-col>
          </el-row>
          <!--第3行：联系电话-->
          <el-row type="flex" justify="left">
            <el-col>
              <el-form-item label="联系电话" prop="lxdh">
              <el-input v-model="editform.lxdh"></el-input>
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
    <el-dialog title="添加院系" :visible.sync="addDialogVisible" width="450px"
    @close="addDialogClosed">
        <el-form :model="addform" label-width="80px" :rules="addFormRules" ref="addFormRef">
           <!--第1行：院系号、名称-->
          <el-row type="flex" justify="left">
            <el-col>
              <el-form-item label="院系号" prop="yxh">
              <el-input v-model="addform.yxh"></el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="名称" prop="mc">
                <el-input v-model="addform.mc"></el-input>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <!--第2行：地址-->
          <el-row type="flex" justify="left">
            <el-col>
              <el-form-item label="地址" prop="dz">
              <el-input v-model="addform.dz"></el-input>
              </el-form-item>            
            </el-col>
          </el-row>
          <!--第3行：联系电话-->
          <el-row type="flex" justify="left">
            <el-col>
              <el-form-item label="联系电话" prop="lxdh">
              <el-input v-model="addform.lxdh"></el-input>
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
      // 控制编辑对话框的显示隐藏
      editDialogVisible: false,
      // 控制添加对话框的显示隐藏
      addDialogVisible: false,
      editform: {
        yxh: '',
        mc: '',
        dz: '',
        lxdh: ''
      },
      addform: {
        yxh: '',
        mc: '',
        dz: '',
        lxdh: ''
      },
      searchform: {
        yxh: ''
      },
      //信息填写校验提示
      addFormRules: {
        yxh: [{ required:true, message:"请输入院系号", trigger: 'blur' }],
        mc: [{ required:true, message:"请输入名称", trigger: 'blur' }],
        dz: [{ required:true, message:"请输入地址", trigger: 'blur' }],
        lxdh: [{ required:true, message:"请输入联系电话", trigger: 'blur' }],
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
      this.$http.get('/api/dep/showd',
        { params: this.queryinfo })
      this.List = res
    },
    // 按工号查询信息
    async search () {
      var yxh = this.searchform.yxh
      const { data: res } = await 
      this.$http.get('/api/dep/selectd?yxh=' + yxh)
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
      this.$http.post('/api/dep/addd', this.addform )
      this.$message.success('添加院系成功！')
      this.addDialogVisible = false
      this.getList() // 重新获取数据
      })
    },
    // 显示要编辑的数据
    async showEditDialog (row,yxh) {
      this.editform = row
      console.log(yxh)
      this.editDialogVisible = true
    },
    // 修改
    edit () {
      //预校验
      this.$refs.editFormRef.validate(async valid =>{
        if (!valid) return
      //发起请求
      const { data: res } = await
      this.$http.post('/api/dep/updated?'+ 
        'dz='+ this.editform.dz + '&' +
        'lxdh='+ this.editform.lxdh + '&' +
        'yxh='+ this.editform.yxh
      )
      this.$message.success('修改成功！')
      this.editDialogVisible = false
      this.getList() // 重新获取数据
      })
    },
    // 删除数据
    async deleteBykh (yxh) {
      // 弹框
      const confirmResult = await this.$confirm('此操作将永久删除该院系, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).catch(err => err)
      if(confirmResult == 'cancel' ){
        return this.$message.info('已取消删除')
      }
      console
      const { data: res } = await this.$http.post('/api/dep/deld?yxh=' + yxh )
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
