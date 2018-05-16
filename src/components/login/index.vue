<template>
  <div class="login">
    <p class="login__title">快递帮拿服务平台</p>
    <el-form ref="form" :model="form" label-width="70px" v-loading="loading">
      <el-form-item label="账号" prop="account">
        <el-input v-model="form.account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <!-- <el-form-item label="验证码">
        <el-input type="check" v-model="form.check"></el-input>
      </el-form-item> -->
      <el-form-item>
        <row-layout :column="2">
        <el-button
          type="primary"
          slot="left"
          :disabled="form.disabled"
          @click="signIn">注册</el-button>
        <el-button
          type="primary"
          slot="right"
          class="sign-btn"
          :disabled="form.disabled"
          @click="logIn">登录</el-button>
        </row-layout>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      loading: false,
      form: {
        account: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapMutations([
      'updateFlag',
      'updateUserData'
    ]),
    logIn () {
      if (!this.form.account) {
        this.$message({
          type: 'warning',
          message: '账号不能为空!'
        })
        return
      } else if (!this.form.password) {
        this.$message({
          type: 'warning',
          message: '密码不能为空!'
        })
        return
      }
      this.loading = true
      this.$http({
        method: 'post',
        data: this.form,
        url: '/api/user/login.do'
      }).then((result) => {
        this.loading = false
        sessionStorage.setItem('user', JSON.stringify(result))
        this.updateUserData(result)
        this.$router.push({name: 'home'})
      }).catch((err) => {
        this.loading = false        
        this.$message({
          type: 'error',
          message: err.msg
        })
      })
    },
    signIn () {
      this.$router.push({name: 'sign-in'})
    }
  }
}
</script>

<style>
.login {
  width: 300px;
  margin: 140px auto;
  text-align: center;
}

.login__title {
  font-size: 28px;
  color: #878D99;
  margin-bottom: 40px;
}

</style>
