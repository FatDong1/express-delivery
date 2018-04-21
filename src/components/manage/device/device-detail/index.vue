<template>
  <view-container>
    <view-header>
      设备详情
      <el-date-picker
        slot="right"
        size="mini"
        v-if="activeMenu === 'miss-list'"
        clearable
        v-model="workUpdateTime"
        type="daterange"
        align="center"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="workPickerData"
        @change="changeWorkUpdateTime">
    </el-date-picker>  
    </view-header>
      <view-content>
      <el-tabs v-model="activeMenu">
        <el-tab-pane label="基本信息" name="base-info">
          <device-detail-info v-if="activeMenu === 'base-info'"></device-detail-info>
        </el-tab-pane>
        <el-tab-pane label="点检列表" name="check-list">
          <device-detail-check v-if="activeMenu === 'check-list'"></device-detail-check>
        </el-tab-pane>
        <el-tab-pane label="漏检情况" name="miss-list">
          <device-detail-miss v-if="activeMenu === 'miss-list'"></device-detail-miss>
        </el-tab-pane>
      </el-tabs>
    </view-content>
  </view-container>
</template>

<script>
import DeviceDetailCheck from './device-detail-check/index.vue'
import DeviceDetailInfo from './device-detail-info/index.vue'
import DeviceDetailMiss from './device-detail-miss/index.vue'

export default {
  components: {
    DeviceDetailCheck,
    DeviceDetailInfo,
    DeviceDetailMiss
  },
  data () {
    return {
      activeMenu: 'base-info',
      workPickerData: {
         shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  methods: {
    // 改变时间
    changeWorkUpdateTime (updateAt) {
      let beginDate, endDate
      if (!updateAt) {
        delete this.$route.query.beginDate
        delete this.$route.query.endDate
      } else {
        beginDate = convertTimestamp(updateAt[0], 'yyyy-MM-dd')
        endDate = convertTimestamp(updateAt[1], 'yyyy-MM-dd')
      }
      let query = Object.assign({}, this.$route.query, {
        beginDate,
        endDate
      })
      this.$router.push({
        query
      })
    },
  }
}
</script>

<style>

</style>
