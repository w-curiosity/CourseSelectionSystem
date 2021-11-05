import Vue from 'vue'
import VueRouter from 'vue-router'
import S_manager from '../views/admin/S_manager.vue'
import T_manager from '../views/admin/T_manager.vue'
import C_manager from '../views/admin/C_manager.vue'
import O_manager from '../views/admin/O_manager.vue'
import D_manager from '../views/admin/D_manager.vue'
import score_change from '../views/admin/score_change.vue'
import Login from '../views/Login.vue'
import Welcome from '../views/Welcome.vue'
import manager_home from '../views/manager_home.vue'
import teacher_home from '../views/teacher_home.vue'
import G_teacher from '../views/teacher/G_teacher.vue'
import C_teacher from '../views/teacher/C_teacher.vue'
import student_home from '../views/student_home.vue'
import C_student from '../views/student/C_student.vue'
import quit from '../views/student/quit.vue'
import choice from '../views/student/choice.vue'
import score from '../views/student/score.vue'
import todolist from '../views/student/todolist.vue'
import table from '../views/student/table.vue'
import table_teacher from '../views/teacher/table_teacher.vue'
import student_info from '../views/student/student_info.vue'
import teacher_info from '../views/teacher/teacher_info.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login'},
    { path: '/login', name: 'login', component: Login },
    {
      path: '/manager_home',
      //name: 'main',
      component: manager_home,
      //meta: { role: ['admin','super_editor'] }, //页面需要的权限
      children: [
        { path: '/categories/student', component: S_manager },
        { path: '/categories/teacher', component: T_manager },
        { path: '/categories/department', component: D_manager },
        { path: '/categories/course1', component: C_manager },
        { path: '/categories/course2', component: O_manager },
        { path: '/categories/currentxq', component: Welcome },
        { path: '/categories/scorechange', component: score_change },
      ]
    },
    {
      path: '/teacher_home',
      //name: 'main',
      component: teacher_home,
      //meta: { role: ['admin','super_editor'] }, //页面需要的权限
      children: [
        { path: '/categories/grade', component: G_teacher },
        { path: '/categories/tcourse', component: C_teacher },
        { path: '/categories/table_teacher', component: table_teacher },
        { path: '/categories/teacher_info', component: teacher_info},
      ]
    },
    {
      path: '/student_home',
      component: student_home,
      children: [
        { path: '/categories/C_student', component: C_student},
        { path: '/categories/quit', component: quit},
        { path: '/categories/choice', component: choice},
        { path: '/categories/score', component: score},
        { path: '/categories/todolist', component: todolist},
        { path: '/categories/table', component: table},
        { path: '/categories/student_info', component: student_info},
      ]
    }
  ]
})


//挂载路由导航守卫
router.beforeEach((to, from, next)=> {
  //访问登录，直接放行
  if(to.path === '/login') return next()
  //获取token
  const tokenStr = window.sessionStorage.getItem('token')
  //没有token跳转登录
  if(!tokenStr)return next('/login')
  //管理员页面
  if(to.path == '/manager_home' && tokenStr == '3') return next()
  if(to.path == '/categories/student' && tokenStr == '3') return next()
  if(to.path == '/categories/teacher' && tokenStr == '3') return next()
  if(to.path == '/categories/course1' && tokenStr == '3') return next()
  if(to.path == '/categories/course2' && tokenStr == '3') return next()
  if(to.path == '/categories/rights' && tokenStr == '3') return next()
  if(to.path == '/categories/roles' && tokenStr == '3') return next()
  if(to.path == '/categories/department' && tokenStr == '3') return next()
  if(to.path == '/categories/currentxq' && tokenStr == '3') return next()
  if(to.path == '/categories/scorechange' && tokenStr == '3') return next()

  //教师页面
  if(to.path == '/teacher_home' && tokenStr == '2') return next()
  if(to.path == '/categories/grade' && tokenStr == '2') return next()
  if(to.path == '/categories/tcourse' && tokenStr == '2') return next()
  if(to.path == '/categories/table_teacher' && tokenStr == '2') return next()
  if(to.path == '/categories/teacher_info' && tokenStr == '2') return next()

  //学生页面
  if(to.path == '/student_home' && tokenStr == '1')return next()
  if(to.path == '/categories/C_student' && tokenStr == '1')return next()
  if(to.path == '/categories/quit' && tokenStr == '1')return next()
  if(to.path == '/categories/choice' && tokenStr == '1')return next()
  if(to.path == '/categories/score' && tokenStr == '1')return next()
  if(to.path == '/categories/todolist' && tokenStr == '1')return next()
  if(to.path == '/categories/table' && tokenStr == '1')return next()
  if(to.path == '/categories/student_info' && tokenStr == '1')return next()
})

export default router
