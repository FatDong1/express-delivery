<template>
  <div class="echart-factory">
    <div class="echart-factory__dom" ref="echartFactory"></div>
  </div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
import chartOptions from 'shared@/echart/options/newBusiness.js'
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
      this.echartsDom = echarts.init(this.$refs.echartFactory)
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
.echart-factory {
  display: inline-block;
  background: #fff;
  width: 480px;
  height: 250px;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}
.echart-factory__dom {
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
