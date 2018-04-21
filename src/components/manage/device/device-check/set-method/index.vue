<template>
  <el-form
    label-width="80px"
    :rules="rules"
    ref="methodDom"
    :model="data">
    <check-header>定方法</check-header>
    <row-layout :span="16">
      <el-form-item prop="tool" label="使用工具">
        <el-input v-model="data.tool"></el-input>
      </el-form-item>
    </row-layout>
    <row-layout :span="16">
      <el-form-item prop="method" label="具体方法">
        <el-input type="textarea" :rows="2" v-model="data.method"></el-input>
      </el-form-item>
    </row-layout>
  </el-form>
</template>

<script>
export default {
  props: {
    step: {
      type: Number
    },
    data: {
      type: Object
    }
  },
  data () {
    return {
      isVisible: false,
      editIndex: 0,
      rules: {
        method: [
          { required: true, message: '请输入具体方法', trigger: 'blur' }
        ],
        tool: [
          { required: true, message: '请输入使用工具', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {

  },
  methods: {

  },
  watch: {
    step (curVal, oldVal) {
      if (oldVal === 2) {
        this.$emit('dispatch', this.data, this.$refs.methodDom)
      }
    }
  }
}
</script>

<style>

</style>
