<template>
 <view-content-float class="app-breadcrumb" padding="0">
    <el-breadcrumb separator=">">
      <div class="el-breadcrumb-head">您的位置：</div>
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbOptions"
        :key="index"
        :to="{ path: item.to }">
        {{ item.title }}
        </el-breadcrumb-item>
    </el-breadcrumb>
     <el-input
      class="app-search"
      slot="right"
      :placeholder="searchPlaceholder"
      @keyup.enter.native="changeSearchFilter"
      v-model="searchFilter"
      v-show="searchShow">
       <i class="el-input__icon el-icon-search" slot="suffix" @click="changeSearchFilter"></i> 
    </el-input> 
  </view-content-float>
</template>

<script>
// 面包屑配置对象
const breadcrumbConfig = {}
breadcrumbConfig['home'] = { to: '/home', title: '首页' }
breadcrumbConfig['work'] = { to: '/work/list', title: '工单列表' }
breadcrumbConfig['work-detail'] = { to: '/work/detail', title: '' }

breadcrumbConfig['company'] = { to: '/company', title: '组织架构' }

breadcrumbConfig['device'] = { to: '/device/list', title: '设备列表' }
breadcrumbConfig['device-add'] = { to: '/device/add', title: '新增设备' }
breadcrumbConfig['device-detail'] = { to: '/device/detail', title: '设备详情' }
breadcrumbConfig['device-check'] = { to: '/device/check', title: '新增点检' }

breadcrumbConfig['score-list'] = { to: '/score', title: '绩效列表' }
breadcrumbConfig['score-detail'] = { to: '/score/detail', title: '绩效详情' }

breadcrumbConfig['account'] = { to: '/account', title: '账户管理' }

export default {
  data () {
    return {
      breadcrumbOptions: [{}],
      searchShow: true,
      searchPlaceholder: '请输入名称',
      searchFilter: ''
    }
  },
  methods: {
    changeBreadcrumbOptions () {
      this.breadcrumbOptions = Array.prototype.slice.call(arguments).map((option) => {
        return breadcrumbConfig[option]
      })
    },
    changeSearchFilter () {
      let query = Object.assign({}, this.$route.query, {
        searchFilter: this.searchFilter
      })
      this.$router.push({
        query
      })
    },
    setBreadcrumb (to) {
      switch (to.name) {
        case 'home':
          this.searchShow = false
          this.changeBreadcrumbOptions('home')
          break
        case 'work-list':
          this.searchShow = true
          this.searchPlaceholder = '请输入设备名称'
          this.changeBreadcrumbOptions('home', 'work')
          break
        case 'work-detail':
          this.searchShow = false
          let state = this.$route.params.state
          if (state === 'view') {
            breadcrumbConfig['work-detail'].title = '工单查看'
          } else {
            breadcrumbConfig['work-detail'].title = '工单录入'
          }
          this.changeBreadcrumbOptions('home', 'work', 'work-detail')
          break
        case 'device-list':
          this.searchShow = true
          this.searchPlaceholder = '请输入设备名称'
          this.changeBreadcrumbOptions('home', 'device')
          break
        case 'device-add':
          this.searchShow = false
          this.changeBreadcrumbOptions('home', 'device', 'device-add')
          break
        case 'device-detail':
          this.searchShow = false
          this.changeBreadcrumbOptions('home', 'device', 'device-detail')
          break
        case 'device-check':
          this.searchShow = false
          this.changeBreadcrumbOptions('home', 'device', 'device-check')
          break
        case 'score-list':
          this.searchShow = true
          this.searchPlaceholder = '请输入人员名称'
          this.changeBreadcrumbOptions('home', 'score-list')
          break
        case 'score-detail':
          this.searchShow = false
          this.changeBreadcrumbOptions('home', 'score-list', 'score-detail')
          break
        case 'company':
          this.searchShow = true
          this.searchPlaceholder = '请输入人员名称'
          this.changeBreadcrumbOptions('home', 'company')
          break
        case 'account':
          this.searchShow = false
          this.changeBreadcrumbOptions('home', 'account')
          break
        default:
          console.error('app-breadcrumb', 'route.name 不存在')
          this.breadcrumbOptions = [{}]
      }
    }
  },
  created () {
    this.setBreadcrumb(this.$route)
  },
  mounted () {
    this.$router.afterEach((to) => {
      this.setBreadcrumb(to)
    })
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  height: 30px;
  padding: 8px 10px;
  font-size: 12px;
  line-height: 30px;
  color: #5a5e66;
}

.el-breadcrumb-head {
  float: left;
  margin-right: 10px;
}

.el-breadcrumb__separator {
  font-weight: 400;
}

.app-breadcrumb {
  margin-bottom: 10px;
}

.app-search {
  margin-top: 4px;
  width: 240px;
}

.el-icon-search {
  cursor: pointer;
}
</style>
