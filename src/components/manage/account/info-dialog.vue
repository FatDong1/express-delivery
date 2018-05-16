<template>
  <el-dialog 
    title="个人信息" 
    :visible="visible"
    v-loading="loading"
    @close="closeDialog">
    <el-form 
      v-model="dialogData" 
      label-width="100px"
      label-suffix="：">
      <el-form-item label="邮箱">
        <el-input v-model="dialogData.email"></el-input>
      </el-form-item>
      <el-form-item label="手机">
        <el-input v-model="dialogData.phone"></el-input>
      </el-form-item>
      <el-form-item label="个性签名">
        <el-input v-model="dialogData.special"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
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
    return {
      loading: false
    }
  },
  computed: {
    dialogData () {
      let obj = {
        pass: '',
        special: this.infoData.introduce,
        email:  this.infoData.email,
        phone:  this.infoData.phone,
        checkPass: ''
      }
      console.log(123, this.infoData)
      return obj
    }
  },
  methods: {
    ...mapMutations([
      'updatePartUser'
    ]),
    closeDialog () {
      this.$emit('closeInfoDialog')
    },
    confirm () {
      let user = JSON.parse(sessionStorage.getItem('user'))
      let data = {
        user_id: user.user_id,
        introduce: this.dialogData.special,
        email:  this.dialogData.email,
        phone:  this.dialogData.phone,
      }
      this.loading = true
      this.$http({
        method: 'post',
        data: data,
        url: '/api/user/updateInfo.do'
      }).then((result) => {
        this.updatePartUser(data)
        user.email = this.dialogData.email
        user.phone = this.dialogData.phone
        user.introduce = this.dialogData.introduce
        sessionStorage.setItem('user', JSON.stringify(user))
        this.loading = false
        this.$emit('closeInfoDialog', data)
        this.$message({
          type: 'success',
          message: '修改成功'
        })
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
