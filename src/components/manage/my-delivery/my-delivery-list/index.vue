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
        v-model="workUpdateTime"
        type="datetime"
        @change="changeWorkUpdateTime"
        default-time="12:00:00"
        placeholder="选择寄送日期和时间">
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
        <el-table-column prop="send_date" label="寄送时间" width="150px">
          <template slot-scope="scope">
            <span>{{ scope.row.send_date | formateDate }}</span>
          </template>
        </el-table-column>
         <el-table-column label="寄送人" v-if="stage === 'publish'">
          <template slot-scope="scope">
            <span>{{ scope.row.sender ? scope.row.sender : '暂无接单人'}}</span>
          </template>
        </el-table-column> 
        <el-table-column prop="price" label="佣金(元)" width="80px"></el-table-column>
        <el-table-column prop="end_date" label="订单截至时间" width="150px">
          <template slot-scope="scope">
            <span>{{ scope.row.end_date | formateDate }}</span>
          </template></el-table-column>  
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
              v-if="stage === 'invite' && scope.row.state === 9"
              type="text"
              @click="acceptInvite(scope.row)" 
              size="small">接受邀请</el-button>
            <el-button 
              v-if="stage === 'invite' && scope.row.state === 9"
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
      relate_me: 0,
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
    closeExpiredDialog (flag) {
      this.showExpiredDialog = false
      if (flag) {
        this.fetchPageWork({
          page: 1,
          relate_me: this.$route.query.relate_me
        })
      }
    },
    handleExpired (row) {
      this.updateMyDeliveryData(row)
      this.showExpiredDialog = true
    },
    closeAcceptDialog (flag) {
      this.showAcceptDialog = false
      if (flag) {
        this.fetchPageWork({
          page: 1,
          relate_me: this.$route.query.relate_me
        })
      }
    },
    acceptInvite (row) {
      this.updateMyDeliveryData(row)
      this.showAcceptDialog = true
    },
    closeAssessDialog (flag) {
      this.showAssessDialog = false
      if (flag) {
        this.fetchPageWork({
          page: 1,
          relate_me: this.$route.query.relate_me
        })
      }
    },
    assessExpress (row) {
      this.updateMyDeliveryData(row)
      this.showAssessDialog = true
    },
    closeInviteDialog (flag) {
      this.showInviteDialog = false
      if (flag) {
        this.fetchPageWork({
          page: 1,
          relate_me: this.$route.query.relate_me
        })
      }
    },
    inviteExpress (row) {
      this.updateMyDeliveryData(row)
      this.showInviteDialog = true
    },
    closeSenderDialog (flag) {
      this.showSenderDialog = false
      if (flag) {
        this.fetchPageWork({
          page: 1,
          relate_me: this.$route.query.relate_me
        })
      }
    },
    senderConfirm (row) {
      this.updateMyDeliveryData(row)
      this.showSenderDialog = true
    },
    closePublisherDialog (flag) {
      this.showPublisherDialog = false
      if (flag) {
        this.fetchPageWork({
          page: 1,
          relate_me: this.$route.query.relate_me
        })
      }
    },
    publisherConfirm (row) {
      this.updateMyDeliveryData(row)
      this.showPublisherDialog = true
    },
    transformData (list, relate_me) {
      let flag = false
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
        } else if (element.state === 7) {
          element.stateStr = '发布者评价完成'          
        } else if (element.state === 8) {
          element.stateStr = '快递任务已放弃'          
        } else if (element.state === 9) {
          element.stateStr = '已邀请寄送人'          
        } else if (element.state === 10) {
          element.stateStr = '已邀请指定寄送人'          
        }
        if (element.state === 1 && relate_me === '2') {
          flag = true
        }
        return element
      })
      let result = flag ? [] : arr
      return result
    },
    // 改变快递阶段
    changeStage (state) {
      this.updateStage(state)
      if (state === 'publish') {
        this.relate_me = '0'
      } else if (state === 'accept') {
        this.relate_me = '1'
      } else if (state === 'invite') {
        this.relate_me = '2'
      }
      let query = Object.assign({}, this.$route.query, {
        relate_me: this.relate_me
      })
      this.$router.push({
        query
      })
    },
    // 改变时间
    changeWorkUpdateTime (send_date) {
      let query = Object.assign({}, this.$route.query, {
        send_date: new Date(send_date).getTime()
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
      let user = JSON.parse(sessionStorage.getItem('user'))
      this.loading = true
      this.$http({
        method: 'post',
        url: '/api/express/myexpresslist.do',
        data: {
          relate_me : obj.relate_me,
          goods: obj.goods,
          send_date: obj.send_date,
          publisher_id: user.user_id,
          page: obj.page
        }
      }).then((result) => {
        this.listData = this.transformData(result, this.$route.query.relate_me)
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
            express_id: row.express_id,
            publisher_id: user.user_id
          }
        }).then((result) => {
          this.fetchPageWork({
            page: 1,
            relate_me: this.$route.query.relate_me
          })
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
      this.$confirm('<p>是否放弃该快递订单邀请?</p><p>tip：30分钟内未确认则默认放弃</p>', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      }).then(() => {
        this.$http({
          method: 'post',
          url: '/api/express/pass.do',
          data: {
            state: 1,
            express_id: row.express_id,
            publisher_id: user.user_id
          }
        }).then((result) => {
          this.fetchPageWork({
            page: 1,
            relate_me: this.$route.query.relate_me
          })
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
      let user = JSON.parse(sessionStorage.getItem('user'))
      this.$confirm('<p>是否放弃拿取该快递?</p><p>tip：距接单时间5分钟内可以放弃订单</p>', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      }).then(() => {
        this.$http({
          method: 'post',
          url: '/api/express/abandon.do',
          data: {
            express_id: row.express_id,
            publisher_id: user.user_id
          }
        }).then((result) => {
          this.fetchPageWork({
            page: 1,
            relate_me: this.$route.query.relate_me
          })
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
        relate_me: current.query.relate_me
      }
      this.fetchPageWork(obj)      
    }
  },
  created () {
    this.fetchPageWork({
      page: 1,
      relate_me: 0
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
