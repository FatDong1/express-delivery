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
    }
  },
  methods: {
    closeDialog () {
      this.$emit('closeStopDialog')
    },
    confirm () {
      
    }
  }
}
</script>

<style>

</style>
