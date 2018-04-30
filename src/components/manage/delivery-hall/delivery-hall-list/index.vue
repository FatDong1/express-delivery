<template>
  <view-container>
    <view-header>快递大厅</view-header>
    <view-content>
      <!--工单过滤-->
      <span class="filter-label">寄送时间:</span>  
       <el-date-picker
        clearable
        placeholder="选择寄送的日期"
        value-format="yyyy-MM-dd"
        v-model="workUpdateTime"
        @change="changeWorkUpdateTime"
        type="date">
      </el-date-picker>
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
            <span>{{ listData.weight_level === 0 ? '较轻' : listData.weight_level === 1 ? '较重' : '非常重' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="express_company" label="快递公司"></el-table-column>
        <el-table-column prop="send_address" label="寄送地址"></el-table-column>
        <el-table-column prop="get_address" label="取件地址"></el-table-column>
        <el-table-column prop="send_date" label="寄送时间" width="150px"></el-table-column>
        <el-table-column prop="price" label="佣金(元)" width="80px"></el-table-column>
        <el-table-column prop="end_date" label="订单截至时间" width="150px"></el-table-column>  
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
      listData: []
    }
  },
  methods: {
    ...mapMutations('delivery-hall-data', [
      'updateDeliveryHallData'
    ]),
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
        }
        return element
      })
      return arr
    },
    fetchPageWork (obj) {
      // let user = JSON.parse(sessionStorage.getItem('user'))
      this.loading = true
      this.$http({
        method: 'get',
        url: '/api/express/list',
        params: {
          goods: obj.goods,
          send_date: obj.send_date,
          price_min: obj.price_min,
          price_max: obj.price_max
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
      this.updateDeliveryHallData(row)
      this.showDialog = true
    }
  },
  watch: {
    $route (current, old) {
      let obj = {
        page: current.query.pageIndex,
        goods: current.query.searchFilter,
        send_date: current.query.send_date,
        price_min: current.query.price_min,
        price_max: current.query.price_max
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
