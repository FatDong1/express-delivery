<template>
  <view-container>
    <view-header>人员详情</view-header>
    <info-detail>
      <row-layout :column="2">
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="排行">
          {{ creditData.rank }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="信誉分数">
          {{ creditData.credit + '分' }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="2">
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="姓名">
          {{ creditData.name }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="性别">
          {{ creditData.sex === 1 ? '男' : '女' }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="column">
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="邮箱">
          {{ creditData.email }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="手机">
          {{ creditData.phone }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="column">
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="成单次数">
          {{ creditData.finish_times }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="接单次数">
          {{ creditData.order_times }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="column">
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="成单率">
          {{ creditData.finish_times ? ((creditData.order_times / creditData.finish_times).toFixed(2) - 0) * 100 + '%' : '0%' }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="账户余额">
          {{ creditData.money + '元' }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="1">
        <info-detail-item
          :label-width="labelWidth"
          label="个性签名">
          {{ creditData.introduce }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="1" v-if="creditData.assessVoList && creditData.assessVoList.length !== 0">
        <info-detail-item :showLabel="false" style="justify-content: center">
          用户评价
        </info-detail-item>
      </row-layout>
      <row-layout :column="column" v-for="item in creditData.assessVoList">
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          :label="item.name + '的评价'">
          {{ item.content }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="好评">
          <el-rate
            v-model="item.stars"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}">
          </el-rate>
        </info-detail-item>
      </row-layout>
    </info-detail>
  </view-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  data () {
    return {
      showDialog: false,
      column: 2,
      labelWidth: '120px',
      loading: false,
    }
  },
  methods: {


  },
  computed: {
    ...mapState('credit-data', [
      'creditData'
    ])
  }
}
</script>

<style>
.echart-dom {
  width: 100%;
  height: 250px;
}
</style>
