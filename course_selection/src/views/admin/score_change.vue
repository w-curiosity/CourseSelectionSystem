<template>
<div>
<el-card>
    <h3>请设置分数绩点换算：</h3>
    <el-divider content-position="right">更改分数段请保持分数连续</el-divider>
  <!--第1行-->
  <el-row type="flex" justify="left" :gutter="20">
    <el-col :span="8">
      <el-input placeholder="分数段1" v-model="scoreform.range1"
       class=range></el-input>
    </el-col>
    <el-col :span="8">
      <el-input placeholder="绩点1" v-model="scoreform.score1"
       class=score></el-input>
    </el-col>
    <el-col :span="8">
      <el-input placeholder="分数段2" v-model="scoreform.range2"
       class=range></el-input>
    </el-col>
    <el-col :span="8">
      <el-input placeholder="绩点2" v-model="scoreform.score2"
       class=score></el-input>
    </el-col>
    </el-row>
    <!--第2行-->
  <el-row type="flex" justify="left" :gutter="20">
    <el-col :span="8">
      <el-input placeholder="分数段3" v-model="scoreform.range3"
       class=range></el-input>
    </el-col>
    <el-col :span="8">
      <el-input placeholder="绩点3" v-model="scoreform.score3"
       class=score></el-input>
    </el-col>
    <el-col :span="8">
      <el-input placeholder="分数段4" v-model="scoreform.range4"
       class=range></el-input>
    </el-col>
    <el-col :span="8">
      <el-input placeholder="绩点4" v-model="scoreform.score4"
       class=score></el-input>
    </el-col>
    </el-row>
    <!--第3行-->
  <el-row type="flex" justify="left" :gutter="20">
    <el-col :span="8">
      <el-input placeholder="分数段5" v-model="scoreform.range5"
       class=range></el-input>
    </el-col>
    <el-col :span="8">
      <el-input placeholder="绩点5" v-model="scoreform.score5"
       class=score></el-input>
    </el-col>
    <el-col :span="8">
      <el-input placeholder="分数段6" v-model="scoreform.range6"
       class=range></el-input>
    </el-col>
    <el-col :span="8">
      <el-input placeholder="绩点6" v-model="scoreform.score6"
       class=score></el-input>
    </el-col>
    </el-row>
    <!--第4行-->
  <el-row type="flex" justify="left" :gutter="20">
    <el-col :span="8">
      <el-input placeholder="分数段7" v-model="scoreform.range7"
       class=range></el-input>
    </el-col>
    <el-col :span="8">
      <el-input placeholder="绩点7" v-model="scoreform.score7"
       class=score></el-input>
    </el-col>
    <el-col :span="8">
      <el-input placeholder="分数段8" v-model="scoreform.range8"
       class=range></el-input>
    </el-col>
    <el-col :span="8">
      <el-input placeholder="绩点8" v-model="scoreform.score8"
       class=score></el-input>
    </el-col>
    </el-row>
    <!--第5行-->
  <el-row type="flex" justify="left" :gutter="20">
    <el-col :span="8">
      <el-input placeholder="分数段9" v-model="scoreform.range9"
       class=range></el-input>
    </el-col>
    <el-col :span="8">
      <el-input placeholder="绩点9" v-model="scoreform.score9"
       class=score></el-input>
    </el-col>
    <el-col :span="8">
      <el-input placeholder="分数段10" v-model="scoreform.range10"
       class=range></el-input>
    </el-col>
    <el-col :span="8">
      <el-input placeholder="绩点10" v-model="scoreform.score10"
       class=score></el-input>
    </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-form>
  <el-form-item class="button">
          <el-button type="primary" 
          @click="submit">确认</el-button>
          <el-button @click="getscoreList">重置</el-button>
        </el-form-item>
  </el-form>
</el-card>
</div>
</template>

