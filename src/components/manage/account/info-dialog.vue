<template>
  <el-dialog 
    title="个人信息" 
    :visible="visible"
    @close="closeDialog">
    <el-form 
      v-model="dialogData" 
      label-width="100px"
      label-suffix="："
      :rules="rule" status-icon ref="accountForm">
      <el-form-item label="邮箱">
        <el-input v-model="dialogData.email"></el-input>
      </el-form-item>
      <el-form-item label="手机">
        <el-input>{{ dialogData.phone }}</el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input>{{ dialogData.pass }}</el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input>{{ dialogData.checkPass }}</el-input>
      </el-form-item>
      <el-form-item label="个性签名">
        <el-input>{{ dialogData.special }}</el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    visible: {
      type: Boolean
    },
    infoData: {
      type: Object
    }
  },
  data () {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.dialogData.checkPass !== '') {
          this.$refs.accountForm.validateField('checkPass')
        }
        callback()
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.dialogData.pass) {
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
      }
    }
  },
  computed: {
    dialogData () {
      let obj = {
        pass: '',
        special: this.infoData.special,
        email:  this.infoData.special.email,
        phone:  this.infoData.special.phone,
        checkPass: ''
      }
      return obj
    }
  },
  methods: {
    closeDialog () {
      this.$emit('closeInfoDialog')
    },
    confirm () {
      this.$emit('closeInfoDialog')
      this.$message({
        type: 'success',
        message: '修改成功'
      })
    }
  }
}
</script>

<style>
.el-form-item__label {
  text-align: left;
}
</style>
