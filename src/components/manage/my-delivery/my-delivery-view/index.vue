<template>
  <view-container>
    <view-header-flex>
      <span>快递查看</span>
      <div slot="right" style="display: inline-block">
      <el-button 
        size="small" 
        class="btn-default" 
        icon="el-icon-edit" 
        v-if="myDeliveryData.state === -1 || myDeliveryData.state === 0 || myDeliveryData.state === 1"
        @click="editExpress">{{ myDeliveryData.state === -1 ? '重新编辑' : '编辑'}}</el-button> 
      <el-button 
        size="small" 
        class="btn-default" 
        v-if="stage === 'publish' && (myDeliveryData.state === 4 || myDeliveryData.state === 6)"
        @click="addExpress">重新发布</el-button> 
       <el-button
        size="small" 
        class="btn-default" 
        v-if="stage === 'invite' && myDeliveryData.state === 1"
        @click="acceptInvite">接受邀请</el-button> 
      <el-button
        size="small" 
        class="btn-default" 
        v-if="stage === 'invite' && myDeliveryData.state === 1"
        @click="handleInviteFail">放弃邀请</el-button>  
      <el-button
        size="small" 
        class="btn-default" 
        icon="el-icon-plus" 
        v-if="stage === 'publish' && myDeliveryData.state === 1"
        @click="inviteExpress">邀请</el-button> 
      <el-button
        size="small" 
        class="btn-default" 
        icon="el-icon-tickets" 
        v-if="stage === 'publish' && myDeliveryData.state === 5"
        @click="assessExpress">评价</el-button> 
        <!--寄送人确认  -->
        <el-button 
          v-if="stage === 'accept' && myDeliveryData.state === 2"
          class="btn-default"
          @click="senderConfirm"
          size="small">确认完成</el-button>
        <el-button  
          class="btn-default"
          v-if="stage === 'publish' && (myDeliveryData.state === 2 || myDeliveryData.state === 3)" 
          @click="handleExpired()" 
          size="small">举报</el-button>
        <!--发布者确认  -->
        <el-button 
          v-if="stage === 'publish' && myDeliveryData.state === 3"
          class="btn-default"
          @click="publisherConfirm"
          size="small">确认完成</el-button>
        <el-button  
          v-if="stage === 'accept' && myDeliveryData.state === 2" 
          @click="handleFail" 
          class="btn-default"
          size="small">放弃</el-button>
        <el-button 
          v-if="stage === 'publish' && (myDeliveryData.state === -1 ||myDeliveryData.state === 0 || myDeliveryData.state === 1)" 
          @click="handleDel" 
          class="btn-default"
          icon="el-icon-delete" 
          size="small">删除</el-button>
      </div>
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
          {{ myDeliveryData.send_date | formateDate }}
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
          {{ myDeliveryData.publish_date | formateDate }}
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
    <assess-dialog :visible="showAssessDialog" @closeAssessDialog="closeAssessDialog"></assess-dialog>
    <expired-dialog :visible="showExpiredDialog" @closeExpiredDialog="closeExpiredDialog"></expired-dialog>
    <accept-dialog :visible="showAcceptDialog" @closeAcceptDialog="closeAcceptDialog"></accept-dialog>
    <invite-dialog :visible="showInviteDialog" @closeInviteDialog="closeInviteDialog"></invite-dialog>
    <sender-confirm :visible="showSenderDialog" @closeSenderDialog="closeSenderDialog"></sender-confirm>
    <publisher-confirm :visible="showPublisherDialog" @closePublisherDialog="closePublisherDialog"></publisher-confirm>
  </view-container>
</template>

<script>
import AssessDialog from '../my-delivery-list/access-dialog.vue'
import AcceptDialog from '../my-delivery-list/accept-invite.vue'
import InviteDialog from '../my-delivery-list/invite-dialog.vue'
import ExpiredDialog from '../my-delivery-list/expired-dialog.vue'
import SenderConfirm from '../my-delivery-list/sender-confirm.vue'
import PublisherConfirm from '../my-delivery-list/publisher-confirm.vue'
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  components: {
    AssessDialog,
    SenderConfirm,
    PublisherConfirm,
    InviteDialog,
    AcceptDialog,
    ExpiredDialog
  },
  data () {
    return {
      showAssessDialog: false,
      showExpiredDialog: false,
      showSenderDialog: false,
      showPublisherDialog: false,
      showInviteDialog: false,
      showAcceptDialog: false,
      column: 2,
      labelWidth: '120px',
      loading: false,
    }
  },
  methods: {
    ...mapMutations('my-delivery-data', [
      'updateMyDeliveryData'
    ]),
    closeExpiredDialog () {
      this.showExpiredDialog = false
    },
    handleExpired (row) {
      this.showExpiredDialog = true
    },
    addExpress (row) {
      this.$router.push({
        name: 'my-delivery-edit',
        query: {
          from: 'list',
          state: 'add'
        }
      })
    },
    handleFail (row) {
      let user = JSON.parse(sessionStorage.getItem('user'))      
      this.$confirm('<p>是否放弃拿取该快递?</p><p>tip：距接单时间5分钟内可以放弃订单</p>', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      }).then(() => {
        this.$http({
          method: 'post',
          url: '/api/express/fail.do',
          data: {
            express_id: this.myDeliveryData.express_id,
            publisher_id: user.user_id
          }
        }).then((result) => {
          this.$message({
            type: 'success',
            message: '放弃订单成功!'
          })
        })
      }).catch((err) => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    handleDel (row) {
      let user = JSON.parse(sessionStorage.getItem('user'))      
      this.$confirm('是否删除此快递订单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          method: 'post',
          url: '/api/express/delete.do',
          data: {
            express_id: this.myDeliveryData.express_id,
            publisher_id: user.user_id            
          }
        }).then((result) => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleInviteFail (row) {
      let user = JSON.parse(sessionStorage.getItem('user'))      
      this.$confirm('<p>是否放弃拿取该快递订单邀请?</p><p>tip：30分钟内需要确认是否接受</p>', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      }).then(() => {
        this.$http({
          method: 'post',
          url: '/api/express/pass.do',
          data: {
            express_id: this.myDeliveryData.express_id,
            state: 1,
            publisher_id: user.user_id
            
          }
        }).then((result) => {
          this.$message({
            type: 'success',
            message: '放弃订单邀请成功!'
          })
        })
      }).catch((err) => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    closeAcceptDialog () {
      this.showAcceptDialog = false
    },
    acceptInvite () {
      this.showAcceptDialog = true
    },
    closeAssessDialog () {
      this.showAssessDialog = false
    },
    assessExpress () {
      this.showAssessDialog = true
    },
    closeInviteDialog () {
      this.showInviteDialog = false
    },
    inviteExpress () {
      this.showInviteDialog = true
    },
    closeSenderDialog () {
      this.showSenderDialog = false
    },
    senderConfirm () {
      this.showSenderDialog = true
    },
    closePublisherDialog () {
      this.showPublisherDialog = false
    },
    publisherConfirm (row) {
      this.showPublisherDialog = true
    },
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
      'myDeliveryData',
      'stage'
    ])
  }
}
</script>
