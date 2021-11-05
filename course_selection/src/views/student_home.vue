<template>
  <el-container style="height: 150vh;">
    <!--首页头部-->
    <el-header style=
    "text-align: center; font-size: 20px; height: 10vh">
      <el-col :span="1" style="text-align: right; font-size: 12px; ">
      <span>学号：</span>
    </el-col>
    <el-col :span="2">
      <el-input v-model="xh" class=login readonly></el-input>
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
  <!--左侧菜单-->
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu router  :default-active="$route.path">

      <el-menu-item index="/categories/C_student">
        <template slot="title"><i class="el-icon-notebook-2"></i>课程查询</template>
      </el-menu-item>
      <el-menu-item index="/categories/table">
        <template slot="title"><i class="el-icon-date"></i>课表</template>
      </el-menu-item>
      <el-submenu index="1">
    <template slot="title"><i class="el-icon-s-management"></i>课程管理</template>
      <el-menu-item index="/categories/choice">
        <template slot="title"><i class="el-icon-circle-plus-outline"></i>选课</template>
      </el-menu-item>
      <el-menu-item index="/categories/quit">
        <template slot="title"><i class="el-icon-remove-outline"></i>退课</template>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="2">
    <template slot="title"><i class="el-icon-menu"></i>学分完成情况</template>
      <el-menu-item index="/categories/score">
        <template slot="title"><i class="el-icon-tickets"></i>成绩表</template>
      </el-menu-item>
      <el-menu-item index="/categories/todolist">
        <template slot="title"><i class="el-icon-more-outline"></i>未完成课程</template>
      </el-menu-item>
    </el-submenu>
    
    <el-menu-item index="/categories/student_info">
      <template slot="title"><i class="el-icon-user"></i>个人信息修改</template>
    </el-menu-item>

    </el-menu>
  </el-aside>
  <!--内容主体-->
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
      xh: [],
      xm: []
    }
  },
  created () {
    this.getuser()
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getuser () {
      var xh = window.sessionStorage.getItem('id')
      this.xh = xh
      const { data: res } = await 
      this.$http.get('/api/user/selectstu?xh=' + xh)
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
    background-color: #9abfe5;
    color: white;
    line-height: 60px;
    display: flex; 
    justify-content: space-between;
    align-items: center;
  }
  .el-aside {
    color: #333;
  }
</style>
