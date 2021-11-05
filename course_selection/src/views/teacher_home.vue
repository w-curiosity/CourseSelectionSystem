<template>
    <el-container style="height: 150vh;">
    <el-header style="text-align: center; font-size: 20px; height: 10vh">
    <el-col :span="1" style="text-align: right; font-size: 12px; ">
      <span>工号：</span>
    </el-col>
    <el-col :span="2">
      <el-input v-model="gh" class=login readonly></el-input>
    </el-col>
    <el-col :span="1" style="text-align: right; font-size: 12px; ">
      <span>姓名：</span>
    </el-col>
    <el-col :span="2">
      <el-input v-model="xm" class=login readonly></el-input>
    </el-col>
    <el-col :span="20">
      <span>选课管理系统</span>
    </el-col>
      <el-button type="primary" size="small" plain @click="logout">退出</el-button>
    </el-header>
  <el-container>
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu router  :default-active="$route.path">
      <el-menu-item index="/categories/tcourse">
        <template slot="title"><i class="el-icon-menu"></i>课程列表</template>
      </el-menu-item>
      <el-menu-item index="/categories/grade">
        <template slot="title"><i class="el-icon-s-management"></i>成绩录入</template>
      </el-menu-item>
      <el-menu-item index="/categories/table_teacher">
        <template slot="title"><i class="el-icon-reading"></i>课表</template>
      </el-menu-item>
      <el-menu-item index="/categories/teacher_info">
      <template slot="title"><i class="el-icon-user"></i>个人信息修改</template>
      </el-menu-item>

    </el-menu>
  </el-aside>
  <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>
<script>
export default {
  data () {
    return {
      gh: [],
      xm: []
    }
  },
  created () {
    this.getuser()
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getuser () {
      var gh = window.sessionStorage.getItem('id')
      this.gh = gh
      const { data: res } = await 
      this.$http.get('/api/user/selectt?gh=' + gh)
      var xm = []
      res.map((item) => {xm += item.xm+","})
      xm = xm.substring(0, xm.length -1)
      this.xm = xm.split(",")
    }
  }
}
</script>
<style>
  .el-header {
    background-color: rgb(171, 199, 236);
    color: rgb(0, 0, 0);
    line-height: 60px;
  }
  .el-aside {
    color: #333;
  }
  .login input.el-input__inner {
    border-color: rgb(0,0,0,0);
    background-color: rgb(0,0,0,0);
    font-size: 12px;
    color: black;
    text-align: left;
  }
</style>
