<template>
  <view-content>
    <el-table
      stripe
      :data="checkListData">
      <el-table-column type="index">
      </el-table-column>
      <el-table-column prop="name" label="部件"></el-table-column>
      <el-table-column prop="number" label="部件编号"></el-table-column>
      <el-table-column prop="element" label="点检要素"></el-table-column>
      <el-table-column prop="norm" label="点检标准"></el-table-column>
      <el-table-column prop="unit" label="单位"></el-table-column>
      <el-table-column prop="method" label="点检方法"></el-table-column>
      <el-table-column prop="special" label="可能劣化的部位"></el-table-column>
      <el-table-column prop="checker" label="点检人员"></el-table-column>
      <el-table-column prop="date" label="点检日期"></el-table-column>
    </el-table>
  </view-content>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  data () {
    return {
      checkListData: [
        {
          name: '外壳',
          number: '1234',
          element: '温度',
          unit: '摄氏度',
          special: '外壳尾部',
          norm: '35℃',
          method: '用手摸',
          checker: '小明',
          date: '一周'
        },
        {
          name: '外壳',
          number: '1234',
          element: '温度',
          unit: '摄氏度',
          special: '外壳尾部',
          norm: '35℃',
          method: '用手摸',
          checker: '小明',
          date: '一周'
        },        
        {
          name: '外壳',
          number: '1234',
          element: '温度',
          unit: '摄氏度',
          special: '外壳尾部',
          norm: '35℃',
          method: '用手摸',
          checker: '小明',
          date: '一周'
        }
      ]
    }
  },
  methods: {

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
