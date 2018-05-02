<template>
  <view-container>
    <view-header>我的快递</view-header>
    <view-content>
      <!--工单过滤-->
      <span class="filter-label">筛选:</span> 
      <el-select
        class="business-select"
        v-model="stage"
        @change="changeStage">
        <el-option
          v-for="(item,index) in stageOptions"
          :key="index"
          :label="item.label"
          :value="item.value"></el-option>
      </el-select>  
       <el-date-picker
        clearable
        placeholder="选择寄送的日期"
        value-format="yyyy-MM-dd"
        v-model="workUpdateTime"
        @change="changeWorkUpdateTime"
        type="date">
      </el-date-picker>  
    </view-content>
    <!--列表  -->
    <view-content>
      <el-table
        stripe
        v-loading="loading"
        :data="listData">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="goods" label="快递物品"></el-table-column>
        <el-table-column prop="express_company" label="快递公司"></el-table-column>
        <el-table-column prop="send_address" label="寄送地址"></el-table-column>
        <el-table-column prop="get_address" label="取件地址"></el-table-column>
        <el-table-column prop="send_date" label="寄送时间" width="150px"></el-table-column>
         <el-table-column label="寄送人" v-if="stage === 'publish'">
          <template slot-scope="scope">
            <span>{{ scope.row.sender ? scope.row.sender : '暂无接单人'}}</span>
          </template>
        </el-table-column> 
        <el-table-column prop="price" label="佣金(元)" width="80px"></el-table-column>
        <el-table-column prop="end_date" label="订单截至时间" width="150px"></el-table-column>  
        <el-table-column prop="stateStr" label="快递状态"></el-table-column>          
        <el-table-column
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button @click="handleView(scope.row)" type="text" size="small">查看</el-button>
            <el-button 
              v-if="scope.row.state === -1"
              @click="handleEdit(scope.row)" 
              type="text" 
              size="small">重新编辑</el-button>
            <el-button 
              v-if="stage === 'publish' && (scope.row.state === 4 || scope.row.state === 6)"
              type="text" 
              @click="addExpress(scope.row)"
              size="small">重新发布</el-button>
            <el-button 
              v-if="stage === 'publish' && scope.row.state === 1"
              type="text" 
              @click="inviteExpress(scope.row)"
              size="small">邀请</el-button>
            <el-button 
              v-if="stage === 'invite' && scope.row.state === 1"
              type="text"
              @click="acceptInvite(scope.row)" 
              size="small">接受邀请</el-button>
            <el-button 
              v-if="stage === 'invite' && scope.row.state === 1"
              type="text" 
              @click="handleInviteFail(scope.row)"
              size="small">放弃邀请</el-button>
              <!--寄送人确认  -->
            <el-button 
              v-if="stage === 'accept' && scope.row.state === 2"
              type="text" 
              @click="senderConfirm(scope.row)"
              size="small">确认完成</el-button>
              <!--发布者确认  -->
            <el-button 
              v-if="stage === 'publish' && scope.row.state === 3"
              type="text" 
              @click="publisherConfirm(scope.row)"
              size="small">确认完成</el-button>
            <el-button 
              v-if="stage === 'publish' && scope.row.state === 5"
              @click="assessExpress(scope.row)"
              type="text" 
              size="small">评价</el-button>
            <el-button  
              v-if="stage === 'accept' && scope.row.state === 2" 
              @click="handleFail(scope.row)" 
              type="text" 
              size="small">放弃</el-button>
            <el-button  
              v-if="stage === 'publish' && (scope.row.state === 2 || scope.row.state === 3)" 
              @click="handleExpired(scope.row)" 
              type="text" 
              size="small">举报</el-button>
            <el-button 
              v-if="stage === 'publish' && (scope.row.state === -1 || scope.row.state === 0 || scope.row.state === 1)" 
              @click="handleDel(scope.row)" 
              type="text" 
              size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </view-content>
    <!-- view可视框的脚部，分页组件 -->
     <view-content-float>
      <el-pagination
        slot="right"
        layout="total, prev, pager, next, jumper"
        :page-size="10"
        :total="pageTotal"
        :current-page.sync="currentPage"
        @current-change="changePageIndex">
      </el-pagination>
    </view-content-float> 
    <assess-dialog :visible="showAssessDialog" @closeAssessDialog="closeAssessDialog"></assess-dialog>
    <expired-dialog :visible="showExpiredDialog" @closeExpiredDialog="closeExpiredDialog"></expired-dialog>
    <accept-dialog :visible="showAcceptDialog" @closeAcceptDialog="closeAcceptDialog"></accept-dialog>
    <invite-dialog :visible="showInviteDialog" @closeInviteDialog="closeInviteDialog"></invite-dialog>
    <sender-confirm :visible="showSenderDialog" @closeSenderDialog="closeSenderDialog"></sender-confirm>
    <publisher-confirm :visible="showPublisherDialog" @closePublisherDialog="closePublisherDialog"></publisher-confirm>
  </view-container>
</template>

