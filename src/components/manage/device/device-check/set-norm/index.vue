<template>
  <el-form
    label-width="80px"
    :rules="rules"
    ref="normDom"
    :model="data">
    <check-header>定标准</check-header>
    <row-layout :span="16">
      <el-form-item prop="norm" label="标准">
        <el-input v-model="data.norm"></el-input>
      </el-form-item>
    </row-layout>
    <row-layout :column="3">
      <el-form-item slot="left" prop="unit" label="数据单位">
        <el-input v-model="data.unit"></el-input>
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
      rules: {
        norm: [
          { required: true, message: '请输入点检标准', trigger: 'blur' }
        ],
        unit: [
          { required: true, message: '请输入标准的数据单位', trigger: 'blur' }
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
      if (oldVal === 1) {
        this.$emit('dispatch', this.data, this.$refs.normDom)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.form-label {
  display: inline-block;
}

</style>

