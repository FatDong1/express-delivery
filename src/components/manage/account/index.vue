<template>
  <view-container>
    <view-header>修改密码</view-header>
    <el-form class="account-form" :rules="rule" status-icon ref="accountForm" label-suffix="：" :model="accountForm" label-width="80px" center>
      <el-form-item label="姓名" prop="name">
        <span>{{accountForm.name}}</span>
      </el-form-item>
      <el-form-item label="账户" prop="account">
        <span>{{accountForm.account}}</span>
      </el-form-item>
      <el-form-item label="所属工厂" prop="factory">
        <span>{{accountForm.factory}}</span>
      </el-form-item>
      <el-form-item label="所属车间" prop="plant">
        <span>{{accountForm.plant}}</span>
      </el-form-item>
      <el-form-item label="新密码" prop="pass">
        <el-input type="password" v-model="accountForm.pass"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="accountForm.checkPass"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </view-container>
</template>

<script>
export default {
  data () {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.accountForm.checkPass !== '') {
          this.$refs.accountForm.validateField('checkPass')
        }
        callback()
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.accountForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    let result = JSON.parse(sessionStorage.getItem('user'))  
    return {
      accountForm: {
        name: result.name,
        pass: '',
        factory: result.factory,
        plant: result.plant,
        checkPass: '',
        account: result.account
      },
      rule: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit () {
      if (!this.accountForm.pass) {
        this.$message({
          type: 'error',
          message: '请输入密码'
        })
      }
      this.$http({
        method: 'post',
        url: '/api/user',
        data: {
          account: this.accountForm.account,
          password: this.accountForm.pass
        }
      }).then((result) => {
        this.$message({
          type: 'success',
          message: result.msg
        })
        this.accountForm.pass = ''
        this.accountForm.checkPass = ''        
      }).catch((error) => {
        this.$message({
          type: 'error',
          message: result.msg
        })
      })
    }
  }
}
</script>

<style>
.account-form {
  width: 30%;
  margin: 10px 0;
  padding: 10px;
}
</style>
