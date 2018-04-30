<template>
  <view-container>
    <view-header-flex>
      <span>快递查看</span>
      <el-button 
        slot="right"
        size="small" 
        class="btn-default" 
        @click="acceptExpress">接受订单</el-button>
    </view-header-flex>
    <info-detail>
      <row-layout :column="column">
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="快递编号">
          {{ deliveryHallData.express_number }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="快递物品">
          {{ deliveryHallData.goods }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="column">
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="重量水平">
          {{ deliveryHallData.weight_level === 0 ? '较轻' : deliveryHallData.weight_level === 1 ? '较重' : '非常重'  }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="佣金（元）">
          {{ deliveryHallData.price }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="column">
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="快递公司">
          {{ deliveryHallData.express_company }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="取件地址">
          {{ deliveryHallData.get_address }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="column">
        <info-detail-item
          slot="left"        
          :label-width="labelWidth"
          label="发布时间">
          {{ deliveryHallData.publish_date }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="取件时间">
          {{ deliveryHallData.send_date }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="column">
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="订单截至时间">
          {{ deliveryHallData.end_date }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="发布者">
          {{ deliveryHallData.publisher }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="1">
        <info-detail-item
          :label-width="labelWidth"
          label="取件地址">
          {{ deliveryHallData.get_address }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="1">
        <info-detail-item
          :label-width="labelWidth"
          label="寄送地址">
          {{ deliveryHallData.send_address }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="1">
        <info-detail-item 
          :label-width="labelWidth"
          label="备注">
           {{ deliveryHallData.express_remark }}
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
    ...mapMutations([
      'updateLoading'
    ]),
    acceptExpress () {
      this.updateLoading(true)
      this.$http({
        method: 'post',
        url: '/api/express/accept',
        data: {
          express_id: this.deliveryHallData.express_id
        }
      }).then((result) => {
        this.updateLoading(false)
        this.$message({
          type: 'success',
          message: '接受订单成功'
        })
      })
    }
  },
  computed: {
    ...mapState('delivery-hall-data', [
      'deliveryHallData'
    ])
  }
}
</script>
