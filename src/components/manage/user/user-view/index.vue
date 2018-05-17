<template>
  <view-container>
    <view-header-flex>
      <span>人员详情</span>
      <div slot="right" style="display: inline-block">
      <el-button 
        size="small" 
        class="btn-default" 
        @click="outUser">注销用户</el-button> 
      <el-button 
        size="small" 
        class="btn-default" 
        @click="stopUser">封停用户</el-button> 
      </div>
    </view-header-flex>
    <info-detail>
      <row-layout :column="2">
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="编号">
          {{ userData.rank }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="信誉分数">
          {{ userData.credit + '分' }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="2">
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="姓名">
          {{ userData.name }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="性别">
          {{ userData.sex === 1 ? '男' : '女' }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="column">
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="邮箱">
          {{ userData.email }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="手机">
          {{ userData.phone }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="column">
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="成单次数">
          {{ userData.finish_times }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="接单次数">
          {{ userData.order_times }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="column">
        <info-detail-item
          slot="left"
          :label-width="labelWidth"
          label="成单率">
          {{ userData.finish_times ? ((userData.order_times / userData.finish_times).toFixed(2) - 0) * 100 + '%' : '0%' }}
        </info-detail-item>
        <info-detail-item
          slot="right"
          :label-width="labelWidth"
          label="账户余额">
          {{ userData.money + '元' }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="1">
        <info-detail-item
          :label-width="labelWidth"
          label="个性签名">
          {{ userData.introduce }}
        </info-detail-item>
      </row-layout>
      <row-layout :column="1" v-if="userData.assessVoList && userData.assessVoList.length !== 0">
        <info-detail-item :showLabel="false" style="justify-content: center">
          用户评价
        </info-detail-item>
      </row-layout>
      <row-layout :column="column" v-for="item in userData.assessVoList">
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
    <out-dialog :dialogOutVisible="dialogOutVisible" :userId="userData.user_id" @closeOutDialog="closeOutDialog"></out-dialog>
    <stop-dialog :dialogStopVisible="dialogStopVisible" :userId="userData.user_id"  @closeStopDialog="closeStopDialog"></stop-dialog>
  </view-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import OutDialog from '../user-dialog/out-dialog.vue'
import StopDialog from '../user-dialog/stop-dialog.vue'
export default {
  components: {
    OutDialog,
    StopDialog
  },
  data () {
    return {
      dialogOutVisible: false,
      dialogStopVisible: false,
      showDialog: false,
      column: 2,
      labelWidth: '120px',
      loading: false,
      userId: 0
    }
  },
  methods: {
    closeStopDialog () {
      this.dialogStopVisible = false
    },
    closeOutDialog () {
      this.dialogOutVisible = false
    },
    outUser () {
      this.dialogOutVisible = true
    },
    stopUser () {
      this.dialogStopVisible = true
    }

  },
  computed: {
    ...mapState('user-data', [
      'userData'
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
