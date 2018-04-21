<template>
  <el-form
    label-width="80px"
    :rules="rules"
    ref="cycleDom"
    :model="data">
    <check-header>定周期</check-header>
    <row-layout :span="16">
      <el-form-item prop="startDate" label="开始日期">
        <el-date-picker
          v-model="data.startDate"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
    </row-layout>
    <row-layout :span="16">
      <el-form-item prop="cycle" label="点检周期">
        <el-select v-model="data.cycle" placeholder="请选择" @change="handleChange">
          <el-option
            v-for="item in options"
            :key="item.label"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
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
        cycle: [
          {  required: true, message: '请输入点检周期', trigger: 'blur'  }
        ],
        startDate: [
          { required: true, message: '请输入开始日期', trigger: 'blur' }
        ]
      },
      options: [{
        value: 1,
        label: '每天'
      }, {
        value: 7,
        label: '每周'
      }, {
        value: 30,
        label: '每月'
      }]
    }
  },
  computed: {

  },
  methods: {
    handleChange (value) {
      console.log(value)
    }
  },
  watch: {
    step (curVal, oldVal) {
      if (oldVal === 3) {
        this.$emit('dispatch', this.data, this.$refs.cycleDom)
      }
    }
  }
}
</script>

<style>

</style>
