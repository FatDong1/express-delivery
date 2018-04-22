<template>
  <view-container>
    <view-header>快递查看</view-header>
    <info-detail>
      <row-layout :column="column">
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="快递编号">
          {{ deliveryHallData.number }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="快递物品">
          {{ deliveryHallData.name }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="column">
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="寄送地址">
          {{ deliveryHallData.address }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="寄送时间">
          {{ deliveryHallData.getDate }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="column">
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="发布者">
          {{ deliveryHallData.publisher }}
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="发布者手机">
          {{ deliveryHallData.phone }}
        </info-detail-item>
        </info-detail-item>
      </row-layout>
      <row-layout :column="column">
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="发布者邮箱">
          {{ deliveryHallData.email }}
        </info-detail-item>
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="发布时间">
          {{ deliveryHallData.publishDate }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="1">
        <info-detail-item 
          :label-width="labelWidth"
          label="备注">
           {{ deliveryHallData.remark }}
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
      column: 2,
      labelWidth: '120px',
      loading: false,
    }
  },
  methods: {
    saveWork () {
      
    }
  },
  computed: {
    ...mapState('delivery-hall-data', [
      'deliveryHallData'
    ])
  }
}
</script>
