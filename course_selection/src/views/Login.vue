<template>
<div>
  <div class="login-container">
  <img :src="imgSrc" width="100%" height="100%" alt="" />
  </div>
  <div  class="login-card">
    <el-card header="选课管理系统">
      <el-form @submit.native.prevent="login" ref="loginRef" :rules="rules" :model="model" >
        <el-form-item prop = "username">
          <el-input type="text" placeholder="请输入用户名" prefix-icon="el-icon-user-solid"
          v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item prop = "password">
          <el-input type="password" placeholder="请输入密码" prefix-icon="el-icon-key"
          v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item class="button">
          <el-button type="primary" native-type="subumit">登录</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
        </el-form>
    </el-card>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      imgSrc: require('../assets/tju.png'),
      model: {
        username: '',
        password: ''
      },
      user:[],
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },

  methods: {
    // 登录
    async login () {
      const { data: res } = await
      this.$http.post('/api/user/login', this.model)
      console.log(res)
      //判定登录失败
      if(res=='0'){
        this.$message.error('登录失败！')
        reset ()
      }
      //数据绑定
      this.user = res
      //解构出用户权限和用户名
      var role_id = ''
      var user_id = ''
      this.user.map((item) => {
        role_id = item.role_id
        user_id = item.username
      })
      //将用户权限赋值token并绑定浏览器
      window.sessionStorage.setItem('token',role_id)
      //将用户id赋值id并绑定浏览器
      window.sessionStorage.setItem('id',user_id)
      this.$message.success('欢迎登陆选课系统！')
      //导航到首页
      if(role_id = '1')
      this.$router.push('/student_home')
      if(role_id = '2')
      this.$router.push('/teacher_home')
      if(role_id = '3')
      this.$router.push('/manager_home')
    },
    // 重置登录表单
    reset () {
      this.$refs.loginRef.resetFields()
    }
  }
}
</script>

<style scoped>
/**背景图片容器**/
.login-container{
    width:100%;
    height:100%;
    z-index:-1;
    position: absolute;
}
/**黑色蒙版**/
.login-container:after{
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    background-color: black;
    opacity: 0.5;
    z-index: 1;
    width: 100%;
    height: 100%;
}
/**登陆卡片**/
.login-card{
  width: 420px;
  height: 300px;
  border-radius: 5px;
  z-index:2;
  position: absolute;
  left: 50%;
  top:50%;
  transform: translate(-50%,-50%);
}
.button{
  display: flex;
  justify-content: flex-end;
}
</style>
