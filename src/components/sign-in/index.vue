<template>
  <div class="login">
    <p class="login__title">快递帮拿服务平台</p>
    <el-form ref="signDom" :model="form" :rules="rule" label-width="70px" status-icon>
      <el-form-item label="账号" prop="account">
        <el-input v-model="form.account"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio v-model="form.sex" :label="1">男</el-radio>
        <el-radio v-model="form.sex" :label="2">女</el-radio>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password" ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="form.checkPass"></el-input>
      </el-form-item>
      <!-- <el-form-item label="验证码">
        <el-input v-model="form.check"></el-input>
      </el-form-item> -->
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
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      rule: {
        account: [
          { required: true, message: '请输入使用的账号', trigger: 'blur' },
        ],
        name: [
          { required: true, message: '请输入您的姓名', trigger: 'blur' },
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'blur' },
        ],
        email: [
          { required: true, message: '请输入注册的邮箱', trigger: 'blur' },
        ],
        phone: [
          { required: true, message: '请输入注册的手机号码', trigger: 'blur' },
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      form: {
        account: '',
        password: '',
        sex: '',
        email: '',
        phone: '',
        checkPass: '',
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
      // this.$router.push({name: 'home'})   
      this.$refs['signDom'].validate((valid) => {
        if (valid) {
          this.$http({
            method: 'post',
            data: this.form,
            url: '/api/user/add.do'
          }).then((result) => {
            this.$router.push({name: 'login'})   
          })
        }
      })
    }
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
