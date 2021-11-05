<template>
  <el-container style="height: 150vh;">
    <!--首页头部-->
    <el-header style=
    "text-align: center; font-size: 20px; height: 10vh">
      <span>选课管理系统</span>
      <el-button type="primary" size="small" plain @click="logout">退出</el-button>
    </el-header>
  <el-container>
  <!--左侧菜单-->
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu router  :default-active="$route.path">
      <el-menu-item index="/categories/student">
        <template slot="title"><i class="el-icon-user"></i>学生管理</template>
      </el-menu-item>
      <el-menu-item index="/categories/teacher">
        <template slot="title"><i class="el-icon-s-custom"></i>教师管理</template>
      </el-menu-item>
      <el-menu-item index="/categories/department">
        <template slot="title"><i class="el-icon-office-building"></i>院系管理</template>
      </el-menu-item>
      <el-submenu index="1">
    <template slot="title"><i class="el-icon-s-management"></i>课程管理</template>
      <el-menu-item index="/categories/course1">
        <template slot="title"><i class="el-icon-reading"></i>所有课程</template>
      </el-menu-item>
      <el-menu-item index="/categories/course2">
        <template slot="title"><i class="el-icon-menu"></i>开课信息</template>
      </el-menu-item>
      <el-menu-item index="/categories/currentxq">
        <template slot="title"><i class="el-icon-star-off"></i>当前学期</template>
      </el-menu-item>
    </el-submenu>
    <el-menu-item index="/categories/scorechange">
        <template slot="title"><i class="el-icon-s-help"></i>绩点换算</template>
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
import welcome from './Welcome'
export default {
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  },
  components: {
    welcome: welcome
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
