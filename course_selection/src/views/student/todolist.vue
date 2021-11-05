<template>
  <div>
    <!--卡片区域-->
<el-card>
      <el-row type="flex" justify="left" :gutter="20">
      </el-row>
  <!--主体表格-->
  <el-table :data="List" border stripe style="width: 100%">
    <el-table-column fixed prop="kh" label="课号" width="100"></el-table-column>
    <el-table-column prop="km" label="课名" width="100"></el-table-column>
    <el-table-column prop="xf" label="学分" width="50"></el-table-column>
    <el-table-column prop="xs" label="学时" width="50"></el-table-column>
  </el-table>
  <el-divider></el-divider>
  <tr>
 <td>待完成学分：</td>
 <td><div>{{sum}}</div></td>
</tr>
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
    }
  },
  computed:{
    //表格中的xf合计
    sum(){
				return this.List.map(
					row=>row.xf).reduce(
					(acc, cur) => (parseFloat(cur) + acc), 0)
      },

  },

  created () {
    this.getList()
  },
  //获取token
  methods: {
    // 获取信息
    async getList () {
      var xh = window.sessionStorage.getItem('id')
      const { data: res } = await 
      this.$http.get('/api/course/showe2?xh=' + xh,
        { params: this.queryinfo })
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
