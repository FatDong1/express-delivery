<template>
  <div class="login">
    <p class="login__title">设备点检系统</p>
    <el-form ref="form" :model="form" label-width="50px">
      <el-form-item label="账号">
        <el-input v-model="form.account"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="form.password" @keyup.enter.native="signIn"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          class="sign-btn"
          :disabled="form.disabled"
          @click="signIn">{{ buttonText }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      buttonText: '登录',
      form: {
        account: '',
        password: '',
        disabled: false
      }
    }
  },
  methods: {
    ...mapMutations([
      'updateFlag'
    ]),
    signIn () {
      if (!this.form.account) {
        this.$message({
          type: 'warning',
          message: '账号不能为空!'
        })
      } else if (!this.form.password) {
        this.$message({
          type: 'warning',
          message: '密码不能为空!'
        })
      }
      this.buttonText = '正在登录中......'
      this.form.disabled = true
      this.$http({
        method: 'post',
        data: this.form,
        url: '/api/login'
      }).then((result) => {
        let flag = result.value[0].isAdmin === 0 ? false : true
        let obj = {
          id: result.value[0].id,
          name: result.value[0].name,
          isAdmin: result.value[0].isAdmin,
          account: result.value[0].account,
          factory: result.value[0].factory,
          plant: result.value[0].plant
        }
        sessionStorage.setItem('user', JSON.stringify(obj))
        this.updateFlag(flag)
        this.buttonText = '登录成功'
        this.$router.push({name: 'home'})
      }).catch((error) => {
        this.buttonText = '登录'
        this.form.disabled = false
        this.$message({
          type: 'error',
          message: error.msg
        })
      })
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

.sign-btn {
  width: 100%;
}
</style>