<script>
export default {
  data () {
    return {
      scoreList: [],
      xq: [],
      queryinfo: {
        query: ''
      },
      scoreform: {
        range1: '', range2: '', range3: '', range4: '', range5: '',
        range6: '', range7: '', range8: '', range9: '', range10: '',
        score1: '', score2: '', score3: '', score4: '', score5: '',
        score6: '', score7: '', score8: '', score9: '', score10: '',
      }
    }
  },
  created () {
    this.getscoreList()
  },
  methods: {
    // 获取换算信息
    async getscoreList () {
      const { data: res } = await 
      this.$http.get('/api/score/showscore',
        { params: this.queryinfo })
      var data = JSON.stringify(res)
      console.log(data)
      // 分数段
      this.scoreform.range1 = data.slice(27,31)
      this.scoreform.range2 = data.slice(124,129)
      this.scoreform.range3 = data.slice(172,177)
      this.scoreform.range4 = data.slice(220,225)
      this.scoreform.range5 = data.slice(268,273)
      this.scoreform.range6 = data.slice(316,321)
      this.scoreform.range7 = data.slice(364,369)
      this.scoreform.range8 = data.slice(412,417)
      this.scoreform.range9 = data.slice(460,465)
      this.scoreform.range10 = data.slice(75,81)
      // 绩点
      this.scoreform.score1 = data.slice(42,45)
      this.scoreform.score2 = data.slice(140,143)
      this.scoreform.score3 = data.slice(188,191)
      this.scoreform.score4 = data.slice(236,239)
      this.scoreform.score5 = data.slice(284,287)
      this.scoreform.score6 = data.slice(332,335)
      this.scoreform.score7 = data.slice(380,383)
      this.scoreform.score8 = data.slice(428,431)
      this.scoreform.score9 = data.slice(476,479)
      this.scoreform.score10 = data.slice(92,95)
    },
    // 删除数据
    async submit () {
      // 弹框
      const confirmResult = await this.$confirm('是否确定更改绩点换算规则?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).catch(err => err)
      if(confirmResult == 'cancel' ){
        return this.$message.info('已取消修改')
        this.getscoreList ()
      }
      this.$http.post('/api/score/updatescore?'+ 
        'scorerange='+ this.scoreform.range1 + '&' +
        'score='+ this.scoreform.score1 + '&' +
        'scno=1')
      this.$http.post('/api/score/updatescore?'+ 
        'scorerange='+ this.scoreform.range2 + '&' +
        'score='+ this.scoreform.score2 + '&' +
        'scno=2')
      this.$http.post('/api/score/updatescore?'+ 
        'scorerange='+ this.scoreform.range3 + '&' +
        'score='+ this.scoreform.score3 + '&' +
        'scno=3')
      this.$http.post('/api/score/updatescore?'+ 
        'scorerange='+ this.scoreform.range4 + '&' +
        'score='+ this.scoreform.score4 + '&' +
        'scno=4')
      this.$http.post('/api/score/updatescore?'+ 
        'scorerange='+ this.scoreform.range5 + '&' +
        'score='+ this.scoreform.score5 + '&' +
        'scno=5')
      this.$http.post('/api/score/updatescore?'+ 
        'scorerange='+ this.scoreform.range6 + '&' +
        'score='+ this.scoreform.score6 + '&' +
        'scno=6')
      this.$http.post('/api/score/updatescore?'+ 
        'scorerange='+ this.scoreform.range7 + '&' +
        'score='+ this.scoreform.score7 + '&' +
        'scno=7')
      this.$http.post('/api/score/updatescore?'+ 
        'scorerange='+ this.scoreform.range8 + '&' +
        'score='+ this.scoreform.score8 + '&' +
        'scno=8')
      this.$http.post('/api/score/updatescore?'+ 
        'scorerange='+ this.scoreform.range9 + '&' +
        'score='+ this.scoreform.score9 + '&' +
        'scno=9')
      this.$http.post('/api/score/updatescore?'+ 
        'scorerange='+ this.scoreform.range10 + '&' +
        'score='+ this.scoreform.score10 + '&' +
        'scno=10')
      this.$message.success('修改成功！')
      this.getscoreList ()
      this.getscoreList ()
      console.log(1)
    }
  }
}
</script>

<style>
.el-table{
  margin-top: 15px;
}
.el-row {
  margin-bottom: 20px;
}
.range input.el-input__inner {
    border-radius:20px;
    background-color: RGB(154,191,229,0.2);
}
.score input.el-input__inner {
    border-radius:20px;
}
</style>