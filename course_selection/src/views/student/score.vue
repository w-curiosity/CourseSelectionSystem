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
    <el-table-column prop="gh" label="工号" width="70"></el-table-column>
    <el-table-column prop="xf" label="学分" width="50"></el-table-column>
    <el-table-column prop="xq" label="学期" width="150"></el-table-column>
    <el-table-column prop="zpcj" label="总评成绩" width="100"></el-table-column>
  </el-table>
  <el-divider></el-divider>
  <div id="myChart":style="{width: '600px', height: '300px'}"></div>
</el-card>
  </div>
</template>

<script>
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  name: 'CManager',
  data () {
    return {
      queryinfo: {
        query: ''
      },
      List: [],
      score: [],
      couresname: [],
      myChart: {}
    }
  },
  created () {
    this.getList()
  },
  mounted(){
    this.visiualization();
  },
  methods: {
    // 表格部分
    async getList () {
      var xh = window.sessionStorage.getItem('id')
      const { data: res } = await 
      this.$http.get('/api/course/showe1?xh=' + xh,
        { params: this.queryinfo })
      this.List = res
    },
    // 总评成绩可视化
    async visiualization () {
      // 先获取数据
      var xh = window.sessionStorage.getItem('id')
      const { data: res } = await 
      this.$http.get('/api/course/showe1?xh=' + xh,
        { params: this.queryinfo })
      // 从数组中取出总评成绩和课名并转成字符串
      var zpcj = []
      var km = []
      res.map((item) => {zpcj += item.zpcj+","})
      res.map((item) => {km += item.km+","})
      // 将字符串再赋值给新的数组（可视化的数据）
      zpcj = zpcj.substring(0, zpcj.length -1)
      km = km.substring(0, km.length -1)
      this.score = zpcj.split(",")
      this.couresname = km.split(",")
      // 初始化echarts图表
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 设置格式+放入数据
      myChart.setOption({
        title: {
          text: '总评成绩柱状图',
          textStyle: {
          color: '#696969',
          fontSize: 20
        } },
        tooltip: {},
        xAxis: {
          nameTextStyle: {
            color: '#696969',
            fontSize: 16
          },
          data: this.couresname,
          splitLine: {
          show: false
          },
          axisLine: {
          lineStyle: {
            color: '#696969'
          }
        }
        },
        yAxis: {
          max: 100,
          nameTextStyle: {
            color: '#696969',
            fontSize: 20
          },
          axisLine: {
            lineStyle: {
              color: '#696969'
            }
          },
          splitLine: {
            show: true
          }
        },
        
        series: [{
          name: '总评成绩',
          type: 'bar',
          data: this.score,
          barWidth: 30,
          barGap: 0,
          showBackground: false,
          backgroundStyle: {
            color: 'rgba(22, 220, 220, 0.8)'
          },
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(100,149,237,1)'
              },
              {
                offset: 1,
                color: 'rgba(100,149,237,0.5)'
              }
              ]),
              // 柱状图圆角
              barBorderRadius: [30, 30, 0, 0]
            }
          }
        }]
      });
    }
  }
}
</script>

<style>
.el-table{
  margin-top: 15px;
}
.setform input.el-input__inner {
  border-color: white;
  background-color:white;
}
</style>
