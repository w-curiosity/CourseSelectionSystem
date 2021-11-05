<template>
<div>
<el-card>
    <h3>请设置当前学期：</h3>
    <el-divider></el-divider>
    <!--输入框-->
    <el-row type="flex" justify="left" :gutter="20">
    <el-form>
        <el-form-item>
          <el-col :span="13">
            <el-select placeholder="请选择学期" v-model="setform.xq">
                <!--
                  <el-option label="2013-2014冬季" value="2013-2014冬季"></el-option>
                  <el-option label="2013-2014秋季" value="2013-2014秋季"></el-option>
                  <el-option label="2012-2013冬季" value="2012-2013冬季"></el-option>
                  <el-option label="2012-2013秋季" value="2012-2013秋季"></el-option>
                  <el-option label="2018-2019冬季" value="2018-2019冬季"></el-option>
                -->
                <el-option label="2020-2021冬季" value="2020-2021冬季"></el-option>
                <el-option label="2020-2021秋季" value="2020-2021秋季"></el-option>
                <el-option label="2019-2020冬季" value="2019-2020冬季"></el-option>
                <el-option label="2019-2020秋季" value="2019-2020秋季"></el-option>
                <el-option label="2018-2019冬季" value="2018-2019冬季"></el-option>
            </el-select>
          </el-col>
          <el-col :span="5">
            <el-button type="primary" @click="set">提交</el-button>
          </el-col>
        </el-form-item>
    </el-form>
  </el-row>
</el-card>
</div>
</template>

<script>
export default {
  name: 'CManager',
  data () {
    return {
      List: [],
      xq: [],
      queryinfo: {
        query: ''
      },
      setform: {
        xq: ''
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
      this.$http.get('/api/course/selectxq',
        { params: this.queryinfo })
    console.log(res)
      var xq = JSON.stringify(res)
      this.setform.xq = xq.slice(15,26)
    },
    // 按查询当前学期
    async set () {
      var xq = this.setform.xq
      const { data: res } = await 
      this.$http.post('/api/course/updatecurrent?currentxq=' + xq)
      this.$message.success('设置成功！')
      this.getList()
    }
  }
}
</script>

<style>
.el-table{
  margin-top: 15px;
}
</style>