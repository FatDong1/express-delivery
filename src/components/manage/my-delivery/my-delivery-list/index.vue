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
    </view-content>
    <!--列表  -->
    <view-content>
      <el-table
        stripe
        v-loading="loading"
        :data="workListData">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="number" label="快递编号"></el-table-column>
        <el-table-column prop="name" label="快递物品"></el-table-column>
        <el-table-column prop="address" label="寄送地址"></el-table-column>
        <el-table-column prop="getDate" label="寄送时间"></el-table-column>
        <el-table-column prop="accepter" label="寄送人"></el-table-column>
        <el-table-column prop="price" label="佣金(元)"></el-table-column>
        <el-table-column prop="publisher" label="发布人"></el-table-column>
        <el-table-column prop="publishDate" label="发布时间"></el-table-column>  
        <el-table-column prop="state" label="快递状态"></el-table-column>          
        <el-table-column
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button @click="handleView(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
            <el-button  v-if="stage === 'accept'" @click="handleFail(scope.row)" type="text" size="small">放弃</el-button>
            <el-button v-if="stage === 'publish'" @click="handleDel(scope.row)" type="text" size="small">删除</el-button>
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
      stage: 'publish',
      stageOptions: [{
        label: '我发布的',
        value: 'publish'
      }, {
        label: '我接受的',
        value: 'accept'
      }],
      workListData: [{
        number: '123124',
        name: '枕头',
        publisher: '小明',
        accepter: '小红',
        price: '1元',
        address: '仲恺菊苑B22-422',
        state: '未审核',
        publishDate: '2018-03-22',
        getDate: '2018-03-24',
        remark: '这快递50斤吧，加油'
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
        remark: '一本书的大小，快递很轻的'
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
        remark: '一本书的大小，快递很轻的'
      }, {
        number: '123124',
        name: '枕头',
        publisher: '小明',
        accepter: '',
        price: '1元',
        address: '仲恺菊苑B22-422',
        state: '未审核',
        publishDate: '2018-03-22',
        getDate: '2018-03-24',
        remark: '一本书的大小，快递很轻的'
      }]
    }
  },
  methods: {
    ...mapMutations('my-delivery-data', [
      'updateMyDeliveryData'
    ]),
    // 改变工单阶段
    changeStage (state) {
      let query = Object.assign({}, this.$route.query, {
        state
      })
      this.$router.push({
        query
      })
    },
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
        this.workListData = result.value      
        this.loading = false
      })
    },
    handleView (row) {
      this.updateMyDeliveryData(row)
      this.$router.push({
        name: 'my-delivery-view'
      })
    },
    handleEdit (row) {
      this.updateMyDeliveryData(row)      
      this.$router.push({
        name: 'my-delivery-edit',
        query: {
          from: 'list'
        }
      })
    },
    handleDel () {
      this.$confirm('是否删除此快递信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleFail () {
      this.$confirm('是否放弃拿取该快递?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
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
