<template>
  <el-dialog title="评分" :visible="visible" @close="closeDialog">
    <el-form :model="scoreData" label-width="80px">
      <el-form-item label="姓名：">
        <span>{{ scoreData.name }}</span>
      </el-form-item>
      <el-form-item label="性别：">
        <span>{{ scoreData.sex }}</span>
      </el-form-item>
      <el-form-item label="职位：">
        <span>{{ scoreData.job }}</span>
      </el-form-item>
      <el-form-item label="月份：">
        <span>{{ scoreData.decideDate }}</span>
      </el-form-item>
      <el-form-item label="分数：">
        <el-input style="width: 50%" v-model="scoreData.score" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="decideScore">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    visible: {
      type: Boolean
    }
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapState('score-data', [
      'scoreData'
    ])
  },
  methods: {
    closeDialog () {
      this.$emit('closeScoreDialog')
    },
    decideScore () {
      this.$emit('closeScoreDialog')
      this.$message({
        message: '评分成功',
        type: 'success'
      })
    }
  }
}
</script>

<style>

</style>
