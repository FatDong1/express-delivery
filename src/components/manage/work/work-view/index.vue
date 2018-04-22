<template>
  <view-container>
    <view-header-flex>
      <span>快递查看</span>
      <div slot="right" style="display: inline-block">
        <el-button size="small" class="btn-default" @click="passWork">通过</el-button>
        <el-button size="small" class="btn-default" @click="failWork">驳回</el-button>   
      </div>
    </view-header-flex>
    <info-detail>
      <row-layout :column="column">
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="快递编号">
          {{ workData.number }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="快递物品">
          {{ workData.name }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="column">
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="寄送地址">
          {{ workData.address }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="寄送时间">
          {{ workData.getDate }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="column">
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="寄送人">
          {{ workData.accepter }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="发布者">
          {{ workData.publisher }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="column">
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="发布时间">
          {{ workData.publishDate }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="快递状态">
          {{ workData.state }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="1">
        <info-detail-item 
          :label-width="labelWidth"
          label="备注">
           {{ workData.remark }}
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
    passWork () {
      
    },
    failWork () {

    }
  },
  computed: {
    ...mapState('work-data', [
      'workData'
    ])
  }
}
</script>

<style>

</style>
