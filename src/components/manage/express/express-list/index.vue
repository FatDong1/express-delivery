<template>
  <view-container>
    <view-header>快递管理</view-header>
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
  </view-container>
</template>

<script>
import { convertTimestamp } from 'shared@/utils/common.js'
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  data () {
    return {
      pageTotal: null,
      loading: false,
      currentPage: 1,
      workUpdateTime: '',
      stage: '',
      stageOptions: [{
        label: '已通过',
        value: 1
      }, {
        label: '未审核',
        value: 0
      }],
      listData: []
    }
  },
  methods: {
    ...mapMutations('express-data', [
      'updateExpressData',
      'updateStage'
    ]),
    // 改变工单阶段
    changeStage (state) {
      this.updateStage(state)
      let query = Object.assign({}, this.$route.query, {
        has_check: state
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
        url: '/api/express/expressmaglist',
        params: {
          page: obj.page,
          goods: obj.goods,
          send_date: obj.send_date,
          has_check: obj.has_check
        }
      }).then((result) => {
        this.listData = result      
        this.loading = false
      })
    },
    handleView (row) {
      this.updateExpressData(row)
      this.$router.push({
        name: 'express-view'
      })
    },
  },
  watch: {
    $route (current, old) {
      let obj = {
        page: current.query.pageIndex,
        goods: current.query.searchFilter,
        send_date: current.query.send_date,
        has_check: current.query.has_check
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
