<template>
  <view-container>
    <view-header>用户管理</view-header>
    <view-content>
      <span class="filter-label">筛选:</span> 
      <el-select
        style="width: 15%"
        size="small"
        v-model="sex"
        placeholder="请选择用户性别"
        @change="changeStage">
        <el-option
          v-for="(item,index) in sexOptions"
          :key="index"
          :label="item.label"
          :value="item.value"></el-option>
      </el-select> 
      <span style="margin: 0 10px 0 20px;">信誉分范围:</span>
      <el-input size="small" v-model="minPoint" style="width: 5%"></el-input>
      <span style="margin: 0 10px">--</span>
      <el-input size="small" v-model="maxPoint" style="width: 5%"></el-input>  
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
        <el-table-column type="index" label="名次" width="50px"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="sex" label="性别">
          <template slot-scope="scope">
            <span>{{ scope.row.sex === 1 ? '男' : '女' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="email" label="电子邮箱" width="150px"></el-table-column>
        <el-table-column prop="phone" label="联系电话"></el-table-column>
        <el-table-column prop="order_times" label="接单次数"></el-table-column>
        <el-table-column prop="finish_times" label="成单次数"></el-table-column>
        <el-table-column label="成单率">
          <template slot-scope="scope">
            <span>{{ scope.row.finish_times ? ((scope.row.order_times / scope.row.finish_times).toFixed(2) - 0) * 100 + '%' : '0%' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="credit" label="信誉分数"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span>{{ scope.row.stateStr  }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button @click="handleView(scope.row, scope.$index)" type="text" size="small">查看</el-button>
            <el-button v-if="scope.row.stage === 1" @click="handleOut(scope.row, scope.$index)" type="text" size="small">注销</el-button>
            <el-button v-if="scope.row.stage === 1" @click="handleStop(scope.row, scope.$index)" type="text" size="small">封停</el-button>
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
    <out-dialog :dialogOutVisible="dialogOutVisible" :userId="editIndex" @closeOutDialog="closeOutDialog"></out-dialog>
    <stop-dialog :dialogStopVisible="dialogStopVisible" :userId="editIndex" @closeStopDialog="closeStopDialog"></stop-dialog>
  </view-container>
</template>

<script>
import { mapMutations } from 'vuex'
import OutDialog from '../user-dialog/out-dialog.vue'
import StopDialog from '../user-dialog/stop-dialog.vue'
export default {
  components: {
    OutDialog,
    StopDialog
  },
  data () {
    return {
      pageTotal: null,
      dialogOutVisible: false,
      dialogStopVisible: false,
      currentPage: 1,
      editIndex: 0,
      sex: '',
      minPoint: '',
      maxPoint: '',
      loading: false,
      sexOptions: [{
        value: 1,
        label: '男'
      }, {
        value: 0,
        label: '女'
      }],
      listData: []
    }
  },
  methods: {
    ...mapMutations('user-data', [
      'updateUserData'
    ]),
    transformData (data) {
      let arr = data.concat([])
      arr.forEach((data, index) => {
        let state = data.state
        let start_date = data.start_date
        let now = Date.now()
        if (state === 0) {
          arr[index]['stateStr'] = '已注销'
          arr[index]['stage'] = 0
        } else if (state === 1 && now < start_date) {
          arr[index]['stateStr'] = '已封停'
          arr[index]['stage'] = 2        
        } else {
          arr[index]['stateStr'] = '正常使用'
          arr[index]['stage'] = 1        
        }
      })
      return arr
    },
    closeStopDialog (flag) {
      this.dialogStopVisible = false
      if (flag) {
        this.fetchPageUser({ page: 1 })
      }
    },
    closeOutDialog (flag) {
      this.dialogOutVisible = false
      if (flag) {
        this.fetchPageUser({ page: 1 })
      }
    },
    changeStage (sex) {
      let query = Object.assign({}, this.$route.query, {
        sex
      })
      this.$router.push({
        query
      })
    },
    search () {
      let obj = {
        point_min: this.minPoint,
        point_max: this.maxPoint
      }
      let query = Object.assign({}, this.$route.query, obj)
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
    fetchPageUser (obj) {
      // let user = JSON.parse(sessionStorage.getItem('user'))
      this.loading = true
      this.$http({
        method: 'post',
        url: '/api/user/list.do',
        data: {
          name: obj.name,
          sex: obj.sex,
          // page: obj.page,
          point_min: obj.point_min,
          point_max: obj.point_max
        }
      }).then((result) => {
        this.listData = this.transformData(result)
        this.loading = false
      })
    },
    handleView (row, index) {
      let obj = Object.assign(row, {
        rank: index + 1
      })
      this.updateUserData(row)
      this.$router.push({
        name: 'user-view'
      })
    },
    handleOut (row) {
      this.editIndex = row.user_id
      this.dialogOutVisible = true
    },
    handleStop (row) {
      this.editIndex = row.user_id      
      this.dialogStopVisible = true
    }
  },
  watch: {
    $route (current, old) {
      let obj = {
        page: current.query.pageIndex,
        name: current.query.searchFilter,
        sex: current.query.sex,
        point_min: current.query.point_min,
        point_max: current.query.point_max
      }
      this.fetchPageUser(obj)      
    }
  },
  created () {
    this.fetchPageUser({
      page: 1
    })
  }
}
</script>

<style lang="less" scoped>
.el-cascader {
  width: 250px;
}

.el-button--mini {
  padding: 7px 10px;
}
</style>

