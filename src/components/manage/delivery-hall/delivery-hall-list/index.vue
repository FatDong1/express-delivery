<template>
  <view-container>
    <view-header>快递大厅</view-header>
    <view-content>
      <!--工单过滤-->
      <span class="filter-label">寄送时间:</span>  
       <el-date-picker
        class="business-date-picker"
        clearable
        v-model="workUpdateTime"
        type="daterange"
        align="center"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="workPickerData"
        @change="changeWorkUpdateTime">
      </el-date-picker> 
      <span style="margin: 0 10px 0 20px;">佣金范围(元):</span>
      <el-input v-model="minPrice" style="width: 5%"></el-input>
      <span style="margin: 0 10px">~</span>
      <el-input v-model="maxPrice" style="width: 5%"></el-input>  
    </view-content>
    <!--列表  -->
    <view-content>
      <el-table
        stripe
        v-loading="loading"
        :data="listData">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="number" label="快递编号"></el-table-column>
        <el-table-column prop="name" label="快递物品"></el-table-column>
        <el-table-column prop="address" label="寄送地址"></el-table-column>
        <el-table-column prop="getDate" label="寄送时间"></el-table-column>
        <el-table-column prop="price" label="佣金(元)"></el-table-column>
        <el-table-column prop="publisher" label="发布人"></el-table-column>
        <el-table-column prop="publishDate" label="发布时间"></el-table-column>  
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
      workPickerData: {
         shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      minPrice: '',
      maxPrice: '',
      listData: [{
        number: '123124',
        name: '枕头',
        publisher: '小明',
        accepter: '小红',
        price: '1元',
        address: '仲恺菊苑B22-422',
        state: '未审核',
        publishDate: '2018-03-22',
        getDate: '2018-03-24',
        remark: '这快递50斤吧，加油',
        email: '562097257@qq.com',
        phone: '15602231822'                
      }, {
        number: '123124',
        name: '枕头',
        publisher: '小明',
        accepter: '小红',
        price: '1元',
        address: '仲恺菊苑B22-422',
        state: '未审核',
        publishDate: '2018-03-22',
        getDate: '2018-03-24',
        remark: '一本书的大小，快递很轻的',
        email: '562097257@qq.com',
        phone: '15602231822'                      
      }, {
        number: '123124',
        name: '枕头',
        publisher: '小明',
        accepter: '小红',
        price: '1元',
        address: '仲恺菊苑B22-422',
        state: '未审核',
        publishDate: '2018-03-22',
        getDate: '2018-03-24',
        remark: '一本书的大小，快递很轻的',
        phone: '15602231822',        
        email: '562097257@qq.com'        
      }, {
        number: '123124',
        name: '枕头',
        publisher: '小明',
        accepter: '小红',
        price: '1元',
        address: '仲恺菊苑B22-422',
        state: '未审核',
        publishDate: '2018-03-22',
        getDate: '2018-03-24',
        remark: '一本书的大小，快递很轻的',
        email: '562097257@qq.com',
        phone: '15602231822'        
      }]
    }
  },
  methods: {
    ...mapMutations('delivery-hall-data', [
      'updateDeliveryHallData'
    ]),
    // 改变时间
    changeWorkUpdateTime (updateAt) {
      let beginDate, endDate
      if (!updateAt) {
        delete this.$route.query.beginDate
        delete this.$route.query.endDate
      } else {
        beginDate = convertTimestamp(updateAt[0], 'yyyy-MM-dd')
        endDate = convertTimestamp(updateAt[1], 'yyyy-MM-dd')
      }
      let query = Object.assign({}, this.$route.query, {
        beginDate,
        endDate
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
    fetchPageWork (page) {
      let user = JSON.parse(sessionStorage.getItem('user'))
      this.loading = true
      this.$http({
        method: 'get',
        url: '/api/work',
        params: {
          checkerId: user.id,
          page: page
        }
      }).then((result) => {
        this.listData = result.value      
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
  created () {
    // this.fetchPageWork(1)
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
