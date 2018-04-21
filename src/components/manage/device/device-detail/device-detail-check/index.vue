<template>
  <!--列表  -->
  <view-content>
    <el-table
      stripe
      :data="checkListData">
      <el-table-column type="index">
      </el-table-column>
      <el-table-column prop="name" label="部件名称"></el-table-column>
      <el-table-column prop="number" label="部件编号"></el-table-column>
      <el-table-column prop="element" label="点检要素"></el-table-column>
      <el-table-column prop="unit" label="数据单位"></el-table-column>
      <el-table-column prop="special" label="可能劣化的部位"></el-table-column>
      <el-table-column prop="norm" label="点检标准"></el-table-column>
      <el-table-column prop="method" label="点检方法"></el-table-column>
      <el-table-column prop="tool" label="点检工具"></el-table-column>
      <el-table-column prop="cycle" label="点检周期"></el-table-column>        
      <el-table-column prop="checker" label="点检人员"></el-table-column>
    </el-table>
  </view-content>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  data () {
    return {
      checkListData:[]
    }
  },
  computed: {
    ...mapState('device-data', [
      'deviceData'
    ])
  },
  methods: {
    fetchCheckList () {
      this.$http({
        method: 'get',
        url: '/api/check',
        params: {
          deviceId: this.deviceData.id
        }
      }).then((result) => {
        this.checkListData = result.value
      })
    }
  },
  created () {
    this.fetchCheckList()
  }
}
</script>

<style lang="less" scoped>
.business-select {
  width: 120px;
  margin-right: 10px;
}

.business-status {
  color: #c2c2c2;
}

.el-button--mini {
  padding: 7px 10px;
}
</style>
