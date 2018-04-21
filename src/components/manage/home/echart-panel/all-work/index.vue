<template>
  <div class="echart-container">
    <div class="echart-liquid" ref="companyContractTotal"></div>
    <p class="echart-content">今日点检任务完成进度</p>
  </div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
import chartOptions from 'shared@/echart/options/companyContractTotal'
export default {
  data () {
    return {
      companyContractTotalChart: null,
      companyContractTotalOptions: Object.assign({}, chartOptions),
    }
  },
  methods: {
    // 初始化图表
    initChart () {
      this.companyContractTotalChart = echarts.init(this.$refs.companyContractTotal)
      this.$nextTick(() => {
        this.companyContractTotalChart.setOption(this.companyContractTotalOptions)
      })
    }
  },
  mounted () {
    this.initChart()
  }
}
</script>

<style>
.echart-container {
  display: inline-block;
  background: #fff;
  width: 250px;
  height: 250px;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}
.echart-liquid {
  display: inline-block;
  width: 200px;
  height: 200px;
}
.echart-content {
  font-size: 16px;
  color: #606266;
  font-weight: 400;
}
</style>
