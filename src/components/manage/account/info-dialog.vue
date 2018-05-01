<template>
  <el-dialog 
    title="个人信息" 
    :visible="visible"
    @close="closeDialog">
    <el-form 
      v-model="dialogData" 
      label-width="100px"
      label-suffix="：">
      <el-form-item label="邮箱">
        <el-input v-model="dialogData.email"></el-input>
      </el-form-item>
      <el-form-item label="手机">
        <el-input>{{ dialogData.phone }}</el-input>
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
    return {
      
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
