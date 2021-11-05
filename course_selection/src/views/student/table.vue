<template>
  <div>
    <!--卡片区域-->
<el-card>
  <!--主体表格-->
  <el-table :data="Mon" border stripe style="width: 20%;float:left" :row-style="{height:'60px'}">
    <el-table-column prop="km" label="周一" style="width:20%"></el-table-column>
  </el-table>
  <el-table :data="Tue" border stripe style="width: 20%;float:left" :row-style="{height:'60px'}">
    <el-table-column prop="km" label="周二" style="width:20%"></el-table-column>
  </el-table>
  <el-table :data="Wed" border stripe style="width: 20%;float:left" :row-style="{height:'60px'}">
    <el-table-column prop="km" label="周三" style="width:20%"></el-table-column>
  </el-table>
  <el-table :data="Thu" border stripe style="width: 20%;float:left" :row-style="{height:'60px'}">
    <el-table-column prop="km" label="周四" style="width:20%"></el-table-column>
  </el-table>
  <el-table :data="Fri" border stripe style="width: 20%" :row-style="{height:'60px'}">
    <el-table-column prop="km" label="周五" style="width:20%"></el-table-column>
  </el-table>
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
      Mon: [],
      Tue: [],
      Wed: [],
      Thu: [],
      Fri: []

      // 控制编辑对话框的显示隐藏
    }
  },
  created () {
    // eslint-disable-next-line no-unused-expressions
    this.getMon()
    this.getTue()
    this.getWed()
    this.getThu()
    this.getFri()
  },
  methods: {
    // 课表
    async getMon () {
      //获取xq
      const { data: res1 } = await 
      this.$http.get('/api/course/selectxq',
        { params: this.queryinfo })
        console.log(res1)
      var xq = JSON.stringify(res1).slice(15,26)
      var xh = window.sessionStorage.getItem('id')
      const { data: res } = await
      this.$http.get('/api/course/showstableMon?xq='+xq + '&' + 'xh='+ xh)
      this.Mon = res
    },
    async getTue () {
      //获取xq
      const { data: res1 } = await 
      this.$http.get('/api/course/selectxq',
        { params: this.queryinfo })
        console.log(res1)
      var xq = JSON.stringify(res1).slice(15,26)
      var xh = window.sessionStorage.getItem('id')
      const { data: res } = await
      this.$http.get('/api/course/showstableTue?xq='+xq + '&' + 'xh='+ xh)
      this.Tue = res
    },
    async getWed () {
      //获取xq
      const { data: res1 } = await 
      this.$http.get('/api/course/selectxq',
        { params: this.queryinfo })
        console.log(res1)
      var xq = JSON.stringify(res1).slice(15,26)
      var xh = window.sessionStorage.getItem('id')
      const { data: res } = await
      this.$http.get('/api/course/showstableWed?xq='+xq + '&' + 'xh='+ xh)
      this.Wed = res
    },
    async getThu () {
      //获取xq
      const { data: res1 } = await 
      this.$http.get('/api/course/selectxq',
        { params: this.queryinfo })
        console.log(res1)
      var xq = JSON.stringify(res1).slice(15,26)
      var xh = window.sessionStorage.getItem('id')
      const { data: res } = await
      this.$http.get('/api/course/showstableThu?xq='+xq + '&' + 'xh='+ xh)
      this.Thu = res
    },
    async getFri () {
      //获取xq
      const { data: res1 } = await 
      this.$http.get('/api/course/selectxq',
        { params: this.queryinfo })
        console.log(res1)
      var xq = JSON.stringify(res1).slice(15,26)
      var xh = window.sessionStorage.getItem('id')
      const { data: res } = await
      this.$http.get('/api/course/showstableFri?xq='+xq + '&' + 'xh='+ xh)
      this.Fri = res
    }

  }
}
</script>

<style>
.el-table{
  margin-top: 15px;
}
</style>

