<template>
  <view-container>
    <view-header>快递大厅</view-header>
    <view-content>
      <!--工单过滤-->
      <span class="filter-label">筛选:</span>  
      <el-date-picker
        v-model="workUpdateTime"
        type="datetime"
        @change="changeWorkUpdateTime"
        default-time="12:00:00"
        placeholder="选择寄送日期和时间">
      </el-date-picker>
      <!-- <el-select
        style="width: 15%"
        v-model="weight_level"
        placeholder="选择重量水平"
        @change="changeWeight">
        <el-option
          v-for="(item,index) in weightOptions"
          :key="index"
          :label="item.label"
          :value="item.value"></el-option>
      </el-select>  -->
      <span style="margin: 0 10px 0 20px;">佣金范围(元):</span>
      <el-input size="small" v-model="minPrice" style="width: 5%"></el-input>
      <span style="margin: 0 10px">--</span>
      <el-input size="small" v-model="maxPrice" style="width: 5%"></el-input>  
      <el-button 
        size="small" 
        class="btn-default" 
        @click="search">搜索</el-button> 
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
        <el-table-column label="重量水平">
          <template slot-scope="scope">
            <span>{{ scope.row.weight_level === 0 ? '较轻' : scope.row.weight_level === 1 ? '较重' : '非常重' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="express_company" label="快递公司"></el-table-column>
        <el-table-column prop="send_address" label="寄送地址"></el-table-column>
        <el-table-column prop="get_address" label="取件地址"></el-table-column>
        <el-table-column prop="send_date" label="寄送时间" width="150px">
          <template slot-scope="scope">
            <span>{{ scope.row.send_date | formateDate }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="佣金(元)" width="80px"></el-table-column>
        <el-table-column prop="end_date" label="订单截至时间" width="150px">
          <template slot-scope="scope">
            <span>{{ scope.row.end_date | formateDate }}</span>
          </template>
        </el-table-column>  
        <el-table-column prop="publisher" label="发布者"></el-table-column>  
        <el-table-column
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button @click="handleView(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="handleAccept(scope.row)" type="text" size="small">接受</el-button>
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
    <confirm-dialog
      :visible="showDialog"
      @closeDialog="closeDialog"></confirm-dialog>
  </view-container>
</template>

<script>
import { convertTimestamp } from 'shared@/utils/common.js'
import { mapState, mapMutations, mapActions } from 'vuex'
import ConfirmDialog from '../delivery-hall-dialog/index.vue'
export default {
  components: {
    ConfirmDialog
  },
  data () {
    return {
      pageTotal: null,
      loading: false,
      showDialog: false,
      currentPage: 1,
      workUpdateTime: '',
      minPrice: '',
      maxPrice: '',
      weight_level: '',
      listData: [],
      weightOptions: [
        {
          value: 0,
          label: '较轻'
        }, {
          value: 1,
          label: '较重'
        }, {
          value: 2,
          label: '非常重'
        }
      ]
    }
  },
  methods: {
    ...mapMutations('delivery-hall-data', [
      'updateDeliveryHallData'
    ]),
    // 改变时间
    changeWorkUpdateTime (send_date) {
      let query = Object.assign({}, this.$route.query, {
        send_date: new Date(send_date).getTime()
      })
      this.$router.push({
        query
      })
    },
    changeWeight (weight_level) {
      let query = Object.assign({}, this.$route.query, {
        weight_level
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
    search () {
      let obj = {
        price_min: this.minPrice,
        price_max: this.maxPrice
      }
      let query = Object.assign({}, this.$route.query, obj)
      this.$router.push({
        query
      })
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
          element.stateStr = '订单已被接受'
        } else if (element.state === 3) {
          element.stateStr = '寄送人确认完成'
        } else if (element.state === 4) {
          element.stateStr = '寄送人未按期完成'
        } else if (element.state === 5) {
          element.stateStr = '发布者确认完成'
        } else if (element.state === 6) {
          element.stateStr = '订单截至时间前未被接单'
        } else if (element.state === 7) {
          element.stateStr = '评价完成'
        } else if (element.state === 8) {
          element.stateStr = '快递任务已放弃'
        } else if (element.state === 9) {
          element.stateStr = '已邀请寄送人'
        } else if (element.state === 10) {
          element.stateStr = '已指定邀请寄送人'
        }
        return element
      })
      return arr
    },
    fetchPageWork (obj) {
      this.loading = true
      this.$http({
        method: 'post',
        url: '/api/express/expresshalllist.do',
        data: {
          goods: obj.goods,
          send_date: obj.send_date,
          price_min: obj.price_min,
          price_max: obj.price_max,
          weight_level: obj.weight_level
        }
      }).then((result) => {
        this.listData = this.transformData(result)
        this.loading = false
      })
    },
    handleView (row) {
      this.updateDeliveryHallData(row)
      this.$router.push({
        name: 'delivery-hall-view'
      })
    },
    closeDialog () {
      this.showDialog = false
    },
    handleAccept (row) {
      let user = JSON.parse(sessionStorage.getItem('user'))      
      if (user.role_id === 3) {
        this.loading = true
        this.$http({
          method: 'post',
          url: '/api/express/accept.do',
          data: {
            express_id: row.express_id,
            publisher_id: user.user_id
          }
        }).then((result) => {
          this.fetchPageWork({
            page: 1,
          })
          this.loading = false
        })
      } else {
        this.$alert('为保证快递安全，需缴纳200元保证金，才可以成为接单用户', '没有权限', {
          confirmButtonText: '前往缴纳',
          callback: action => {
            if (action === 'confirm') {
              this.$router.push({
                name: 'account',
                query: {
                  state: 'upgrade'
                }
              })
            }
          }
        })
      }
    }
  },
  watch: {
    $route (current, old) {
      let obj = {
        page: current.query.pageIndex,
        goods: current.query.searchFilter,
        send_date: current.query.send_date,
        price_min: current.query.price_min,
        price_max: current.query.price_max,
        weight_level: current.query.weight_level
      }
      this.fetchPageWork(obj)      
    }
  },
  created () {
    this.fetchPageWork({
      page: 1,
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