<script>
import AssessDialog from './access-dialog.vue'
import AcceptDialog from './accept-invite.vue'
import ExpiredDialog from './expired-dialog.vue'
import InviteDialog from './invite-dialog.vue'
import SenderConfirm from './sender-confirm.vue'
import PublisherConfirm from './publisher-confirm.vue'
import { convertTimestamp } from 'shared@/utils/common.js'
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
      showSenderDialog: false,
      showPublisherDialog: false,
      showInviteDialog: false,
      showAcceptDialog: false,
      showExpiredDialog: false,
      pageTotal: null,
      loading: false,
      currentPage: 1,
      workUpdateTime: '',
      stage: 'publish',
      stageOptions: [{
        label: '我发布的',
        value: 'publish'
      }, {
        label: '我接受的',
        value: 'accept'
      }, {
        label: '受邀请的',
        value: 'invite'
      }],
      listData: []
    }
  },
  methods: {
    ...mapMutations('my-delivery-data', [
      'updateMyDeliveryData',
      'updateStage'
    ]),
    closeExpiredDialog () {
      this.showExpiredDialog = false
    },
    handleExpired (row) {
      this.updateMyDeliveryData(row)
      this.showExpiredDialog = true
    },
    closeAcceptDialog () {
      this.showAcceptDialog = false
    },
    acceptInvite (row) {
      this.updateMyDeliveryData(row)
      this.showAcceptDialog = true
    },
    closeAssessDialog () {
      this.showAssessDialog = false
    },
    assessExpress (row) {
      this.updateMyDeliveryData(row)
      this.showAssessDialog = true
    },
    closeInviteDialog () {
      this.showInviteDialog = false
    },
    inviteExpress (row) {
      this.updateMyDeliveryData(row)
      this.showInviteDialog = true
    },
    closeSenderDialog () {
      this.showSenderDialog = false
    },
    senderConfirm (row) {
      this.updateMyDeliveryData(row)
      this.showSenderDialog = true
    },
    closePublisherDialog () {
      this.showPublisherDialog = false
    },
    publisherConfirm (row) {
      this.updateMyDeliveryData(row)
      this.showPublisherDialog = true
    },
    transformData (list) {
      let arr = list.map(function (element) {
        if (element.state === -1) {
          element.stateStr = '未通过审核'
        } else if (element.state === 0) {
          element.stateStr = '审核中'
        } else if (element.state === 1) {
          element.stateStr = '审核通过'
        } else if (element.state === 2) {
          element.stateStr = '订单待完成'
        } else if (element.state === 3) {
          element.stateStr = '待发布者确认'
        } else if (element.state === 4) {
          element.stateStr = '寄送人未按期完成'
        } else if (element.state === 5) {
          element.stateStr = '待评价'
        } else if (element.state === 6) {
          element.stateStr = '订单截至时间前未被接单'
        }
        return element
      })
      return arr
    },
    // 改变工单阶段
    changeStage (state) {
      this.updateStage(state)
      let query = Object.assign({}, this.$route.query, {
        state
      })
      this.$router.push({
        query
      })
    },
    // 改变时间
    changeWorkUpdateTime (send_date) {
      let query = Object.assign({}, this.$route.query, {
        send_date
      })
      this.$router.push({
        query
      })
    },
    // 当页数改变执行的函数
    changePageIndex (pageIndex) {
      let query = Object.assign({}, this.$route.query, {
        pageIndex
      })
      this.$router.push({
        query
      })
    },
    fetchPageWork (obj) {
      // let user = JSON.parse(sessionStorage.getItem('user'))
      this.loading = true
      this.$http({
        method: 'get',
        url: '/api/express/list',
        params: {
          state: obj.state,
          goods: obj.goods,
          send_date: obj.send_date
          // checkerId: user.id,
          // page: page
        }
      }).then((result) => {
        this.listData = this.transformData(result)
        this.loading = false
      })
    },
    handleView (row) {
      this.updateMyDeliveryData(row)
      this.$router.push({
        name: 'my-delivery-view'
      })
    },
    addExpress (row) {
      this.updateMyDeliveryData(row)      
      this.$router.push({
        name: 'my-delivery-edit',
        query: {
          from: 'list',
          state: 'add'
        }
      })
    },
    handleEdit (row) {
      this.updateMyDeliveryData(row)      
      this.$router.push({
        name: 'my-delivery-edit',
        query: {
          from: 'list',
          state: 'edit'
        }
      })
    },
    handleDel (row) {
      this.$confirm('是否删除此快递订单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          method: 'post',
          url: '/api/express/delete',
          data: {
            express_id: row.express_id
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
      this.$confirm('<p>是否放弃该快递订单邀请?</p><p>tip：30分钟内未确认则默认放弃</p>', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      }).then(() => {
        this.$http({
          method: 'post',
          url: '/api/express/inviteFail',
          data: {
            express_id: row.express_id
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
    handleFail (row) {
      this.$confirm('<p>是否放弃拿取该快递?</p><p>tip：距接单时间5分钟内可以放弃订单</p>', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      }).then(() => {
        this.$http({
          method: 'post',
          url: '/api/express/abandon',
          data: {
            express_id: row.express_id
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
    }
  },
  watch: {
    $route (current, old) {
      let obj = {
        page: current.query.pageIndex,
        goods: current.query.searchFilter,
        send_date: current.query.send_date,
        state: current.query.state
      }
      this.fetchPageWork(obj)      
    }
  },
  created () {
    this.fetchPageWork({
      page: 1,
      state: 'publish'
    })
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
