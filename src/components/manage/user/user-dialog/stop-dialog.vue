<template>
  <el-dialog
    title="提示"
    :visible.sync="dialogStopVisible"
    @close="closeDialog"
    width="30%">
    <span>封停用户之后，用户将在15天内无法登录平台，是否继续？</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialogStopVisible: {
      type: Boolean
    },
    userId: {
      type: Number
    }
  },
  methods: {
    closeDialog () {
      this.$emit('closeStopDialog', 0)
    },
    confirm () {
      this.$http({
        method: 'post',
        url: '/api/user/stopUse.do',
        data: {
          user_id: this.userId
        }
      }).then((result) => {
        this.disabled = true
        this.$emit('closeStopDialog', 1)
        this.$message({
          type: 'success',
          message: '封停用户成功'
        })
      })
    }
  }
}
</script>

<style>

</style>
