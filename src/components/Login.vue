<template>
  <body id="back">
  <el-form class="container">
    <h4 class="title">用户登录</h4>
    <el-form-item>
      <el-input type="text" v-model="loginForm.username" placeholder="用户名"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="password" v-model="loginForm.password" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" v-on:click="login">登录</el-button>
      <el-button v-on:click="register">注册</el-button>
    </el-form-item>
  </el-form>
  </body>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      var _this = this
      if (this.loginForm.username === '' || this.loginForm.password === '') {
        this.$message({
          message: '用户名或密码不能为空！',
          type: 'error'
        })
      } else {
        this.$axios
          .post('/login', {
            username: this.loginForm.username,
            password: this.loginForm.password
          })
          .then(resp => {
            if (resp && resp.status === 200) {
              _this.$store.commit('login', resp.data)
              var path = this.$route.query.redirect
              this.$router.replace({
                path: path === '/' || path === undefined ? '/index' : path
              })
            } else {
              this.$message.error('用户名或密码错误！')
            }
          })
          .catch(failResponse => {})
      }
    },
    register () {
      this.$router.replace({
        path: '/register'
      })
    }
  }
}
</script>

<style scoped>
@import "../assets/css/loginregister.css";
</style>
