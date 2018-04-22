<template>
  <view-container>
    <view-header>用户管理</view-header>
    <!--列表  -->
    <view-content>
      <el-table
        stripe
        :data="listData">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="email" label="电子邮箱" width="150px"></el-table-column>
        <el-table-column prop="phone" label="联系电话"></el-table-column>
        <el-table-column prop="order" label="成单次数"></el-table-column>
        <el-table-column prop="rate" label="成单率"></el-table-column>
        <el-table-column prop="point" label="信誉分数"></el-table-column>
        <el-table-column
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleView(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="handleDelete(scope.row)" type="text" size="small">注销</el-button>            
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
      listData: [
        {
          rank: 1,
          name: '小明',
          email: '562097257@qq.com',
          phone: '1562023182',
          point: '10',
          order: 12,
          rate: '90%',
          sex: '男',
          special: '哈哈哈哈哈哈'                
        },
        {
          rank: 2,
          name: '小明',
          email: '562097257@qq.com',
          phone: '1562023182',
          point: '10',
          order: 12,
          rate: '90%',
          sex: '女',
          special: '哈哈哈哈哈哈'      
             
        },        
        {
          rank: 3,
          name: '小明',
          email: '562097257@qq.com',
          phone: '1562023182',
          point: '10',
          order: 12,
          rate: '90%',
          sex: '女',
          special: '哈哈哈哈哈哈'      
        }
      ]
    }
  },
  methods: {
    ...mapMutations('user-data', [
      'updateUserData'
    ]),
    // 当页数改变执行的函数
    changePageIndex (pageIndex) {
      let query = Object.assign({}, this.$route.query, {
        pageIndex
      })
      this.$router.push({
        query
      })
    },
    handleDelete () {

    },
    handleView (row) {
      this.updateUserData(row)
      this.$router.push({
        name: 'user-view'
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

