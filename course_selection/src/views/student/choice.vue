<template>
  <div>
    <!--卡片区域-->
<el-card>
      <el-row type="flex" justify="left" :gutter="20">
        <!--输入框-->
        <el-col :span="8">
          <el-input placeholder="请输入课号" v-model="searchform.kh" 
          clearable @clear="getoList">
            <el-button slot="append"
            icon = "el-icon-search" @click="search"></el-button>
          </el-input>
        </el-col>
      </el-row>
  <!--主体表格-->
  <el-table :data="oList" border stripe style="width: 100%">
    <el-table-column prop="kh" label="课号" width="100"></el-table-column>
    <el-table-column prop="km" label="课名" width="100"></el-table-column>
    <el-table-column prop="xm" label="教师姓名" width="80"></el-table-column>
    <el-table-column prop="xs" label="学时" width="70"></el-table-column>
    <el-table-column prop="xf" label="学分" width="70"></el-table-column>
    <el-table-column prop="sksj" label="上课时间" width="120"></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini" 
          type="primary" plain
          @click="showEditDialog(scope.row,scope.row.kh,scope.row.xm,scope.row.xq)">选课</el-button>
          <!--弹窗数据-->
      </template>
    </el-table-column>
  </el-table>
  </el-card>
  <el-card>
  <span>已选课程</span>
  <el-table :data="chosenList" border stripe style="width: 100%">
    <el-table-column prop="kh" label="课号" width="100"></el-table-column>
    <el-table-column prop="km" label="课名" width="100"></el-table-column>
    <el-table-column prop="xm" label="教师姓名" width="80"></el-table-column>
    <el-table-column prop="xs" label="学时" width="70"></el-table-column>
    <el-table-column prop="xf" label="学分" width="70"></el-table-column>
    <el-table-column prop="sksj" label="上课时间" width="120"></el-table-column>
  </el-table>
  <el-divider></el-divider>
  <tr>
  <td>已选学分：</td>
  <td><div>{{sum}}</div></td>
  </tr>
  </el-card>
    <!--编辑对话框-->
    <template>
    <el-dialog title="确认选课信息" :visible.sync="editDialogVisible" width="800px"
    @close="editDialogClosed">
        <el-form :model="editform" label-width="70px" :rules="editFormRules" ref="editFormRef">
          <!--第1行：课号、工号（不可改）-->
          <el-row type="flex" justify="center" :gutter="20">
            <el-col :span="10">
              <el-form-item label="课号" prop="kh">
              <el-input v-model="editform.kh" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="教师" prop="xm">
              <el-input v-model="editform.xm" disabled></el-input>
              </el-form-item>            
            </el-col>
            <el-col :span="10">
              <el-form-item label="上课时间" prop="sksj">
                <el-input v-model="editform.sksj" disabled></el-input>
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
  </div>
</template>

<script>
export default {
  name: 'CManager',
  data () {
    return {
      one:5,
      queryinfo: {
        query: ''
      },
      oList: [],
      chosenList: [],
      // 控制编辑对话框的显示隐藏
      editDialogVisible: false,
      editform: {
        kh: '',
        xm: '',
        xq: '',
      },
      searchform: {
        kh: ''
      },
      //信息填写校验提示
      addFormRules: {
        kh: [{ required:true, message:"请输入课号", trigger: 'blur' }],
      },
      //信息填写校验提示
      editFormRules: {
      }
    }
  },
  computed:{
    //表格中的xf合计
    sum(){
				return this.chosenList.map(
					row=>row.xf).reduce(
					(acc, cur) => (parseFloat(cur) + acc), 0)
    },  
  },
  created () {
    this.getoList()
    this.getchosenList()
  },
  methods: {
    // 获取信息
    async getoList () {
      //获取xq
      const { data: res1 } = await 
      this.$http.get('/api/course/selectxq',
        { params: this.queryinfo })
      console.log(res1)
      var xq = JSON.stringify(res1).slice(15,26)
      var xh = window.sessionStorage.getItem('id')
      //获取可选课程
      const { data: res } = await 
      this.$http.get('/api/course/showoc?xq=' + xq + '&' + 'xh=' + xh,
        { params: this.queryinfo })
      this.oList = res
    },
    // 获取信息
    async getchosenList () {
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
      this.chosenList = res
    },
    // 按课号查询信息
    async search () {
      var kh = this.searchform.kh
      const { data: res } = await 
      this.$http.get('/api/course/selectkh?kh=' + kh)
      this.oList = res
    },
    //监听"修改对话框"关闭
    editDialogClosed () {
      this.$refs.editFormRef.resetFields()
    },
    // 显示要编辑的数据
    async showEditDialog (row,kh,xm,xq) {
      this.editform = row
      console.log(kh)
      this.editDialogVisible = true
    },
    // 修改
    async edit () {
      //获取gh
      var xm = this.editform.xm
      console.log(xm)

      const { data: res1 } = await 
      this.$http.get('/api/user/selecttxm?xm='+ xm)
      var gh = JSON.stringify(res1).slice(8,12)
      console.log(gh)
      var xh = window.sessionStorage.getItem('id')
      //获取xq
      const { data: res2 } = await 
      this.$http.get('/api/course/selectxq',
        { params: this.queryinfo })
      console.log(res2)
      var xq = JSON.stringify(res2).slice(15,26)
      //预校验
      this.$refs.editFormRef.validate(async valid =>{
        if (!valid) return
      //发起请求
      const { data: res } = await
      this.$http.post('/api/course/adde?'+ 
        'xh='+ xh + '&' +
        'xq='+ xq + '&' +
        'kh='+ this.editform.kh + '&' +
        'gh='+ gh
      )
      this.$message.success('选课成功！')
      this.editDialogVisible = false
      this.getoList() // 重新获取数据
      this.getchosenList() // 重新获取数据
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
