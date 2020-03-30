<template>
    <body id="back">
      <el-form class="container">
        <h4 class="title">用户注册</h4>
        <el-form-item>
          <el-input type="text" v-model="registerForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="password" v-model="registerForm.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-button type="primary" v-on:click="register">注册</el-button>
        <el-button v-on:click="login">登录</el-button>
      </el-form>
    </body>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      registerForm: {
        username: '',
        password: ''
      },
      responseResult: []
    }
  },
  methods: {
    register () {
      if (this.registerForm.password === '' || this.registerForm.username === '') {
        this.$message({
          message: '密码或用户名不能为空！',
          type: 'error'
        })
      } else {
        this.$axios
          .post('/register', {
            username: this.registerForm.username,
            password: this.registerForm.password
          })
          .then(Response => {
            if (Response.data.code === 200) {
              this.$message({
                message: '注册成功，即将返回登录页面！',
                type: 'success'
              })
              this.$router.replace({
                path: '/login'
              })
            } else if (Response.data.code === 500) {
              this.$message({
                message: '用户名已经被使用！',
                type: 'error'
              })
            } else if (Response.data.code === 300) {
              this.$message({
                message: '出现错误，请稍后再试！',
                type: 'error'
              })
            }
          })
          .catch(failResponse => {})
      }
    },
    login () {
      this.$router.replace({
        path: '/login'
      })
    }
  }
}
</script>

<style scoped>
@import "../assets/css/loginregister.css";
</style>
