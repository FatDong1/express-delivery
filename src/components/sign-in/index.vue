<template>
  <div class="login">
    <p class="login__title">快递帮拿服务平台</p>
    <el-form ref="signDom" :model="form" :rules="rule" label-width="70px" status-icon>
      <el-form-item label="账号">
        <el-input v-model="form.account"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="手机">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="form.pass" ></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input type="password" v-model="form.checkPassword"></el-input>
      </el-form-item>
      <el-form-item label="验证码">
        <el-input v-model="form.check"></el-input>
      </el-form-item>
      <el-form-item>
        <row-layout :column="2">
        <el-button
          type="primary"
          slot="left"
          :disabled="form.disabled"
          @click="back">返回</el-button>
        <el-button
          type="primary"
          slot="right"
          class="sign-btn"
          :disabled="form.disabled"
          @click="confirm">确定</el-button>
        </row-layout>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.form.checkPass !== '') {
          this.$refs.signDom.validateField('checkPass')
        }
        callback()
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      rule: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      form: {
        account: '',
        pass: '',
        email: '',
        phone: '',
        checkPass: '',
        check: '',
        name: '',
        disabled: false
      }
    }
  },
  methods: {
    ...mapMutations([
      'updateFlag'
    ]),
    back () {
      this.$router.push({name: 'login'})
    },
    confirm () {
      let obj = {
        name: "小明"
      }
      sessionStorage.setItem('user', JSON.stringify(obj))
      this.$router.push({name: 'home'})      
    }
    // signIn () {
    //   if (!this.form.account) {
    //     this.$message({
    //       type: 'warning',
    //       message: '账号不能为空!'
    //     })
    //   } else if (!this.form.password) {
    //     this.$message({
    //       type: 'warning',
    //       message: '密码不能为空!'
    //     })
    //   }
    //   this.buttonText = '正在登录中......'
    //   this.form.disabled = true
    //   this.$http({
    //     method: 'post',
    //     data: this.form,
    //     url: '/api/login'
    //   }).then((result) => {
    //     let flag = result.value[0].isAdmin === 0 ? false : true
    //     let obj = {
    //       id: result.value[0].id,
    //       name: result.value[0].name,
    //       isAdmin: result.value[0].isAdmin,
    //       account: result.value[0].account,
    //       factory: result.value[0].factory,
    //       plant: result.value[0].plant
    //     }
    //     sessionStorage.setItem('user', JSON.stringify(obj))
    //     this.updateFlag(flag)
    //     this.buttonText = '登录成功'
    //     this.$router.push({name: 'home'})
    //   }).catch((error) => {
    //     this.buttonText = '登录'
    //     this.form.disabled = false
    //     this.$message({
    //       type: 'error',
    //       message: error.msg
    //     })
    //   })
    // }
  }
}
</script>

<style>
.login {
  width: 300px;
  text-align: center;
}

.login__title {
  font-size: 28px;
  color: #878D99;
  margin-bottom: 40px;
}

</style>
