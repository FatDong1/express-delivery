<template>
  <view-container>
    <view-header>快递查看</view-header>
    <info-detail>
      <row-layout :column="column">
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="快递编号">
          {{ myDeliveryData.number }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="快递物品">
          {{ myDeliveryData.name }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="column">
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="寄送地址">
          {{ myDeliveryData.address }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="寄送时间">
          {{ myDeliveryData.getDate }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="column">
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="寄送人">
          {{ myDeliveryData.accepter }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="发布者">
          {{ myDeliveryData.publisher }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="column">
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="发布时间">
          {{ myDeliveryData.publishDate }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="快递状态">
          {{ myDeliveryData.state }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="1">
        <info-detail-item 
          :label-width="labelWidth"
          label="备注">
           {{ myDeliveryData.remark }}
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
    ...mapState('my-delivery-data', [
      'myDeliveryData'
    ])
  }
}
</script>
