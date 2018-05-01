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
breadcrumbConfig['express-list'] = { to: '/express/list', title: '快递管理列表' }
breadcrumbConfig['express-view'] = { to: '/express/view', title: '快递查看' }

breadcrumbConfig['my-delivery-add'] = { to: '/my-delivery/edit', title: '发布快递' }
breadcrumbConfig['my-delivery-edit'] = { to: '/my-delivery/edit', title: '快递编辑' }
breadcrumbConfig['my-delivery-view'] = { to: '/my-delivery/view', title: '快递查看' }
breadcrumbConfig['my-delivery-list'] = { to: '/my-delivery/list', title: '我的快递列表' }

breadcrumbConfig['delivery-hall-list'] = { to: '/delivery-hall/list', title: '大厅快递列表' }
breadcrumbConfig['delivery-hall-view'] = { to: '/delivery-hall/view', title: '快递查看' }

breadcrumbConfig['user-list'] = { to: '/user/list', title: '用户列表' }
breadcrumbConfig['user-view'] = { to: '/user/view', title: '用户查看' }

breadcrumbConfig['credit-list'] = { to: '/credit/list', title: '信誉列表' }
breadcrumbConfig['credit-detail'] = { to: '/credit/detail', title: '信誉详情' }

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
      this.searchFilter = ''
      switch (to.name) {
        case 'home':
          this.searchShow = false
          this.changeBreadcrumbOptions('home')
          break
        case 'express-list':
          this.searchShow = true
          this.searchPlaceholder = '请输入快递的物品名称'
          this.changeBreadcrumbOptions('home', 'express-list')
          break
        case 'express-view':
          this.searchShow = false
          this.changeBreadcrumbOptions('home', 'express-list', 'express-view')
          break
        case 'my-delivery-list':
          this.searchShow = true
          this.searchPlaceholder = '请输入快递的物品名称'
          this.changeBreadcrumbOptions('home', 'my-delivery-list')
          break
        case 'my-delivery-edit':
          this.searchShow = false
          if (this.$route.query.from === 'list') {
            this.changeBreadcrumbOptions('home', 'my-delivery-list', 'my-delivery-edit')
          } else {
            this.changeBreadcrumbOptions('home', 'my-delivery-add')
          }
          break
        case 'my-delivery-view':
          this.searchShow = false
          this.changeBreadcrumbOptions('home', 'my-delivery-list', 'my-delivery-view')
          break
        case 'delivery-hall-list':
         this.searchShow = true
          this.searchPlaceholder = '请输入快递的物品名称'
          this.changeBreadcrumbOptions('home', 'delivery-hall-list')
          break
        case 'delivery-hall-view':
          this.searchShow = false
          this.changeBreadcrumbOptions('home', 'delivery-hall-list', 'delivery-hall-view')
          break
        case 'user-list':
          this.searchShow = true
          this.searchPlaceholder = '请输入人员名称'
          this.changeBreadcrumbOptions('home', 'user-list')
          break
        case 'user-view':
          this.searchShow = false
          this.changeBreadcrumbOptions('home', 'user-list', 'user-view')
          break
        case 'credit-list':
          this.searchShow = true
          this.searchPlaceholder = '请输入人员名称'
          this.changeBreadcrumbOptions('home', 'credit-list')
          break
        case 'credit-detail':
          this.searchShow = false
          this.changeBreadcrumbOptions('home', 'credit-list', 'credit-detail')
          break
        case 'account':
          this.searchShow = false
          this.changeBreadcrumbOptions('home', 'account')
          break
        default:
          // console.error('app-breadcrumb', 'route.name 不存在')
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
