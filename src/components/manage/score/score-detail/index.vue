<template>
  <view-container>
    <view-header>{{ title }}</view-header>
    <info-detail>
      <row-layout :column="2">
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="姓名">
          {{ scoreData.name }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="性别">
          {{ scoreData.sex }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="column">
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="职位">
          {{ scoreData.job }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="部门">
          {{ scoreData.department }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="1">
        <info-detail-item
          :label-width="labelWidth"
          label="点检发现的问题">
          {{ scoreData.questions }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="1">
        <info-detail-item
          :label-width="labelWidth"
          label="绩效图表">
          <div class="echart-dom" ref="scoreAnalysis"></div>
        </info-detail-item>
      </row-layout>
    </info-detail>
    <tool-bar>
      <div slot="right">
        <el-button
          v-if="$route.query.state === 'view'"
          slot="right"
          type="primary"
          @click="decideScore">评分</el-button>
        <el-button
          v-else
          slot="right"
          type="primary"
          @click="modifyScore">修改评分</el-button>
      </div>
    </tool-bar>
    <score-dialog :visible="showDialog" @closeScoreDialog="closeDialog"></score-dialog>
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
import chartOptions from 'shared@/echart/options/scoreAnalysis.js'
import { mapState, mapMutations, mapActions } from 'vuex'
import ScoreDialog from './dialog.vue'
export default {
  components: {
    ScoreDialog
  },
  data () {
    return {
      showDialog: false,
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
      this.echartsDom = echarts.init(this.$refs.scoreAnalysis)
      this.$nextTick(() => {
        this.echartsDom.setOption(this.echartOptions)
      })
    },
    decideScore () {
      this.showDialog = true
    },
    modifyScore () {
      this.showDialog = true      
    },
    closeDialog () {
      this.showDialog = false
    }
  },
  computed: {
    ...mapState('score-data', [
      'scoreData'
    ]),
    title () {
      return this.scoreData.name + this.scoreData.decideDate + '点检绩效表'
    }
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
