<template>
  <view-container>
    <view-header>绩效列表</view-header>
    <view-content-float>
      <!--设备过滤-->
      <span class="filter-label">筛选:</span> 
      <el-cascader
        placeholder="试试搜索"
        size="small"
        :options="deviceDepartmentData"
        filterable
      ></el-cascader>
    </view-content-float>
    <!--列表  -->
    <view-content>
      <el-table
        stripe
        :data="workListData">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="department" label="部门"></el-table-column>
        <el-table-column prop="number" label="工号"></el-table-column>
        <el-table-column prop="job" label="职位"></el-table-column>
        <el-table-column prop="score" label="绩效评分"></el-table-column>
        <el-table-column prop="decideDate" label="评分日期"></el-table-column>
        <el-table-column
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button @click="handleView(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="handleModify(scope.row)" type="text" size="small">修改评分</el-button>
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
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      pageTotal: null,
      currentPage: 1,
      workListData: [
        {
          name: '小明',
          department: '第一工厂第一车间',
          number: '001238',
          job: '日常点检员',
          score: '98',
          decideDate: '2018年3月'
        },
        {
          name: '小明',
          department: '第一工厂第一车间',
          number: '001238',
          job: '日常点检员',
          score: '98',
          decideDate: '2018年3月'          
        },        
        {
          name: '小明',
          department: '第一工厂第一车间',
          number: '001238',
          job: '日常点检员',
          score: '98',
          decideDate: '2018年3月'          
        }
      ],
      deviceDepartmentData: [{
        value: 'shejiyuanze',
        label: '第一工厂',
        children: [{
          value: 'yizhi',
          label: '第一车间'
        }, {
          value: 'fankui',
          label: '第二车间'
        }, {
          value: 'xiaolv',
          label: '第三车间'
        }, {
          value: 'kekong',
          label: '第四车间'
        }]
      }, {
        value: 'shejiyuanze',
        label: '第二工厂',
        children: [{
          value: 'yizhi',
          label: '第一车间'
        }, {
          value: 'fankui',
          label: '第二车间'
        }, {
          value: 'xiaolv',
          label: '第三车间'
        }, {
          value: 'kekong',
          label: '第四车间'
        }]
      }]
    }
  },
  methods: {
    ...mapMutations('score-data', [
      'updateScoreData'
    ]),
    // 改变工单阶段
    changeStage (state) {
      console.log(state)
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
    handleModify (row) {
      this.updateScoreData(row)
      this.$router.push({
        name: 'score-detail',
        query: {
          state: 'modify'
        }
      })
    },
    handleView (row) {
      this.updateScoreData(row)
      this.$router.push({
        name: 'score-detail',
        query: {
          state: 'view'
        }
      })
    }
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

