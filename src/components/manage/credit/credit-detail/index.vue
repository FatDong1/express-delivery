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
          {{ creditData.point }}
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
          {{ creditData.sex }}
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
          {{ creditData.order }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="成单率">
          {{ creditData.rate }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="1">
        <info-detail-item
          :label-width="labelWidth"
          label="个性签名">
          {{ creditData.special }}
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
