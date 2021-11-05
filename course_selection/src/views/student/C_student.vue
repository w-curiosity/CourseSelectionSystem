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
      </el-row>
  <!--主体表格-->
  <el-table :data="List" border stripe style="width: 100%">
    <el-table-column fixed prop="kh" label="课号" width="100"></el-table-column>
    <el-table-column prop="km" label="课名" width="100"></el-table-column>
    <el-table-column prop="xm" label="教师性名" width="100"></el-table-column>
    <el-table-column prop="xf" label="学分" width="50"></el-table-column>
    <el-table-column prop="xs" label="学时" width="50"></el-table-column>
    <el-table-column prop="sksj" label="上课时间" width="120"></el-table-column>
    <el-table-column prop="yxh" label="院系号" width="80"></el-table-column>
  </el-table>
</el-card>
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
      searchform: {
        kh: ''
      },
    }
  },
  created () {
    this.getList()
  },
  methods: {
    // 获取信息
    async getList () {
       //获取xq
      const { data: res1 } = await 
      this.$http.get('/api/course/selectxq',
        { params: this.queryinfo })
      console.log(res1)
      var xq = JSON.stringify(res1).slice(15,26)
      const { data: res } = await 
      this.$http.get('/api/course/show1?xq=' + xq,
        { params: this.queryinfo })
      this.List = res
    },
    // 按课号查询信息
    async search () {
      var kh = this.searchform.kh
      const { data: res } = await 
      this.$http.get('/api/course/selectc1?kh=' + kh)
      this.List = res
    },
  }
}
</script>

<style>
.el-table{
  margin-top: 15px;
}
</style>
