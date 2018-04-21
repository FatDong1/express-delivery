<template>
  <view-container>
    <view-header>设备列表</view-header>
    <view-content-float>
      <!--设备过滤-->
      <span class="filter-label">筛选:</span> 
      <el-cascader
        placeholder="选择设备的归属车间"
        size="small"
        v-model="filterDept"
        @change="handeFilterDept"
        :options="deviceDepartmentData"
        filterable
      ></el-cascader>
      <el-button size="small" class="btn-default" @click="clearFilter">清空</el-button>
      <el-button slot="right" size="small" class="btn-default" icon="el-icon-plus" @click="addDevice">新增设备</el-button>
    </view-content-float>
    <!--列表  -->
    <view-content>
      <el-table
        stripe
        v-loading="loading"
        :data="deviceListData">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="deviceName" label="设备名称"></el-table-column>
        <el-table-column prop="department" label="设备归属"></el-table-column>
        <el-table-column prop="category" label="设备归类"></el-table-column>
        <el-table-column prop="serialNumber" label="出厂编号"></el-table-column>
        <el-table-column prop="usePlace" label="使用地点"></el-table-column>
        <el-table-column prop="productionAddress" label="生产地址"></el-table-column>
        <el-table-column
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button @click="handleView(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="addCheck(scope.row)" type="text" size="small">添加点检</el-button>
          </template>
        </el-table-column>
      </el-table>
    </view-content>
    <!-- view可视框的脚部，分页组件 -->
     <view-content-float>
      <el-pagination
        v-if="showFooter"
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
      loading: false,
      showFooter: true,
      pageTotal: null,
      currentPage: 1,
      filterDept: [],
      deviceListData: [],
      deviceDepartmentData: [{
        value: '第一工厂',
        label: '第一工厂',
        children: [{
          value: '第一车间',
          label: '第一车间'
        }, {
          value: '第二车间',
          label: '第二车间'
        }]
      }, {
        value: '第二工厂',
        label: '第二工厂',
        children: [{
          value: '第一车间',
          label: '第一车间'
        }, {
          value: '第二车间',
          label: '第二车间'
        }]
      },{
        value: '第三工厂',
        label: '第三工厂',
        children: [{
          value: '第一车间',
          label: '第一车间'
        }, {
          value: '第二车间',
          label: '第二车间'
        }]
      }]
    }
  },
  methods: {
    ...mapMutations('device-data', [
      'updateDeviceData'
    ]),
    // 当页数改变执行的函数
    changePageIndex (pageIndex) {
      this.fetchDevicePage(pageIndex)
    },
    addCheck (row) {
      this.updateDeviceData(row)
      this.$router.push({
        name: 'device-check'
      })
    },
    addDevice () {
      this.$router.push({
        name: 'device-add'
      })
    },
    handleView (row) {
      this.updateDeviceData(row)
      this.$router.push({
        name: 'device-detail'
      })
    },
    handeFilterDept (value) {
      if (value.length) {
        let department = value.join('')
        this.fetchDeviceDept(department)
        this.showFooter = false
      }
    },
    clearFilter () {
      this.filterDept = []
      this.fetchDevicePage(1)
      this.showFooter = true
    },
    fetchDeviceDept (dept) {
      this.$http({
        method: 'get',
        url: '/api/devices/dept',
        params: {
          department: dept
        }
      }).then((result) => {
        this.deviceListData = result.value
      })
    },
    fetchDevicePage (page) {
      this.loading = true
      this.$http({
        method: 'get',
        url: '/api/devices',
        params: {
          page: page
        }
      }).then((result) => {
        this.loading = false
        this.deviceListData = result.value
      })
    }
  },
  watch: {
    $route (route) {
      if (route.query.searchFilter) {
        this.$http({
          method: 'get',
          url: '/api/devices/name',
          params: {
            name: route.query.searchFilter
          }
        }).then((result) => {
          this.deviceListData = result.value
          this.showFooter = false
        })
      } else {
        this.fetchDevicePage(1)
      }
    }
  },
  created () {
    this.fetchDevicePage(1)
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

