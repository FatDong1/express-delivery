<template>
  <view-container>
    <view-header>{{ $route.params.state === 'view' ? '工单查看' : '工单录入' }}</view-header>
    <info-detail>
      <row-layout :column="column">
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="设备名称">
          {{ workData.name }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="工单状态">
          {{ workData.stage }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="column">
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="设备归属">
          {{ workData.factory }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="点检部位">
          {{ workData.checkPlace }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="1">
        <info-detail-item
          :label-width="labelWidth"
          label="点检内容">
          {{ workData.checkContent }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="1">
        <info-detail-item v-if="$route.params.state === 'edit'"
          :label-width="labelWidth"
          label="点检标准">
          <el-radio v-model="radio" label="1">备选项</el-radio>
          <el-radio v-model="radio" label="2">备选项</el-radio>
        </info-detail-item>
        <info-detail-item v-else
          :label-width="labelWidth"
          label="点检标准">
          点检标准
        </info-detail-item>
      </row-layout>
      <row-layout :column="1">
        <info-detail-item 
          v-if="$route.params.state === 'edit'"
          :label-width="labelWidth"
          label="备注">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="textarea">
          </el-input>
        </info-detail-item>
        <info-detail-item 
          v-else
          :label-width="labelWidth"
          label="备注">
          备注
        </info-detail-item>
      </row-layout>
      <row-layout :column="1">
        <info-detail-item
          :label-width="labelWidth"
          label="趋势图表">
          <div class="echart-dom" ref="deviceFuture"></div>
        </info-detail-item>
      </row-layout>
    </info-detail>
    <tool-bar>
      <div slot="right">
        <el-button
        slot="right"
        type="primary"
        @click="saveWork">保存</el-button>
      </div>
    </tool-bar>
  </view-container>
</template>

<script>
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/funnel'
import 'echarts/lib/chart/sankey'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'
import echarts from 'echarts/lib/echarts'
import chartOptions from 'shared@/echart/options/deviceFuture.js'
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  data () {
    return {
      column: 2,
      labelWidth: '120px',
      loading: false,
      businessDialogLoading: false,
      businessDialogVisible: false,
      uploadActionURL: '',
      ifShowEdit: false,
      radio: '1',
      textarea: '',
      echartsDom: null,
      echartOptions: Object.assign({}, chartOptions),
    }
  },
  methods: {
    // 初始化图表
    initChart () {
      this.echartsDom = echarts.init(this.$refs.deviceFuture)
      this.$nextTick(() => {
        this.echartsDom.setOption(this.echartOptions)
      })
    },
    saveWork () {
      
    }
  },
  computed: {
    ...mapState('work-data', [
      'workData'
    ])
  },
  mounted () {
    this.initChart()
  }
}
</script>

<style>
.echart-dom {
  width: 100%;
  height: 250px;
}
</style>
