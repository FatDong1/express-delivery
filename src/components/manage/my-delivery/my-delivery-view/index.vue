<template>
  <view-container>
    <view-header-flex>
      <span>快递查看</span>
      <el-button 
        slot="right"
        size="small" 
        class="btn-default" 
        icon="el-icon-edit" 
        v-if="myDeliveryData.state === -1 || myDeliveryData.state === 0 || myDeliveryData.state === 1"
        @click="editExpress">编辑快递</el-button>
    </view-header-flex>
    <info-detail>
      <row-layout :column="column">
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="快递编号">
          {{ myDeliveryData.express_number }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="快递物品">
          {{ myDeliveryData.goods }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="column">
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="重量水平">
          {{ myDeliveryData.weight_level === 0 ? '较轻' : myDeliveryData.weight_level === 1 ? '较重' : '非常重'  }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="佣金（元）">
          {{ myDeliveryData.price }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="column">
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="快递公司">
          {{ myDeliveryData.express_company }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="取件地址">
          {{ myDeliveryData.get_address }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="column">
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="寄送地址">
          {{ myDeliveryData.send_address }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="寄送时间">
          {{ myDeliveryData.send_date }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="column">
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="寄送人">
          {{ myDeliveryData.sender }}
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
          {{ myDeliveryData.publish_date }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="快递状态">
          {{ myDeliveryData.stateStr }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="1">
        <info-detail-item 
          :label-width="labelWidth"
          label="备注">
           {{ myDeliveryData.express_remark }}
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
    editExpress () {
      this.$router.push({
        name: 'my-delivery-edit',
        query: {
          from: 'list',
          state: 'edit'
        }
      })
    }
  },
  computed: {
    ...mapState('my-delivery-data', [
      'myDeliveryData'
    ])
  }
}
</script>
