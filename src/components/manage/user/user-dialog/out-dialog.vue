<template>
  <el-dialog
    title="提示"
    :visible="dialogOutVisible"
    @close="closeDialog"
    width="30%">
    <span>注销用户之后，用户将无法登录平台，是否继续？</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="confirm" :disabled="disabled">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialogOutVisible: {
      type: Boolean
    },
    userId: {
      type: Number
    }
  },
  data () {
    return {
      disabled: false
    }
  },
  methods: {
    closeDialog () {
      this.$emit('closeOutDialog', 0)
    },
    confirm () {
      this.$http({
        method: 'post',
        url: '/api/user/out.do',
        data: {
          user_id: this.userId
        }
      }).then((result) => {
        this.disabled = true
        this.$emit('closeOutDialog', 1)
        this.$message({
          type: 'success',
          message: '注销用户成功'
        })
      })
    }
  }
}
</script>

<style>

</style>
