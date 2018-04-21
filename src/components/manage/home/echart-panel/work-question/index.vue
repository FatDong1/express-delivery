<template>
  <div class="echart-question">
    <div class="echart-dom" ref="echartQuestion"></div>
  </div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
import chartOptions from 'shared@/echart/options/dealQuestion.js'
export default {
  data () {
    return {
      echartsDom: null,
      echartOptions: Object.assign({}, chartOptions),
    }
  },
  methods: {
    // 初始化图表
    initChart () {
      this.echartsDom = echarts.init(this.$refs.echartQuestion)
      this.$nextTick(() => {
        this.echartsDom.setOption(this.echartOptions)
      })
    }
  },
  mounted () {
    this.initChart()
  }
}
</script>

<style>
.echart-question {
  display: inline-block;
  background: #fff;
  width: 480px;
  height: 250px;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}
.echart-dom {
  display: inline-block;
  width: 100%;
  height: 250px;
}
/* .echart-content {
  font-size: 16px;
  color: #606266;
  font-weight: 400;
} */
</style>
